# Design a Chat App (e.g., WhatsApp, Messenger)

## ⏱️ 1. The 2-Minute Version

**Goal**: Design a real-time messaging system supporting 1-on-1 and Group chats.

**Key Components**:
1.  **Real-time**: WebSockets for persistent connections.
2.  **Protocol**: MQTT or XMPP (or custom WebSocket protocol).
3.  **Storage**:
    - **Hot Data (Recent)**: Cassandra/HBase (Write heavy).
    - **Cold Data (History)**: Blob Storage (S3) or SQL.
4.  **Status**: Heartbeat mechanism for "Online/Offline" status.

**Trade-offs**:
- **Delivery Semantics**: At-least-once (duplicates possible) vs. Exactly-once (harder).
- **Push vs. Pull**: Push (WebSockets) is better for real-time than Pull (Short Polling).

---

## 🏗️ 2. The 10-Minute Structured Version

### Requirements
- **Functional**:
    - 1-on-1 chat.
    - Group chat (max 256 members).
    - Online/Offline status.
    - Sent/Delivered/Read receipts.
- **Non-Functional**:
    - Low latency delivery.
    - High availability.
    - Scale: 1B users.

### High-Level Design

```mermaid
graph TD
    UserA[User A] <--> LB[Load Balancer]
    LB <--> CS[Chat Server (WebSocket)]
    CS <--> Redis[Redis (Pub/Sub + Presence)]
    CS <--> DB[(Cassandra - Messages)]
    UserB[User B] <--> LB
```

### Data Flow (1-on-1)
1.  **User A** connects via WebSocket to **Chat Server 1**.
2.  **User A** sends message for **User B**.
3.  **Chat Server 1** saves message to **DB**.
4.  **Chat Server 1** checks **Redis** to find which server **User B** is connected to (say, **Chat Server 2**).
5.  **Chat Server 1** forwards message to **Chat Server 2**.
6.  **Chat Server 2** pushes message to **User B** via WebSocket.

---

## 🧠 3. Deep Dive & Technical Details

### Connection Management
- **WebSockets**: Stateful. Server needs to know which socket belongs to which user.
- **Max Connections**: A single server can handle ~65k concurrent connections (limited by ports) or more with kernel tuning (ephemeral ports).
- **Load Balancing**: Layer 7 LB (sticky sessions) is needed during the handshake, but once connected, the TCP connection persists.

### Message Storage (Cassandra/HBase)
- Why not MySQL? Chat is write-heavy. RDBMS struggles with index updates at this scale.
- **Schema**:
    - `Partition Key`: `ChatID` (1-on-1 or GroupID).
    - `Clustering Key`: `Timestamp` (for ordering).
    - `Value`: `MessageContent`.

### Group Chat Optimization
- **Small Group (< 100)**: Client sends 1 message. Server loops and sends to all 100 members.
- **Large Group (> 10k)**: "Fan-out on Write" is too expensive. Use "Fan-out on Read" (Pull model) or specialized Pub/Sub.

### Online Presence
- **Heartbeat**: Client sends ping every 5s.
- **Storage**: Redis Key-Value. `User:123 -> { Status: Online, LastHeartbeat: 10:00:05 }`.
- **Optimization**: Don't update DB on every heartbeat. Only update if status changes.

### Media Files
- Don't send images via WebSocket.
- Upload to **S3**. Get a URL. Send the URL via WebSocket.

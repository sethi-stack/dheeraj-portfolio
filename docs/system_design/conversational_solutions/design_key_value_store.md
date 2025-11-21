# Design a Key-Value Store

## 1. Requirements

### Functional
- **put(key, value)**: Store a value.
- **get(key)**: Retrieve a value.

### Non-Functional
- **Scalability**: Handle massive data volume.
- **Availability**: Prioritize availability (CAP -> AP).
- **Low Latency**: Fast operations.

---

## 2. Core Components

### Data Partitioning (Sharding)
- **Consistent Hashing**: Distribute keys across a ring of servers.
- **Virtual Nodes**: Each server is represented by multiple points on the ring to ensure balanced load.

### Data Replication
- **Replication Factor (N)**: Store data on `N` (e.g., 3) successors in the ring.
- **Coordinator**: The node handling the write acts as coordinator and replicates to others.

### Consistency (Quorum)
- **N**: Number of replicas.
- **W**: Write quorum (min acks needed for success).
- **R**: Read quorum (min responses needed for success).
- **Strong Consistency**: R + W > N.
- **Eventual Consistency**: R + W <= N (Faster, higher availability).

---

## 3. Handling Failures

### Sloppy Quorum & Hinted Handoff
- If a target node is down, write to a temporary node (hinted handoff).
- When the target comes back, the temp node sends the data back.
- Ensures high availability.

### Anti-Entropy (Merkle Trees)
- Used to detect inconsistencies between replicas.
- Compare hashes of data ranges efficiently.
- Sync only the differences.

### Gossip Protocol
- Nodes periodically exchange state info with random peers.
- Used for failure detection and cluster membership.

---

## 4. Write Path
1.  Client sends request to any node (Coordinator).
2.  Coordinator finds preference list (top N nodes).
3.  Writes locally and sends to replicas.
4.  Waits for W acks.
5.  Returns success.

## 5. Read Path
1.  Client sends request to Coordinator.
2.  Coordinator requests data from replicas.
3.  Waits for R responses.
4.  **Read Repair**: If replicas disagree, return the latest version (Vector Clocks) and update the outdated replicas in the background.

---

## 📊 Diagram References

Related architecture diagrams:
- [Key-Value Store System Architecture Diagram](file:///Users/dj/Documents/Programming/techLead/tech-lead-repo/docs/system_design/diagrams/design_key_value_store_1.mmd)

# Detailed Architecture: Openlane Modernization

## 🏗️ High-Level Architecture
The architecture follows a **Strangler Fig Pattern** to incrementally migrate functionality from the Oracle monolith to a modern, event-driven microservices ecosystem.

```mermaid
graph TD
    User[User (Web/Mobile)] --> CDN[CloudFront CDN]
    CDN --> API[API Gateway]
    
    subgraph "Legacy World"
        API -->|Legacy Routes| OracleMono[Oracle Monolith]
        OracleMono --> OracleDB[(Oracle DB)]
    end
    
    subgraph "Modern World (AWS/Azure)"
        API -->|New Routes| VDP_Service[Vehicle Details Service (.NET)]
        API -->|New Routes| Auction_Service[Auction Service (Node.js)]
        
        VDP_Service --> DynamoDB[(DynamoDB)]
        Auction_Service --> Redis[(Redis Cache)]
        
        %% Event Bus
        VDP_Service --> Pulsar[Apache Pulsar / Kinesis]
        OracleMono -.->|CDC Events| Pulsar
        
        %% AI Pipeline
        Pulsar --> Mod_Lambda[Moderation Lambda (Python)]
        Mod_Lambda --> LLM[OpenAI LLM]
        Mod_Lambda --> Mod_DB[(Moderation DB)]
    end
```

## 🧩 Component Walkthrough

### 1. The Strangler Facade (API Gateway)
*   **Role:** Routes traffic between the legacy Oracle system and new microservices based on URL paths.
*   **Strategy:** We migrated read-heavy pages (like Vehicle Details) first. The Gateway allowed us to switch traffic gradually (canary releases) without the user noticing.

### 2. Vehicle Details Service (.NET Core)
*   **Responsibility:** Serves all data for the Vehicle Details Page (VDP).
*   **Data Source:** Aggregates data from the legacy Oracle DB (via CDC events) and new sources into a read-optimized DynamoDB table.
*   **Why .NET?** Strong typing, excellent performance for high-throughput APIs, and existing team expertise.

### 3. Event Backbone (Pulsar & Kinesis)
*   **Role:** Decouples the legacy system from the new world.
*   **Flow:** When a vehicle is updated in Oracle, a Change Data Capture (CDC) event is fired to Pulsar. The new services consume this to update their local read models (CQRS pattern).

### 4. AI Moderation Pipeline (AWS Lambda + OpenAI)
*   **Trigger:** User posts a question on a vehicle.
*   **Process:**
    1.  API receives input -> pushes to Kinesis.
    2.  Lambda triggers -> calls OpenAI API with a prompt designed to catch profanity, PII (phone numbers, emails), and non-arbitrable claims.
    3.  **Result:** If flagged, the comment is hidden pending human review. If clean, it's published immediately.

## ⚖️ Key Trade-offs

### Eventual Consistency vs. Strong Consistency
*   **Decision:** We accepted **eventual consistency** for the Vehicle Details Page.
*   **Why:** High availability and low latency were more critical than seeing an update instantly.
*   **Mitigation:** For critical auction status (Bidding), we maintained strong consistency using optimistic locking in the Auction Service.

### Sync vs. Async AI Moderation
*   **Decision:** We moved AI moderation to an **async** background process.
*   **Why:** LLM calls can be slow (1-2s). Blocking the user's "Post Comment" request was bad UX.
*   **UX Pattern:** We show the comment as "Pending Review" immediately to the user (optimistic UI), while the backend processes it.

# Tailored System Design Questions

These questions are derived directly from your project experience. You should be able to answer them with deep authority.

## 1. Design a B2B Auction Platform (Based on Openlane)
**The Hook:** "Design a system where thousands of car dealers bid on vehicles in real-time."

### Key Challenges to Discuss:
*   **Real-time Updates:** How do you push bid updates to 10k users with <200ms latency? (WebSockets, Redis Pub/Sub).
*   **Concurrency:** How do you prevent two users from bidding $10k at the exact same millisecond? (Optimistic Locking, Redis `INCR`).
*   **Legacy Sync:** How do you ensure the auction system stays in sync with the legacy ERP? (CDC, Outbox Pattern).

### Your "Ace in the Hole":
*   Mention the **"Dual Write" problem** and how you solved it with the Outbox Pattern.
*   Discuss **Optimistic UI** for the bidding button to make it feel instant.

## 2. Design a Remote Patient Monitoring System (Based on Rheumera)
**The Hook:** "Design a system that collects health metrics from millions of patients and alerts doctors of anomalies."

### Key Challenges to Discuss:
*   **Data Volume:** Storing time-series data for millions of users. (TimescaleDB or partitioning Postgres).
*   **Security:** HIPAA compliance. (Encryption at rest, Audit logs for every read).
*   **Alerting:** How to run rules like "If pain > 8 for 3 days" in real-time? (Stream processing vs. Batch jobs).

### Your "Ace in the Hole":
*   Discuss the **Audit Log architecture** (Aspect Oriented Programming) to ensure compliance without cluttering business logic.
*   Talk about **AI Summarization** to reduce information overload for doctors.

## 3. Design a Geospatial Marketplace (Based on FoodMesh)
**The Hook:** "Design an Uber-like system for matching food donors with charities."

### Key Challenges to Discuss:
*   **Geospatial Queries:** How to efficiently find "Charities within 10km"? (PostGIS, QuadTrees, Geohashing).
*   **Matching Logic:** It's not just distance; it's capacity and food type. (Complex filtering).
*   **Notifications:** Reliable delivery to mobile apps in poor network conditions. (Idempotent push notifications).

### Your "Ace in the Hole":
*   Explain why you chose **PostGIS** over a simple "Haversine formula" in code (Index performance).
*   Discuss **Async Matching** (Celery) to keep the API snappy.

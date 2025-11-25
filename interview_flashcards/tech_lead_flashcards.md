# Tech Lead Interview Flashcards

## 🏗️ Architecture Patterns

### Q: Monolith vs. Microservices?
*   **Monolith:** Simple deployment, easy debugging, no network latency. Hard to scale teams, single point of failure.
*   **Microservices:** Independent scaling, technology agnostic, fault isolation. Complex ops, distributed tracing required, eventual consistency.
*   **My Stance:** Start with a **Modular Monolith**. Split only when organizational scaling (too many devs on one repo) or distinct scaling needs (video processing vs. user profile) demand it.

### Q: Event-Driven Architecture (EDA)?
*   **Concept:** Services communicate by emitting events ("OrderPlaced") rather than direct calls.
*   **Pros:** Decoupling, scalability, easy to add new consumers (e.g., Analytics).
*   **Cons:** Complexity, eventual consistency, harder to debug flow.
*   **Tools:** Kafka, RabbitMQ, SNS/SQS.

### Q: CAP Theorem?
*   **Consistency:** Every read receives the most recent write.
*   **Availability:** Every request receives a (non-error) response.
*   **Partition Tolerance:** System continues to operate despite network failures.
*   **Reality:** You pick CP (strong consistency, potential downtime) or AP (always up, potential stale data). P is mandatory in distributed systems.

## 🧠 Leadership & Soft Skills

### Q: How do you handle a low performer?
*   **Diagnose:** Is it skill (can't do it) or will (won't do it)?
*   **Action:**
    *   *Skill:* Pair programming, smaller tasks, training.
    *   *Will:* Clear expectations, honest feedback, Performance Improvement Plan (PIP) if needed.
*   **Goal:** "Coach up or coach out."

### Q: How do you influence without authority?
*   **Build Trust:** Deliver on your own promises first.
*   **Explain "Why":** Connect technical decisions to business value.
*   **Listen:** Understand the other team's constraints before proposing a solution.
*   **Consensus:** Use "RFCs" (Request for Comments) to gather input and make people feel heard.

## 📐 System Design Cheat Sheet

### Latency Numbers (Approx)
*   L1 Cache: 1 ns
*   RAM: 100 ns
*   SSD Read: 100 us (microseconds)
*   Network Round Trip (Same DC): 500 us
*   Disk Seek: 10 ms
*   Packet CA->Netherlands: 150 ms

### Back-of-Envelope Math
*   1 Million req/day ≈ 12 req/sec
*   1 GB = 10^9 bytes
*   32-bit integer = 4 bytes
*   **Rule of Thumb:** If data fits in memory (RAM), keep it there (Redis). If it fits on one disk, use a relational DB. If it's petabytes, use NoSQL/Blob storage.

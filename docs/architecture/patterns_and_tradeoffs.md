# Patterns and Trade-offs

Architecture is the art of making trade-offs. There is no "perfect" architecture, only the one that best suits your current constraints and requirements.

## 1. Synchronous vs. Asynchronous Communication

### Synchronous (REST, gRPC)
- **How it works**: Client sends a request and waits for a response.
- **Pros**: Simple, real-time feedback, easier to reason about.
- **Cons**: Coupling (if service B is down, A fails), latency accumulation (cascading latency).
- **Use Case**: User-facing APIs where immediate confirmation is needed (e.g., "Login").

### Asynchronous (Message Queues, Pub/Sub)
- **How it works**: Client sends a message and continues; receiver processes it later.
- **Pros**: Decoupling, load leveling (buffering spikes), resilience.
- **Cons**: Complexity, eventual consistency, harder error handling.
- **Use Case**: Background jobs, notifications, heavy processing (e.g., "Generate Report").

---

## 2. Strong vs. Eventual Consistency

### Strong Consistency (ACID)
- **Definition**: Reads always return the most recent write.
- **Trade-off**: Higher latency, reduced availability (CAP theorem).
- **Use Case**: Financial transactions, inventory management.

### Eventual Consistency (BASE)
- **Definition**: Reads may return stale data for a short period, but all nodes will eventually agree.
- **Trade-off**: Lower latency, higher availability, potential for conflicts.
- **Use Case**: Social media feeds, comments, likes.

---

## 3. Batch Processing vs. Stream Processing

### Batch Processing
- **Definition**: Processing a large volume of data at a scheduled time.
- **Pros**: Efficient for large datasets, simpler to implement.
- **Cons**: High latency (results available only after batch completes).
- **Use Case**: Payroll, end-of-day reports.

### Stream Processing
- **Definition**: Processing data in real-time as it arrives.
- **Pros**: Low latency, immediate insights.
- **Cons**: Complex infrastructure (Kafka, Flink), harder to handle out-of-order data.
- **Use Case**: Fraud detection, real-time analytics, monitoring.

---

## 4. Database Scaling: Sharding vs. Replication

### Replication (Read Scaling)
- **Master-Slave**: Writes go to Master, Reads go to Slaves.
- **Pros**: Increases read throughput, provides failover.
- **Cons**: Replication lag (stale reads).

### Sharding (Write Scaling)
- **Partitioning**: Splitting data across multiple servers based on a shard key (e.g., UserID).
- **Pros**: Horizontal scaling of storage and write throughput.
- **Cons**: Complex queries (joins across shards), re-balancing data is difficult.

---

## 5. Rate Limiting Algorithms

### Token Bucket
- **Mechanism**: Tokens are added to a bucket at a fixed rate. Requests consume tokens.
- **Pros**: Allows bursts of traffic.

### Leaky Bucket
- **Mechanism**: Requests enter a queue and are processed at a constant rate.
- **Pros**: Smooths out traffic bursts.

### Fixed Window
- **Mechanism**: Count requests in a fixed time window (e.g., 100 req/min).
- **Cons**: Burst at the edge of windows (e.g., 100 reqs at 10:00:59 and 100 at 10:01:01).

### Sliding Window Log
- **Mechanism**: Track timestamp of each request.
- **Pros**: Very accurate.
- **Cons**: High memory usage.

---

## 6. Caching Strategies

### Cache-Aside (Lazy Loading)
- **Flow**: App checks cache -> Miss -> App reads DB -> App writes to cache.
- **Pros**: Only requested data is cached.
- **Cons**: First request is slow (cache miss).

### Write-Through
- **Flow**: App writes to cache and DB synchronously.
- **Pros**: Data in cache is always fresh.
- **Cons**: Higher write latency.

### Write-Back (Write-Behind)
- **Flow**: App writes to cache -> Cache writes to DB asynchronously.
- **Pros**: Lowest write latency.
- **Cons**: Risk of data loss if cache crashes before syncing to DB.

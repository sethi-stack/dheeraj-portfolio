# Storage and Databases

Choosing the right database is one of the most critical decisions a Tech Lead makes.

## 1. SQL vs. NoSQL

### SQL (Relational)
- **Examples**: PostgreSQL, MySQL, Oracle.
- **Structure**: Tables with fixed schemas.
- **ACID**: Strong consistency.
- **Scaling**: Vertical (easier), Horizontal (harder - requires sharding).
- **Use Case**: Financial systems, complex relationships (joins).

### NoSQL (Non-Relational)
- **Key-Value**: Redis, DynamoDB. (Fast lookups).
- **Document**: MongoDB, CouchDB. (Flexible schema, JSON).
- **Column-Family**: Cassandra, HBase. (Write-heavy, time-series).
- **Graph**: Neo4j. (Complex relationships).

---

## 2. Database Internals

### Indexing
- **B-Tree**: Balanced tree. Good for range queries (`<`, `>`, `=`). Used in most SQL DBs.
- **Hash Index**: O(1) lookup. Good for equality checks (`=`). No range queries.
- **LSM Tree (Log-Structured Merge-Tree)**: Optimized for writes. Writes go to memory (MemTable) then flushed to disk (SSTable). Used in Cassandra, RocksDB.

### Replication
- **Synchronous**: Write to Master -> Master writes to Slave -> Slave Ack -> Master Ack to Client. (Safe but slow).
- **Asynchronous**: Write to Master -> Master Ack to Client -> Master replicates to Slave. (Fast but risk of data loss).

---

## 3. CAP Theorem & PACELC

### CAP
- **Consistency**: All nodes see the same data at the same time.
- **Availability**: Every request gets a response (success/failure).
- **Partition Tolerance**: System continues to work despite network failures.

### PACELC (Extension of CAP)
- If **P**artition (network failure): Choose **A** (Availability) or **C** (Consistency).
- **E**lse (Normal operation): Choose **L**atency or **C**onsistency.
    - *Example*: DynamoDB/Cassandra choose Availability (AP) and Low Latency (EL).
    - *Example*: MySQL/Postgres choose Consistency (CP) and Consistency (EC).

---

## 4. NewSQL

Attempts to combine the scalability of NoSQL with the ACID guarantees of SQL.
- **Examples**: CockroachDB, Google Spanner.
- **Mechanism**: Uses consensus algorithms (Raft/Paxos) and synchronized clocks (TrueTime) to achieve global consistency.

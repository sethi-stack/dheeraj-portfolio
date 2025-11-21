# Distributed Systems Papers & Concepts

Understanding the foundational papers of distributed systems is crucial for a Tech Lead.

## 1. MapReduce (Google, 2004)

### Summary
A programming model for processing large data sets with a parallel, distributed algorithm on a cluster.
- **Map**: Filters and sorts data.
- **Reduce**: Performs a summary operation.

### Key Concepts
- **Data Locality**: Move computation to data, not data to computation.
- **Fault Tolerance**: If a worker fails, re-schedule its task on another node.

### Relevance
The grandfather of Big Data processing (Hadoop, Spark).

---

## 2. Dynamo: Amazon's Highly Available Key-value Store (2007)

### Summary
Describes the internal workings of Amazon's Dynamo, which powers the shopping cart.

### Key Concepts
- **Consistent Hashing**: Distributes data across nodes.
- **Vector Clocks**: Handles versioning and conflict resolution.
- **Sloppy Quorum (R+W < N)**: Prioritizes availability over consistency.
- **Gossip Protocol**: For failure detection and membership.

### Relevance
Influenced Cassandra, Riak, and modern NoSQL databases. Teaches how to build AP systems (Availability + Partition Tolerance).

---

## 3. Raft: In Search of an Understandable Consensus Algorithm (2014)

### Summary
A consensus algorithm designed to be easier to understand than Paxos.

### Key Concepts
- **Leader Election**: Nodes elect a leader to handle all client requests.
- **Log Replication**: Leader replicates its log to followers.
- **Safety**: Ensures all nodes agree on the state.

### Relevance
Used in Kubernetes (etcd), Consul, and CockroachDB. Essential for building CP systems (Consistency + Partition Tolerance).

---

## 4. The Google File System (GFS) (2003)

### Summary
A scalable distributed file system for large distributed data-intensive applications.

### Key Concepts
- **Master-Chunkserver**: Single master (metadata) and multiple chunkservers (data).
- **Relaxed Consistency**: Optimized for appending data (logs) rather than overwriting.

### Relevance
The precursor to HDFS (Hadoop Distributed File System).

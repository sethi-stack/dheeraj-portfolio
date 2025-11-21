# Design Pastebin

## 1. Requirements

### Functional
- **Paste Text**: Users can upload text/code.
- **Get Text**: Users can retrieve text via a unique URL.
- **Expiration**: Users can set an expiration time.
- **Custom Alias**: (Optional) Users can choose a custom URL.

### Non-Functional
- **High Availability**: System should always be up.
- **Low Latency**: Reads should be very fast.
- **Read-Heavy**: More reads than writes (e.g., 10:1 ratio).
- **Durability**: Pastes should not be lost until expiration.

---

## 2. Capacity Estimation

- **Traffic**: 1M new pastes/day.
- **Reads**: 10M reads/day.
- **Storage**: Average paste = 10KB.
    - 1M * 10KB = 10GB/day.
    - 10GB * 365 days * 10 years = ~36TB.
- **Bandwidth**:
    - Write: 10GB / 86400s ~= 115KB/s.
    - Read: 100GB / 86400s ~= 1.1MB/s.

---

## 3. High-Level Design

### Components
1.  **Client**: Web/Mobile app.
2.  **Load Balancer**: Distributes traffic.
3.  **App Server**: Handles logic (key generation, storage).
4.  **Metadata DB**: Stores URL mapping, expiration, user info (SQL or NoSQL).
5.  **Object Storage**: Stores the actual text content (S3).
6.  **Cache**: Caches popular pastes (Redis).

### Workflow
1.  **Write**:
    - Client sends text.
    - App Server generates a unique 7-char key (Base62).
    - App Server uploads text to S3 (Key = generated key).
    - App Server saves metadata (Key, S3_Path, Expiration) to DB.
    - Returns URL to client.
2.  **Read**:
    - Client requests URL.
    - App Server checks Cache.
    - If miss, check DB for metadata.
    - If expired, return error.
    - Fetch content from S3.
    - Return content to client.

---

## 4. Deep Dive

### Key Generation (KGS)
- **Problem**: Collisions if we just hash.
- **Solution**: Pre-generate keys offline and store in a "Key-DB".
- **Service**: A dedicated Key Generation Service (KGS) fetches keys from Key-DB and serves them to App Servers.

### Database Choice
- **Metadata**: DynamoDB or Cassandra (High write throughput, easy scaling).
- **Object Storage**: S3 is cheaper and better for large blobs of text than a DB.

###Cleanup (Purging)
- **Lazy Delete**: When a user tries to access an expired paste, delete it then.
- **Batch Job**: Run a daily script to scan DB and remove expired entries from DB and S3.

---

## 📊 Diagram References

Related architecture diagrams:
- [Pastebin System Architecture Diagram](file:///Users/dj/Documents/Programming/techLead/tech-lead-repo/docs/system_design/diagrams/design_pastebin_1.mmd)

# Design Netflix

## 1. Requirements

### Functional
- **Upload**: Content creators upload movies.
- **Watch**: Users stream video.
- **Search/Recommend**: Find content.

### Non-Functional
- **Buffer-free**: Smooth streaming.
- **High Availability**: Global access.
- **Scalability**: Support millions of concurrent streams.

---

## 2. High-Level Design

### Control Plane (AWS)
- Handles logic: Sign-up, Billing, Search, Recommendations, DRM.
- **Database**: Cassandra (User history), MySQL (Billing).

### Data Plane (Open Connect CDN)
- Handles streaming.
- Netflix's custom CDN installed in ISP data centers.
- Stores pre-encoded video files.

---

## 3. Deep Dive

### Video Processing (Transcoding)
- Source video is massive (TB).
- **Chunking**: Split video into 4-second chunks.
- **Encoding**: Convert chunks into multiple formats (codecs) and bitrates (qualities).
    - *Example*: 4K, 1080p, 720p, 360p for Mobile, TV, Web.
- **DAG (Directed Acyclic Graph)**: Use a workflow engine (Conductor) to manage parallel encoding tasks.

### Adaptive Bitrate Streaming (ABS)
- Client detects bandwidth.
- Requests the appropriate chunk quality.
- If bandwidth drops, client requests lower quality chunk for next segment.

### Recommendation System
- **Collaborative Filtering**: "Users like you liked X".
- **Content-Based Filtering**: "You liked Action, here is more Action".
- **Matrix Factorization**: Decompose User-Item matrix.
- **Spark**: Used for offline batch processing of logs to train models.

# Design YouTube

## 1. Requirements

### Functional
- **Upload**: Users upload videos.
- **View**: Users watch videos.
- **Search**: Users search by title/tag.
- **Stats**: View count, likes.

### Non-Functional
- **Reliability**: Uploads shouldn't fail.
- **Latency**: Fast start time.
- **Scale**: PB of data per day.

---

## 2. Architecture

### Upload Flow
1.  Client uploads video to **Original Storage** (S3).
2.  Message sent to **Upload Queue**.
3.  **Encoders** pick up job:
    - Check for duplicates (Content ID).
    - Transcode to MPEG-DASH / HLS (different resolutions).
    - Generate thumbnails.
4.  Store processed video in **CDN**.
5.  Update **Metadata DB**.

### Stream Flow
1.  Client requests video.
2.  Edge server (CDN) serves chunks.
3.  Adaptive Bitrate Streaming (same as Netflix).

---

## 3. Deep Dive

### Deduplication (Content ID)
- Fingerprint audio and video frames.
- Compare against database of copyrighted material.
- Actions: Block, Monetize (Ads go to owner), or Track.

### View Counting
- **Problem**: High write throughput for popular videos.
- **Solution**:
    - **Buffer**: Accumulate views in Redis/Memory.
    - **Batch Write**: Flush to DB every N seconds.
    - **Eventual Consistency**: "301+ views" phenomenon (old YouTube).

### Database Sharding
- **Metadata**: Shard by `video_id`.
- **User Data**: Shard by `user_id`.
- **Replication**: Master-Slave for read scaling.

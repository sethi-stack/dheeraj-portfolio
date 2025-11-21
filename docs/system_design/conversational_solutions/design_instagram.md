# Design Instagram

## 1. Requirements

### Functional
- **Upload Photo**: Store and display images.
- **News Feed**: See photos from followed users.
- **Like/Comment**: Interact with posts.

### Non-Functional
- **Latency**: Low latency for image loading.
- **Reliability**: No data loss.
- **Storage**: Massive storage for images.

---

## 2. High-Level Design

### Components
1.  **Image Storage**: S3 (Object Storage).
2.  **Metadata DB**: PostgreSQL/Cassandra (User, Photo metadata).
3.  **CDN**: CloudFront/Akamai to serve images globally.
4.  **Feed Service**: Similar to Twitter (Hybrid Fan-out).

---

## 3. Deep Dive

### Image Upload Process
1.  Client uploads image to App Server.
2.  App Server uploads to S3.
3.  App Server stores metadata (S3 URL, UserID, Caption) in DB.
4.  **Async Processing**: Push message to Kafka.
    - **Thumbnail Worker**: Generates different sizes.
    - **Safety Worker**: Checks for NSFW content.

### Feed Generation
- Similar to Twitter, but "weight" of posts matters more (Ranking).
- **Ranking Signals**:
    - Affinity (Relationship with author).
    - Weight (Edge type: Like > View).
    - Time Decay (Newer is better).

### Database Sharding
- Shard by `user_id`?
    - Pros: All user data on one shard.
    - Cons: Hot spots (Celebrities), uneven data distribution.
- Shard by `photo_id`?
    - Pros: Even distribution.
    - Cons: Need to query all shards to find photos for a user? No, use a secondary index or a mapping table.
    - **Solution**: Generate `photo_id` using a dedicated service (Snowflake) that includes shard ID or time component.

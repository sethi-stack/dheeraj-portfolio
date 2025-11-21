# Design Twitter / X

## 1. Requirements

### Functional
- **Post Tweet**: Text, images.
- **Timeline**: View home timeline (tweets from followed users).
- **Follow**: Follow/unfollow users.

### Non-Functional
- **Read-Heavy**: Read:Write ratio is ~100:1.
- **Latency**: Timeline generation must be < 200ms.
- **Availability**: Eventual consistency is acceptable for timelines.

---

## 2. High-Level Design

### Components
1.  **Load Balancer**
2.  **Tweet Service**: Handles posting.
3.  **User Service**: Handles profile/follows.
4.  **Timeline Service**: Generates feeds.
5.  **Fanout Service**: Pushes tweets to followers' timelines.
6.  **Storage**:
    - SQL (User profile, Follow graph).
    - NoSQL (Tweets - Cassandra/DynamoDB).
    - Redis (Home Timeline Cache).

---

## 3. Deep Dive: Timeline Generation

### Pull Model (Fan-out on Load)
- **Process**: When user loads timeline, query all followees, fetch recent tweets, merge, and sort.
- **Pros**: Simple write path.
- **Cons**: Slow read path. Bad for users following thousands.

### Push Model (Fan-out on Write)
- **Process**: When user tweets, push ID to all followers' timeline caches (Redis lists).
- **Pros**: Fast read path (O(1)).
- **Cons**: Slow write path for celebrities (Justin Bieber problem).

### Hybrid Approach (The Solution)
- **Normal Users**: Use Push Model.
- **Celebrities**: Use Pull Model.
- **Timeline Construction**: Merge the pre-computed cache (Push) with tweets fetched from celebrities (Pull).

---

## 4. Storage Schema

### Tweet Table (Cassandra)
- `tweet_id` (Partition Key - KGS or Snowflake ID)
- `user_id`
- `content`
- `timestamp`
- `media_url`

### Follow Table (MySQL/GraphDB)
- `follower_id`
- `followee_id`

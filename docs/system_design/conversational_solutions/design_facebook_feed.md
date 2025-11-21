# Design Facebook News Feed

## 1. Requirements

### Functional
- **Feed**: Aggregated content (Status, Photos, Videos, Links) from friends and pages.
- **Ranking**: Show most relevant content first.

### Non-Functional
- **Latency**: < 200ms.
- **Freshness**: New posts appear quickly.

---

## 2. Architecture

### Feed Publishing (Write Path)
1.  User creates post.
2.  Written to Leaflet (FB's internal storage) / TAO (Graph Store).
3.  Fan-out service pushes ID to friends' leaf nodes.

### Feed Retrieval (Read Path)
1.  User requests feed.
2.  **Aggregator**: Fetches candidate posts from:
    - Friends' updates.
    - Pages followed.
    - Ads.
3.  **Ranker**: Scores each post.
4.  **Filter**: Removes seen posts, NSFW, etc.
5.  Return top N posts.

---

## 3. Deep Dive: Ranking Algorithm (EdgeRank)

### Components
- **Affinity Score**: How close is the user to the creator? (Interactions, Family tag).
- **Edge Weight**: Value of the action (Comment > Like > Click > View).
- **Time Decay**: `1 / (Time Since Posted)`. Old posts lose value.

### Machine Learning
- Modern feeds use ML models (Logistic Regression, Neural Networks).
- **Features**: User demographics, past history, content type, time of day.
- **Training**: Offline training on logs, online learning for real-time feedback.

### Caching
- **News Feed Cache**: Store the pre-computed, ranked list of post IDs for active users.
- **Content Cache**: Store the actual post data (text, image URLs).

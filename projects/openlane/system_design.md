# System Design: Scalable B2B Auction Platform

## 1. Requirements

### Functional
*   **Real-time Bidding:** Users must see new bids instantly (<200ms latency).
*   **Vehicle Search:** Advanced filtering (make, model, condition, location).
*   **Q&A Moderation:** Questions/Answers must be filtered for profanity/PII.
*   **Legacy Sync:** Must reflect inventory changes from the Oracle ERP within 5 seconds.

### Non-Functional
*   **Scalability:** Support 10,000 concurrent users during "Event Sales".
*   **Availability:** 99.99% uptime during auction hours.
*   **Consistency:** Strong consistency for bids; eventual consistency for vehicle details.

## 2. API Design (Simplified)

```typescript
// POST /api/v1/auctions/{auctionId}/bid
Request: {
  userId: "user_123",
  amount: 15000.00,
  currency: "USD"
}
Response: {
  status: "ACCEPTED" | "REJECTED",
  currentPrice: 15000.00
}

// GET /api/v1/vehicles/{vehicleId}
Response: {
  id: "v_999",
  make: "Toyota",
  model: "Camry",
  currentBid: 14500.00,
  questions: [ ... ] // Moderated list
}
```

## 3. Data Model

### DynamoDB (Vehicle Details - Read Heavy)
*   **PK:** `VehicleId`
*   **SK:** `Metadata`
*   **Attributes:** `Make`, `Model`, `ConditionReport`, `Images[]`
*   **Why:** Single-digit millisecond reads at scale; flexible schema for varying vehicle attributes.

### Redis (Active Auctions - Write Heavy)
*   **Key:** `auction:{id}:bids`
*   **Value:** Sorted Set of bids (Score = Amount)
*   **Why:** In-memory speed is required to handle bid contention and real-time leaderboard updates.

## 4. Scaling Strategy

### Handling "Event Sale" Traffic Spikes
*   **Challenge:** Traffic spikes 100x when a major auction starts at 9:00 AM.
*   **Solution:**
    1.  **Read Replicas:** We use DynamoDB On-Demand capacity to handle read spikes on the VDP.
    2.  **CDN Caching:** Static assets (images, JS) and semi-static data (vehicle specs) are cached at the CloudFront edge.
    3.  **WebSockets:** We use a dedicated WebSocket service (Pusher/SignalR) to push price updates to clients, avoiding polling storms.

## 5. Failure Scenarios

### What if the AI Moderation Service fails?
*   **Fallback:** The system defaults to "Pending Review" state.
*   **Recovery:** Messages are queued in a Dead Letter Queue (DLQ). A separate retry process re-submits them when the service recovers, or flags them for human review if they fail 3x.

### What if the Legacy Oracle DB goes down?
*   **Impact:** New inventory cannot be created.
*   **Resilience:** The *Auction Platform* continues to run. Users can bid on existing cars. We decoupled the "Read" path (DynamoDB) from the "Write" path (Oracle) to ensure the marketplace survives ERP outages.

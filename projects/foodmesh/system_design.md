# System Design: Food Recovery Marketplace

## 1. Requirements

### Functional
*   **Listing Creation:** Donors post food details (type, weight, expiry, photo).
*   **Geospatial Matching:** System finds charities within X km that accept this food type.
*   **Transaction Flow:** Claim -> Pickup -> Verify.
*   **Reporting:** Real-time dashboards for municipalities.

### Non-Functional
*   **Latency:** Matching notifications must be sent < 2 mins after posting.
*   **Accuracy:** Location data must be precise (loading dock entrances, not just street addresses).
*   **Accessibility:** Mobile app must work on low-end devices (drivers/volunteers).

## 2. API Design (Django REST)

```python
# POST /api/v1/listings/
Request: {
  "donor_id": "d_555",
  "food_category": "DAIRY",
  "weight_kg": 50,
  "expiry": "2023-11-01T12:00:00Z",
  "location": { "lat": 49.2827, "lng": -123.1207 }
}

# GET /api/v1/impact/stats?region=vancouver
Response: {
  "total_kg_diverted": 150000,
  "co2_saved_kg": 420000,
  "meals_equivalent": 214000
}
```

## 3. Data Model (PostGIS)

### Tables
*   `Users`: Donors, Charities, Drivers.
*   `Listings`: The core entity. Contains a `PostGIS Point` column for location.
*   `Matches`: Tracks which charities were notified about which listing.
*   `Transactions`: The final record of a completed pickup.

## 4. The Matching Algorithm
The core value prop is the **Matcher**. It's not just distance-based.
1.  **Filter:** `Charity.accepts(listing.category)` AND `Charity.capacity >= listing.weight`.
2.  **Geo-Filter:** `ST_DWithin(Charity.location, Listing.location, 20000)` (20km radius).
3.  **Rank:** Prioritize charities that haven't received a donation recently (Fairness).

## 5. Analytics Pipeline
*   **Source:** Transaction data in Postgres.
*   **Transformation:** A nightly cron job aggregates daily totals into an `ImpactStats` table (OLAP-style denormalization).
*   **Visualization:** The frontend queries this pre-aggregated table for instant dashboard loading.

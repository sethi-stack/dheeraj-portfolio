# Design Uber/Lyft

## 1. Requirements

### Functional
- **Rider**: Request ride, see ETA, track driver.
- **Driver**: Accept ride, see route.
- **Matching**: Match rider with nearest driver.

### Non-Functional
- **Real-time**: Low latency updates.
- **Consistency**: No double booking.
- **Availability**: High.

---

## 2. Architecture

### Components
1.  **Location Service**: Receives GPS updates from drivers (every 4s).
2.  **Map Service**: ETA calculation, Routing (Google Maps API or OSRM).
3.  **Matching Service**: Finds drivers near rider.
4.  **Trip Service**: Manages state (Requested, Accepted, In-Progress, Ended).

---

## 3. Deep Dive

### Geospatial Indexing (QuadTree vs. Geohash)
- **Problem**: How to efficiently find "drivers within 1km"?
- **Geohash**: Divides world into grid strings. Shared prefix = nearby.
    - *Issue*: Edge cases at grid boundaries.
- **QuadTree**: Recursively divides 2D space into 4 quadrants.
    - *Uber uses*: Google S2 Geometry (Hilbert Curves) for better locality.

### Driver Location Updates
- Drivers send GPS to **Location Service**.
- Update the in-memory QuadTree/Geohash index (Redis/Memcached).
- **Optimization**: Don't write every update to DB. Only persist trip start/end.

### Matching Algorithm
- Find all drivers in radius R.
- Filter by status (Available).
- Calculate ETA for each.
- Send request to driver with lowest ETA.
- If rejected, try next driver.

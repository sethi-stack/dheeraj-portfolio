# Design Google Maps

## 1. Requirements

### Functional
- **Navigation**: Point A to B.
- **Search**: Find places (POIs).
- **Traffic**: Real-time updates.

### Non-Functional
- **Accuracy**: Correct routes.
- **Latency**: Fast recalculation.

---

## 2. Architecture

### Data Sources
- **Base Map**: Satellite imagery, government data.
- **User Data**: GPS traces from Android/iOS phones (Traffic).

### Services
1.  **Routing Service**: Calculates path.
2.  **Navigation Service**: Turn-by-turn instructions.
3.  **Map Tile Service**: Serves images/vectors.

---

## 3. Deep Dive

### Routing Algorithms
- **Dijkstra**: Good for shortest path, but slow on large graphs.
- **A* (A-Star)**: Uses heuristics (direction) to guide search. Faster.
- **Contraction Hierarchies**: Pre-process graph to create shortcuts for highways. Extremely fast.

### Map Tiling
- Divide world into grids at different zoom levels.
- **Vector Tiles**: Send data (lines, polygons) to client. Client renders. Smaller size, smooth zooming.
- **Raster Tiles**: Send images (PNG). Simple, but high bandwidth.

### Traffic Estimation
- Aggregate speed of users on a road segment.
- Color code: Green (> 40mph), Red (< 10mph).
- **Prediction**: Use historical data + current weather/events.

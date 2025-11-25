# Detailed Architecture: FoodMesh Marketplace

## 🏗️ High-Level Architecture
The system is designed as a **Geospatial Marketplace**. It matches "Donors" (Supply) with "Charities" (Demand) based on location, food type, and capacity.

```mermaid
graph TD
    Web[Web Portal (React)] --> API[Django REST API]
    Mobile[Driver App (Flutter)] --> API
    
    API --> DB[(PostgreSQL + PostGIS)]
    API --> RabbitMQ[RabbitMQ]
    
    subgraph "Async Workers (Celery)"
        RabbitMQ --> Matcher[Matching Engine]
        RabbitMQ --> Notifier[Notification Service]
        RabbitMQ --> Analytics[Impact Calculator]
    end
    
    Matcher --> Maps[Google Maps API]
    Analytics --> Tableau[Tableau / Google Data Studio]
```

## 🧩 Component Walkthrough

### 1. The Core API (Django)
*   **Role:** Handles user management, inventory listing, and transaction recording.
*   **Why Django?** The "batteries-included" philosophy (Admin panel, ORM, Auth) allowed us to build the MVP extremely fast. The Admin panel was crucial for internal ops teams to manage disputes.

### 2. Geospatial Database (PostGIS)
*   **Role:** Stores the precise location of every donor and charity.
*   **Querying:** We perform complex spatial queries like *"Find all charities within 10km of this donor that accept 'Refrigerated Goods'"*.
*   **Optimization:** Spatial indexing (R-Tree) ensures these queries run in milliseconds.

### 3. The Matching Engine (Celery Workers)
*   **Trigger:** When a donor posts a listing (e.g., "500 lbs of Apples").
*   **Process:**
    1.  Worker picks up the job.
    2.  Queries PostGIS for nearby eligible charities.
    3.  Filters based on "preferences" (e.g., some charities can't handle bulk pallets).
    4.  Calculates driving distance via Google Maps API.
    5.  Sends push notifications to the best matches.

### 4. Impact Calculator
*   **Role:** Converts "kg of food" into "CO2 saved" and "Meals provided".
*   **Logic:** Uses industry-standard conversion factors (e.g., 1kg beef = X kg CO2).
*   **Output:** Generates reports for municipal partners to justify funding.

## ⚖️ Key Trade-offs

### Real-time vs. Batch Matching
*   **Decision:** **Near Real-time (Async)**.
*   **Why:** Calculating routes for 50 potential charities takes time. We didn't want the Donor to wait for a spinner. We accept the listing immediately and notify matches within 1-2 minutes.

### Google Maps vs. OpenStreetMap
*   **Decision:** **Google Maps API**.
*   **Why:** Accuracy of business addresses and traffic data was critical for logistics. OpenStreetMap was cheaper but less reliable for "last mile" routing in rural BC.

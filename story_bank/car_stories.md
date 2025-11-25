# CAR Stories (Quick-Fire Examples)

## 1. Performance Optimization
*   **Context:** Openlane Vehicle Details Page took 3s to load due to legacy Oracle queries.
*   **Action:** Migrated read path to DynamoDB (NoSQL) populated by CDC events.
*   **Result:** Latency dropped to <200ms; user bounce rate decreased by 15%.

## 2. Technical Debt
*   **Context:** Rheumera backend had "Fat Controllers" with mixed business logic, making testing impossible.
*   **Action:** Refactored to Layered Architecture (Service/Repository pattern) over 2 sprints.
*   **Result:** Enabled 80% unit test coverage; regression bugs dropped to near zero.

## 3. Scalability
*   **Context:** FoodMesh matching algorithm timed out when finding charities for 50+ donors at once.
*   **Action:** Moved matching logic to async Celery workers and optimized PostGIS queries with spatial indexing.
*   **Result:** System handled 10x load; matching time dropped from minutes to seconds.

## 4. Cross-Team Collaboration
*   **Context:** Openlane frontend was blocked because 3 teams were fighting over the same React repo.
*   **Action:** Introduced StencilJs to build a shared "Widget Library" that teams could consume independently.
*   **Result:** Frontend build times dropped from 20m to 3m; teams deployed independently.

## 5. Production Incident
*   **Context:** Holland & Barrett search went down during a promo launch due to a bad config deployment.
*   **Action:** Immediately rolled back via CI/CD. Diagnosed the issue (infinite loop in promo rule) and added a "Circuit Breaker" to the code.
*   **Result:** Restored service in 5 mins. Prevented future outages from bad promo rules.

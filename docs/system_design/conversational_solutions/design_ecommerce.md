# Design Amazon (E-commerce)

## 1. Requirements

### Functional
- **Catalog**: Search/View products.
- **Cart**: Add items.
- **Checkout**: Buy items.
- **Orders**: View history.

### Non-Functional
- **Consistency**: Inventory must be accurate.
- **Availability**: Catalog is AP, Checkout is CP.

---

## 2. Architecture

### Services
1.  **Product Service**: Catalog management (Read-heavy).
2.  **Cart Service**: Redis-backed temporary storage.
3.  **Order Service**: Manages lifecycle.
4.  **Inventory Service**: Tracks stock.
5.  **Payment Service**: Gateway integration.

---

## 3. Deep Dive

### Inventory Management (Concurrency)
- **Problem**: Two users buy the last item simultaneously.
- **Solution**:
    - **Optimistic Locking**: `UPDATE stock SET count = count - 1 WHERE id = X AND count > 0`.
    - **Pessimistic Locking**: `SELECT * FOR UPDATE` (Slow).
    - **Reservation**: Reserve item for 10 mins when added to cart/checkout. Release if not paid.

### Database Choice
- **Catalog**: NoSQL (MongoDB/DynamoDB) for flexible schema (attributes vary by product).
- **Orders/Payments**: SQL (Postgres) for ACID transactions.

### Search
- Elasticsearch for full-text search and filtering.

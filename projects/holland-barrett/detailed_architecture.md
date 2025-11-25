# Detailed Architecture: E-commerce Search Migration

## 🏗️ High-Level Architecture
The goal was to decouple search from the transactional database (Oracle) to improve performance and scalability. We implemented an **Event-Driven Architecture** using Kafka to feed an ElasticSearch cluster.

```mermaid
graph TD
    User[User] --> CDN
    CDN --> API[Search API (.NET)]
    API --> ES[(AWS ElasticSearch)]
    
    subgraph "Indexing Pipeline"
        Oracle[(Oracle ERP)] --> Connector[CDC Connector]
        Connector --> Kafka[Kafka Topic: ProductUpdates]
        Kafka --> Indexer[Indexer Service (.NET)]
        Indexer --> ES
    end
    
    subgraph "Promo Engine"
        Marketer[Marketing Team] --> PromoUI[Promo UI (React)]
        PromoUI --> Parser[Antlr4 Parser]
        Parser --> RulesDB[(Rules DB)]
        API -.->|Apply Rules| RulesDB
    end
```

## 🧩 Component Walkthrough

### 1. Search API (.NET)
*   **Role:** Handles search queries from the frontend.
*   **Logic:** Translates user intent (e.g., "vegan protein powder") into complex ElasticSearch DSL queries (boosting "vegan" category, filtering by "in stock").
*   **Performance:** Implemented aggressive caching (Redis) for top 100 queries.

### 2. Indexing Pipeline (Kafka)
*   **Trigger:** When a product price or stock level changes in Oracle.
*   **Flow:**
    1.  Change detected -> Kafka message.
    2.  Indexer Service consumes message.
    3.  Enriches data (e.g., fetches product images).
    4.  Updates ElasticSearch document.
*   **Benefit:** Near real-time updates (inventory reflects on site within seconds) without hammering the Oracle DB.

### 3. Promo Engine (Antlr4)
*   **Problem:** Marketing wanted complex rules: *"Buy 2 of Brand X, get cheapest free, but only if total > $50"*.
*   **Solution:** We defined a Domain Specific Language (DSL).
*   **Parser:** Used **Antlr4** to parse this DSL into an Abstract Syntax Tree (AST) that the .NET backend could execute efficiently during checkout.

## ⚖️ Key Trade-offs

### ElasticSearch vs. Solr
*   **Decision:** **AWS ElasticSearch (Managed)**.
*   **Why:** Fully managed service meant zero operational overhead for our small team. Better integration with other AWS services (IAM, CloudWatch) compared to self-hosted Solr.

### Eventual Consistency
*   **Decision:** Search results might be 2-3 seconds behind Oracle.
*   **Why:** Acceptable for search. If a user clicks a product that *just* went out of stock, the "Add to Basket" check (which hits Oracle) will catch it. This trade-off allowed us to scale search traffic independently of the ERP.

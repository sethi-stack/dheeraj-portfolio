# Advanced Architecture: DDD, Hexagonal, CQRS, & Event Sourcing

This document explores advanced architectural patterns for building complex, scalable, and maintainable software systems.

## 1. Domain-Driven Design (DDD)

### Core Concept
DDD is an approach to software development that centers on the domain model (the business problem) rather than the technology.

### Strategic Design (High Level)
- **Ubiquitous Language**: A common language shared by developers and domain experts (e.g., "Order", "Checkout", "Shipment").
- **Bounded Context**: A distinct boundary within which a particular domain model is defined and applicable.
- **Context Mapping**: How different bounded contexts interact (e.g., Anti-Corruption Layer, Shared Kernel).

### Tactical Design (Implementation)
- **Entity**: An object defined by its identity (e.g., `User` with ID `123`).
- **Value Object**: An object defined by its attributes, immutable (e.g., `Address`, `Money`).
- **Aggregate**: A cluster of domain objects treated as a single unit. Access is only through the **Aggregate Root**.
- **Repository**: An abstraction for retrieving aggregates (looks like an in-memory collection).
- **Domain Service**: Logic that doesn't fit naturally into an entity or value object.

---

## 2. Hexagonal Architecture (Ports and Adapters)

### Core Concept
Isolating the core business logic from external concerns (UI, Database, APIs).

### Structure
- **Core (Center)**: Domain entities and use cases. No external dependencies.
- **Ports (Interfaces)**:
    - **Driving Ports (Inbound)**: Interfaces that the core exposes (e.g., `IOrderService`).
    - **Driven Ports (Outbound)**: Interfaces that the core needs (e.g., `IOrderRepository`).
- **Adapters (Implementations)**:
    - **Driving Adapters**: REST Controller, CLI, gRPC Handler (call the Core).
    - **Driven Adapters**: SQL Database, Email Service, Stripe Client (implement the Driven Ports).

### Benefits
- **Testability**: Can test core logic with mock adapters.
- **Flexibility**: Can swap database or UI without changing business rules.

---

## 3. CQRS (Command Query Responsibility Segregation)

### Core Concept
Splitting the application into two distinct sides: one for **Commands** (Writes) and one for **Queries** (Reads).

### The Problem
In traditional CRUD, the same model is used for reading and writing. This becomes complex when reads need different shapes of data than writes.

### The Solution
- **Command Side**: Handles `CreateOrder`, `UpdateUser`. Enforces business rules. Optimized for writes.
- **Query Side**: Handles `GetOrder`, `ListUsers`. Optimized for reads (can use denormalized views).

### Benefits
- **Independent Scaling**: Scale read and write workloads separately.
- **Optimized Schemas**: Write to normalized SQL, read from denormalized NoSQL/Elasticsearch.

---

## 4. Event Sourcing

### Core Concept
Instead of storing just the *current state* of an object, store the *sequence of events* that led to that state.

### How it Works
1.  **Event**: Something happened (`OrderCreated`, `ItemAdded`, `OrderShipped`).
2.  **Event Store**: An append-only log of all events.
3.  **Replay**: To get the current state of an Order, you replay all its events from the beginning.

### Benefits
- **Audit Trail**: Complete history of every change.
- **Time Travel**: Can reconstruct the state of the system at any point in time.
- **Debuggability**: easier to understand *why* the system is in a certain state.

### Challenges
- **Complexity**: Requires a paradigm shift.
- **Event Schema Evolution**: Handling changes to event structures over time.
- **Snapshots**: Needed for performance (don't replay 1 million events every time).

### Relationship with CQRS
Event Sourcing is often paired with CQRS. The Write side appends events. The Read side subscribes to events and updates a read-optimized database (Projections).

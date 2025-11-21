# Architectural Concepts

This document covers fundamental architectural styles and concepts that every Tech Lead should master.

## 1. Monolithic Architecture

### Overview
A single, unified unit where all components (UI, business logic, data access) are packaged and deployed together.

### Pros
- **Simplicity**: Easier to develop, test, and deploy initially.
- **Performance**: No network latency between components.
- **Consistency**: Easier to maintain data consistency (ACID transactions).

### Cons
- **Scalability**: Hard to scale individual components; must scale the entire application.
- **Flexibility**: Technology stack is locked in.
- **Resilience**: A bug in one module can bring down the entire system.
- **Deployment**: Large codebase means slower build and deployment times.

### When to Use
- Early-stage startups.
- Simple applications with low complexity.
- When team size is small (< 10 engineers).

---

## 2. Microservices Architecture

### Overview
An architectural style that structures an application as a collection of loosely coupled, independently deployable services.

### Pros
- **Scalability**: Scale specific services based on demand.
- **Flexibility**: Use different technologies for different services (Polyglot).
- **Resilience**: Failure in one service doesn't necessarily cascade.
- **Agility**: Smaller teams can own and deploy services independently.

### Cons
- **Complexity**: Distributed systems are inherently harder to manage (network failure, latency).
- **Data Consistency**: Requires eventual consistency (Saga pattern).
- **Operational Overhead**: Needs robust DevOps, monitoring, and orchestration (Kubernetes).

### When to Use
- Large, complex applications.
- Rapidly growing teams requiring autonomy.
- When different components have vastly different scaling requirements.

---

## 3. Service-Oriented Architecture (SOA)

### Overview
A precursor to microservices, focusing on reusable services communicating via an Enterprise Service Bus (ESB).

### Key Differences from Microservices
- **Scope**: SOA is often enterprise-wide; microservices are application-scoped.
- **Communication**: SOA uses smart pipes (ESB); microservices use smart endpoints and dumb pipes (REST/gRPC).
- **Granularity**: SOA services are often larger and less granular than microservices.

---

## 4. Serverless Architecture

### Overview
Building and running applications without managing infrastructure. Cloud providers (AWS Lambda, Azure Functions) execute code in response to events.

### Pros
- **Cost**: Pay only for execution time.
- **Scalability**: Auto-scales to zero and up to massive loads.
- **Maintenance**: No server management.

### Cons
- **Cold Starts**: Latency when a function is invoked after being idle.
- **Vendor Lock-in**: Tightly coupled to cloud provider.
- **Debugging**: Harder to reproduce local environments.

---

## 5. Event-Driven Architecture (EDA)

### Overview
Components communicate by producing and consuming events. Decouples producers from consumers.

### Components
- **Event Producer**: Generates an event.
- **Event Router/Broker**: Ingests and filters events (Kafka, RabbitMQ).
- **Event Consumer**: Reacts to the event.

### Pros
- **Decoupling**: Highly decoupled systems.
- **Asynchronous**: Non-blocking operations.
- **Scalability**: Consumers process events at their own pace.

### Cons
- **Complexity**: Harder to trace flow and debug.
- **Consistency**: Relying on eventual consistency.

---

## 6. Layered Architecture (N-Tier)

### Overview
Organizes code into horizontal layers, typically:
1.  **Presentation Layer**: UI/API.
2.  **Business Logic Layer**: Domain rules.
3.  **Data Access Layer**: Database interactions.

### Pros
- **Separation of Concerns**: Clear responsibilities.
- **Testability**: Layers can be tested in isolation.

### Cons
- **Performance**: Requests must pass through all layers (sinkhole anti-pattern).
- **Coupling**: Changes in the database layer often ripple up.

---

## 7. Clean Architecture (Onion / Hexagonal)

### Overview
Focuses on the domain model at the center, with dependencies pointing inward.

### Key Principles
- **Independent of Frameworks**: The core logic doesn't know about the web or database.
- **Testable**: Business rules can be tested without UI or DB.
- **Independent of UI/DB**: Can swap out external details easily.

*(See [DDD & Hexagonal](./ddd_hexagonal_cqrs_event_sourcing.md) for a deep dive)*

# Detailed Architecture: Rheumera Platform

## 🏗️ High-Level Architecture
Given the startup context and team size, we chose a **Modular Monolith** architecture hosted on AWS Elastic Beanstalk. This allowed for rapid iteration without the operational overhead of microservices.

```mermaid
graph TD
    Doctor[Doctor Portal (React)] --> CloudFront
    Patient[Patient App (Mobile/Web)] --> CloudFront
    
    CloudFront --> ALB[Application Load Balancer]
    ALB --> API[Spring Boot API (Elastic Beanstalk)]
    
    subgraph "Backend Services (Modular Monolith)"
        API --> Auth[Auth Service (JWT)]
        API --> Patient_Mod[Patient Module]
        API --> Metrics_Mod[Metrics Module]
        API --> AI_Service[AI Summarization Service]
    end
    
    API --> RDS[(PostgreSQL)]
    API --> S3[S3 (Medical Reports/Images)]
    
    AI_Service --> OpenAI[OpenAI API]
    
    subgraph "Background Jobs"
        Cron[Auto-TimeTracker Cron] --> API
    end
```

## 🧩 Component Walkthrough

### 1. Frontend (ReactJS + TypeScript)
*   **Doctor's Portal:** A complex dashboard visualizing patient trends over time.
*   **State Management:** Used React Query for server state and Context API for global UI state.
*   **Performance:** Implemented virtualization for large patient lists and lazy loading for heavy chart components.

### 2. Backend (Spring Boot)
*   **Architecture:** Layered architecture (Controller -> Service -> Repository).
*   **Refactoring:** I led the refactoring from "Fat Controllers" to a clean service layer using **SOLID principles**, making the code testable and easier to extend.
*   **Data Access:** Spring Data JPA / Hibernate for ORM, with Flyway for database migration versioning.

### 3. AI Integration Service
*   **Role:** Ingests raw patient logs (pain levels, medication adherence, side effects).
*   **Process:**
    1.  Sanitizes PII (HIPAA compliance).
    2.  Constructs a prompt for GPT-4 to summarize the "Clinical Narrative".
    3.  Uses Dall-E (experimental) to generate visual metaphors for patient progress (e.g., a "stormy" vs "sunny" week icon) for quick scanning.

## ⚖️ Key Trade-offs

### Monolith vs. Microservices
*   **Decision:** We stuck with a **Monolith**.
*   **Why:** With a small engineering team (<10), the overhead of distributed tracing, eventual consistency, and multiple deployments would have slowed us down. A well-structured monolith allowed us to share domain models and deploy atomically.

### SQL vs. NoSQL
*   **Decision:** **PostgreSQL** (Relational).
*   **Why:** Medical data is highly structured and relational (Patients have Appointments, which have Metrics). ACID transactions were non-negotiable for billing and medical records.

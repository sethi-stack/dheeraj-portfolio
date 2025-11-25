# Decisions & Trade-offs: Rheumera

## 1. AI Summarization: Build vs. Buy
**Decision:** We chose to use **OpenAI's API** rather than training our own model or using a simpler NLP library.
*   **Context:** Doctors needed summaries of complex JSON patient logs.
*   **Trade-off:**
    *   *Pros:* Immediate access to state-of-the-art reasoning; zero ML infrastructure to manage.
    *   *Cons:* Cost per token; data privacy concerns (mitigated by sanitizing PII before sending).
*   **Outcome:** We launched the feature in 2 weeks. Training a custom model would have taken months and required data we didn't have yet.

## 2. Refactoring to SOLID Principles
**Decision:** I paused feature development for 2 sprints to refactor the "Fat Controller" backend into a layered architecture.
*   **Context:** The codebase was becoming unmaintainable. Business logic was mixed with HTTP handling.
*   **Trade-off:**
    *   *Pros:* Unit testing became possible (we went from 0% to 80% coverage on core logic). New features took half the time to implement post-refactor.
    *   *Cons:* Delayed the "Patient Messaging" feature by a month.
*   **Outcome:** The "slow down to speed up" approach paid off. We onboarded 3 new developers who were able to contribute immediately because the code structure was standard and clean.

## 3. Elastic Beanstalk vs. Kubernetes
**Decision:** We chose **AWS Elastic Beanstalk**.
*   **Context:** We needed auto-scaling but had no dedicated DevOps engineer.
*   **Trade-off:**
    *   *Pros:* "Heroku-like" simplicity on AWS; managed updates; easy integration with RDS.
    *   *Cons:* Less control over the underlying EC2 instances compared to K8s.
*   **Outcome:** We avoided the "Kubernetes Tax." The team focused on Java/React code, not YAML configuration.

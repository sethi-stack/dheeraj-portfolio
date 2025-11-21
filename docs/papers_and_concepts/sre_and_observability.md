# SRE & Observability

Site Reliability Engineering (SRE) is what happens when you ask a software engineer to design an operations team.

## 1. The Golden Signals

Google's SRE book defines four critical metrics to monitor:

1.  **Latency**: The time it takes to service a request.
    - *Tip*: Distinguish between success latency and error latency.
2.  **Traffic**: A measure of how much demand is being placed on your system (e.g., RPS).
3.  **Errors**: The rate of requests that fail (e.g., HTTP 500s).
4.  **Saturation**: How "full" your service is (e.g., CPU usage, Memory, Disk I/O).

---

## 2. SLI, SLO, SLA

### SLI (Service Level Indicator)
- **Definition**: A quantitative measure of some aspect of the level of service that is provided.
- **Example**: "Request latency < 100ms".

### SLO (Service Level Objective)
- **Definition**: A target value or range of values for a service level that is measured by an SLI.
- **Example**: "99.9% of requests should have latency < 100ms".
- **Purpose**: Internal goal. If missed, halt feature development and focus on stability.

### SLA (Service Level Agreement)
- **Definition**: An explicit or implicit contract with your users that includes consequences of meeting (or missing) the SLOs.
- **Example**: "If uptime < 99.9%, we refund 10% of the monthly fee".
- **Purpose**: External contract.

---

## 3. Error Budgets

The allowed amount of unreliability.
- **Formula**: `100% - SLO Target = Error Budget`.
- **Example**: If SLO is 99.9%, Error Budget is 0.1%.
- **Usage**:
    - If you have budget left: Ship features, run experiments.
    - If budget is exhausted: Freeze deployments, fix bugs.

---

## 4. Incident Management

### Roles
- **Incident Commander (IC)**: In charge of the high-level state.
- **Ops Lead**: Manages operational changes.
- **Comms Lead**: Updates stakeholders.

### Process
1.  **Detect**: Alert fires.
2.  **Triage**: Assess severity (SEV1, SEV2).
3.  **Mitigate**: Stop the bleeding (Rollback, Load Shedding). *Root cause analysis comes later.*
4.  **Resolve**: Fix the issue.
5.  **Post-Mortem**: Blameless review of what happened and how to prevent it.

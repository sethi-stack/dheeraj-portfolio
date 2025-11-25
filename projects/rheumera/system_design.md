# System Design: Remote Therapeutic Monitoring (RTM)

## 1. Requirements

### Functional
*   **Patient Metrics:** Patients submit daily logs (pain, fatigue, meds).
*   **Doctor Dashboard:** Real-time view of patient status; alerts for "at-risk" trends.
*   **Billing Automation:** Automatically track time doctors spend reviewing data (CPT codes require specific durations).
*   **HIPAA Compliance:** All data must be encrypted at rest and in transit.

### Non-Functional
*   **Security:** Strict access controls (RBAC).
*   **Auditability:** Every read/write action by a doctor must be logged.
*   **Reliability:** No data loss allowed (medical records).

## 2. API Design (REST)

```java
// POST /api/v1/patients/{id}/metrics
Request: {
  "painLevel": 7,
  "fatigue": 5,
  "notes": "Feeling stiff in the morning"
}

// GET /api/v1/doctors/work-queue
Response: [
  {
    "patientId": "p_123",
    "riskScore": "HIGH",
    "lastReview": "2023-10-27T10:00:00Z",
    "unreadMetrics": 15
  },
  ...
]
```

## 3. Data Model (PostgreSQL)

### Tables
*   `Patients`: Core demographics.
*   `Metrics`: Time-series data (JSONB for flexibility).
*   `TimeLogs`: Tracks doctor activity. `(doctor_id, patient_id, duration_seconds, timestamp)`.
*   `AuditLogs`: Immutable record of all access.

## 4. Key Design Challenge: Auto-TimeTracker

**Problem:** Doctors forget to log time. RTM billing requires accurate "time spent reviewing data" logs.
**Solution:**
1.  **Frontend:** A "Focus Listener" tracks active window time when a specific patient's data is open.
2.  **Heartbeat:** The frontend sends a heartbeat to the backend every 30 seconds (`POST /api/heartbeat`).
3.  **Backend:** Aggregates heartbeats into `TimeLog` entries.
4.  **Edge Case:** Handling "idle" time (doctor walks away). Implemented an idle timeout in the frontend to stop the heartbeat.

## 5. Security Architecture
*   **Encryption:** AWS KMS for database encryption.
*   **Access:** Spring Security with JWT. Role-Based Access Control (RBAC) ensures a doctor can only see patients assigned to their clinic.
*   **Audit:** A Spring AOP (Aspect Oriented Programming) aspect intercepts every controller call to log the user, action, and resource ID to the `AuditLogs` table.

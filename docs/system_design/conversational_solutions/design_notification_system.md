# Design a Notification System

## 1. Requirements

### Functional
- **Send**: Support Email, SMS, Push (iOS/Android).
- **Templates**: Support dynamic content.
- **Preferences**: Users can opt-out or choose channels.

### Non-Functional
- **Reliability**: Don't lose notifications.
- **Scale**: Millions of notifications per day.
- **Rate Limiting**: Don't spam users.

---

## 2. High-Level Design

### Components
1.  **Notification Service**: API entry point.
2.  **User Preferences DB**: Stores opt-ins/outs.
3.  **Message Queues**: Decouple ingestion from sending. (Kafka/RabbitMQ).
    - Separate queues for Email, SMS, Push.
4.  **Workers**: Consume queues and call 3rd party APIs.
5.  **3rd Party Providers**:
    - **Email**: SendGrid, SES.
    - **SMS**: Twilio.
    - **Push**: APNS (Apple), FCM (Google).
6.  **Logs/Analytics**: Track delivery status.

---

## 3. Deep Dive

### Reliability (Retry Mechanism)
- If a 3rd party fails, don't drop the message.
- Put it in a **Retry Queue** with exponential backoff.
- After N attempts, move to **Dead Letter Queue (DLQ)** for manual inspection.

### Deduplication
- Prevent sending the same alert twice.
- Use a Redis key `notification_id` with a TTL.

### Rate Limiting
- Protect users from spam.
- Check "Last Sent Timestamp" in Redis.
- If `now - last_sent < limit`, drop or delay.

### Template Engine
- Store templates in DB/S3.
- Workers fetch template and replace placeholders (`{{name}}`) with actual data.

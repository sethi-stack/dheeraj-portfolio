# Design Ticketmaster

## 1. Requirements

### Functional
- **View Events**: Search concerts.
- **Book Tickets**: Select seats and pay.

### Non-Functional
- **Fairness**: First come, first served.
- **Burst Traffic**: Handle millions of users when Taylor Swift tickets drop.
- **Consistency**: No double booking.

---

## 2. Architecture

### Components
1.  **Waiting Room (Queue)**: Rate limits users entering the booking flow.
2.  **Booking Service**: Handles seat selection.
3.  **Payment Service**.

---

## 3. Deep Dive

### Concurrency Control
- **Active Reservation**:
    - User selects seat -> Redis Key `seat_123` set to `RESERVED` with TTL (5 mins).
    - If payment succeeds -> Update SQL DB to `SOLD`.
    - If TTL expires -> Redis Key deleted, seat becomes `AVAILABLE`.

### Handling Bursts (The Queue)
- Don't let 1M users hit the DB.
- Put them in a FIFO queue (Kafka/Redis).
- Only allow top N users to enter the "Booking State".
- Display "You are number 50,000 in line".

### Database
- **SQL**: Mandatory for transactions.
- **Sharding**: Shard by `event_id`.

# STAR Stories (Behavioral Interview Bank)

## 1. Conflict Resolution: The "Monolith vs. Microservices" Debate
**Competency:** Technical Leadership, Negotiation
*   **Situation:** At Rheumera, a junior engineer proposed rewriting the entire backend as microservices from Day 1 to be "future-proof." I knew our team of 4 couldn't handle the operational complexity.
*   **Task:** I needed to steer the team toward a pragmatic architecture without discouraging their enthusiasm for modern tech.
*   **Action:** I organized a "Design Review" session. Instead of saying "no," I asked the engineer to map out the deployment pipeline and local dev setup for 5 microservices. We then calculated the "time to first feature."
*   **Result:** The engineer realized the overhead was too high. We agreed on a **Modular Monolith** approach (Spring Boot modules) that enforced boundaries but deployed as a single unit. This allowed us to ship the MVP in 3 months instead of 6.

## 2. Innovation: AI Moderation at Openlane
**Competency:** Innovation, Problem Solving
*   **Situation:** The Q&A section on vehicle pages was a "Wild West." Buyers were posting phone numbers (bypassing fees) and profanity. Operations team was overwhelmed manually reviewing 1000s of comments.
*   **Task:** We needed an automated solution that was smarter than a simple keyword filter (which missed context like "call me at five five five...").
*   **Action:** I prototyped a solution using OpenAI's API. I designed an async pipeline (Kinesis -> Lambda) to avoid blocking the UI. I also implemented a "fail-safe" where low-confidence AI scores were routed to humans.
*   **Result:** The system auto-moderated 95% of comments. Profanity/PII leaks dropped by 20%. The Ops team shifted from "janitors" to "arbitrators," saving $50k/year in manual labor.

## 3. Problem Solving: The 100TB Storage Crisis
**Competency:** Technical Problem Solving, Cost Optimization
*   **Situation:** At Openlane, the Classic Integration Service needed to map millions of Oracle IDs to NewWave UUIDs. The initial design stored these mappings in DynamoDB. Within weeks, the table ballooned to **100,000 GB (100TB)**, costing unsustainable amounts and degrading query performance.
*   **Task:** Find a solution that eliminates storage without losing the ability to map IDs correctly.
*   **Action:** I proposed and implemented a "Determinable UUID" system. Instead of storing mappings, I designed an algorithm that generates the **same UUID every time** from a given Oracle ID using a hash-based approach (SHA-256 + UUID v5). This meant zero storage—compute the UUID on-the-fly.
*   **Result:** **Eliminated 100TB of storage overnight**, saving an estimated **$120k/year** in AWS DynamoDB costs. Query latency improved because there was no database lookup. The solution became the standard for all ID mapping across the platform.

## 4. Delivering Under Pressure: 2-Week Android App Sprint
**Competency:** Execution Under Tight Deadlines, Mobile Engineering
*   **Situation:** Openlane's Marketing team committed to launching an Android app in **2 weeks**. The app was a WebView wrapper, but users expected a native experience. The existing web platform was desktop-first and incompatible with mobile webviews.
*   **Task:** I was assigned as the lead engineer to make the platform compatible and deliver a native-like experience.
*   **Action:** I worked 10-hour days for 2 weeks, delivering **10+ features**: native navigation tabs, drawer menus, bottom sheet modals, auth token refresh in webview, SSE reconnection logic for background app states, viewport optimizations, and touch gesture enhancements.
*   **Result:** The app launched **flawlessly** with **zero critical bugs**. It received a **4.7★ rating** on Google Play. User reviews specifically praised the "native feel," and the app enabled mobile-first auction participation, directly increasing bid volume.

## 5. Delivering Under Pressure: Brexit Compliance
**Competency:** Execution, Adaptability
*   **Situation:** At Holland & Barrett, new Brexit regulations required us to split our UK and EU customer data into separate databases by a hard legal deadline. Missing it meant massive fines.
*   **Task:** I had to re-architect the data layer of a legacy monolith without rewriting the entire application.
*   **Action:** I implemented a "Tenant Context" middleware pattern. I modified the ORM configuration to dynamically switch database connections based on the incoming request's region header. I led the "War Room" during the cutover.
*   **Result:** We launched the separated sites 2 days before the deadline. The solution was so stable it became the standard for future international expansions.

## 4. Mentorship: From Junior to Owner
**Competency:** People Development
*   **Situation:** A junior dev at Rheumera was struggling with confidence. They would pick simple tickets and avoid complex features.
*   **Task:** I wanted to help them grow into a Senior Engineer who could own a full vertical.
*   **Action:** I assigned them the "Patient Messaging" module—a complex feature. I set up daily 15-min "unblocking" sessions where I didn't give answers, but asked guiding questions ("How would you test this?", "What if the network fails?"). I also let them lead the demo to the CEO.
*   **Result:** They successfully delivered the module. 6 months later, they were promoted to Senior Engineer and were mentoring others.

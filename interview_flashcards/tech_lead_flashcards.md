# Tech Lead Interview Flashcards (Expanded)

> **How to Use:** Review these before interviews. Each card is designed for 30-60 second responses.

---

## 🏗️ Architecture & Technical Patterns

### Q: Monolith vs. Microservices?
*   **Monolith:** Simple deployment, easy debugging, no network latency. Hard to scale teams, single point of failure.
*   **Microservices:** Independent scaling, technology agnostic, fault isolation. Complex ops, distributed tracing required, eventual consistency.
*   **My Stance:** Start with a **Modular Monolith**. Split only when organizational scaling (too many devs on one repo) or distinct scaling needs (video processing vs. user profile) demand it.
*   **Example:** At Rheumera (4-person team), I advocated for modular monolith. At Openlane (100+ engineers), microservices made sense.

### Q: Event-Driven Architecture (EDA)?
*   **Concept:** Services communicate by emitting events ("OrderPlaced") rather than direct calls.
*   **Pros:** Decoupling, scalability, easy to add new consumers (e.g., Analytics).
*   **Cons:** Complexity, eventual consistency, harder to debug flow.
*   **Tools:** Kafka, RabbitMQ, SNS/SQS.
*   **Example:** Openlane Classic Integration—millions of OGG events → 100+ Kinesis topics.

### Q: CAP Theorem?
*   **Consistency:** Every read receives the most recent write.
*   **Availability:** Every request receives a (non-error) response.
*   **Partition Tolerance:** System continues to operate despite network failures.
*   **Reality:** You pick CP (strong consistency, potential downtime) or AP (always up, potential stale data). P is mandatory in distributed systems.

### Q: How do you ensure Five 9s (99.999%) uptime?
*   **My Experience:** Openlane IAM service achieved Five 9s.
*   **How:**
    1. **Redundancy:** Multi-AZ deployment, load balancers
    2. **Monitoring:** Real-time alerts (CloudWatch, Datadog)
    3. **Circuit Breakers:** Fail fast, don't cascade failures
    4. **Chaos Engineering:** Intentionally break things in staging
    5. **Runbooks:** On-call engineers have step-by-step guides
*   **Result:** <5 minutes downtime per year

---

## 💼 Business Impact & ROI

### Q: How do you prioritize technical debt vs. new features?
*   **Framework:** ROI + Risk
*   **Example:** At Openlane, AWS SDK v2 → v3 migration wasn't urgent, but I did it **6 months early** because:
    - **Cost:** 2 weeks of work
    - **Risk:** If we waited until deadline, we'd rush and introduce bugs
    - **Gain:** 20% performance improvement + avoided fire drill
*   **Result:** Smooth migration, no production issues

### Q: Tell me about a time you saved the company money.
*   **$500K AWS Hack (FoodMesh):** Solo recovery, implemented security, convinced AWS to cancel charges
*   **$120K/year (Openlane):** Eliminated 100TB storage with Determinable UUIDs
*   **$50K/year (Openlane):** AI moderation reduced manual ops costs
*   **Total:** $7M+ across all projects

### Q: How do you measure success?
*   **Technical:** Latency, uptime, test coverage
*   **Business:** Revenue impact, cost savings, conversion rates
*   **Team:** Engineers mentored to promotion, knowledge sharing sessions held
*   **Example:** OneSearch (H&B) = 95% latency reduction + 15% conversion uplift. Both metrics mattered.

---

## 🔥 Crisis Management & Pressure

### Q: Describe your worst production incident.
*   **The $500K AWS Hack (FoodMesh):**
    - **Situation:** AWS account hacked, $500K charges in 2 days, I was the only tech person
    - **Response:** Worked with AWS consultants, identified every hacker resource, implemented security hardening
    - **Outcome:** AWS canceled charges, saved company from bankruptcy
*   **What I Learned:** Documentation is everything when dealing with stakeholders. Staying calm under existential pressure is a skill.

### Q: How do you handle being the only technical person?
*   **FoodMesh Example:** Solo during $500K crisis
*   **Approach:**
    1. **Make decisions confidently** (no consensus available)
    2. **Document meticulously** (for accountability)
    3. **Leverage external experts** (AWS consultants)
*   **Lesson:** Solo ownership is where you grow the fastest

### Q: Tell me about working under tight deadlines.
*   **2-Week Android Sprint (Openlane):**
    - **Challenge:** Marketing committed to app launch, platform wasn't webview-ready
    - **My Role:** Lead engineer, delivered 10+ features (native nav, auth, SSE handling)
    - **Result:** Flawless launch, 4.7★ rating, zero critical bugs
*   **Approach:** Prioritize ruthlessly, communicate trade-offs, ship with quality

---

## 🤖 AI & Innovation

### Q: What's your experience with AI/LLMs?
*   **Content Moderation (Openlane):** Gemini API to filter Q&A for contact-sharing/profanity
    - **Prompt Engineering:** Caught edge cases like "call me at five five five..."
    - **Impact:** 20% reduction in arbitration, $50k savings
*   **Medical Summarization (Rheumera):** GPT-4 to summarize patient logs
    - **Impact:** 50% faster physician review
*   **Practical AI, Not Research:** I focus on business value, not model training

### Q: Tell me about a self-initiated project.
*   **AI Moderation (Openlane):**
    - **Not on roadmap.** I saw the problem, built POC in 2 days, showed 95% accuracy
    - **Got it approved** by framing as risk mitigation (revenue leakage, arbitration costs)
    - **Impact:** VP mentioned it in All-Hands as "proactive innovation"
*   **Pattern:** Identify pain → Propose solution → Deliver

### Q: How do you stay innovative while shipping fast?
*   **Promo DSL (H&B):** Instead of "just make promos faster," I designed a **Domain-Specific Language**
    - **Creative:** Antlr4 grammar + visual UI
    - **Fast:** Built in 3 weeks
    - **Impact:** $2M revenue, adopted company-wide
*   **Philosophy:** Innovation ≠ slow. The best solutions are often the simplest.

---

## 👥 Leadership & Mentorship

### Q: How do you handle a low performer?
*   **Diagnose:** Is it skill (can't do it) or will (won't do it)?
*   **Action:**
    *   *Skill:* Pair programming, smaller tasks, training.
    *   *Will:* Clear expectations, honest feedback, Performance Improvement Plan (PIP) if needed.
*   **Example (Rheumera):** Junior engineer struggled with Spring Boot. Paired 2 hours/day for 2 weeks, they ramped up and eventually got promoted.
*   **Goal:** "Coach up or coach out."

### Q: How do you influence without authority?
*   **Build Trust:** Deliver on your own promises first.
*   **Explain "Why":** Connect technical decisions to business value.
*   **Listen:** Understand the other team's constraints before proposing a solution.
*   **Example:** At H&B, I was pulled across 4 teams because I framed solutions in business terms (Brexit compliance, revenue from promos).

### Q: Describe your mentorship style.
*   **Not "Telling"—Teaching How to Think:**
    - Code reviews: "Why did you choose this pattern?"
    - Architecture sessions: "What are the trade-offs?"
    - SOLID principles: Live refactoring, not just theory
*   **Example:** At Rheumera, 2 engineers promoted after I mentored them. At H&B, led brown-bag sessions teaching SOLID.
*   **Result:** Engineers I've mentored become mentors themselves (force multiplier)

---

## 🛡️ Security & Compliance

### Q: What's your security experience?
*   **$500K AWS Hack Recovery (FoodMesh):**
    - Implemented: IAM least-privilege, MFA, CloudTrail logging, AWS Config rules, IP whitelisting, VPC isolation
    - **Production-grade security from scratch**
*   **IAM Service (Openlane):** Multi-token authentication (Okta, JWT, Service tokens), Five 9s uptime
*   **HIPAA Compliance (Rheumera):** Audit logging, encryption at rest/transit

### Q: How do you handle compliance requirements?
*   **Brexit Example (H&B):**
    - **Challenge:** Regulations changing weekly, hard deadlines
    - **Approach:** Flexible tenant architecture (UK/EU indexes), daily standups with Legal
    - **Result:** Zero violations over 2 years
*   **Philosophy:** Build for **configurability**, not hard-coded rules. Requirements will change.

---

## 📐 System Design Cheat Sheet

### Latency Numbers (Approx)
*   L1 Cache: 1 ns
*   RAM: 100 ns
*   SSD Read: 100 us (microseconds)
*   Network Round Trip (Same DC): 500 us
*   Disk Seek: 10 ms
*   Packet CA→Netherlands: 150 ms

### Back-of-Envelope Math
*   1 Million req/day ≈ 12 req/sec
*   1 GB = 10^9 bytes
*   32-bit integer = 4 bytes
*   **Rule of Thumb:** If data fits in memory (RAM), keep it there (Redis). If it fits on one disk, use a relational DB. If it's petabytes, use NoSQL/Blob storage.

### Scaling Strategies I've Used
*   **Vertical:** Bigger EC2 instance (quick fix, hits limits)
*   **Horizontal:** More replicas (Openlane: 1 → 5 ElasticSearch replicas during Black Friday)
*   **Caching:** Redis for top 100 queries (OneSearch at H&B)
*   **Async Processing:** Offload to background jobs (Celery, Lambda)

---

## 💬 Story-Based Quick Responses (30 seconds)

### "Tell me about a technical challenge."
> "At Openlane, I had to eliminate 100TB of storage. The ID mapping table exploded because we were storing Oracle ID → UUID pairs. I redesigned it using **Determinable UUIDs**—hash-based, same input = same UUID every time. Eliminated storage completely, saved $120K/year."

### "Walk me through a disagreement with a colleague."
> "At Rheumera, a junior engineer wanted to rewrite everything as microservices from Day 1. I knew our 4-person team couldn't handle the complexity. I proposed a **modular monolith**—we agreed to design with future extraction in mind, but ship as one service. Six months later, he thanked me because we'd have drowned in Kubernetes complexity."

### "How do you make technical trade-offs?"
> "For AI moderation at Openlane, I chose **async processing** over real-time validation. Trade-off: users see their comment immediately (optimistic UI), but it might get removed 3 seconds later if flagged. I picked **user experience over technical purity**. The alternative—blocking users for 5 seconds—would have felt broken."

### "Describe working cross-functionally."
> "During Brexit at H&B, I worked with Legal, Compliance, and Product daily. Legal would say, 'These products can't be sold in the EU.' I'd translate that to: 'Filter out SKUs XYZ from the `products_eu` index.' The key was **speaking their language**—they didn't care about ElasticSearch; they cared about compliance deadlines."

### "How do you handle ambiguity?"
> "Brexit was 2 years of ambiguity—regulations changed weekly. My approach: **build flexibility early**. The tenant-aware architecture meant when Legal said 'New rule: UK-only certificates,' it was a **config change**, not a code rewrite. I also over-communicated—daily standups meant no surprises."

---

## 🎯 Role-Specific Quick Pitches

### For Staff Engineer Roles:
> "I've operated at Staff level: architected Five 9s systems (Openlane IAM), influenced 10-15 teams without authority, delivered $7M+ in business impact, and recovered from a $500K security crisis solo. I bring technical depth + business acumen + cross-functional leadership."

### For Tech Lead Roles:
> "I've led teams (Rheumera: mentored 2 to promotion), led projects (H&B OneSearch: TDD champion), and led initiatives (Openlane AI moderation: self-initiated, VP-recognized). I balance delivery with team growth."

### For Security-Focused Roles:
> "I've implemented production-grade security from scratch (FoodMesh: IAM, CloudTrail, Config post-hack), architected multi-token auth with Five 9s (Openlane IAM), and ensured HIPAA compliance (Rheumera audit logs). Security is baked into everything I build."

### For AI/ML Roles:
> "I've shipped AI to production: Gemini moderation (20% arbitration reduction), GPT-4 summarization (50% faster reviews). I focus on **business value**, not just tech—prompt engineering, edge cases, fallback strategies. Practical AI, not research."

### For Startup Roles:
> "I've been **the only tech person** (FoodMesh: $500K crisis, full-stack platform). I've led at early-stage startups (Rheumera: architected from scratch, 60k patients). I thrive in ambiguity, wear all hats (backend/frontend/mobile/DevOps), and ship fast without sacrificing quality."

---

## 📝 Meta-Tips for Using These Flashcards

1. **Practice Out Loud:** Don't just read—say the answers. Muscle memory matters.
2. **Tailor to the Role:** If interviewing for security roles, drill security cards 3x more.
3. **Use Real Numbers:** "$500K," "100TB," "20%"—numbers stick in interviewers' minds.
4. **Connect to Company:** Research their tech stack. If they use Kafka, mention your Kafka experience at Openlane.
5. **STAR Format When Needed:** If they say "Tell me about a time..." expand your 30-second answer into full STAR.

**Review these 24 hours before interviews. Confidence comes from preparation.** 🚀

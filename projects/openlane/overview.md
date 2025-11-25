# Project Overview: Openlane Inc. (B2B Car Auction Marketplace)

## 📝 Summary
Openlane is North America's leading B2B digital marketplace for wholesale used vehicles. Over **2+ years** (Feb 2023 – Present), I evolved from a **Node.js Backend Engineer** to a **Full-Stack Engineer**, navigating two major platform migrations (NewWave → Futurestack) and delivering critical infrastructure that powers millions of auction transactions. I architected core microservices handling **millions of events daily**, led mobile app UX transformations, and pioneered **AI-driven moderation** that reduced business risk.

## 🎯 The Challenge: Triple Platform Evolution
*   **Legacy Oracle System ("Classic"):** A 15-year-old monolith struggling with scale and feature velocity.
*   **NewWave Platform (Lambda/Node.js):** First modernization attempt—event-driven microservices on AWS.
*   **Futurestack Platform (.NET/Pulsar):** Current architecture—decommissioning NewWave, migrating to .NET services and Pulsar messaging.

My role spanned **all three systems simultaneously**, ensuring seamless transitions without downtime.

## 💼 Business Impact (Quantified)
*   **Five 9s Availability (99.999%):** Architected IAM and Classic Integration services meeting stringent SLAs for mission-critical auth and data sync.
*   **100TB+ Storage Savings:** Solved a 100,000 GB ID mapping problem by designing a Determinable UUID system, eliminating storage costs.
*   **20% Reduction in Arbitration Cases:** AI moderation (self-initiated) blocked contact sharing and profanity in Q&A, saving $50k/year in operational costs.
*   **Flawless Android App Launch:** Led the 2-week mobile webview compatibility sprint (10+ features), enabling the company's first native-like Android app experience.
*   **Gallery UX Transformation:** Turned "hundreds of user complaints" into a "great experience" in 2 days for mobile users.

## 🔑 Key Technologies
*   **Backend Evolution:** Node.js (Lambda) → .NET Core, AWS SDK v2 → v3 (proactive migration before mandatory deadline)
*   **Frontend:** React, Svelte, StencilJS (Micro Frontends, Pattern/Ignite UI Library)
*   **Messaging:** Kinesis, SQS, Pulsar (event streaming architecture)
*   **Data:** Oracle GoldenGate (OGG), Protobuf schemas, DynamoDB
*   **Auth:** Multi-token IAM (Okta, NewWave, Service Tokens)
*   **AI:** Gemini API (content moderation), MCP (Model Context Protocol)
*   **DevOps:** Jenkins, ArgoCD, Azure Pipelines, Datadog, Splunk, Honeycomb

## 🚀 My Journey at Openlane

### Phase 1: NewWave Platform (Node.js Microservices) — Feb 2023-2024
**Role:** Backend Engineer → Platform Architect

#### Core Infrastructure Ownership
1.  **IAM Service (Identity & Access Management)**
    *   Centralized authentication across 3 legacy systems (Classic, NewWave, Futurestack).
    *   Supported **multiple token types:** Okta OAuth, NewWave JWT, Service-to-Service tokens.
    *   **Challenge:** Token validation logic for 3 different issuers with varying claims structures.
    *   **Impact:** Single source of truth for auth, enabling unified access control.

2.  **Classic Integration Service** ⭐ *Most Critical*
    *   **Problem:** Oracle GoldenGate (OGG) emits millions of change events daily. NewWave services needed this data in real-time across **100+ Kinesis topics**.
    *   **Architecture:** Lambda-based consumer → Transform OGG events → Route to 100+ Kinesis/SQS streams (SQS for guaranteed ordering).
    *   **The 100TB ID Mapping Challenge:**
        *   Initial design stored Oracle ID → NewWave UUID mappings in DynamoDB.
        *   This **exploded to 100,000 GB** of storage.
        *   **Solution:** Designed a **Determinable UUID algorithm** (hash-based from Oracle ID). Eliminated storage completely. Saved massive AWS costs.
    *   **Observability:** Deep integration with Datadog/Splunk for event replay and missing data debugging.

3.  **NewWave SDK (Platform Libraries)**
    *   **Role:** Architect and sole maintainer.
    *   **Challenge:** 15+ microservices had duplicated boilerplate (HTTP handlers, logging, observers).
    *   **Solution:** Built a **shared SDK** enforcing standards.
    *   **Migration:** Legacy SDK used Angular/RxJS patterns. I **migrated to async/await**, added structured logging, and improved auth methods.
    *   **Adoption:** All NewWave services implemented the SDK, reducing onboarding time for new services from days to hours.

4.  **Protobuf Schema Management**
    *   Maintained central `.proto` schemas for event contracts.
    *   Ensured consistency between OGG events and Kinesis consumers.

5.  **AWS SDK v2 → v3 Migration**
    *   Proactively migrated all services **before AWS made v2 deprecated**, avoiding last-minute scrambles.

6.  **Jenkins CI/CD Pipelines**
    *   Maintained deployment pipelines for Lambda functions and shared libraries.

### Phase 2: Futurestack Platform (Full-Stack Engineer) — 2024-Present
**Role:** Full-Stack Engineer (Platform Team)

#### Backend Transition
*   **Lambda → .NET Services:** Migrated from AWS Lambda to containerized .NET microservices.
*   **Kinesis → Pulsar:** Led adoption of Apache Pulsar for multi-tenancy and better ordering guarantees.
*   **Auth Centralization:** Consolidated all tokens to **Okta-only** (simplified IAM).
*   **dot-shared-library:** Contributed to .NET shared library (equivalent of NewWave SDK).

#### Frontend Revolution (Full-Stack Transition)
*   **Micro Frontends:** Openlane uses a federated architecture where 10+ teams own separate UI modules.
*   **Pattern/Ignite UI Library (StencilJS):**
    *   **Role:** Core contributor to the company-wide design system.
    *   Designed domain-specific components (e.g., Auction Countdown Timer, Bid Button).
    *   Used by **all micro frontends** across 10 teams and private-label products.

#### Vehicle Details Page (VDP) — *The Crown Jewel*
The VDP is where **all bidding happens**. Every element is a conversion optimization opportunity.

**My Contributions:**
1.  **Gallery Component (Mobile UX Crisis → Hero Moment):**
    *   **Problem:** Hundreds of user complaints about slow, clunky mobile gallery.
    *   **Action:** In **2 days**, I redesigned the image viewer with lazy loading, pinch-to-zoom, and swipe gestures.
    *   **Result:** User sentiment flipped from "frustrating" to "great experience."

2.  **Sticky Footer, Disclosures, Q&A Section:**
    *   Built sticky CTAs (Call-to-Action buttons) to keep bidding accessible.
    *   Developed disclosure widgets for legal/compliance info.

3.  **Retail VDP Self-Inspect Feature:**
    *   **Context:** Openlane was shutting down a legacy system where dealers self-published vehicles.
    *   **Action:** Built the replacement feature **from scratch** (upload flow, image processing, validation).
    *   **Impact:** Seamless migration with zero customer churn.

#### The 2-Week Android App Sprint ⭐ *Career Highlight*
**Challenge:** Launch Openlane's first Android app in 2 weeks. The app is a **WebView wrapper**, but must feel **native**.

**My Role:** Lead engineer for webview compatibility.

**Delivered 10+ Features:**
1.  **Core Mobile Shell:**
    *   Native-like navigation tabs (bottom bar).
    *   Drawer menus, Bottom Sheet modals.
2.  **Auth Token Refresh:** Handled JWT expiry in webview context.
3.  **SSE (Server-Sent Events) Background Handling:**
    *   **Problem:** SSE connections dropped when the app went to background.
    *   **Solution:** Implemented reconnection logic with event replay.
4.  **Viewport Adjustments, Touch Optimizations, Performance Tuning.**

**Result:** The Android app launched **flawlessly**. No major bugs. User reviews praised the "native feel."

#### AI-Driven Q&A Moderation (Self-Initiated) ⭐
**Problem:** The Q&A section was abused for:
*   Contact sharing (buyers/sellers bypassing platform fees).
*   Arbitration attempts (claims about undisclosed damage).
*   Profanity.

**My Initiative:**
*   Proposed using **Gemini AI** to filter these risks.
*   Built the integration as part of a .NET service (async pipeline: user posts → AI check → publish or flag).
*   **Prompt Engineering:** Designed prompts to catch edge cases like "call me at five five five..." (obfuscated phone numbers).

**Impact:**
*   **20% reduction** in arbitration cases.
*   **$50k/year savings** in manual moderation labor.
*   **Appreciation from top management** and Product team.

#### Innovation: MCP Server for Azure
*   Built a **Model Context Protocol (MCP)** server for Azure integration.
*   Demonstrated in company "Weekly Wins" session.
*   **Impact:** Improved task management productivity for the team.

## 🏆 Cross-Functional Leadership
*   Collaborated across **10-15 teams** (SRE, Product, QA, Platform, Private Labels).
*   Acted as a **bridge engineer** between backend and frontend teams during the Futurestack migration.

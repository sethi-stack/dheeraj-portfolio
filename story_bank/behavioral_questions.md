# Behavioral Questions & Answers

## 1. Tell me about a time you failed.
*   **Story:** The "Infinite Loop" Promo at Holland & Barrett.
*   **What Happened:** I deployed a code change that caused a production outage because I didn't test a specific edge case in the recursion logic.
*   **The Lesson:** I learned that unit tests aren't enough for complex logic engines. I introduced "Property-Based Testing" (Fuzzing) to throw random inputs at the engine, which would have caught this. I also learned the importance of "Circuit Breakers" to isolate failures.

## 2. Tell me about a time you disagreed with a manager/PM.
*   **Story:** The "AI Moderation" feature at Openlane.
*   **The Disagreement:** The PM wanted to launch a synchronous AI check that blocked the user from posting until the AI responded (3-5s). They feared "bad content" being visible for even a second.
*   **My Stance:** I argued that a 5s delay would kill engagement. Users would think the app froze.
*   **The Resolution:** I proposed a compromise: "Optimistic UI." We show the post immediately to the user, but hide it from *others* until the async check passes (usually 2s).
*   **Outcome:** The PM agreed. We got the best of both worlds: snappy UX and safety.

## 3. How do you handle tight deadlines?
*   **Story:** Brexit Compliance at Holland & Barrett.
*   **Approach:**
    1.  **Ruthless Prioritization:** We cut all "nice-to-have" features (like the new recommendation engine) to focus solely on the legal compliance requirement (data separation).
    2.  **Communication:** I sent daily "Red/Amber/Green" status updates to stakeholders so there were no surprises.
    3.  **Simplification:** Instead of a full database rewrite, we used the "Tenant Context" middleware pattern to achieve the goal with 80% less code.

## 4. How do you prioritize technical debt?
*   **Philosophy:** I treat tech debt like financial debt. Some leverage is good (to ship fast), but too much bankrupts you.
*   **Approach:** I advocate for the "Boy Scout Rule" (leave code cleaner than you found it). For larger refactors (like the Rheumera backend), I tie them to business value. "We can't build the Patient Messaging feature until we refactor the User Service." This speaks the PM's language.

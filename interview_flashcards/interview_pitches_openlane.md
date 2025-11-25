# Interview Pitches: Openlane Experience (Conversational)

## 🎯 The "Tell Me About Yourself / Your Recent Experience" Pitch

### Version 1: The Journey Narrative (2-3 minutes)
*Use this for: "Walk me through your resume" or "Tell me about your recent experience"*

"Sure! So for the past two years, I've been at Openlane—it's the leading B2B marketplace for wholesale vehicles in North America. What's been really interesting is that I've had this unique journey from backend engineer to full-stack, and I've actually worked across **three different platform generations** simultaneously.

When I joined, they were migrating from a 15-year-old Oracle monolith to microservices. I started on the NewWave platform—that's their Node.js, Lambda-based architecture—and I owned some pretty critical infrastructure. The most impactful was probably the **Classic Integration Service**, which is the bridge between the old Oracle system and the new world. It processes **millions of events per day** from Oracle GoldenGate and routes them to over 100 Kinesis topics.

Here's the thing—we hit this massive scaling problem. The initial design was storing ID mappings in DynamoDB, and it **exploded to 100 terabytes** of storage. I'm talking about costs that were becoming unsustainable. So I designed what we call a 'Determinable UUID' system—basically, instead of storing mappings, we generate the same UUID every time from the Oracle ID using a hash function. **Eliminated 100TB of storage overnight**, saved about **$120k a year** in AWS costs.

Then the company started the next migration—to what they call Futurestack, which is .NET-based with Pulsar instead of Kinesis. That's when I transitioned into full-stack work. I got really deep into React, Svelte, and this cool micro-frontend architecture they have. I contributed to their company-wide design system—Pattern Library, built on StencilJS—which all 10+ teams use.

The most intense experience was probably this **2-week sprint** where we had to launch the company's first Android app. Marketing had committed to a launch date, and the app was basically a WebView wrapper of our web platform, but it had to feel native. I led the webview compatibility work—10+ features in 14 days. We shipped it **flawlessly**, got a **4.7-star rating**, zero critical bugs. That was a high point.

Oh, and one more thing I'm really proud of—I self-initiated an **AI moderation system** for our Q&A section. Buyers and sellers were using it to exchange contact info off-platform, which was costing the company revenue. I built a POC with Gemini API in 2 days, showed **95% accuracy**, got it green-lit, and now it's live. We've seen a **20% reduction in arbitration cases** and saved about **$50k a year** in manual moderation costs. The VP of Product actually mentioned it in our All-Hands as an example of proactive innovation.

So yeah, it's been a pretty dynamic two years—lots of platform evolution, scaling challenges, and a mix of backend, frontend, and even some AI work."

---

### Version 2: The Impact-First Pitch (90 seconds)
*Use this for: "What have you been working on?" or when you need to be concise*

"I'm currently at Openlane, which is the leading B2B car auction marketplace. Over the past two years, I've had the chance to work on some really high-impact infrastructure and product features.

The thing I'm probably most proud of is solving this **100-terabyte storage crisis**. We were syncing data from a legacy Oracle system, and the ID mapping table ballooned to massive scale. I redesigned it using deterministic UUIDs—eliminated all that storage and saved **$120k a year**.

I also architected the IAM service that handles authentication across three different legacy systems—**99.999% uptime**, what we call 'Five 9s'—which is pretty critical when you're running live auctions where downtime means lost revenue.

More recently, I transitioned from pure backend to full-stack. I led a **2-week sprint** to make our platform compatible with Android WebView for our first mobile app launch. We shipped 10+ features—native navigation, auth handling, the works. The app launched with a **4.7-star rating** and zero major bugs.

And the last thing I'll mention—I self-initiated an AI moderation feature using Gemini to catch contact-sharing and profanity in our Q&A section. It wasn't on the roadmap, but I saw the business risk, built a POC, and got it approved. It's now preventing **20% of our arbitration cases** and saving about **$50k annually**. That one got recognition from our VP team.

So yeah, a mix of infrastructure work, full-stack engineering, and a bit of AI innovation."

---

## 💡 The "What's Your Most Impactful Project?" Pitch

### The Storage Solution Story (Deep Technical)
*Use this when they want to hear about problem-solving*

"Oh man, I'd have to say the **100-terabyte storage problem** at Openlane. Here's the context: we were migrating from a legacy Oracle database to a modern microservices architecture. The Classic Integration Service I built needed to map millions of Oracle IDs to new UUIDs so the new services could reference the old data.

The first version just stored these mappings in a DynamoDB table: Oracle ID goes in, UUID comes out. Simple, right? Well, within a few weeks, that table hit **100,000 gigabytes**. We're talking about costs that were spiraling, and query performance was degrading because we're doing millions of lookups per day.

I remember sitting down and thinking, 'We're fundamentally storing redundant information here.' The insight was this: if I can generate the **same UUID deterministically** from the Oracle ID every time, I don't need to store anything. It's just a pure function.

So I designed an algorithm using SHA-256 hashing plus UUID v5—basically, you take the Oracle ID, hash it with a namespace, and you get a UUID. Same input, same output, every time. RFC 4122 compliant, collision-free.

We deployed it, and **overnight, we eliminated 100TB of storage**. Zero database lookups needed—just compute the UUID on the fly. The cost savings were around **$120k a year**, but the performance improvement was even better. Queries went from hitting DynamoDB to just being in-memory hash computation.

The best part? It became the standard for all ID mapping across the platform after that. That's probably the cleanest solution I've shipped—minimal code, massive impact."

---

### The Mobile Sprint Story (Leadership Under Pressure)
*Use this for behavioral questions about deadlines or leadership*

"I'd say the **Android app launch** was probably my most intense experience. So, Marketing had committed to launching Openlane's first mobile app in two weeks. The app was essentially a WebView wrapper of our web platform, but it needed to **feel native**—like, not janky at all.

The problem was, our web platform was built desktop-first. We had never considered things like: How does auth work when the WebView doesn't have persistent cookies? What happens when the user backgrounds the app and our Server-Sent Events connection dies? How do we make navigation feel like native Android Material Design?

I got tapped to lead the compatibility work. It was kind of all-hands-on-deck, but I was the technical lead. We had to ship **10+ features** in 14 days: native navigation tabs, drawer menus, bottom sheet modals, auth token refresh logic, SSE reconnection, viewport optimizations—the whole nine yards.

I basically worked 10-hour days for two weeks straight. There was this one gnarly bug where SSE connections would drop when the app went to background, and we'd miss real-time auction updates. I ended up implementing a JavaScript-to-Native bridge that detected app state changes and replayed missed events when the user came back.

The payoff? We launched on time, **zero critical bugs**, and the app got a **4.7-star rating** on Google Play. Users specifically praised the 'native feel' in reviews. And from a business perspective, it opened up mobile-first bidding, which directly increased auction participation.

That project taught me a lot about leading under pressure, making technical trade-offs quickly, and shipping with quality even when timelines are tight."

---

## 🚀 The "Tell Me About a Time You Showed Initiative" Pitch

### The AI Moderation Story (Self-Initiated Innovation)
*This is your strongest initiative story*

"Yeah, so this one's pretty recent and it's actually my favorite story because it started as just...me noticing a problem.

Openlane has a Q&A section on vehicle listings where buyers ask sellers questions. It's important for transparency. But I started noticing a pattern in support tickets—people were abusing it. They'd post contact information to complete deals off-platform, bypassing our auction fees. Or they'd make arbitration claims publicly instead of going through the proper process. Operations was spending **$50k a year** just manually reviewing comments, and it was always reactive—by the time they caught it, the damage was done.

I had this thought: 'This is exactly what LLMs are good at—pattern recognition in text.' So I spent a weekend building a proof-of-concept. I used the Gemini API, wrote a prompt that could catch things like obfuscated phone numbers—stuff like 'call me at five five five, one two three four'—and tested it on 100 historical flagged comments. **95% accuracy**.

Here's the thing—this wasn't on the roadmap. We were heads-down on platform migrations. But I put together a one-pager framing it as **risk mitigation**: revenue leakage from contact sharing, arbitration costs, brand reputation. I got 15 minutes with the Product Manager, showed the POC, and she loved it. Got green-lit within a week.

The implementation was pretty straightforward—Kinesis to Lambda to Gemini, async so it doesn't block the user, with a human fallback for low-confidence scores. We launched it, and within the first month, we saw a **20% drop in arbitration cases**. Manual review hours went from 160 per month to about 20. That's **$50k in savings**, plus we're protecting revenue from off-platform deals.

The VP of Product mentioned it in our quarterly All-Hands as an example of 'proactive innovation from the engineering team.' That felt pretty good.

What I learned from this: you don't always need permission to solve problems. If you can show clear business value fast, people will listen."

---

## 🧠 The "Walk Me Through a Technical Challenge" Pitch

### The Multi-Token IAM Complexity
*Use this to show architectural thinking*

"So at Openlane, I built the IAM service that handles authentication across the platform. The tricky part? We had **three different legacy systems** running simultaneously during the migration—the old Oracle monolith, the NewWave platform, and the new Futurestack platform. Each had its own token format.

You had Okta OAuth tokens with standard JWTs, then custom NewWave tokens with different claims structures, and service-to-service tokens for machine auth. All with different signature algorithms, different issuers, different expiry patterns. And downstream services needed a **single unified** way to validate users.

The challenge was: how do you build one IAM system that speaks three different auth languages without creating a tangled mess of if-else statements?

I used the **Strategy Pattern**—basically, each token type gets its own validator class that implements a common interface. At runtime, the router inspects the token (looks at the `iss` claim or other hints), picks the right validator, and calls it. Every validator returns the same User object, so downstream services don't care which token type was used.

This design had a huge benefit during the migration: teams could move to Okta **at their own pace**. No big-bang cutover. The IAM service just handled both old and new tokens seamlessly. And when it came time to fully deprecate NewWave tokens, I literally just deleted one validator class. Zero downtime.

We hit **99.999% uptime** on that service—Five 9s—which was critical because auth failures mean users can't bid, and that's lost revenue.

The pattern worked so well that other teams started using it for their own multi-version API migrations. That's the kind of architecture I like: simple, flexible, and it scales beyond the original use case."

---

## 🏆 The "What Are You Most Proud Of?" Pitch

### The Comprehensive Answer
*Weave together multiple achievements*

"That's a tough one because there are a few things I'm really proud of at Openlane, and they're proud for different reasons.

From a **pure technical challenge** perspective, it's probably the **100TB storage solution**. That was just such a clean, elegant answer to a massive scaling problem. Eliminated storage completely, saved $120k a year, and it's still the standard across the platform.

From a **leadership and initiative** standpoint, it's definitely the **AI moderation feature**. That wasn't assigned to me—I saw the problem, proposed the solution, built the POC, and drove it to production. The fact that it got VP-level recognition and is now preventing 20% of our arbitration cases? That feels like real impact.

But honestly, the thing I'm most proud of might be the **2-week mobile app sprint**. Here's why: that wasn't just about shipping code. It was about rallying a team under intense pressure, making tough technical trade-offs on the fly, and delivering something users genuinely loved. The 4.7-star rating and 'native feel' comments in reviews—that's validation that we didn't just ship fast, we shipped with quality.

And if I zoom out, I'm proud of the **trajectory**. I went from being a pure backend Node.js engineer to full-stack, working in .NET, React, Svelte, owning critical infrastructure with Five 9s uptime, and integrating AI. That range—backend to frontend to AI—is something I've intentionally cultivated, and it's made me way more effective at solving cross-cutting problems.

So yeah, those would be my highlights."

---

## 💬 Quick-Fire Responses (30-60 seconds)

### "What's the biggest technical debt you've tackled?"
"The **NewWave SDK migration**. The original SDK was built with Angular and RxJS patterns—Observables everywhere. Most engineers hated it because the learning curve was steep and stack traces were cryptic. Adoption was only 60%, which defeated the whole point of a shared library.

I migrated it to async/await, added structured logging, and improved auth methods. Adoption went to 100%, and new service setup time dropped from 2 days to 4 hours. It was a gradual, backward-compatible migration, which is how you tackle tech debt without breaking everything."

---

### "Tell me about a time you worked cross-functionally."
"On the AI moderation project, I had to work with Product to understand the business risk, with Legal to ensure we weren't overstepping content moderation boundaries, with Ops to build the human review dashboard, and with SRE to ensure the Kinesis pipeline could handle spikes during major auctions. It was a true cross-functional effort, and I think the reason it succeeded was that I framed the problem in **business terms**—revenue and cost—not just 'cool tech.'"

---

### "What would you do differently if you could redo a project?"
"On the Android app sprint, I'd push back harder on the 2-week timeline. We delivered, but it was really tight, and I had to cut some corners on testing. In hindsight, asking for 3 weeks and doing more thorough testing would've been smarter. We got lucky that there were no major bugs, but I wouldn't rely on luck again."

---

## 🎯 Closing Strong

### If they ask: "Why are you looking to leave Openlane?"
"Honestly, I'm not unhappy at Openlane—I've learned a ton, worked on really impactful stuff, and had great recognition. But I'm at a point where I want to take on more **architectural ownership** and work on systems at even larger scale. 

[If applying to a specific company]: What excites me about [Company] is [specific thing about their tech/mission]. I think my experience with platform migrations, scaling challenges, and AI integration would translate really well to [specific problem they have]."

---

## 📝 Meta-Tips for Delivery

1. **Start with the impact, end with the learning.** Don't bury the lead.
2. **Use numbers naturally.** Say "100 terabytes" not "one hundred thousand gigabytes"—it sounds more conversational.
3. **Pause for effect.** After saying something big like "eliminated 100TB overnight," give it a beat.
4. **Show vulnerability.** The "I worked 10-hour days" or "we got lucky with no bugs" makes you human.
5. **Connect to their company.** If they're AI-focused, lead with the moderation story. If they care about scale, lead with storage or IAM.

**Nail the delivery, and these stories will make you unforgettable.** 🚀

# Project Overview: FoodMesh Inc. (Food Recovery Platform)

## 📝 Summary
FoodMesh is a social impact platform that connects food businesses (farms, grocers) with charities to divert surplus food from landfills. As a **Software Consultant**, I built key components of the B2B marketplace and developed a geospatial visualization tool to track the flow of food donations across municipalities in BC and Manitoba.

## 🎯 Problem Statement
*   **Logistical Inefficiency:** Connecting a grocery store with 50kg of surplus tomatoes to a nearby soup kitchen was a manual, phone-based process.
*   **Lack of Visibility:** Municipalities funding these initiatives had no real-time data on how much food was being diverted or the carbon impact.
*   **Perishable Time Sensitivity:** Food expires quickly; the matching algorithm needed to find a recipient *fast*.

## ⭐ Critical Achievement: AWS Security Crisis Recovery
**The Incident:** The FoodMesh AWS account was **hacked**, and attackers spun up massive compute resources. Within **2 days**, AWS charges ballooned to **$500,000 CAD**.

**The Challenge:** I was the **only technical person** on the team. The company's survival was at stake.

**My Response:**
1. **Immediate Containment:**
   - Worked with AWS consultants to freeze unauthorized resource creation
   - Identified and documented all legitimate vs. hacker-created resources
   - Methodically deleted attacker infrastructure (EC2 instances, Lambda functions, S3 buckets)

2. **Root Cause Analysis:**
   - Discovered compromised IAM credentials (weak password, no MFA)
   - Found overly permissive IAM policies (`*:*` on production accounts)
   - Identified missing CloudTrail logging

3. **Comprehensive Security Hardening:**
   - **IAM Overhaul:** Implemented least-privilege policies, rotated all credentials
   - **Multi-Factor Authentication (2FA):** Enforced for all accounts
   - **CloudTrail:** Enabled logging for all regions, set up alerts for suspicious activity
   - **Config Rules:** Automated compliance checks (e.g., "Alert if public S3 bucket created")
   - **Access Controls:** Implemented IP whitelisting, VPC isolation
   - **Audit Trail:** Full accounting of all resources and costs

4. **Stakeholder Management:**
   - Collaborated with AWS Support to prove the charges were fraudulent
   - Documented every step of the recovery and hardening
   - Presented evidence that convinced AWS to **cancel the $500K in hacked charges**

**The Outcome:**
- **$500K CAD saved** (AWS cleared fraudulent charges)
- **Zero downtime** for the platform during recovery
- **Production-grade security** implemented from scratch
- **Company survival:** This incident posed an existential threat to the startup
 
 **What This Demonstrates:**
 - Crisis management under extreme pressure (company at risk)
 - Solo ownership (only technical person handling a $500K crisis)
 - Security expertise (IAM, MFA, CloudTrail, Config, auditing)
 - Stakeholder management (AWS consultants, leadership)
 - Accountability and documentation rigor

---

## 💼 Business Impact
*   **35 Million kg of Food Diverted:** The platform facilitated the recovery of enough food to provide **50 million meals** to those in need.
*   **96 Million kg CO2 Saved:** By keeping organic waste out of landfills, we significantly reduced methane emissions.
*   **Data-Driven Policy:** The visualization tools allowed city planners to see "food deserts" and allocate resources more effectively.

## 🔑 Key Technologies
*   **Backend:** Python, Django, Django REST Framework
*   **Frontend:** ReactJS, Flutter (Mobile App), Google AppSheet
*   **Geospatial:** Google Maps API, PostGIS
*   **Messaging:** RabbitMQ (for async notifications)

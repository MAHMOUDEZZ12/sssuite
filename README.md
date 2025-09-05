# Super Sales Suite (SX3)

Super Sales Suite is a **real estate AI SaaS** built for speed, trust, and automation.  
It connects AI assistants, onboarding, and sales tools into one event-driven system.

---

## 🚀 Architecture

The system is designed as a **nervous system**:

- **Frontend (Next.js / Tailwind)**  
-  GEMINI API
  - User onboarding  
  - Dashboard (tools & services)  
  - AI copilots  

- **Event Layer (`lib/events.ts`)**  
  - Every user action is logged as an event  
  - Powers analytics, refunds, and AI learning  

- **Domain Engines**  
  - `lib/market.ts` → pricing, lead marketplace logic  
  - `lib/projects.ts` → project catalog access from Firestore  
  - `lib/onboardingDraft.ts` → per-user onboarding state persistence  

- **Database (Firestore)**  
  - `projects/{id}`: project metadata  
  - `users/{uid}`: profile + onboarding draft  
  - `events/{uid}`: analytics trail  
  - `brandKits/{uid}`: logos, colors, contact info  

- **Cloud Functions**  
  - Refund engine (auto-refunds bad leads)  
  - Shortlist builder (AI-assisted project picks)  
  - Brand sync (auto apply brand kit to tools)  

---

## 🧩 Features

- **DeepSearch Onboarding** → location detect → dev focus → project scan → shortlist → brand setup → dashboard ready.  
- **AI Copilot** → multi-step assistants that chain tasks.  
- **No Demo Mode** → all content is generated live from real projects, city-based.  
- **Event-Driven Learning** → every click trains the system, no manual QA.  

---

## 🛠️ Developer Notes

- Files to watch:
  - `src/lib/events.ts` → fire analytics events
  - `src/lib/projects.ts` → fetch catalog
  - `src/lib/onboardingDraft.ts` → persist onboarding
  - `src/lib/market.ts` → market/pricing helpers
  - `src/lib/cards.config.ts` → UI card registry

- API Endpoints:
  - `/api/projects/suggest`
  - `/api/projects/scan`
  - `/api/shortlist`
  - `/api/brand`
  - `/api/payment`

---

## 📊 Analytics

The system tracks these key events:

- `onboarding_location_confirmed`  
- `onboarding_developers_selected`  
- `onboarding_firstpass_labeled`  
- `onboarding_scan20_completed`  
- `onboarding_shortlist_finalized`  
- `onboarding_brand_created`  
- `onboarding_completed`

Each event includes `{ uid, city, ts, payload }`.

---
---

 Status

- Core architecture complete  
- Onboarding flow complete
- AI copilots expanding  
- White-label prep  
- Ready for partner pilots
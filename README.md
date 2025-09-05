# Super Sales Suite (SX3)

Super Sales Suite is a **real estate AI SaaS** built for speed, trust, and automation.  
It connects AI assistants, onboarding, and sales tools into one event-driven system.

---

## 🧠 System Brain Map

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/exec-brain-map.svg">
  <img alt="Executive Brain Map" src="/exec-brain-map.light.svg" width="100%">
</picture>

### What you’re seeing
- **UI (Next.js/Vercel):** Home, Onboarding (DeepSearch), Dashboard, Assistant Panel  
- **AI Core:** Multi-step Copilot (Intent → Plan → Actions → Review)  
- **Event Bus:** Everything emits events → analytics + automation  
- **Services:** Projects Library, Brand Kit, Creative Tools, Ads Manager, Comms/Outreach  
- **Data:** Firestore (users, projects_catalog, projects_library, events, drafts)  
- **Jobs:** Cloud Functions (generate library, sync brand, schedule chains, integrations)

### Why it matters
- **No demo** — all data is generated live per user/market  
- **Event-driven** — every click becomes learning + automation  
- **Composable** — easy to white-label, add tools, or swap providers

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

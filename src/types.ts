
// Core market identity
export type MarketKey = `${string}:${string}`; // e.g. "AE:Dubai"
export interface Market { country: string; city: string; key?: MarketKey }

// Catalog project (what you store in projects_catalog)
export interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  country: string;
  area?: string;
  priceFrom?: string | number;
  unitTypes?: string[];
  handover?: string;
  status?: "New Launch" | "Off-plan" | "Ready" | string;
  thumbnailUrl?: string;
  tags?: string[];
}

// Per-user shortlist library
export interface UserLibrary {
  uid: string;
  marketKey: MarketKey;
  items: string[];       // array of project IDs
  ts: number;
}

// Brand kit stored with user
export interface BrandKit {
  logoUrl?: string;
  colors?: { primary?: string; accent?: string };
  contact?: { name?: string; phone?: string; email?: string; whatsappUrl?: string };
}

// Onboarding draft (saved/resumed)
export interface OnboardingDraft {
  city?: string;
  country?: string;
  devFocus?: string[];
  scanSelected?: string[];
  shortlist?: string[];
  brandKit?: BrandKit;
  connections?: Record<string, "connected" | "skipped">;
  payment?: { status?: "added" | "skipped" };
  progress?: { step: number; ts: number };
}

// Simple event envelope
export interface AppEvent {
  event: string;
  uid?: string;
  props?: Record<string, any>;
  ts?: any; // serverTimestamp()
}

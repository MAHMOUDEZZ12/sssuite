
import { z } from 'zod';

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

// Schemas for Audience Creator AI
export const SuggestTargetingOptionsInputSchema = z.object({
  projectId: z.string().describe('The project ID to generate targeting for.'),
});
export const SuggestTargetingOptionsOutputSchema = z.object({
  strategies: z.array(z.object({
    strategyName: z.string().describe("The name of the targeting strategy (e.g., 'The Local Professional')."),
    audienceType: z.string().describe("The type of Meta audience to create (e.g., 'Detailed Targeting', 'Lookalike Audience')."),
    demographics: z.string().describe("The demographic targeting parameters (e.g., 'Age: 30-45, Location: Downtown Dubai')."),
    interests: z.string().describe("The interest-based targeting for platforms like Facebook/Instagram."),
    keywords: z.string().describe("The keyword targeting for platforms like Google Ads."),
  })).describe("A list of 2-3 distinct targeting strategies."),
});
export type SuggestTargetingOptionsInput = z.infer<typeof SuggestTargetingOptionsInputSchema>;
export type SuggestTargetingOptionsOutput = z.infer<typeof SuggestTargetingOptionsOutputSchema>;


// Schemas for Meta Ads Co-Pilot
export const CreateMetaCampaignInputSchema = z.object({
  campaignGoal: z.string().describe("The user's primary objective for the campaign."),
  projectBrochureDataUri: z.string().describe("The project brochure as a data URI."),
  targetAudience: z.string().optional().describe("A hint about the target audience."),
  budget: z.number().describe("The total ad spend budget."),
  durationDays: z.number().describe("The campaign duration in days."),
});

export const CreateMetaCampaignOutputSchema = z.object({
    publishedCampaignId: z.string().describe("A dummy ID confirming the plan is ready. Always 'campaign-not-published'."),
    campaignName: z.string().describe("The AI-generated name for the campaign."),
    campaignObjective: z.string().describe("The recommended Meta Ads objective (e.g., 'LEAD_GENERATION')."),
    inferredAudience: z.string().describe("A description of the target audience inferred by the AI."),
    adSets: z.array(z.object({
        name: z.string().describe("The name of the ad set."),
        targetingSummary: z.string().describe("A summary of the targeting strategy for this set."),
        dailyBudget: z.number().describe("The calculated daily budget for this ad set."),
    })).describe("A list of ad sets for the campaign."),
    adCreatives: z.array(z.object({
        headline: z.string().describe("The ad headline."),
        bodyText: z.string().describe("The ad's primary text/body."),
        callToAction: z.string().describe("The suggested call-to-action button text."),
        imageSuggestion: z.string().describe("A detailed suggestion for the ad's visual creative."),
    })).describe("A list of ad creative variations to test."),
    optimizationAdvice: z.string().describe("A key piece of advice for running the campaign."),
});

export type CreateMetaCampaignInput = z.infer<typeof CreateMetaCampaignInputSchema>;
export type CreateMetaCampaignOutput = z.infer<typeof CreateMetaCampaignOutputSchema>;


'use server';

/**
 * @fileOverview An AI flow to create a complete Meta (Facebook/Instagram) ad campaign structure.
 *
 * This flow acts as an expert ad manager, taking a high-level goal and project details
 * and generating a comprehensive campaign plan, from campaign objectives down to
 * specific ad creatives.
 *
 * @module AI/Flows/CreateMetaCampaign
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input and Output schemas are now defined on the client-side component that uses this flow.
// This file only contains the server-side logic.
import type { CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/app/dashboard/tool/meta-ads-copilot/page';
import { CreateMetaCampaignInputSchema, CreateMetaCampaignOutputSchema } from '@/app/dashboard/tool/meta-ads-copilot/page';


const createMetaCampaignPrompt = ai.definePrompt({
  name: 'createMetaCampaignPrompt',
  input: {schema: CreateMetaCampaignInputSchema},
  output: {schema: CreateMetaCampaignOutputSchema},
  prompt: `You are an expert Meta Ads strategist specializing in real estate. Your task is to take a user's goal and create a complete, ready-to-launch campaign structure.

  **User Inputs:**
  - Campaign Goal: {{{campaignGoal}}}
  - Target Audience: {{{targetAudience}}}
  - Total Budget: {{{budget}}}
  - Duration (Days): {{{durationDays}}}
  {{#if projectBrochureDataUri}}
  - Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}

  **Instructions:**

  1.  **Campaign Name & Objective:** Based on the user's goal, create a clear campaign name and choose the most appropriate Meta Ads objective (e.g., LEAD_GENERATION, AWARENESS, TRAFFIC).
  2.  **Ad Sets:**
      - Create at least two ad sets. One for a broad audience and one for a more niche, targeted audience.
      - For each ad set, provide a name and a summary of the targeting strategy (demographics, interests, location).
      - Calculate a reasonable daily budget for each ad set based on the total budget and duration.
  3.  **Ad Creatives:**
      - Generate at least three distinct ad creative variations.
      - For each creative, write a compelling headline and body text, extracting key selling points from the brochure if available.
      - Suggest a clear call-to-action for each ad.
      - Provide a specific image suggestion for each creative that would be visually appealing and relevant.
  4.  **Optimization Advice:** Provide one key piece of advice for the user to keep in mind while running this campaign on Meta's platforms.
  `,
});


const createMetaCampaignFlow = ai.defineFlow(
  {
    name: 'createMetaCampaignFlow',
    inputSchema: CreateMetaCampaignInputSchema,
    outputSchema: CreateMetaCampaignOutputSchema,
  },
  async input => {
    const {output} = await createMetaCampaignPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a campaign structure.');
    }
    return output;
  }
);


/**
 * An AI flow that generates a full Meta ad campaign structure.
 * This is the exported server function that can be called from client components.
 *
 * @param {CreateMetaCampaignInput} input - The input data for the campaign.
 * @returns {Promise<CreateMetaCampaignOutput>} A promise that resolves with the generated campaign structure.
 */
export async function createMetaCampaign(input: CreateMetaCampaignInput): Promise<CreateMetaCampaignOutput> {
  return await createMetaCampaignFlow(input);
}


'use server';

/**
 * @fileOverview An AI flow to create a complete Meta (Facebook/Instagram) ad campaign structure.
 *
 * This flow acts as an expert ad manager, taking a high-level goal and project details
 * and generating a comprehensive campaign plan, from campaign objectives down to
 * specific ad creatives.
 *
 * @module AI/Flows/CreateMetaCampaign
 *
 * @export {function} createMetaCampaign - The main function to create a campaign.
 * @export {type} CreateMetaCampaignInput - The Zod schema for the input.
 * @export {type} CreateMetaCampaignOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the Meta campaign creation flow.
 */
export const CreateMetaCampaignInputSchema = z.object({
  campaignGoal: z.string().describe('The primary business objective for the campaign (e.g., "Generate leads for Azure Lofts").'),
  projectBrochureDataUri: z.string().optional().describe(
    "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This is the primary source of truth for the campaign."
  ),
  targetAudience: z.string().describe('A brief description of the ideal customer (e.g., "Young professionals and first-time homebuyers").'),
  budget: z.number().describe('The total campaign budget.'),
  durationDays: z.number().describe('The number of days the campaign should run.'),
});
export type CreateMetaCampaignInput = z.infer<typeof CreateMetaCampaignInputSchema>;

/**
 * Defines the schema for the output of the Meta campaign creation flow.
 */
export const CreateMetaCampaignOutputSchema = z.object({
  campaignName: z.string().describe("A suitable name for the campaign."),
  campaignObjective: z.string().describe("The recommended Meta campaign objective (e.g., 'LEAD_GENERATION', 'AWARENESS', 'TRAFFIC')."),
  adSets: z.array(z.object({
    name: z.string().describe("The name for this ad set."),
    targetingSummary: z.string().describe("A summary of the recommended audience targeting for this ad set."),
    dailyBudget: z.number().describe("The suggested daily budget for this ad set."),
  })).describe("An array of suggested ad sets for the campaign."),
  adCreatives: z.array(z.object({
    headline: z.string().describe("A compelling headline for the ad."),
    bodyText: z.string().describe("The primary text for the ad creative."),
    callToAction: z.string().describe("The recommended call-to-action button text (e.g., 'Learn More', 'Sign Up')."),
    imageSuggestion: z.string().describe("A detailed suggestion for the ad's visual (e.g., 'A high-quality photo of the modern kitchen with natural light.')."),
  })).describe("An array of ad creative variations to test."),
  optimizationAdvice: z.string().describe("A final piece of expert advice for running this campaign successfully."),
});
export type CreateMetaCampaignOutput = z.infer<typeof CreateMetaCampaignOutputSchema>;

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

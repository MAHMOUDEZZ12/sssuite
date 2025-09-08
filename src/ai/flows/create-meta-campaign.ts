
'use server';

/**
 * @fileOverview An AI flow to create a complete Meta (Facebook/Instagram) ad campaign structure.
 *
 * This flow acts as an expert ad manager, taking a high-level goal and project details
 * and generating a comprehensive campaign plan, from campaign objectives down to
 * specific ad creatives. It now also uses a tool to publish the campaign directly to Meta.
 *
 * @module AI/Flows/CreateMetaCampaign
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {config} from 'dotenv';
import type { CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/app/dashboard/tool/meta-ads-copilot/page';


// Load environment variables from .env file
config();

const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;

/**
 * A Genkit tool to publish a campaign to the Meta Ads API.
 * This tool is not exported and is intended for internal use by the main flow.
 */
const publishCampaignToMeta = ai.defineTool(
  {
    name: 'publishCampaignToMeta',
    description: 'Publishes the generated campaign structure to the Meta Ads API.',
    inputSchema: z.object({
      campaignName: z.string().describe("The name of the campaign to be created."),
    }),
    outputSchema: z.object({
      campaignId: z.string().describe("The ID of the newly created campaign."),
    }),
  },
  async ({ campaignName }) => {
    const access_token = process.env.META_ACCESS_TOKEN;
    const ad_account_id = process.env.META_AD_ACCOUNT_ID;

    if (!access_token || !ad_account_id) {
      console.warn("Meta API credentials are not configured. Skipping live campaign publishing and returning a mock ID. The campaign plan has still been generated.");
      return { campaignId: "meta-credentials-not-set" };
    }

    try {
      console.log(`Initializing Meta Ads API for account: ${ad_account_id}`);
      const api = bizSdk.FacebookAdsApi.init(access_token);
      api.setDebug(true);
      
      console.log(`Attempting to create campaign: "${campaignName}"`);
      const campaign = await (new AdAccount(ad_account_id)).createCampaign(
        [],
        {
          name: campaignName,
          objective: 'OUTCOME_LEADS', 
          status: 'PAUSED',
          special_ad_categories: ['HOUSING'],
        }
      );

      const campaignId = campaign.id;
      console.log('Successfully published campaign to Meta with ID:', campaignId);
      return { campaignId };
    } catch (error: any) {
      console.error('Error publishing campaign to Meta:', error?.response?.body || error.message);
      return { campaignId: `meta-api-error: ${error?.response?.body?.error?.message || error.message}`};
    }
  }
);

const createMetaCampaignPrompt = ai.definePrompt({
  name: 'createMetaCampaignPrompt',
  input: {schema: CreateMetaCampaignInputSchema}, 
  output: {schema: CreateMetaCampaignOutputSchema},
  tools: [publishCampaignToMeta],
  prompt: `You are an expert Meta Ads strategist specializing in real estate. Your task is to take a user's goal and project brochure and create a complete, ready-to-launch campaign structure.

  **User Inputs:**
  - Campaign Goal: {{{campaignGoal}}}
  - Total Budget: {{{budget}}}
  - Duration (Days): {{{durationDays}}}
  {{#if projectBrochureDataUri}}
  - Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}
  {{#if targetAudience}}
  - Target Audience Hint: {{{targetAudience}}}
  {{/if}}

  **Instructions:**

  1.  **Infer Audience:** Based *only* on the project brochure and the user's hint (if provided), infer the ideal target audience. Who is this property for? (e.g., "Young professionals," "High-net-worth families," "First-time international investors").
  2.  **Campaign Name & Objective:** Based on the user's goal and the project, create a clear campaign name and choose the most appropriate Meta Ads objective (e.g., LEAD_GENERATION, AWARENESS, TRAFFIC).
  3.  **Ad Sets:**
      - Create at least two ad sets. One for a broad audience based on your inferred persona, and one for a more niche, targeted audience (e.g., a specific interest group or lookalike audience).
      - For each ad set, provide a name and a summary of the recommended targeting strategy (demographics, interests, location).
      - Calculate a reasonable daily budget for each ad set based on the total budget and duration.
  4.  **Ad Creatives:**
      - Generate at least three distinct ad creative variations.
      - For each creative, write a compelling headline and body text, extracting key selling points from the brochure.
      - Suggest a clear call-to-action for each ad.
      - Provide a specific image suggestion for each creative that would be visually appealing and relevant.
  5.  **Optimization Advice:** Provide one key piece of advice for the user to keep in mind while running this campaign on Meta's platforms.
  6.  **Publish Campaign**: After generating the plan, use the 'publishCampaignToMeta' tool to create the campaign. Use the generated campaign name as input for the tool.
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
    // The tool call to publish the campaign is now handled automatically by the model.
    return output;
  }
);


/**
 * An AI flow that generates a full Meta ad campaign structure and publishes it.
 * This is the exported server function that can be called from client components.
 *
 * @param {CreateMetaCampaignInput} input - The input data for the campaign.
 * @returns {Promise<CreateMetaCampaignOutput>} A promise that resolves with the generated campaign structure.
 */
export async function createMetaCampaign(input: CreateMetaCampaignInput): Promise<CreateMetaCampaignOutput> {
  return await createMetaCampaignFlow(input);
}

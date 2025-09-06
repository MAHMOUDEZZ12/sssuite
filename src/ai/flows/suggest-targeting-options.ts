
'use server';

/**
 * @fileOverview AI flow to suggest targeting options for ad campaigns based on project details and target audience.
 *
 * This flow provides a detailed list of targeting options, including demographics, interests,
 * behaviors, and keywords, to help optimize ad campaigns for real estate projects.
 *
 * @module AI/Flows/SuggestTargetingOptions
 *
 * @export {function} suggestTargetingOptions - The main function to suggest targeting options.
 * @export {type} SuggestTargetingOptionsInput - The Zod schema for the input of the suggestTargetingOptions flow.
 * @export {type} SuggestTargetingOptionsOutput - The Zod schema for the output of the suggestTargetingOptions flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the targeting options suggestion flow.
 */
const SuggestTargetingOptionsInputSchema = z.object({
  /** The project ID to generate targeting for. */
  projectId: z.string().describe('The ID of the project to generate targeting for.'),
});

export type SuggestTargetingOptionsInput = z.infer<
  typeof SuggestTargetingOptionsInputSchema
>;

/**
 * Defines the schema for the output of the targeting options suggestion flow.
 */
const SuggestTargetingOptionsOutputSchema = z.object({
  /**
   * A comprehensive list of suggested targeting options for the ad campaign, optimized for the project details and target audience.
   */
  suggestedTargetingOptions: z
    .string()
    .describe(
      'A list of suggested targeting options for the ad campaign, including demographics, interests, behaviors, and keywords, optimized for the project details and target audience.'
    ),
});
export type SuggestTargetingOptionsOutput = z.infer<
  typeof SuggestTargetingOptionsOutputSchema
>;

/**
 * An AI flow that suggests targeting options for an ad campaign.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {SuggestTargetingOptionsInput} input - The input data for suggesting targeting options.
 * @returns {Promise<SuggestTargetingOptionsOutput>} A promise that resolves with the suggested targeting options.
 */
export async function suggestTargetingOptions(
  input: SuggestTargetingOptionsInput
): Promise<SuggestTargetingOptionsOutput> {
  return suggestTargetingOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetingOptionsPrompt',
  input: {schema: SuggestTargetingOptionsInputSchema},
  output: {schema: SuggestTargetingOptionsOutputSchema},
  prompt: `You are an expert in digital marketing and advertising, specializing in real estate.
  Based on the provided project details, suggest the best targeting options for an ad campaign on platforms like Facebook and Google.

  **TODO: The project data should be fetched from a database using the projectId.**
  For now, use this placeholder data for Project ID: {{projectId}}
  
  **Property Details:**
  - Location: "Downtown Dubai"
  - Property Type: "Luxury High-rise Condo"
  - Price Range: $1,000,000 - $2,500,000
  - Key Amenities: "Rooftop infinity pool, 24/7 concierge, state-of-the-art gym, valet parking"

  **Instructions:**
  
  1.  **Analyze the Project**: Based on the property details, infer the most likely buyer personas.
  2.  **Generate 2-3 Distinct Strategies**: Create multiple, distinct targeting strategies. For example:
      - **Strategy 1: The Local Professional**: Target high-income professionals already living or working in the area.
      - **Strategy 2: The International Investor**: Target individuals in key international markets known for investing in this city.
      - **Strategy 3: The Lifestyle Seeker**: Target users interested in luxury brands, fine dining, and specific lifestyle activities associated with the property.
  3.  **Detail Each Strategy**: For each strategy, provide a detailed breakdown of:
      - **Demographics:** Location, Age, Language, etc.
      - **Interests & Behaviors (for Facebook/Instagram):** Specific, actionable interests to target.
      - **Keywords (for Google Ads):** High-intent keywords for search campaigns.
  4.  **Format as Markdown**: Present the output in a clear, well-formatted markdown structure. Use headings for each strategy.
`,
});

const suggestTargetingOptionsFlow = ai.defineFlow(
  {
    name: 'suggestTargetingOptionsFlow',
    inputSchema: SuggestTargetingOptionsInputSchema,
    outputSchema: SuggestTargetingOptionsOutputSchema,
  },
  async input => {
    // In a future step, we would use input.projectId to fetch real data from Firestore.
    // For now, the prompt contains placeholder data.
    const {output} = await prompt(input);
    return output!;
  }
);

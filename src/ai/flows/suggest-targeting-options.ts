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
  /** The target city, neighborhood, or area. */
  location: z.string().describe('The target city, neighborhood, or area.'),
  /** The type of property being sold. */
  propertyType: z
    .string()
    .describe('The type of property (e.g., Condo, Single-Family Home).'),
  /** The price range of the property. */
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }).describe('The price range of the property.'),
  /** A list of key amenities of the property. */
  amenities: z.array(z.string()).describe('A list of key property amenities.'),
  /** The target age range for the audience. */
  ageRange: z.object({
    min: z.number(),
    max: z.number(),
  }).describe('The target age range for the audience.'),
  /** The income level of the target audience. */
  incomeLevel: z
    .string()
    .describe('The income level of the target audience (e.g., Affluent, High Earner).'),
  /** A list of interests for the target audience. */
  interests: z.array(z.string()).describe('A list of interests for the target audience.'),
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
  Based on the provided structured project details and target audience persona, suggest the best targeting options for an ad campaign on platforms like Facebook and Google.

  **Property Details:**
  - Location: {{{location}}}
  - Property Type: {{{propertyType}}}
  - Price Range: \${{{priceRange.min}}} - \${{{priceRange.max}}}
  - Key Amenities: {{#each amenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  **Target Audience Persona:**
  - Age Range: {{{ageRange.min}}}-{{{ageRange.max}}}
  - Income Level: {{{incomeLevel}}}
  - Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Provide a detailed list of targeting options, including demographics, interests, behaviors, and relevant keywords.
  Structure the output clearly. For example:
  
  **1. Demographics:**
  - Location: [Specific neighborhoods in {{{location}}}]
  - Age: {{{ageRange.min}}}-{{{ageRange.max}}}
  - Income: [Specific suggestions based on {{{incomeLevel}}} and price range]

  **2. Interests & Behaviors (Facebook/Instagram):**
  - [Interest 1] (e.g., "Luxury Goods" if property is high-end)
  - [Interest 2] (e.g., "Golf" if near a golf course)
  - [Behavior 1] (e.g., "Likely to move")

  **3. Keywords (Google Ads):**
  - [Keyword 1] (e.g., '"{{{location}}} homes for sale"')
  - [Keyword 2] (e.g., '"buy condo in {{{location}}}"')

  Optimize these suggestions to reach the most relevant potential buyers for the project. Be specific and provide actionable recommendations. For location, suggest specific, relevant sub-neighborhoods if appropriate.`,
});

const suggestTargetingOptionsFlow = ai.defineFlow(
  {
    name: 'suggestTargetingOptionsFlow',
    inputSchema: SuggestTargetingOptionsInputSchema,
    outputSchema: SuggestTargetingOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

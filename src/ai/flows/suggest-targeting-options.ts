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
  /**
   * A detailed description of the real estate project, including location, property type, amenities, and unique selling points.
   */
  projectDetails: z
    .string()
    .describe(
      'Detailed description of the real estate project, including location, type of property, amenities, and unique selling points.'
    ),
  /**
   * A description of the ideal target audience for the ad campaign.
   */
  targetAudience: z
    .string()
    .describe(
      'Description of the ideal target audience for the ad campaign, including demographics, interests, and behaviors.'
    ),
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
  Based on the provided project details and target audience, suggest the best targeting options for an ad campaign.

  Project Details: {{{projectDetails}}}
  Target Audience: {{{targetAudience}}}

  Provide a detailed list of targeting options, including demographics, interests, behaviors, and relevant keywords. Optimize these suggestions to reach the most relevant potential buyers for the project.`,
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

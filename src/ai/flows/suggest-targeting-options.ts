'use server';

/**
 * @fileOverview AI flow to suggest targeting options for ad campaigns based on project details and target audience.
 *
 * - suggestTargetingOptions - A function that suggests targeting options for ad campaigns.
 * - SuggestTargetingOptionsInput - The input type for the suggestTargetingOptions function.
 * - SuggestTargetingOptionsOutput - The return type for the suggestTargetingOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTargetingOptionsInputSchema = z.object({
  projectDetails: z
    .string()
    .describe('Detailed description of the real estate project, including location, type of property, amenities, and unique selling points.'),
  targetAudience: z
    .string()
    .describe('Description of the ideal target audience for the ad campaign, including demographics, interests, and behaviors.'),
});
export type SuggestTargetingOptionsInput = z.infer<
  typeof SuggestTargetingOptionsInputSchema
>;

const SuggestTargetingOptionsOutputSchema = z.object({
  suggestedTargetingOptions: z
    .string()
    .describe(
      'A list of suggested targeting options for the ad campaign, including demographics, interests, behaviors, and keywords, optimized for the project details and target audience.'
    ),
});
export type SuggestTargetingOptionsOutput = z.infer<
  typeof SuggestTargetingOptionsOutputSchema
>;

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

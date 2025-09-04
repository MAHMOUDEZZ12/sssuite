'use server';

/**
 * @fileOverview AI flow to generate social media posts from a given topic or URL.
 *
 * This flow creates engaging social media content, including hashtags and image suggestions,
 * tailored to a specific platform and tone of voice.
 *
 * @module AI/Flows/GenerateSocialPost
 *
 * @export {function} generateSocialPost - The main function to generate a social media post.
 * @export {type} GenerateSocialPostInput - The Zod schema for the input of the generateSocialPost flow.
 * @export {type} GenerateSocialPostOutput - The Zod schema for the output of the generateSocialPost flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the social post generation flow.
 */
const GenerateSocialPostInputSchema = z.object({
  /**
   * The source content for the post, which can be a URL or a simple topic description.
   */
  source: z
    .string()
    .describe('A URL or topic to generate the social media post from.'),
  /**
   * The target social media platform for the post.
   * @example "Twitter", "LinkedIn", "Facebook"
   */
  platform: z
    .string()
    .describe(
      'The social media platform (e.g., Twitter, LinkedIn, Facebook).'
    ),
  /**
   * The desired tone of voice for the post.
   * @example "Professional", "Humorous", "Urgent"
   */
  tone: z.string().describe('The desired tone of voice for the post.'),
});
export type GenerateSocialPostInput = z.infer<
  typeof GenerateSocialPostInputSchema
>;

/**
 * Defines the schema for the output of the social post generation flow.
 */
const GenerateSocialPostOutputSchema = z.object({
  /**
   * The generated text content for the social media post.
   */
  postContent: z.string().describe('The generated social media post content.'),
  /**
   * A list of relevant hashtags to accompany the post.
   */
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
  /**
   * A textual suggestion for an accompanying image, describing what it should contain.
   */
  imageSuggestion: z
    .string()
    .describe('A suggestion for an accompanying image.'),
});
export type GenerateSocialPostOutput = z.infer<
  typeof GenerateSocialPostOutputSchema
>;

/**
 * An AI flow that generates a social media post from a topic or URL.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateSocialPostInput} input - The input data for generating the post.
 * @returns {Promise<GenerateSocialPostOutput>} A promise that resolves with the generated social post content.
 */
export async function generateSocialPost(
  input: GenerateSocialPostInput
): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are an expert social media manager specializing in real estate.
  Based on the provided source (URL or topic), generate a compelling social media post for the specified platform and tone.

  Source: {{{source}}}
  Platform: {{{platform}}}
  Tone: {{{tone}}}

  Provide the post content, a list of relevant hashtags, and a suggestion for an accompanying image.
  Optimize the post for engagement and relevance to a real estate audience.`,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

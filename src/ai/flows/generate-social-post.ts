'use server';

/**
 * @fileOverview AI flow to generate social media posts from a given topic or URL.
 *
 * - generateSocialPost - A function that generates a social media post.
 * - GenerateSocialPostInput - The input type for the generateSocialPost function.
 * - GenerateSocialPostOutput - The return type for the generateSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialPostInputSchema = z.object({
  source: z.string().describe('A URL or topic to generate the social media post from.'),
  platform: z.string().describe('The social media platform (e.g., Twitter, LinkedIn, Facebook).'),
  tone: z.string().describe('The desired tone of voice for the post.'),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GenerateSocialPostOutputSchema = z.object({
  postContent: z.string().describe('The generated social media post content.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
  imageSuggestion: z.string().describe('A suggestion for an accompanying image.'),
});
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
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

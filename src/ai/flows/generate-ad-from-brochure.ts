'use server';

/**
 * @fileOverview AI-powered ad generation from project brochures.
 *
 * - generateAdFromBrochure - A function that generates ad copy and designs from a project brochure.
 * - GenerateAdFromBrochureInput - The input type for the generateAdFromBrochure function.
 * - GenerateAdFromBrochureOutput - The return type for the generateAdFromBrochure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdFromBrochureInputSchema = z.object({
  brochureDataUri: z
    .string()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  projectLinks: z.string().describe('Official project links.'),
  projectRowInformation: z.string().describe('Project row information.'),
  focusArea: z.string().describe('The specific part of the project to focus on in the ad.'),
  brandName: z.string().describe('The brand name to use in the ad.'),
  toneOfVoice: z.string().describe('The desired tone of voice for the ad.'),
  colors: z.string().describe('The color palette to use for the ad design.'),
});
export type GenerateAdFromBrochureInput = z.infer<typeof GenerateAdFromBrochureInputSchema>;

const GenerateAdFromBrochureOutputSchema = z.object({
  adCopy: z.string().describe('The generated ad copy.'),
  adDesign: z.string().describe('The data URI of the generated ad design.'),
  landingPage: z.string().describe('The data URI of the generated landing page.'),
});
export type GenerateAdFromBrochureOutput = z.infer<typeof GenerateAdFromBrochureOutputSchema>;

export async function generateAdFromBrochure(input: GenerateAdFromBrochureInput): Promise<GenerateAdFromBrochureOutput> {
  return generateAdFromBrochureFlow(input);
}

const generateAdFromBrochurePrompt = ai.definePrompt({
  name: 'generateAdFromBrochurePrompt',
  input: {schema: GenerateAdFromBrochureInputSchema},
  output: {schema: GenerateAdFromBrochureOutputSchema},
  prompt: `You are an AI-powered advertising expert. Your task is to generate compelling ad copy and a visually appealing ad design based on the provided project brochure, links, information, and branding guidelines.

Here are the project details:

Focus Area: {{{focusArea}}}
Project Links: {{{projectLinks}}}
Project Row Information: {{{projectRowInformation}}}
Brochure: {{media url=brochureDataUri}}

Here are the branding guidelines:

Brand Name: {{{brandName}}}
Tone of Voice: {{{toneOfVoice}}}
Colors: {{{colors}}}

Generate ad copy that is engaging, persuasive, and tailored to the specified focus area and target audience. Create an ad design that is visually consistent with the brand's identity and optimized for social media platforms. Also, generate a landing page design to show off the listing.

Ensure that the ad copy and design align with the project details and branding guidelines.`, 
});

const generateAdFromBrochureFlow = ai.defineFlow(
  {
    name: 'generateAdFromBrochureFlow',
    inputSchema: GenerateAdFromBrochureInputSchema,
    outputSchema: GenerateAdFromBrochureOutputSchema,
  },
  async input => {
    const {output} = await generateAdFromBrochurePrompt(input);
    return output!;
  }
);

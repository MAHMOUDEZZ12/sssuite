'use server';

/**
 * @fileOverview AI-powered ad generation from project brochures.
 *
 * This flow generates compelling ad copy and a visually appealing ad design based on a project brochure and branding guidelines.
 *
 * @module AI/Flows/GenerateAdFromBrochure
 *
 * @export {function} generateAdFromBrochure - The main function to generate an ad from a brochure.
 * @export {type} GenerateAdFromBrochureInput - The Zod schema for the input of the generateAdFromBrochure flow.
 * @export {type} GenerateAdFromBrochureOutput - The Zod schema for the output of the generateAdFromBrochure flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the ad generation flow.
 */
const GenerateAdFromBrochureInputSchema = z.object({
  /**
   * The project brochure file, encoded as a Base64 data URI.
   * @example "data:application/pdf;base64,..."
   */
  brochureDataUri: z
    .string()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * Additional information or key details about the project.
   */
  projectRowInformation: z.string().describe('Additional key details about the project.'),
  /**
   * The specific aspect of the project the ad should highlight (e.g., luxury, family-friendly).
   */
  focusArea: z
    .string()
    .describe('The specific part of the project to focus on in the ad.'),
  /**
   * The name of the brand to be featured in the ad.
   */
  brandName: z.string().describe('The brand name to use in the ad.'),
  /**
   * The desired tone of voice for the ad copy (e.g., professional, friendly, urgent).
   */
  toneOfVoice: z.string().describe('The desired tone of voice for the ad.'),
  /**
   * The color palette to be used for the ad design.
   * @example "Blue and Gold"
   */
  colors: z.string().describe('The color palette to use for the ad design.'),
});
export type GenerateAdFromBrochureInput = z.infer<
  typeof GenerateAdFromBrochureInputSchema
>;

/**
 * Defines the schema for the output of the ad generation flow.
 */
const GenerateAdFromBrochureOutputSchema = z.object({
  /**
   * The generated ad copy, tailored to the specified focus and tone.
   */
  adCopy: z.string().describe('The generated ad copy.'),
  /**
   * The generated ad design, returned as a Base64 data URI.
   */
  adDesign: z.string().describe('The data URI of the generated ad design.'),
  /**
   * The generated landing page design, returned as a Base64 data URI.
   */
  landingPage: z
    .string()
    .describe('The data URI of the generated landing page.'),
});
export type GenerateAdFromBrochureOutput = z.infer<
  typeof GenerateAdFromBrochureOutputSchema
>;

/**
 * An AI flow that generates ad copy and designs from a project brochure.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateAdFromBrochureInput} input - The input data for generating the ad.
 * @returns {Promise<GenerateAdFromBrochureOutput>} A promise that resolves with the generated ad copy and design.
 */
export async function generateAdFromBrochure(
  input: GenerateAdFromBrochureInput
): Promise<GenerateAdFromBrochureOutput> {
  return generateAdFromBrochureFlow(input);
}

const generateAdFromBrochurePrompt = ai.definePrompt({
  name: 'generateAdFromBrochurePrompt',
  input: {schema: GenerateAdFromBrochureInputSchema},
  output: {schema: GenerateAdFromBrochureOutputSchema},
  prompt: `You are an AI-powered advertising expert. Your task is to generate compelling ad copy and a visually appealing ad design based on the provided project brochure, links, information, and branding guidelines.

Here are the project details:

Focus Area: {{{focusArea}}}
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

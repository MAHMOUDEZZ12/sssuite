
'use server';

/**
 * @fileOverview AI flow to generate a landing page for a specific project based on project details and user branding.
 *
 * This flow generates the HTML for a complete landing page, incorporating project details,
 * user branding preferences, and information from an optional brochure.
 *
 * @module AI/Flows/GenerateLandingPage
 *
 * @export {function} generateLandingPage - The main function to generate a landing page.
 * @export {type} GenerateLandingPageInput - The Zod schema for the input of the generateLandingPage flow.
 * @export {type} GenerateLandingPageOutput - The Zod schema for the output of the generateLandingPage flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the landing page generation flow.
 */
const GenerateLandingPageInputSchema = z.object({
  /**
   * The name of the project.
   */
  projectName: z.string().describe('The name of the project.'),
  /**
   * Detailed information about the project.
   */
  projectDetails: z
    .string()
    .describe('Detailed information about the project.'),
  /**
   * User preferences for branding, including company name, logo, tone of voice, and colors.
   */
  userBrandingPreferences: z
    .string()
    .describe(
      'User preferences for branding, including company name, logo data URI, tone of voice, and colors.'
    ),
  /**
   * An optional project brochure, encoded as a Base64 data URI.
   * @example "data:application/pdf;base64,..."
   */
  projectBrochureDataUri: z
    .string()
    .optional()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * An optional inspiration image, encoded as a Base64 data URI.
   * @example "data:image/png;base64,..."
   */
  inspirationImageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional inspiration image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * Optional official project links.
   */
  officialProjectLinks: z.string().optional().describe('Official project links'),
});
export type GenerateLandingPageInput = z.infer<
  typeof GenerateLandingPageInputSchema
>;

/**
 * Defines the schema for the output of the landing page generation flow.
 */
const GenerateLandingPageOutputSchema = z.object({
  /**
   * The generated HTML content for the landing page.
   */
  landingPageHtml: z
    .string()
    .describe('The generated HTML content for the landing page.'),
});
export type GenerateLandingPageOutput = z.infer<
  typeof GenerateLandingPageOutputSchema
>;

/**
 * An AI flow that generates the HTML for a landing page.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateLandingPageInput} input - The input data for generating the landing page.
 * @returns {Promise<GenerateLandingPageOutput>} A promise that resolves with the generated landing page HTML.
 */
export async function generateLandingPage(
  input: GenerateLandingPageInput
): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

const landingPagePrompt = ai.definePrompt({
  name: 'landingPagePrompt',
  input: {schema: GenerateLandingPageInputSchema},
  output: {schema: GenerateLandingPageOutputSchema},
  prompt: `You are an AI assistant specialized in creating landing pages for real estate projects.

  Based on the provided project details, user branding preferences, and optional brochure,
  generate an HTML landing page.

  Project Name: {{{projectName}}}
  Project Details: {{{projectDetails}}}
  User Branding Preferences: {{{userBrandingPreferences}}}
  {{#if projectBrochureDataUri}}
  Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}
  {{#if inspirationImageDataUri}}
  Inspiration Image: {{media url=inspirationImageDataUri}}
  {{/if}}
  Official Project Links: {{{officialProjectLinks}}}

  Instructions:
  1.  Incorporate the project details and user branding preferences into the landing page design.
  2.  If an inspiration image is provided, use it as a strong reference for the layout, color scheme, and overall aesthetic.
  3.  If a project brochure is provided, extract key information and use it to enhance the landing page content.
  4.  Include relevant links to the official project website.
  5.  Ensure the landing page is visually appealing and optimized for conversions.
  6.  Return only the HTML code for the landing page. Do not include any additional text or explanations.
  `,
});

const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    outputSchema: GenerateLandingPageOutputSchema,
  },
  async input => {
    const {output} = await landingPagePrompt(input);
    return output!;
  }
);

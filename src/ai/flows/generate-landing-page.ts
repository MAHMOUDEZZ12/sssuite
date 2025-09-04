'use server';

/**
 * @fileOverview AI flow to generate a landing page for a specific project based on project details and user branding.
 *
 * @fileOverview Generates a landing page for a specific project, incorporating project details and user branding preferences.
 * - generateLandingPage - Function to generate the landing page.
 * - GenerateLandingPageInput - Input type for the function.
 * - GenerateLandingPageOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateLandingPageInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDetails: z.string().describe('Detailed information about the project.'),
  userBrandingPreferences: z
    .string()
    .describe(
      'User preferences for branding, including company name, logo data URI, tone of voice, and colors.'
    ),
  projectBrochureDataUri: z
    .string()
    .optional()
    .describe(
      'A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
  officialProjectLinks: z.string().optional().describe('Official project links'),
});
export type GenerateLandingPageInput = z.infer<typeof GenerateLandingPageInputSchema>;

// Define the output schema
const GenerateLandingPageOutputSchema = z.object({
  landingPageHtml: z
    .string()
    .describe('The generated HTML content for the landing page.'),
});
export type GenerateLandingPageOutput = z.infer<typeof GenerateLandingPageOutputSchema>;

// Exported function to call the flow
export async function generateLandingPage(input: GenerateLandingPageInput): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

// Define the prompt
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
  Official Project Links: {{{officialProjectLinks}}}

  Instructions:
  1.  Incorporate the project details and user branding preferences into the landing page design.
  2.  If a project brochure is provided, extract key information and use it to enhance the landing page content.
  3.  Include relevant links to the official project website.
  4.  Ensure the landing page is visually appealing and optimized for conversions.
  5.  Return only the HTML code for the landing page. Do not include any additional text or explanations.
  `,
});

// Define the flow
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

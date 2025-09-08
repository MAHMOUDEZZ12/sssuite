
'use server';

/**
 * @fileOverview An AI flow to investigate a lead across various online sources.
 *
 * This flow takes basic lead information, searches public sources (simulated),
 * and returns a list of potential matches with a summary and confidence score.
 *
 * @module AI/Flows/InvestigateLead
 *
 * @export {function} investigateLead - The main function to investigate a lead.
 * @export {type} InvestigateLeadInput - The Zod schema for the input.
 * @export {type} InvestigateLeadOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the lead investigation flow.
 */
export const InvestigateLeadInputSchema = z.object({
  name: z.string().describe('The full name of the lead.'),
  company: z.string().optional().describe('The company the lead works for.'),
  email: z.string().optional().describe('The email address of the lead.'),
  location: z.string().optional().describe('The city or country of the lead.'),
  role: z.string().optional().describe('The job title or role of the lead.'),
});
export type InvestigateLeadInput = z.infer<typeof InvestigateLeadInputSchema>;

/**
 * Defines the schema for a single potential match found by the investigator.
 */
const LeadMatchSchema = z.object({
  name: z.string().describe('The name of the matched person.'),
  source: z.string().describe('The platform where the match was found (e.g., LinkedIn, Facebook, Company Website).'),
  profileUrl: z.string().url().describe('The URL to the profile or source page.'),
  summary: z.string().describe('A brief summary of why this might be the lead (e.g., "CEO at ACME Inc, based in Dubai").'),
  matchConfidence: z.number().min(0).max(1).describe('The AI\'s confidence that this is the correct person (0 to 1).'),
});

/**
 * Defines the schema for the output of the lead investigation flow.
 */
export const InvestigateLeadOutputSchema = z.object({
  matches: z.array(LeadMatchSchema).describe('A list of potential matches found for the lead.'),
  overallSummary: z.string().describe('A high-level summary of the investigation findings.'),
});
export type InvestigateLeadOutput = z.infer<typeof InvestigateLeadOutputSchema>;


const investigateLeadPrompt = ai.definePrompt({
  name: 'investigateLeadPrompt',
  input: {schema: InvestigateLeadInputSchema},
  output: {schema: InvestigateLeadOutputSchema},
  prompt: `You are an expert lead investigator and open-source intelligence (OSINT) analyst. Your task is to find information about a potential lead based on the provided details. You must search across simulated platforms like LinkedIn, Facebook, Instagram, and general web search.

  **Lead Details:**
  - Name: {{{name}}}
  {{#if company}}- Company: {{{company}}}{{/if}}
  {{#if email}}- Email: {{{email}}}{{/if}}
  {{#if location}}- Location: {{{location}}}{{/if}}
  {{#if role}}- Role: {{{role}}}{{/if}}

  **Instructions:**

  1.  **Simulate Search:** Based on the input, simulate a search across professional networks (like LinkedIn), social media (Facebook, Instagram), and the web.
  2.  **Generate Matches:** Create 1-3 plausible but fictional matches. For each match:
      *   Provide a name, the source (e.g., "LinkedIn"), a fictional but valid-looking profile URL.
      *   Write a summary of the person's fictional profile (e.g., title, company, a brief bio snippet).
      *   Assign a confidence score based on how well the fictional profile matches the input details.
  3.  **Handle Ambiguity:** If the input is vague (e.g., just a common name), generate multiple potential matches and lower the confidence scores. If the input is very specific, generate one strong match with a high confidence score.
  4.  **Provide a Summary:** Write a brief overall summary of your findings, for example: "I found a strong potential match on LinkedIn and a possible secondary match on Facebook. Further refinement may be needed."

  Return the results in the specified format.
  `,
});

const investigateLeadFlow = ai.defineFlow(
  {
    name: 'investigateLeadFlow',
    inputSchema: InvestigateLeadInputSchema,
    outputSchema: InvestigateLeadOutputSchema,
  },
  async input => {
    const {output} = await investigateLeadPrompt(input);
    if (!output) {
      throw new Error('The AI failed to investigate the lead.');
    }
    return output;
  }
);


/**
 * An AI flow that investigates a lead.
 *
 * @param {InvestigateLeadInput} input - The input data for the investigation.
 * @returns {Promise<InvestigateLeadOutput>} A promise that resolves with the investigation results.
 */
export async function investigateLead(
  input: InvestigateLeadInput
): Promise<InvestigateLeadOutput> {
  return investigateLeadFlow(input);
}

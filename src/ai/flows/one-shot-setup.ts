
'use server';

/**
 * @fileOverview An AI flow to configure the user's workspace from uploaded documents.
 *
 * This flow analyzes user-provided documents (e.g., company profile, brand guide)
 * and extracts structured data to set up their brand identity and create project lists,
 * acting as a command from the AI Assistant.
 *
 * @module AI/Flows/OneShotSetup
 *
 * @export {function} oneShotSetup - The main function to configure the workspace.
 * @export {type} OneShotSetupInput - The Zod schema for the input of the oneShotSetup flow.
 * @export {type} OneShotSetupOutput - The Zod schema for the output of the oneShotSetup flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the one-shot setup flow.
 */
export const OneShotSetupInputSchema = z.object({
  /**
   * The user's command or instruction.
   * @example "Set up my brand and projects from the uploaded files."
   */
  command: z.string().describe('The command from the user.'),
  /**
   * An array of documents provided by the user, encoded as Base64 data URIs.
   */
  documents: z
    .array(z.string())
    .describe(
      "An array of documents (e.g., PDFs, text files) as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OneShotSetupInput = z.infer<typeof OneShotSetupInputSchema>;

/**
 * Defines the schema for the output of the one-shot setup flow.
 */
export const OneShotSetupOutputSchema = z.object({
  /**
   * The extracted brand information.
   */
  brandInfo: z
    .object({
      companyName: z.string().optional().describe('The name of the company.'),
      contactInfo: z
        .string()
        .optional()
        .describe('The contact information (name, phone, email).'),
      primaryColor: z
        .string()
        .optional()
        .describe('The primary brand color, as a hex code.'),
      secondaryColor: z
        .string()
        .optional()
        .describe('The secondary brand color, as a hex code.'),
    })
    .optional(),
  /**
   * A list of extracted project names.
   */
  projects: z
    .array(
      z.object({
        name: z.string().describe('The name of the project.'),
        location: z.string().optional().describe('The project location.'),
        status: z
          .string()
          .optional()
          .describe('The current status of the project.'),
      })
    )
    .optional(),
  /**
   * A summary of the actions taken by the AI.
   */
  summary: z
    .string()
    .describe(
      'A human-readable summary of the setup actions performed by the AI.'
    ),
});
export type OneShotSetupOutput = z.infer<typeof OneShotSetupOutputSchema>;

/**
 * An AI flow that configures the user's workspace based on provided documents and a command.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {OneShotSetupInput} input - The input data for the setup process.
 * @returns {Promise<OneShotSetupOutput>} A promise that resolves with the extracted setup data.
 */
export async function oneShotSetup(
  input: OneShotSetupInput
): Promise<OneShotSetupOutput> {
  return oneShotSetupFlow(input);
}

const oneShotSetupPrompt = ai.definePrompt({
  name: 'oneShotSetupPrompt',
  input: {schema: OneShotSetupInputSchema},
  output: {schema: OneShotSetupOutputSchema},
  prompt: `You are an expert system administrator for the Super Seller Suite. Your task is to configure the user's workspace based on their command and the documents they provide.

  User Command: "{{{command}}}"

  Provided Documents:
  {{#each documents}}
  - Document {{add @index 1}}: {{media url=this}}
  {{/each}}

  Analyze the documents and the command carefully. Extract the following information:
  1.  **Brand Information**: Look for company name, contact details (name, phone, email), and brand colors (provide as hex codes if possible).
  2.  **Projects**: Identify a list of current or past projects, including their name, location, and status if available.

  Once you have extracted the information, provide a brief, human-readable summary of what you have done. For example: "I've updated your brand with the details from 'CompanyProfile.pdf' and created 5 new projects from 'ProjectList.csv'."
  `,
});

const oneShotSetupFlow = ai.defineFlow(
  {
    name: 'oneShotSetupFlow',
    inputSchema: OneShotSetupInputSchema,
    outputSchema: OneShotSetupOutputSchema,
  },
  async input => {
    const {output} = await oneShotSetupPrompt(input);
    if (!output) {
      throw new Error('The AI failed to process the setup documents.');
    }
    // In a real application, you would now use the 'output' data to update
    // the user's settings in your database. For this simulation, we just
    // return the extracted data and the summary.
    return output;
  }
);

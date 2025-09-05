
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
import { OneShotSetupInputSchema, OneShotSetupOutputSchema } from '@/ai/schemas/one-shot-setup-schemas';

export type { OneShotSetupInput, OneShotSetupOutput } from '@/ai/schemas/one-shot-setup-schemas';


/**
 * An AI flow that configures the user's workspace based on provided documents and a command.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {OneShotSetupInput} input - The input data for the setup process.
 * @returns {Promise<OneShotSetupOutput>} A promise that resolves with the extracted setup data.
 */
export async function oneShotSetup(
  input: z.infer<typeof OneShotSetupInputSchema>
): Promise<z.infer<typeof OneShotSetupOutputSchema>> {
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


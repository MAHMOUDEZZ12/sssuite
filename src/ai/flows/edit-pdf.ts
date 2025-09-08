
'use server';

/**
 * @fileOverview An AI flow to edit PDF documents based on user instructions.
 *
 * This flow takes a source PDF, a set of instructions, and optional new images,
 * and returns a new, edited PDF.
 *
 * @module AI/Flows/EditPdf
 *
 * @export {function} editPdf - The main function to edit a PDF.
 * @export {type} EditPdfInput - The Zod schema for the input of the editPdf flow.
 * @export {type} EditPdfOutput - The Zod schema for the output of the editPdf flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the PDF editing flow.
 */
const EditPdfInputSchema = z.object({
  /**
   * The source PDF document, encoded as a Base64 data URI.
   * @example "data:application/pdf;base64,..."
   */
  sourcePdf: z
    .string()
    .describe(
      "The source PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * Plain-text instructions describing the edits to be made.
   */
  editInstructions: z
    .string()
    .describe('The instructions for editing the PDF.'),
  /**
   * Optional new images to be used in the edited PDF, encoded as Base64 data URIs.
   */
  newImages: z
    .array(z.string())
    .optional()
    .describe(
      "An optional array of new images to be used, as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Only provide if your instructions reference replacing an image."
    ),
   /**
   * Optional granular instructions for fine-tuning the edit.
   */
    deepEditInstructions: z
    .string()
    .optional()
    .describe('Optional specific instructions for deep editing.'),
});

export type EditPdfInput = z.infer<typeof EditPdfInputSchema>;

/**
 * Defines the schema for the output of the PDF editing flow.
 */
const EditPdfOutputSchema = z.object({
  /**
   * The edited PDF document, returned as a Base64 data URI.
   */
  editedPdfDataUri: z
    .string()
    .describe(
      "The edited PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EditPdfOutput = z.infer<typeof EditPdfOutputSchema>;

/**
 * An AI flow that edits a PDF based on user instructions.
 *
 * @param {EditPdfInput} input - The input data for editing the PDF.
 * @returns {Promise<EditPdfOutput>} A promise that resolves with the edited PDF data URI.
 */
export async function editPdf(input: EditPdfInput): Promise<EditPdfOutput> {
  return editPdfFlow(input);
}

const editPdfPrompt = ai.definePrompt({
  name: 'editPdfPrompt',
  input: {schema: EditPdfInputSchema},
  output: {schema: EditPdfOutputSchema},
  prompt: `You are an expert document editor. Your task is to edit the provided PDF document based on the user's instructions. You can modify text, replace images, and adjust layouts.

  Source PDF: {{media url=sourcePdf}}

  Editing Instructions:
  {{{editInstructions}}}

  {{#if newImages}}
  New Images to use (if referenced in instructions):
  {{#each newImages}}
  - Image {{add @index 1}}: {{media url=this}}
  {{/each}}
  {{/if}}

  {{#if deepEditInstructions}}
  Deep Edit Instructions: Apply these specific changes carefully:
  {{{deepEditInstructions}}}
  {{/if}}

  Apply the changes as requested and return the newly edited PDF as a data URI.
  `,
});

const editPdfFlow = ai.defineFlow(
  {
    name: 'editPdfFlow',
    inputSchema: EditPdfInputSchema,
    outputSchema: EditPdfOutputSchema,
  },
  async input => {
    // In a real-world scenario, we might have more complex logic here to handle
    // multi-step edits or validation before calling the prompt.
    const {output} = await editPdfPrompt(input);
    return output!;
  }
);

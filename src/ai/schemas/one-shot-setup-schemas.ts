
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

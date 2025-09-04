'use server';

/**
 * @fileOverview A flow that rebrands a brochure with personal details, company logo, and chosen branding elements.
 *
 * - rebrandBrochure - A function that handles the brochure rebranding process.
 * - RebrandBrochureInput - The input type for the rebrandBrochure function.
 * - RebrandBrochureOutput - The return type for the rebrandBrochure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const RebrandBrochureInputSchema = z.object({
  brochureDataUri: z
    .string()
    .describe(
      "A brochure document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  contactDetails: z.string().describe('The contact details of the user.'),
  companyName: z.string().describe('The name of the user or company.'),
  companyLogoDataUri: z
    .string()
    .optional()
    .describe(
      "The company logo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. If not provided, a logo will be generated."
    ),
  toneOfVoice: z.string().describe('The desired tone of voice for the brochure.'),
  colors: z.string().describe('The desired colors for the brochure.'),
});

export type RebrandBrochureInput = z.infer<typeof RebrandBrochureInputSchema>;

const RebrandBrochureOutputSchema = z.object({
  rebrandedBrochureDataUri: z
    .string()
    .describe(
      "The rebranded brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  logoDataUri: z
    .string()
    .optional()
    .describe(
      "The generated logo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Only present if a logo was generated."
    ),
});

export type RebrandBrochureOutput = z.infer<typeof RebrandBrochureOutputSchema>;

export async function rebrandBrochure(
  input: RebrandBrochureInput
): Promise<RebrandBrochureOutput> {
  return rebrandBrochureFlow(input);
}

const rebrandBrochurePrompt = ai.definePrompt({
  name: 'rebrandBrochurePrompt',
  input: {schema: RebrandBrochureInputSchema},
  output: {schema: RebrandBrochureOutputSchema},
  prompt: `You are an expert marketing assistant specializing in rebranding brochures.

You will rebrand the brochure provided with the user's contact details, company logo, and chosen branding elements.

If the user doesn't provide a company logo, you will generate one based on the company name and branding elements. Try to create a simple and memorable logo. Return the logo as a data URI.

Use the following information to rebrand the brochure:

Contact Details: {{{contactDetails}}}
Company Name: {{{companyName}}}
Company Logo: {{#if companyLogoDataUri}}{{media url=companyLogoDataUri}}{{else}}Generate a logo based on the company name and branding elements.{{/if}}
Tone of Voice: {{{toneOfVoice}}}
Colors: {{{colors}}}

Brochure: {{media url=brochureDataUri}}

Output the rebranded brochure as a data URI.
{
 rebrandedBrochureDataUri: dataUri,
 logoDataUri: dataUri, // only if a logo was generated
}
`,
});

const generateLogo = ai.defineFlow(
  {
    name: 'generateLogo',
    inputSchema: z.object({
      companyName: z.string().describe('The name of the company.'),
      toneOfVoice: z.string().describe('The desired tone of voice for the brochure.'),
      colors: z.string().describe('The desired colors for the brochure.'),
    }),
    outputSchema: z.object({
      logoDataUri: z.string().describe(
        "The generated logo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
    }),
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a simple and memorable logo for the company "${input.companyName}" with the tone of voice "${input.toneOfVoice}" and colors "${input.colors}".`,
    });
    return {logoDataUri: media.url!};
  }
);

const rebrandBrochureFlow = ai.defineFlow(
  {
    name: 'rebrandBrochureFlow',
    inputSchema: RebrandBrochureInputSchema,
    outputSchema: RebrandBrochureOutputSchema,
  },
  async input => {
    let logoDataUri: string | undefined = input.companyLogoDataUri;

    if (!logoDataUri) {
      const logoResult = await generateLogo({
        companyName: input.companyName,
        toneOfVoice: input.toneOfVoice,
        colors: input.colors,
      });
      logoDataUri = logoResult.logoDataUri;
    }

    const {output} = await rebrandBrochurePrompt({
      ...input,
      companyLogoDataUri: logoDataUri,
    });

    return {
      rebrandedBrochureDataUri: output!.rebrandedBrochureDataUri,
      logoDataUri: logoDataUri,
    };
  }
);

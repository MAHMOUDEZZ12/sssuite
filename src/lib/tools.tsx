

import React from 'react';
import { Toast } from '@/components/ui/toast';

// AI Flow Imports
import { generateAdFromBrochure } from '@/ai/flows/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/suggest-targeting-options';
import { editPdf } from '@/ai/flows/edit-pdf';
import { matchInvestors } from '@/ai/flows/match-investors';


// Import the client-safe tools definition
import { tools as clientTools } from './tools-client';

export const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const filesToDataUris = (files: FileList | null): Promise<string[]> => {
    if (!files) return Promise.resolve([]);
    return Promise.all(Array.from(files).map(fileToDataUri));
};

// Map server-side functions to the client-safe tools definition
const flowRunnerMap: { [key: string]: (data: any) => Promise<any> } = {
    'ad-creation': generateAdFromBrochure,
    'targeting': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor': editPdf,
    'landing-pages': generateLandingPage,
    'social-posts': generateSocialPost,
    'investor-matching': matchInvestors,
    // Add other flow runners here as they are created
};

export const tools = clientTools.map(tool => {
    if (flowRunnerMap[tool.id]) {
        return {
            ...tool,
            flowRunner: flowRunnerMap[tool.id],
        };
    }
    return tool;
});

// Re-export client-safe types and components for use in server components if needed
export * from './tools-client';

    
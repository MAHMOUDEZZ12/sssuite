

// AI Flow Imports
import { generateAdFromBrochure } from '@/ai/flows/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/suggest-targeting-options';
import { editPdf } from '@/ai/flows/edit-pdf';
import { matchInvestors } from '@/ai/flows/match-investors';
import { aiBrandCreator } from '@/ai/flows/ai-brand-creator';
import { generateMarketReport } from '@/ai/flows/generate-market-report';


// Import the client-safe tools definition
import { tools as clientTools } from './tools-client';

// Map server-side functions to the client-safe tools definition
const flowRunnerMap: { [key: string]: (data: any) => Promise<any> } = {
    'ad-creation': generateAdFromBrochure,
    'targeting': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor': editPdf,
    'landing-pages': generateLandingPage,
    'social-posts': generateSocialPost,
    'investor-matching': matchInvestors,
    'ai-brand-creator': aiBrandCreator,
    'market-reports': generateMarketReport,
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

    

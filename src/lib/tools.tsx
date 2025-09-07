

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
import { generateListing } from '@/ai/flows/generate-listing';
import { generateStory } from '@/ai/flows/generate-story';
import { generateReel } from '@/ai/flows/generate-reel';
import { generateTikTokVideo } from '@/ai/flows/generate-tiktok-video';
import { getCrmMemory } from '@/ai/flows/get-crm-memory';
import { manageSocialPage } from '@/ai/flows/manage-social-page';
import { generateMultiOffer } from '@/ai/flows/generate-multi-offer';
import { createEmailCampaign } from '@/ai/flows/create-email-campaign';
import { manageWhatsAppCampaign } from '@/ai/flows/manage-whatsapp-campaign';
import { createMetaCampaign } from '@/ai/flows/create-meta-campaign';
import { syncPropertyFinderListing } from '@/ai/flows/sync-property-finder-listing';
import { syncBayutListing } from '@/ai/flows/sync-bayut-listing';


// Import the client-safe tools definition
import { tools as clientTools } from './tools-client';

// Map server-side functions to the client-safe tools definition
const flowRunnerMap: { [key: string]: (data: any) => Promise<any> } = {
    'insta-ads-designer': generateAdFromBrochure,
    'audience-creator': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor': editPdf,
    'landing-pages': generateLandingPage,
    'instagram-content-creator': generateSocialPost,
    'investor-matching': matchInvestors,
    'ai-brand-creator': aiBrandCreator,
    'market-reports': generateMarketReport,
    'property-finder-listing-ai': generateListing,
    'bayut-listing-ai': generateListing,
    'dubizzle-listing-ai': generateListing,
    'story-planner-ai': generateStory,
    'reel-ads-ai': generateReel,
    'tiktok-editor': generateTikTokVideo,
    'crm-assistant': getCrmMemory,
    'instagram-admin-ai': manageSocialPage,
    'offer-generator': generateMultiOffer,
    'email-creator': createEmailCampaign,
    'whatsapp-campaigns': manageWhatsAppCampaign,
    'meta-ads-copilot': createMetaCampaign,
    'facebook-ads-ai': generateAdFromBrochure,
    'propertyfinder-sync': syncPropertyFinderListing,
    'bayut-sync': syncBayutListing,
    // Note: Tools without a flowRunner will not be executable from the generic tool page.
    // They might be handled by custom pages or are for display only.
};

export const tools = clientTools.map(tool => {
    // Only add a flowRunner if one exists in the map
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

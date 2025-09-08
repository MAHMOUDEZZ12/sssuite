
'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Import all flow functions directly here
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
import { generatePaymentPlan } from '@/ai/flows/generate-payment-plan';
import { translateBrochure } from '@/ai/flows/translate-brochure';
import { editYoutubeVideo } from '@/ai/flows/edit-youtube-video';

const runToolSchema = z.object({
  toolId: z.string(),
  payload: z.any(),
});

const flowRunnerMap: { [key: string]: (payload: any) => Promise<any> } = {
    'insta-ads-designer': generateAdFromBrochure,
    'facebook-ads-ai': generateAdFromBrochure,
    'ad-creation': generateAdFromBrochure,
    'audience-creator': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor': editPdf,
    'landing-pages': generateLandingPage,
    'instagram-content-creator': generateSocialPost,
    'instagram-hashtags-ai': generateSocialPost,
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
    'propertyfinder-sync': syncPropertyFinderListing,
    'bayut-sync': syncBayutListing,
    'payment-planner': generatePaymentPlan,
    'brochure-translator': translateBrochure,
    'youtube-video-editor': editYoutubeVideo,
    'commission-calculator': (payload) => Promise.resolve(payload),
};

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    const validation = runToolSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.formErrors }, { status: 400 });
    }

    const { toolId, payload } = validation.data;
    
    const runner = flowRunnerMap[toolId];
    if (!runner) {
      return NextResponse.json({ error: `Tool with id "${toolId}" not found.` }, { status: 404 });
    }

    const result = await runner(payload);
    return NextResponse.json(result);

  } catch (e: any) {
    const errorMessage = e.message || 'An unexpected error occurred.';
    const toolIdMessage = body?.toolId ? ` in tool ${body.toolId}` : '';
    console.error(`Error running tool${toolIdMessage}: ${errorMessage}`, e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

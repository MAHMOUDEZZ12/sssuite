
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = runToolSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.formErrors }, { status: 400 });
    }

    const { toolId, payload } = validation.data;
    
    let result;

    switch (toolId) {
        case 'insta-ads-designer':
        case 'facebook-ads-ai':
            result = await generateAdFromBrochure(payload);
            break;
        case 'audience-creator':
            result = await suggestTargetingOptions(payload);
            break;
        case 'rebranding':
            result = await rebrandBrochure(payload);
            break;
        case 'pdf-editor':
            result = await editPdf(payload);
            break;
        case 'landing-pages':
            result = await generateLandingPage(payload);
            break;
        case 'instagram-content-creator':
            result = await generateSocialPost(payload);
            break;
        case 'investor-matching':
            result = await matchInvestors(payload);
            break;
        case 'ai-brand-creator':
            result = await aiBrandCreator(payload);
            break;
        case 'market-reports':
            result = await generateMarketReport(payload);
            break;
        case 'property-finder-listing-ai':
        case 'bayut-listing-ai':
        case 'dubizzle-listing-ai':
            result = await generateListing(payload);
            break;
        case 'story-planner-ai':
            result = await generateStory(payload);
            break;
        case 'reel-ads-ai':
            result = await generateReel(payload);
            break;
        case 'tiktok-editor':
            result = await generateTikTokVideo(payload);
            break;
        case 'crm-assistant':
            result = await getCrmMemory(payload);
            break;
        case 'instagram-admin-ai':
            result = await manageSocialPage(payload);
            break;
        case 'offer-generator':
            result = await generateMultiOffer(payload);
            break;
        case 'email-creator':
            result = await createEmailCampaign(payload);
            break;
        case 'whatsapp-campaigns':
            result = await manageWhatsAppCampaign(payload);
            break;
        case 'meta-ads-copilot':
            result = await createMetaCampaign(payload);
            break;
        case 'propertyfinder-sync':
            result = await syncPropertyFinderListing(payload);
            break;
        case 'bayut-sync':
            result = await syncBayutListing(payload);
            break;
        case 'payment-planner':
            result = await generatePaymentPlan(payload);
            break;
        case 'brochure-translator':
            result = await translateBrochure(payload);
            break;
        case 'youtube-video-editor':
            result = await editYoutubeVideo(payload);
            break;
        case 'commission-calculator':
            result = await Promise.resolve(payload);
            break;
        default:
            return NextResponse.json({ error: `Tool with id "${toolId}" not found.` }, { status: 404 });
    }

    return NextResponse.json(result);

  } catch (e: any) {
    console.error(`Error running tool: ${e.message}`, e);
    const errorMessage = e.message || 'An unexpected error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2,
  Sparkles,
  Clock,
  Briefcase,
  PenTool,
  MessageCircle,
  Mail,
  Wallet,
  MapPin,
  ClipboardList,
  FilePlus,
  Network,
  Building,
  Video,
  FileText,
  Search,
  Contact,
  UserPlus,
  Film,
  UserCog,
  Database,
  Clapperboard,
  Link as LinkIcon,
  Users2,
  Clock2,
  BadgeCheck,
  Phone,
  Upload,
  Copy,
  Download,
  Binoculars,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// AI Flow Imports
import { generateAdFromBrochure } from '@/ai/flows/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/suggest-targeting-options';
import { editPdf } from '@/ai/flows/edit-pdf';
import { matchInvestors } from '@/ai/flows/match-investors';

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

const copyToClipboard = (text: string, toast: any) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The text has been copied successfully.",
    });
};

export type Field = {
  id: string;
  name: string;
  type: 'text' | 'file' | 'textarea' | 'select' | 'button' | 'number' | 'group-header';
  placeholder?: string;
  description: string;
  options?: string[];
  multiple?: boolean;
  cta?: string;
};

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  cta: string;
  categories: string[];
  backsideValue: string;
  details: {
    steps: { text: string; icon: React.ReactElement }[];
    aiVsManual: {
      metric: string;
      manual: string;
      ai: string;
      icon: React.ReactElement;
    }[];
    synergy: { tool: string; benefit: string }[];
    faqs: { question: string; answer: string }[];
  };
  creationFields: Field[];
  flowRunner?: (data: any) => Promise<any>;
  renderResult?: (result: any, toast: any) => React.ReactNode;
};

export const tools: Tool[] = [
  {
    id: 'ad-creation',
    title: 'Instant Ad Creation',
    description: 'Generate high-performance ad copy, visuals, and flyers from any brochure in seconds.',
    icon: <Target />,
    color: '#ec4899', // pink-500
    cta: 'Ad',
    categories: ['Creative', 'Ads'],
    backsideValue: "Turn a brochure into a campaign.",
    flowRunner: generateAdFromBrochure,
    renderResult: (result, toast) => (
       <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Copy</h3>
            <div className="p-4 bg-muted rounded-md relative group">
              <p className="whitespace-pre-wrap">{result.adCopy}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Design</h3>
            <Image src={result.adDesign} alt="Generated ad design" width={500} height={500} className="rounded-lg border" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Landing Page Preview</h3>
            <Image src={result.landingPage} alt="Generated landing page" width={500} height={500} className="rounded-lg border" />
          </div>
        </div>
    ),
    details: {
      steps: [
          { text: 'Upload your property brochure (PDF)', icon: <FileUp className="h-6 w-6" /> },
          { text: 'Select a focus (e.g., "luxury", "family")', icon: <Target className="h-6 w-6" /> },
          { text: 'Generate multiple ad variants instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '5-10 hours per campaign', ai: 'Under 60 seconds', icon: <Clock2 /> },
        { metric: 'Cost & Resources', manual: 'Requires copywriter & designer', ai: 'Included in your subscription', icon: <Wallet /> },
        { metric: 'Quality & Testing', manual: 'Relies on guesswork, 1-2 variations', ai: 'Data-driven, 5+ variations to test', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Precision Targeting", benefit: "Ensure your perfect ads are seen by people ready to buy." },
        { tool: "AI Page Admin", benefit: "Deploy your new ad across social channels to maximize reach." }
      ],
       faqs: [
        { question: "What kind of brochures can I use?", answer: "You can upload almost any standard PDF brochure from a developer or your own marketing materials. The AI is designed to extract key information like floor plans, features, and location." },
        { question: "Can I edit the ads after they are generated?", answer: "Absolutely. The AI-generated content serves as a powerful starting point. You can then tweak the copy, headlines, and calls-to-action to perfectly match your voice and campaign goals." },
        { question: "How are the ad visuals created?", answer: "The AI uses a combination of stock imagery, design templates, and an understanding of your brand's color palette to create visually appealing and effective ad graphics. You can also provide your own images for the AI to incorporate." }
      ],
    },
    creationFields: [
      { id: 'brochureDataUri', name: 'Property Brochure', type: 'file', description: 'Upload the PDF brochure for the property.' },
      { id: 'focusArea', name: 'Ad Focus', type: 'select', options: ['Luxury & Prestige', 'Family-Friendly', 'Investment Opportunity', 'Modern & Urban', 'First-Time Buyer'], placeholder: 'Select the ad\'s main angle', description: 'What key aspect should the ad highlight?' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Exciting', 'Welcoming', 'Urgent', 'Sophisticated'], placeholder: 'Select a tone', description: 'Set the tone for the ad copy.' },
      { id: 'additionalInformation', name: 'Additional Information', type: 'textarea', placeholder: 'e.g., "Limited time offer: 2 years of condo fees waived."', description: 'Add any other key details or offers. (Optional)' },
      { id: 'brand-redirect', name: 'Brand Assets', type: 'button', cta: 'Go to My Brand', description: 'The AI uses your saved brand assets (logo, colors). Click here to set them up.' },
    ],
  },
  {
    id: 'targeting',
    title: 'Precision Targeting',
    description: 'Our AI analyzes your project and identifies high-intent buyers before they even search.',
    icon: <Binoculars />,
    color: '#3b82f6', // blue-600
    cta: 'Targeting Profile',
    categories: ['Lead Gen', 'Ads'],
    backsideValue: "Find your buyers before they find you.",
    flowRunner: suggestTargetingOptions,
    renderResult: (result, toast) => (
      <div>
        <h3 className="font-semibold text-lg mb-2">Suggested Targeting Options</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.suggestedTargetingOptions}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.suggestedTargetingOptions, toast)}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Describe your ideal buyer persona', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Provide details about the property', icon: <Building className="h-6 w-6" /> },
        { text: 'Get detailed audience settings for ads', icon: <ClipboardList className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Audience Discovery', manual: 'Broad guessing (e.g., "Age 30-50")', ai: 'Niche, high-intent segments', icon: <Users2 /> },
        { metric: 'Time to Research', manual: 'Hours of market research', ai: 'Under 30 seconds', icon: <Clock2 /> },
        { metric: 'Budget Efficiency', manual: 'High waste on wrong audiences', ai: 'Optimized ad spend, higher ROI', icon: <Wallet /> },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Design the perfect ad for the high-intent audience you\'ve just identified." },
        { tool: "AI Social Post Writer", benefit: "Create organic posts that speak directly to the interests of your target persona." }
      ],
       faqs: [
        { question: "What platforms can I use these audiences on?", answer: "Our targeting suggestions are optimized for major platforms like Facebook, Instagram, and Google Ads. We provide you with the exact interests, demographics, and keywords to input." },
        { question: "How does the AI know who is a 'high-intent' buyer?", answer: "The AI analyzes anonymous data signals such as recent searches for mortgage calculators, activity in moving-related forums, and engagement with real estate content to identify users who are actively in the market." },
        { question: "Is this compliant with privacy regulations?", answer: "Yes. The system uses anonymized, aggregated data and adheres to all privacy regulations. It identifies audience *patterns* and *segments*, not individuals." }
      ],
    },
    creationFields: [
      { id: 'group-property', name: 'Property Details', type: 'group-header', description: 'Tell the AI about the property you\'re marketing.' },
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Williamsburg, Brooklyn, NY"', description: 'The target city or neighborhood. Be specific for best results.' },
      { id: 'propertyType', name: 'Property Type', type: 'select', options: ["Single-Family Home", "Condo", "Townhouse", "Multi-Family", "Land"], placeholder: 'Select property type', description: 'The type of property being sold.' },
      { id: 'minPrice', name: 'Min Price', type: 'number', placeholder: 'e.g., 500000', description: 'Minimum property price.' },
      { id: 'maxPrice', name: 'Max Price', type: 'number', placeholder: 'e.g., 1200000', description: 'Maximum property price.' },
      { id: 'amenities', name: 'Key Amenities', type: 'text', placeholder: 'e.g., Pool, Gym, Waterfront', description: 'List main features, comma-separated.' },
      
      { id: 'group-audience', name: 'Audience Persona', type: 'group-header', description: 'Describe your ideal buyer.' },
      { id: 'minAge', name: 'Min Age', type: 'number', placeholder: 'e.g., 30', description: 'Minimum target age.' },
      { id: 'maxAge', name: 'Max Age', type: 'number', placeholder: 'e.g., 55', description: 'Maximum target age.' },
      { id: 'incomeLevel', name: 'Income Level', type: 'select', options: ["Starter", "Mid-Range", "High Earner", "Affluent", "Ultra-High-Net-Worth"], placeholder: 'Select income level', description: 'Financial status of the audience.' },

      { id: 'group-advanced', name: 'Advanced Targeting', type: 'group-header', description: 'Add specific interests to refine the AI\'s suggestions.' },
      { id: 'interests', name: 'Audience Interests', type: 'text', placeholder: 'e.g., Golf, Luxury Cars, Tech Startups', description: 'List interests, comma-separated.' },
    ],
  },
  {
    id: 'rebranding',
    title: 'Automated Rebranding',
    description: 'Instantly rebrand any brochure with your logo, colors, and contact info.',
    icon: <Palette />,
    color: '#f97316', // orange-600
    cta: 'Rebranded Brochure',
    categories: ['Creative', 'Editing'],
    backsideValue: "Make any brochure your own in one click.",
    flowRunner: rebrandBrochure,
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Rebranded Brochure</h3>
          <a href={result.rebrandedBrochureDataUri} download="rebranded-brochure.pdf">
              <Button><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
          </a>
        </div>
        {result.logoDataUri && (
           <div>
              <h3 className="font-semibold text-lg mb-2">Generated Logo</h3>
              <Image src={result.logoDataUri} alt="Generated logo" width={200} height={200} className="rounded-lg border bg-white p-2" />
           </div>
        )}
      </div>
    ),
    details: {
      steps: [
        { text: 'Upload any developer\'s brochure (PDF)', icon: <Upload className="h-6 w-6" /> },
        { text: 'Provide your logo & contact info', icon: <FilePlus className="h-6 w-6" /> },
        { text: 'Download the rebranded brochure instantly', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
         { metric: 'Time to Rebrand', manual: '2-4 hours in design software', ai: 'Under 1 minute', icon: <Clock2 /> },
         { metric: 'Required Skill', manual: 'Proficiency in Adobe InDesign/Canva', ai: 'Ability to upload a file', icon: <Sparkles /> },
         { metric: 'Consistency', manual: 'Prone to human error and typos', ai: 'Perfectly consistent every time', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Use your newly rebranded brochure to power an ad campaign." },
        { tool: "Landing Page Generator", benefit: "Generate a branded landing page that perfectly matches your rebranded brochure." }
      ],
       faqs: [
        { question: "Will this work with any PDF?", answer: "It works best with text-based PDFs, which are standard for most property brochures. It may be less effective on image-only PDFs or scans." },
        { question: "What if I don't have a logo?", answer: "No problem. The tool can generate a professional logo for you based on your company name and brand colors, or simply add your name and contact information in a clean format." },
        { question: "Can it change the text to match my 'brand voice'?", answer: "Yes. You can specify a tone (e.g., 'professional,' 'friendly,' 'luxurious'), and the AI can subtly adjust headings and key phrases to align with your brand's voice." }
      ],
    },
    creationFields: [
      { id: 'brochureDataUri', name: 'Developer Brochure', type: 'file', description: 'Upload the original PDF.' },
      { id: 'companyLogoDataUri', name: 'Your Logo', type: 'file', description: 'Upload your personal or company logo (PNG, JPG). Optional.' },
      { id: 'brand-redirect', name: 'Brand Assets', type: 'button', cta: 'Go to My Brand', description: 'The AI uses your saved brand assets. Click here to set them up.' },
    ],
  },
   {
    id: 'pdf-editor',
    title: 'AI PDF Editor',
    description: 'Edit text, swap images, and update layouts in any PDF brochure with simple commands.',
    icon: <PenTool />,
    color: '#eab308', // yellow-500
    cta: 'Edited PDF',
    categories: ['Creative', 'Editing'],
    backsideValue: "Edit the uneditable, instantly.",
    flowRunner: editPdf,
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-lg mb-2">Edited PDF</h3>
            <a href={result.editedPdfDataUri} download="edited.pdf">
                <Button><Download className="mr-2 h-4 w-4"/>Download Edited PDF</Button>
            </a>
        </div>
    </div>
    ),
    details: {
      steps: [
        { text: 'Upload your PDF document', icon: <Upload className="h-6 w-6" /> },
        { text: 'Tell the AI what to change in plain English', icon: <MessageCircle className="h-6 w-6" /> },
        { text: 'Download your edited PDF instantly', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
         { metric: 'Time to Edit', manual: 'Hours finding source files or using clunky editors', ai: 'Under 2 minutes with simple commands', icon: <Clock2 /> },
         { metric: 'Software Cost', manual: 'Requires expensive Acrobat Pro subscription', ai: 'Included in your suite', icon: <Wallet /> },
         { metric: 'Ease of Use', manual: 'Complex tools and formatting issues', ai: 'As easy as sending a text message', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Automated Rebranding", benefit: "After rebranding a brochure, use the editor to make final tweaks to pricing or contact info." },
        { tool: "Listing Details Generator", benefit: "Generate a new listing description and then use the editor to paste it into your existing brochure." }
      ],
       faqs: [
        { question: "Can it change complex layouts?", answer: "For best results, focus on targeted edits like text, images, and colors. While the AI can make layout adjustments, complex redesigns are better suited for the Landing Page Generator." },
        { question: "What if the PDF is just an image?", answer: "The AI's OCR (Optical Character Recognition) capabilities can often identify and replace text even in image-based PDFs, but results are best with text-based documents." },
        { question: "Can it edit a 50-page document?", answer: "Yes, though processing time will increase with the document's length and complexity. For very large documents, it's best to specify the page numbers you want to edit in your instructions." }
      ],
    },
    creationFields: [
      { id: 'sourcePdf', name: 'Source PDF', type: 'file', description: 'Upload the PDF you want to edit.' },
      { id: 'editInstructions', name: 'Editing Instructions', type: 'textarea', placeholder: '- Change the main contact name to "Jane Smith".\n- Replace the hero image with the one I uploaded.\n- Update the completion date to "Fall 2025".', description: 'Be specific. The more detailed your command, the better the result.' },
      { id: 'newImages', name: 'New Images (Optional)', type: 'file', multiple: true, description: 'Only upload images if your instructions refer to them.' },
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Generator',
    description: 'Generate persuasive, high-converting landing pages that captivate buyers.',
    icon: <LayoutTemplate />,
    color: '#22c55e', // green-500
    cta: 'Landing Page',
    categories: ['Creative', 'Web'],
    backsideValue: "Create a stunning property website in 60 seconds.",
    flowRunner: generateLandingPage,
    renderResult: (result, toast) => (
      <div>
          <h3 className="font-semibold text-lg mb-2">Landing Page HTML</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <pre className="whitespace-pre-wrap text-sm">{result.landingPageHtml}</pre>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.landingPageHtml, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Provide a property brochure or link', icon: <LinkIcon className="h-6 w-6" /> },
        { text: 'Specify your branding preferences', icon: <Palette className="h-6 w-6" /> },
        { text: 'Generate a complete landing page', icon: <LayoutTemplate className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Build', manual: '1-2 days using a website builder', ai: 'Under 60 seconds', icon: <Clock2 /> },
        { metric: 'Technical Skill', manual: 'Requires web design & dev knowledge', ai: 'None. Just provide the source.', icon: <Sparkles /> },
        { metric: 'Features', manual: 'Lead forms, galleries added manually', ai: 'All features included automatically', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Generate promotional posts to drive traffic to your new landing page." },
        { tool: "Instant Ad Creation", benefit: "Run a targeted ad campaign that clicks through to your beautiful new page." }
      ],
       faqs: [
        { question: "Can I use my own domain name?", answer: "Yes, you can connect your own custom domain name to the landing pages you create, ensuring a fully branded experience for your visitors." },
        { question: "Are the landing pages mobile-friendly?", answer: "Absolutely. Every landing page generated is fully responsive and looks great on all devices, from desktops to smartphones." },
        { question: "Is it optimized for SEO?", answer: "Yes. The AI automatically generates SEO-friendly titles, meta descriptions, and image alt-tags to help your page rank better on search engines." }
      ],
    },
    creationFields: [
      { id: 'projectBrochureDataUri', name: 'Upload Brochure', type: 'file', description: 'Upload a PDF brochure as the source.' },
      { id: 'inspirationImageDataUri', name: 'Inspiration Image (Optional)', type: 'file', description: 'Upload a screenshot of a website you like to guide the style.' },
      { id: 'projectName', name: 'Project Name', type: 'text', placeholder: 'e.g., "The Azure Lofts"', description: 'The name of the project.'},
      { id: 'projectDetails', name: 'Project Details', type: 'textarea', placeholder: 'e.g., "Luxury condos with ocean views..."', description: 'Detailed info about the project.'},
      { id: 'brandingStyle', name: 'Branding Style', type: 'select', options: ["Modern & Minimalist", "Luxury & Elegant", "Cozy & Welcoming", "Bold & Colorful"], placeholder: 'Select a branding style', description: 'Describe the desired look and feel.' },
    ],
  },
  {
    id: 'social-posts',
    title: 'AI Social Post Writer',
    description: "Generate a week's worth of social content from a single link or topic.",
    icon: <Share2 />,
    color: '#e11d48', // rose-600
    cta: 'Social Post',
    categories: ['Social & Comms', 'Creative'],
    backsideValue: "Never run out of content ideas again.",
    flowRunner: generateSocialPost,
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Post Content</h3>
           <div className="p-4 bg-muted rounded-md relative group">
              <p className="whitespace-pre-wrap">{result.postContent}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.postContent, toast)}><Copy className="h-4 w-4" /></Button>
           </div>
        </div>
         <div>
          <h3 className="font-semibold text-lg mb-2">Hashtags</h3>
           <div className="p-4 bg-muted rounded-md relative group">
              <p>{result.hashtags.join(' ')}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.hashtags.join(' '), toast)}><Copy className="h-4 w-4" /></Button>
           </div>
        </div>
         <div>
          <h3 className="font-semibold text-lg mb-2">Image Suggestion</h3>
          <p className="p-4 bg-muted rounded-md">{result.imageSuggestion}</p>
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Enter a topic, URL, or property address', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Choose your platforms (e.g., FB, IG)', icon: <Share2 className="h-6 w-6" /> },
        { text: 'Get a week of content with images & hashtags', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Content Creation Time', manual: '2-3 hours for a week\'s content', ai: 'Under 1 minute', icon: <Clock2 /> },
        { metric: 'Creativity', manual: 'Struggles with writer\'s block', ai: 'Generates endless creative angles', icon: <Sparkles /> },
        { metric: 'Completeness', manual: 'Forgets hashtags or image ideas', ai: 'Includes text, hashtags, and visuals', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "AI Page Admin", benefit: "Automatically schedule your newly generated posts for maximum engagement." },
        { tool: "Landing Page Generator", benefit: "Create a page for a new listing and then use this tool to generate promotional posts for it." }
      ],
       faqs: [
        { question: "What kind of topics work best?", answer: "You can use local market news, articles about home improvement, community events, or even just a property address. The more specific the source, the more tailored the content." },
        { question: "Can it generate an email newsletter?", answer: "Yes! You can specify 'Email Newsletter' as a platform, and the AI will generate subject lines, engaging body copy, and clear calls-to-action suitable for an email campaign." },
        { question: "Can I review the posts before they are published?", answer: "Of course. The AI generates the posts and saves them as drafts. You have full editorial control to review, edit, and approve every post before it goes live." }
      ],
    },
    creationFields: [
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic, e.g., "Market update for downtown"', description: 'The AI will use this as inspiration.' },
      { id: 'platform', name: 'Platform', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)', 'Email Newsletter'], placeholder: 'Select a platform', description: 'Tailor the posts for specific platforms.' },
      { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Humorous', 'Informative'], placeholder: 'Select a tone', description: 'Set the mood for your posts.' },
    ],
  },
  {
    id: 'story-designer',
    title: 'AI Story Designer',
    description: 'Craft compelling, animated stories for Instagram and Facebook in seconds.',
    icon: <Film />,
    color: '#a855f7', // fuchsia-500
    cta: 'Story',
    categories: ['Creative', 'Social & Comms'],
    backsideValue: "Create thumb-stopping animated stories.",
    details: {
      steps: [
        { text: 'Upload 3-5 property photos', icon: <Upload className="h-6 w-6" /> },
        { text: 'Choose a vibe (e.g., "Modern", "Luxury")', icon: <Palette className="h-6 w-6" /> },
        { text: 'Generate multiple story variants to post', icon: <Clapperboard className="h-6 w-6" /> },
      ],
      aiVsManual: [
         { metric: 'Design Time', manual: '15-30 minutes per story in Canva', ai: 'Under 60 seconds for 3-5 variants', icon: <Clock2 /> },
         { metric: 'Design Skill', manual: 'Requires a good eye for design', ai: 'Professional designs, automatically', icon: <Sparkles /> },
         { metric: 'Visual Appeal', manual: 'Static templates', ai: 'Dynamic animations & trending effects', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Get caption ideas for your story to make it even more engaging." },
        { tool: "AI Page Admin", benefit: "Schedule your new story to post at the perfect time for maximum views." }
      ],
       faqs: [
        { question: "Can I add music?", answer: "Yes. The AI suggests royalty-free music that matches the 'vibe' you select. You can also upload your own audio tracks." },
        { question: "Is my branding automatically added?", answer: "Yes, once you set up your brand kit with your logo and colors, the AI automatically incorporates them into every story design." },
        { question: "Can I customize the text and images?", answer: "Absolutely. The AI provides a finished product as a starting point. You have full control to edit the text, swap out images, and change the animations." }
      ],
    },
    creationFields: [
      { id: 'photos', name: 'Property Photos', type: 'file', multiple: true, description: 'Upload 3-5 high-quality images.' },
      { id: 'vibe', name: 'Story Vibe', type: 'select', options: ['Upbeat & Modern', 'Elegant & Luxurious', 'Cozy & Warm', 'Dramatic & Cinematic'], placeholder: 'Select a vibe', description: 'This influences music, text, and effects.' },
      { id: 'callToAction', name: 'Call to Action', type: 'select', options: ["Swipe Up for Tour", "DM for Info", "See Link in Bio", "New Listing Alert!", "Save This Post"], placeholder: 'Select a call to action', description: 'The final text prompt for viewers.' },
    ],
  },
  {
    id: 'reel-designer',
    title: 'AI Reel Designer',
    description: 'Create professional video reels from photos and text effortlessly, with auto-captions.',
    icon: <Clapperboard />,
    color: '#8b5cf6', // violet-500
    cta: 'Reel',
    categories: ['Creative', 'Social & Comms', 'Editing'],
    backsideValue: "Turn photos into professional video reels.",
    details: {
      steps: [
        { text: 'Upload photos or video clips', icon: <Video className="h-6 w-6" /> },
        { text: 'Provide key selling points as text', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Get a polished reel synced to trending audio', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Editing Time', manual: 'Hours of complex timeline editing', ai: 'Under 3 minutes', icon: <Clock2 /> },
        { metric: 'Audio', manual: 'Difficult to find trending audio', ai: 'Synced automatically to licensed audio', icon: <Sparkles /> },
        { metric: 'Pacing & Effects', manual: 'Hard to get right', ai: 'Intelligently paced with effects', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Promote your final reel with a targeted ad campaign to reach thousands." },
        { tool: "AI Page Admin", benefit: "Share your reel with the Page Admin for automatic posting at peak times." }
      ],
       faqs: [
        { question: "Does the AI choose the music?", answer: "Yes, the AI analyzes your footage and selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select." },
        { question: "What if I only have a few photos?", answer: "That's fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects like zooms and pans to make static images feel alive." },
        { question: "Can it add captions automatically?", answer: "Yes. The AI can automatically generate and sync captions (subtitles) for any voiceover or spoken audio in your video, making it more accessible and engaging." }
      ],
    },
    creationFields: [
      { id: 'media', name: 'Photos or Video Clips', type: 'file', multiple: true, description: 'Upload your visual assets.' },
      { id: 'sellingPoints', name: 'Key Selling Points', type: 'textarea', placeholder: '- Breathtaking ocean views\n- Newly renovated kitchen\n- 5 minutes from the beach', description: 'Use bullet points for text overlays in the video.' },
      { id: 'vibe', name: 'Reel Vibe', type: 'select', options: ['High-Energy & Fast', 'Cinematic & Slow', 'Relaxing & Calm', 'Modern & Edgy'], placeholder: 'Select a vibe', description: 'This influences the music and editing style.' },
    ],
  },
    {
    id: 'tiktok-editor',
    title: 'TikTok Video Editor',
    description: 'Produce viral-ready TikToks with trending sounds and effects in minutes.',
    icon: <Video />,
    color: '#dc2626', // red-600
    cta: 'TikTok',
    categories: ['Creative', 'Social & Comms', 'Editing'],
    backsideValue: "Create TikToks that capture attention.",
    details: {
      steps: [
        { text: 'Upload short video clips or photos', icon: <Upload className="h-6 w-6" /> },
        { text: 'Pick a trending TikTok sound', icon: <Sparkles className="h-6 w-6" /> },
        { text: 'Generate a fast-paced, engaging video', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Edit', manual: '1-2 hours syncing clips to audio', ai: 'Under 5 minutes', icon: <Clock2 /> },
        { metric: 'Trend Analysis', manual: 'Hours scrolling to find trends', ai: 'Identifies trending audio for you', icon: <Sparkles /> },
        { metric: 'Visual Effects', manual: 'Complex editing software needed', ai: 'Applies popular effects automatically', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Social Lead Generation", benefit: "Use your viral TikTok to drive traffic and capture leads directly from the platform." },
        { tool: "AI Page Admin", benefit: "Schedule your new TikTok to post at the optimal time for maximum visibility and engagement." }
      ],
       faqs: [
        { question: "Does the AI suggest what's currently trending on TikTok?", answer: "Yes, our AI constantly analyzes TikTok trends and can suggest popular sounds, effects, and video formats to increase your chances of going viral." },
        { question: "Can I add my own branding?", answer: "Absolutely. You can add your logo as a watermark and ensure the video aligns with your brand's color scheme." },
        { question: "Is the generated video ready to post?", answer: "Yes, the video is generated in the correct vertical aspect ratio (9:16) and is optimized for the TikTok platform. You can download and upload it directly." }
      ],
    },
    creationFields: [
      { id: 'media', name: 'Video Clips or Photos', type: 'file', multiple: true, description: 'Upload your visual assets.' },
      { id: 'sound', name: 'Sound or Vibe', type: 'select', options: ['Upbeat Dance Transition', 'Cinematic Reveal Audio', 'Funny Voiceover Meme', 'Trending Pop Song'], placeholder: 'Select a sound style', description: 'The AI will find or match the audio.' },
      { id: 'textOverlays', name: 'Text Overlays', type: 'textarea', placeholder: '- POV: You found your dream home\n- Wait for the kitchen reveal!', description: 'Add engaging text to your video.' },
    ],
  },
  {
    id: 'page-admin',
    title: 'AI Page Admin',
    description: 'Your personal AI assistant to manage social media pages 24/7.',
    icon: <UserCog />,
    color: '#0891b2', // cyan-600
    cta: 'Page Admin',
    categories: ['Social & Comms', 'Sales Tools'],
    backsideValue: "Put your social media on autopilot.",
    details: {
      steps: [
        { text: 'Connect your Facebook & Instagram pages', icon: <Network className="h-6 w-6" /> },
        { text: 'Set your response preferences & FAQs', icon: <UserCog className="h-6 w-6" /> },
        { text: 'Let the AI handle scheduling and replies 24/7', icon: <Clock className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Weekly Time Spent', manual: '5-10 hours managing pages', ai: 'Minutes to review suggestions', icon: <Clock2 /> },
        { metric: 'Response Time', manual: 'Hours, misses messages overnight', ai: 'Instant, 24/7 responsiveness', icon: <MessageCircle /> },
        { metric: 'Lead Capture', manual: 'Inconsistent, easy to miss', ai: 'Flags high-intent leads automatically', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Create a fully automated content pipeline from idea to publication." },
        { tool: "CRM Memory Assistant", benefit: "When the AI flags a high-intent lead, automatically add them to your CRM with all known details." }
      ],
       faqs: [
        { question: "Can the AI answer complex questions?", answer: "The AI is trained to handle common, factual questions (price, square footage, open house times). For complex or nuanced inquiries, it will intelligently flag the conversation and notify you for personal review." },
        { question: "Can it handle post scheduling?", answer: "Yes, you can approve generated content and the AI will schedule it for optimal posting times based on your audience's activity." },
        { question: "Will it post without my approval?", answer: "You have full control. You can set the AI to be fully autonomous, or have it queue up all posts in a 'drafts' folder for you to approve with one click." }
      ],
    },
    creationFields: [
      { id: 'connect', name: 'Connect Accounts', type: 'button', cta: 'Connect Facebook & Instagram', description: 'Authorize the AI to manage your pages.' },
    ],
  },
  {
    id: 'crm-assistant',
    title: 'CRM Memory Assistant',
    description: 'Your AI brain that remembers every client detail, conversation, and deadline.',
    icon: <Database />,
    color: '#0d9488', // teal-600
    cta: 'Client Record',
    categories: ['Sales Tools'],
    backsideValue: "Remember everything about every client.",
    details: {
      steps: [
        { text: 'Connect your contacts or calendar', icon: <Network className="h-6 w-6" /> },
        { text: 'Ask about any client (e.g., "What did I promise Jane?")', icon: <Search className="h-6 w-6" /> },
        { text: 'Get instant summaries, reminders, and insights', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Recall Speed', manual: 'Minutes searching notes/emails', ai: 'Instantaneous', icon: <Clock2 /> },
        { metric: 'Data Points', manual: 'Relies on what you remember to write down', ai: 'Catches every detail from calls, emails, texts', icon: <Sparkles /> },
        { metric: 'Proactive Reminders', manual: 'You have to set them yourself', ai: 'Nudges you about birthdays, follow-ups', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "AI Sales Dialer", benefit: "Get a full client brief from the assistant moments before the AI places the call." },
        { tool: "Investor Matching", benefit: "The assistant can proactively suggest which clients are a perfect match for a new investment property." }
      ],
       faqs: [
        { question: "Where does the AI get its information?", answer: "The assistant securely integrates with your approved sources, like your Google/Outlook calendar, email, and call logs. All data is kept private and is not used for training other models." },
        { question: "Can it summarize an entire call?", answer: "Yes. After you finish a phone call, the assistant can provide a concise summary, pull out action items, and update the client's record automatically." },
        { question: "Is my client data secure?", answer: "Absolutely. Security is our top priority. All data is encrypted and stored in isolation. Your data is your own and is never shared or viewed." }
      ],
    },
    creationFields: [
      { id: 'clientName', name: 'Client Name', type: 'text', placeholder: 'e.g., "Jane Doe" or "the buyer for 123 Main St"', description: 'Ask about a specific client.' },
      { id: 'query', name: 'Your Question', type: 'textarea', placeholder: 'e.g., "Summarize my last call with her" or "Does she have kids?"', description: 'What do you need to know?' },
    ],
  },
  {
    id: 'lead-generation',
    title: 'Social Lead Generation',
    description: 'Find and engage potential clients on social media before they even start searching.',
    icon: <UserPlus />,
    color: '#0284c7', // sky-600
    cta: 'Lead List',
    categories: ['Lead Gen', 'Social & Comms'],
    backsideValue: "Find leads who don't know they're looking yet.",
    details: {
      steps: [
        { text: 'Define your target area and property type', icon: <MapPin className="h-6 w-6" /> },
        { text: 'AI scans social media for buying signals', icon: <Search className="h-6 w-6" /> },
        { text: 'Get a list of potential leads to engage', icon: <Contact className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Prospecting Time', manual: 'Hours of manual searching and scrolling', ai: 'Automated, continuous monitoring', icon: <Clock2 /> },
        { metric: 'Lead Quality', manual: 'Cold outreach based on profiles', ai: 'Warm leads based on active intent signals', icon: <Sparkles /> },
        { metric: 'Engagement Strategy', manual: 'Generic DMs or comments', ai: 'Suggests personalized conversation starters', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "CRM Memory Assistant", benefit: "Once a lead is identified, create a new profile for them in the CRM instantly." },
        { tool: "AI Social Post Writer", benefit: "Create content that directly targets the interests and pain points of the leads you've discovered." }
      ],
       faqs: [
        { question: "How does the AI find these leads?", answer: "The AI looks for public posts and comments that indicate an intent to move, such as people asking for realtor recommendations, discussing mortgage rates, or talking about wanting more space." },
        { question: "Is this compliant with platform terms of service?", answer: "Yes, the tool only analyzes publicly available data and does not engage in spamming or unauthorized messaging. It provides you with insights to conduct manual, personalized outreach." },
        { question: "Does it give me contact information?", answer: "No, it does not provide private contact information. It identifies public social media profiles of individuals showing intent, and suggests strategies for you to engage with them authentically on the platform." }
      ],
    },
    creationFields: [
      { id: 'area', name: 'Target Area', type: 'text', placeholder: 'e.g., "Downtown Toronto" or "Williamsburg, Brooklyn"', description: 'The geographic area to monitor.' },
      { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., "Luxury condos", "Family homes"', description: 'The type of property your leads would be interested in.' },
      { id: 'platforms', name: 'Social Platforms', type: 'select', options: ["Facebook Groups", "Instagram Hashtags", "Local Reddit Communities", "LinkedIn"], placeholder: 'e.g., "Facebook groups", "Instagram hashtags"', description: 'Where should the AI look for leads?' },
    ],
  },
  {
    id: 'market-reports',
    title: 'Precision Market Reports',
    description: 'Go beyond MLS data. Generate hyper-local reports with AI-powered predictive insights.',
    icon: <LineChart />,
    color: '#f59e0b', // amber-500
    cta: 'Market Report',
    categories: ['Sales Tools', 'Creative'],
    backsideValue: "Become the neighborhood expert overnight.",
    details: {
      steps: [
        { text: 'Enter a neighborhood, zip code, or city', icon: <MapPin className="h-6 w-6" /> },
        { text: 'Select report type (e.g., buyer, seller, investor)', icon: <Search className="h-6 w-6" /> },
        { text: 'Generate a branded, data-rich PDF report', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Create', manual: 'Hours pulling MLS data and designing', ai: 'Under 2 minutes', icon: <Clock2 /> },
        { metric: 'Data Scope', manual: 'Limited to basic MLS stats', ai: 'Includes supply/demand, price trends, sentiment', icon: <Sparkles /> },
        { metric: 'Branding', manual: 'Requires manual design work', ai: 'Automatically branded with your logo & colors', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Landing Page Generator", benefit: "Create a landing page with a lead form to download your hyper-local market report." },
        { tool: "AI Social Post Writer", benefit: "Generate a week's worth of posts summarizing the key findings from your new report." }
      ],
       faqs: [
        { question: "Where does the market data come from?", answer: "Our AI synthesizes data from multiple trusted sources, including public records, MLS data feeds, and local economic indicators to provide a comprehensive and up-to-date market snapshot." },
        { question: "Can I customize the reports?", answer: "Yes, you can add your own commentary, select which sections to include, and ensure your branding is prominently displayed before finalizing the report." },
        { question: "How are these different from standard MLS reports?", answer: "While they use MLS data as a foundation, our AI reports add another layer of insight, analyzing trends, predicting future movements, and presenting the information in a client-friendly, easy-to-understand format." }
      ],
    },
    creationFields: [
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Beverly Hills, CA" or "90210"', description: 'The area you want to analyze.' },
      { id: 'reportFocus', name: 'Report Focus', type: 'text', placeholder: 'e.g., "2-bedroom condos" or "New construction"', description: 'Specify a property type or focus for the report.' },
      { id: 'specificProperty', name: 'Specific Property Address (Optional)', type: 'text', placeholder: 'e.g., 123 Main St, Beverly Hills, CA', description: 'Generate a detailed report for a single listing.' },
    ],
  },
  {
    id: 'investor-matching',
    title: 'Investor Matching',
    description: 'AI-powered tool that matches your investor clients with their perfect properties.',
    icon: <Users2 />,
    color: '#6366f1', // indigo-500
    cta: 'Investor Match',
    categories: ['Lead Gen', 'Sales Tools'],
    backsideValue: "Know which investor to call instantly.",
    flowRunner: matchInvestors,
    renderResult: (result, toast) => (
       <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Top Investor Matches</h3>
            <ul className="space-y-3">
            {result.matches.map((match: any, index: number) => (
                <li key={index} className="p-4 bg-muted rounded-md border">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-primary">{match.name}</p>
                            <p className="text-sm text-muted-foreground">Match Score: {match.matchScore}/100</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(match.email, toast)}>Copy Email</Button>
                    </div>
                    <p className="text-sm mt-2">{match.reasoning}</p>
                </li>
            ))}
            </ul>
      </div>
    ),
    details: {
      steps: [
        { text: 'Provide details on a new investment property', icon: <Building className="h-6 w-6" /> },
        { text: 'The AI scans your client database for matches', icon: <Search className="h-6 w-6" /> },
        { text: 'Get a ranked list of best-fit investors', icon: <ClipboardList className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Match', manual: 'Hours reviewing CRM and spreadsheets', ai: 'Under 30 seconds', icon: <Clock2 /> },
        { metric: 'Match Accuracy', manual: 'Relies on memory, may miss clients', ai: 'Data-driven, based on past deals & stated goals', icon: <Sparkles /> },
        { metric: 'Personalization', manual: 'Generic email blast to all investors', ai: 'Generates personalized outreach for each match', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "CRM Memory Assistant", benefit: "The investor matcher uses the deep client knowledge from the CRM assistant to find non-obvious matches based on past conversations." },
        { tool: "Automated Rebranding", benefit: "Instantly create a personalized, rebranded brochure of the property for each of the top investor matches." }
      ],
       faqs: [
        { question: "How does the AI know what my investors want?", answer: "The AI learns from your CRM data—past purchases, stated investment goals, budget ranges, and even notes from conversations. The more data you provide, the smarter the matching becomes." },
        { question: "Can I use this for off-market deals?", answer: "Absolutely. This tool is perfect for quickly and discreetly finding the right buyer for an off-market or pocket listing from within your existing network." },
        { question: "Does this replace my own judgment?", answer: "Not at all. It's a powerful assistant that ensures you never miss an opportunity. It presents you with a data-backed shortlist, but you always have the final say on who to contact." }
      ],
    },
    creationFields: [
      { id: 'clientDatabase', name: 'Your Client List', type: 'file', description: 'Upload a CSV of your investor contacts for the AI to analyze.' },
      { id: 'propertyType', name: 'Property Type', type: 'select', options: ["Duplex", "Triplex", "Fourplex", "Multi-Family (5+ units)", "Commercial Retail", "Office Space"], placeholder: 'Select property type', description: 'Type of investment property.' },
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Austin, TX', description: 'City and state of the property.'},
      { id: 'price', name: 'Price', type: 'number', placeholder: 'e.g., 750000', description: 'Asking price of the property.'},
      { id: 'capRate', name: 'Cap Rate (%)', type: 'number', placeholder: 'e.g., 6.5', description: 'The capitalization rate of the property.'},
      { id: 'investmentThesis', name: 'Investment Thesis', type: 'select', options: ["Value-Add / Renovation", "Turnkey Rental", "Long-Term Appreciation", "Development Opportunity", "1031 Exchange"], placeholder: 'Select investment strategy', description: 'Primary strategy for this investment.'},
      { id: 'keyFeatures', name: 'Key Features', type: 'textarea', placeholder: 'e.g., Long-term tenants in place, zoned for mixed-use, located in an opportunity zone.', description: 'Additional selling points for an investor.' },
    ],
  },
  {
    id: 'listing-generator',
    title: 'Listing Details Generator',
    description: 'Create compelling, SEO-friendly property listings from a few key details.',
    icon: <FileText />,
    color: '#64748b', // slate-500
    cta: 'Listing',
    categories: ['Creative', 'Web'],
    backsideValue: "Write perfect property descriptions in seconds.",
    details: {
      steps: [
        { text: 'Enter key property details (address, beds, baths)', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Mention 1-2 unique features', icon: <Sparkles className="h-6 w-6" /> },
        { text: 'Generate a full, persuasive listing description', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '30-60 minutes of creative writing', ai: 'Under 1 minute', icon: <Clock2 /> },
        { metric: 'SEO & Keywords', manual: 'Guesswork on what terms to use', ai: 'Automatically includes relevant local keywords', icon: <Sparkles /> },
        { metric: 'Completeness', manual: 'Often forgets key selling points', ai: 'Structured to include all critical information', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Use your new listing description as the source material for a targeted ad campaign." },
        { tool: "Landing Page Generator", benefit: "Instantly create a beautiful single-property website using your new listing details." }
      ],
       faqs: [
        { question: "Can I choose the tone of the listing?", answer: "Yes, you can specify a tone such as 'Luxurious,' 'Family-Friendly,' or 'Great for First-Time Buyers,' and the AI will adjust its language and emphasis accordingly." },
        { question: "Is the output ready to copy and paste into the MLS?", answer: "Absolutely. The generated text is formatted to be easily copied and pasted into MLS systems and other listing sites like Zillow or Redfin." },
        { question: "How does it know what keywords to use for SEO?", answer: "The AI analyzes the property's location and features to include relevant local keywords (like neighborhood names, school districts, or nearby landmarks) that a potential buyer is likely to search for." }
      ],
    },
    creationFields: [
      { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., 123 Main St, Anytown, USA', description: 'The address of the property.' },
      { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 4 beds, 3 baths, 2,500 sqft', description: 'Provide the basic stats.' },
      { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Renovated kitchen with quartz countertops, backyard oasis with a pool', description: 'What makes this property special?' },
    ],
  },
  {
    id: 'offer-generator',
    title: 'Multi-Project Offer Generator',
    description: 'Create and compare customized offer packages for clients interested in multiple properties.',
    icon: <Briefcase />,
    color: '#78716c', // stone-500
    cta: 'Offer Package',
    categories: ['Sales Tools'],
    backsideValue: "Present multiple offers beautifully.",
    details: {
      steps: [
        { text: 'Select multiple properties for the client', icon: <Building className="h-6 w-6" /> },
        { text: 'Input the client\'s budget and terms', icon: <Wallet className="h-6 w-6" /> },
        { text: 'Generate a professional offer comparison PDF', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Document Creation Time', manual: '1-2 hours in Word or Excel', ai: 'Under 2 minutes', icon: <Clock2 /> },
        { metric: 'Accuracy', manual: 'Prone to copy-paste errors and typos', ai: 'Calculations and details are always accurate', icon: <BadgeCheck /> },
        { metric: 'Professionalism', manual: 'Inconsistent formatting', ai: 'Generates a clean, branded, client-ready document', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Investor Matching", benefit: "After finding the top properties for an investor, use this tool to present them in a professional package." },
        { tool: "CRM Memory Assistant", benefit: "Pull the client's specific requirements directly from the CRM to pre-fill the offer terms." }
      ],
       faqs: [
        { question: "Can I add my own branding to the offer document?", answer: "Yes, you can upload your logo and brand colors, and the AI will automatically apply them to the generated PDF for a professional, personalized touch." },
        { question: "Does this actually submit the offers?", answer: "No, this tool generates a client-facing document that clearly outlines and compares the offers for their review and approval. It does not submit legally binding offers on your behalf." },
        { question: "Can it handle different offer amounts for each property?", answer: "Absolutely. You can specify different offer prices and terms for each property, and the tool will present them in a clear, side-by-side comparison format." }
      ],
    },
    creationFields: [
      { id: 'properties', name: 'Properties', type: 'textarea', placeholder: 'List property addresses, one per line', description: 'The properties to include in the offer package.' },
      { id: 'clientInfo', name: 'Client Info', type: 'text', placeholder: 'e.g., John Smith, Budget: $1.5M', description: 'Basic information about the client.' },
      { id: 'terms', name: 'Offer Terms', type: 'textarea', placeholder: 'e.g., 20% down, 30-day closing, inspection contingency', description: 'Key terms to include in the offers.' },
    ],
  },
  {
    id: 'email-creator',
    title: 'Email Marketing Creator',
    description: 'Design and write compelling email campaigns that nurture leads and drive sales.',
    icon: <Mail />,
    color: '#0ea5e9', // sky-500
    cta: 'Email Campaign',
    categories: ['Social & Comms', 'Creative'],
    backsideValue: "Launch an entire email campaign in minutes.",
    details: {
      steps: [
        { text: 'Define your campaign goal (e.g., New Listing)', icon: <Target className="h-6 w-6" /> },
        { text: 'Provide a link or topic for content', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Generate a sequence of emails instantly', icon: <Mail className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '2-4 hours for a 3-part sequence', ai: 'Under 90 seconds', icon: <Clock2 /> },
        { metric: 'Design & Layout', manual: 'Requires knowledge of email builders', ai: 'Generates clean, mobile-friendly HTML', icon: <Sparkles /> },
        { metric: 'Subject Lines', manual: 'Guesswork, low open rates', ai: 'A/B tested variations for high engagement', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Market Trend Reports", benefit: "Generate a local report, then use this tool to create an email campaign to share it with your list." },
        { tool: "CRM Memory Assistant", benefit: "Personalize your email campaigns at scale using deep client insights from the assistant." }
      ],
       faqs: [
        { question: "Can I connect this to my email provider?", answer: "The AI generates the raw content (subject lines) and HTML for the email bodies. You can then easily copy and paste this into any major email marketing platform like Mailchimp, Constant Contact, or others." },
        { question: "Does it write a single email or a sequence?", answer: "It can do both! You can ask for a single promotional email or specify a multi-part sequence, such as a 3-day follow-up campaign for new leads." },
        { question: "Are the emails personalized?", answer: "Yes, the AI can insert placeholders like `[First Name]` that your email marketing tool will automatically populate, making your campaigns feel personal to each recipient." }
      ],
    },
    creationFields: [
      { id: 'goal', name: 'Campaign Goal', type: 'text', placeholder: 'e.g., Announce a new listing, Nurture cold leads', description: 'What is the purpose of this email campaign?' },
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic', description: 'The AI will use this as the basis for the content.' },
      { id: 'tone', name: 'Tone of Voice', type: 'text', placeholder: 'e.g., Professional, Urgent, Informative', description: 'Set the mood for your emails.' },
    ],
  },
  {
    id: 'instagram-bot',
    title: 'Instagram Chat Bot',
    description: 'An AI assistant to manage your DMs, answer questions, and capture leads 24/7.',
    icon: <Bot />,
    color: '#f43f5e', // rose-500
    cta: 'Chat Bot',
    categories: ['Social & Comms', 'Lead Gen'],
    backsideValue: "Never miss an Instagram lead again.",
    details: {
      steps: [
        { text: 'Connect your Instagram account securely', icon: <LinkIcon className="h-6 w-6" /> },
        { text: 'Provide FAQs about your listings/services', icon: <PenTool className="h-6 w-6" /> },
        { text: 'The bot starts managing your DMs instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Response Time', manual: 'Can take hours, leads go cold', ai: 'Instant, 24/7 engagement', icon: <Clock2 /> },
        { metric: 'Lead Qualification', manual: 'Forgets to ask key questions', ai: 'Asks qualifying questions every time', icon: <Sparkles /> },
        { metric: 'After-Hours Coverage', manual: 'No coverage, missed opportunities', ai: 'Always on, capturing leads while you sleep', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "AI Story Designer", benefit: "Run a story with a 'DM for info' poll, and let the chatbot handle all the incoming inquiries automatically." },
        { tool: "CRM Memory Assistant", benefit: "When the chatbot identifies a hot lead, it can automatically create a new contact in your CRM with the conversation summary." }
      ],
       faqs: [
        { question: "Is this against Instagram's terms of service?", answer: "No, this tool uses the official Instagram Messaging API. It operates within their guidelines and is completely safe for your account." },
        { question: "Can the bot understand typos and slang?", answer: "Yes, the AI is designed to understand the nuances of human conversation, including common typos and informal language, ensuring a smooth experience for your clients." },
        { question: "When does it hand over a conversation to me?", answer: "You can set custom rules. The bot can hand over the conversation if it doesn't know the answer, if the user asks to speak to a human, or if it detects high-intent language like 'I want to make an offer.'" }
      ],
    },
    creationFields: [
      { id: 'connect', name: 'Connect Instagram', type: 'button', cta: 'Connect Instagram Account', description: 'Authorize the AI to manage your DMs.' },
    ],
  },
  {
    id: 'whatsapp-campaigns',
    title: 'WhatsApp Campaign Manager',
    description: 'Engage clients directly with personalized WhatsApp messages, broadcasts, and automated follow-ups.',
    icon: <Phone />,
    color: '#22c55e', // green-500
    cta: 'WhatsApp Campaign',
    categories: ['Social & Comms', 'Lead Gen'],
    backsideValue: "Reach your entire client list on WhatsApp instantly.",
    details: {
      steps: [
        { text: 'Upload your client contact list', icon: <Upload className="h-6 w-6" /> },
        { text: 'Draft your message or follow-up sequence', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Send or schedule your campaign instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Contact 100 Clients', manual: 'Hours of manual copy-pasting', ai: 'Under 1 minute', icon: <Clock2 /> },
        { metric: 'Personalization', manual: 'Generic, prone to errors', ai: 'Personalized with [Name], [Property], etc.', icon: <Sparkles /> },
        { metric: 'Follow-up Consistency', manual: 'Easy to forget or miss someone', ai: 'Automated sequences ensure no lead is lost', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Social Lead Generation", benefit: "Directly import new leads and add them to an automated welcome message sequence on WhatsApp." },
        { tool: "CRM Memory Assistant", benefit: "Use insights from the CRM to send highly targeted messages, like wishing a client a happy birthday or reminding them of an anniversary." }
      ],
       faqs: [
        { question: "Is this compliant with WhatsApp's policies?", answer: "Yes, this tool is designed to work within WhatsApp's Business Platform policies. It's intended for sending transactional messages and engaging with clients who have opted in to communication, not for spam." },
        { question: "Can it handle replies?", answer: "The tool is primarily for outbound campaigns. For managing two-way conversations, it works best when integrated with our AI Page Admin or Instagram Chat Bot." },
        { question: "What does 'personalization' mean?", answer: "If you upload a contact list with columns like 'Name' or 'Property of Interest', you can use placeholders like [Name] in your message. The tool will automatically replace the placeholder with the correct data for each contact, making your messages feel personal." }
      ],
    },
    creationFields: [
      { id: 'contacts', name: 'Contact List', type: 'file', description: 'Upload a CSV with names and numbers.' },
      { id: 'message', name: 'Message Template', type: 'textarea', placeholder: 'Hi [Name], just wanted to share this new listing...', description: 'Craft your message. Use [Name] for personalization.' },
      { id: 'sendTime', name: 'Schedule', type: 'select', options: ['Send Immediately', 'Schedule for 1 hour from now', 'Schedule for tomorrow at 9 AM'], placeholder: 'Select send time', description: 'When should the campaign be sent?' },
    ],
  },
];

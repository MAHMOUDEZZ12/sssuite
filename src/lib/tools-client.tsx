
'use client';

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
  BrainCircuit,
  Wrench,
  Key,
  Facebook,
  Instagram,
  BarChart,
  Hash,
  Star,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  value?: string;
  hidden?: boolean;
};

export type FilterCategory = 'All' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Marketing';

export type Feature = {
  id: string;
  title: string;
  dashboardTitle?: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  cta: string;
  categories: FilterCategory[];
  mindMapCategory: 'Marketing' | 'Creative Suite' | 'Sales Enablement' | 'Core Intelligence' | 'Internal' | 'Meta Ads AI Suite';
  badge?: 'NEW' | 'BETA' | 'SOON' | 'Pilot*';
  isPage?: boolean;
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
  renderResult?: (result: any, toast: any) => React.ReactNode;
};

const mockProjects = [
    'Azure Lofts Campaign',
    'Maple Creek Development',
    'Oceanview Villas',
    'Add New Project...',
];

const AudienceResultCard = ({ strategy, toast }: { strategy: any, toast: any }) => {
    const [country, setCountry] = React.useState('United Arab Emirates');
    const [city, setCity] = React.useState('Dubai');
    const [audienceSize, setAudienceSize] = React.useState<number | null>(null);
    const [isEstimating, setIsEstimating] = React.useState(false);

    const handleEstimate = () => {
        setIsEstimating(true);
        setAudienceSize(null);
        setTimeout(() => {
            // Simulate API call to Facebook/Google
            const size = 50000 + Math.floor(Math.random() * 2000000);
            setAudienceSize(size);
            setIsEstimating(false);
            toast({ title: "Audience Refined!", description: `New estimate for ${city}, ${country} is ready.`});
        }, 1500);
    };

    return (
        <Card className="flex flex-col bg-muted/30">
            <CardHeader>
                <CardTitle className="text-lg text-primary">{strategy.strategyName}</CardTitle>
                <CardDescription>Aimed at capturing a specific market segment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div>
                    <p className="font-semibold text-foreground">Demographics:</p>
                    <p className="text-muted-foreground">{strategy.demographics}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Interests (Social):</p>
                    <p className="text-muted-foreground">{strategy.interests}</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Keywords (Search):</p>
                    <p className="text-muted-foreground">{strategy.keywords}</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold text-foreground mb-2">Refine Audience & Estimate Reach</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                         <div className="space-y-1">
                            <Label htmlFor={`country-${strategy.strategyName}`}>Country</Label>
                            <Input id={`country-${strategy.strategyName}`} value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g., United States" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`city-${strategy.strategyName}`}>City</Label>
                            <Input id={`city-${strategy.strategyName}`} value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., New York" />
                        </div>
                    </div>
                     <Button onClick={handleEstimate} disabled={isEstimating} size="sm">
                        {isEstimating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                        Refine & Estimate
                    </Button>
                </div>
                {audienceSize !== null && (
                    <div className="p-3 bg-background rounded-lg border space-y-2 animate-in fade-in-50">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">Est. Audience Size:</span>
                            <span className="font-bold text-lg text-primary">{audienceSize.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Potential Daily Reach:</span>
                            <span className="font-semibold">{(audienceSize * 0.05).toLocaleString('en-US', { maximumFractionDigits: 0 })} - {(audienceSize * 0.15).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button className="w-full" onClick={() => toast({title: "Strategy Sent!", description: `The "${strategy.strategyName}" has been sent to the Campaign Builder.`})}>
                    Send to Campaign Builder
                </Button>
            </CardFooter>
        </Card>
    );
};


export const tools: Feature[] = [
  // --- META ADS AI SUITE ---
   {
    id: 'meta-auto-pilot',
    title: 'Meta Auto Pilot',
    dashboardTitle: 'Meta Auto Pilot',
    description: 'The single-click manager for your entire Meta suite.',
    icon: <Star />,
    color: '#fbbf24', // amber-400
    cta: 'Run Workflow',
    categories: ['Marketing', 'Ads', 'Lead Gen'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'Pilot*',
    isPage: true,
    details: {
      steps: [
          { text: 'Connect all your Meta ad tools', icon: <LinkIcon className="h-6 w-6" /> },
          { text: 'Define a high-level goal and budget', icon: <Target className="h-6 w-6" /> },
          { text: 'The Pilot runs and optimizes the entire workflow', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '10+ hours per week managing ads', ai: 'Set a goal, let the Pilot work', icon: <Clock2 /> },
        { metric: 'Strategy', manual: 'Reacts slowly to performance data', ai: 'Proactively shifts budget and creative', icon: <LineChart /> },
        { metric: 'Complexity', manual: 'Juggling multiple tools and platforms', ai: 'One command controls everything', icon: <Bot /> },
      ],
      synergy: [
        { tool: "All Meta Tools", benefit: "The Pilot is the orchestrator, using all other tools in the suite to execute a complete strategy." },
        { tool: "CRM Memory", benefit: "Feed campaign performance and lead data directly back into your CRM automatically." }
      ],
       faqs: [
        { question: "Is this safe for my ad account?", answer: "Yes, the Pilot operates within all platform guidelines and you set the budget caps. It automates the workflow, but you retain full control." },
        { question: "Can I intervene during a campaign?", answer: "Absolutely. You can pause the pilot, manually adjust campaigns, or provide new instructions at any time. It's your co-pilot, not an autopilot." },
      ],
    },
    creationFields: [],
  },
  {
    id: 'campaign-builder',
    title: 'Campaign Builder AI',
    dashboardTitle: 'Campaign Builder',
    description: 'Your dedicated agent for Facebook & Instagram advertising.',
    icon: <Bot />,
    color: '#1d4ed8', // blue-700
    cta: 'Create Campaign',
    categories: ['Marketing', 'Ads', 'Lead Gen'],
    mindMapCategory: 'Meta Ads AI Suite',
    badge: 'NEW',
    isPage: true,
    details: {
      steps: [
          { text: 'Connect your Meta Business account', icon: <LinkIcon className="h-6 w-6" /> },
          { text: 'Define your campaign goal and budget', icon: <Target className="h-6 w-6" /> },
          { text: 'The agent creates, manages, and optimizes the campaign', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '10+ hours per week managing ads', ai: 'Set your goal and let the agent work', icon: <Clock2 /> },
        { metric: 'Cost & Resources', manual: 'Requires a dedicated ad manager', ai: 'Included in your subscription', icon: <Wallet /> },
        { metric: 'Optimization', manual: 'Reacts slowly to performance data', ai: 'Optimizes bids and creative in real-time', icon: <LineChart /> },
      ],
      synergy: [
        { tool: "Insta Ads Designer", benefit: "The Campaign Builder can automatically use your best-performing AI-generated ads." },
        { tool: "CRM Memory", benefit: "Feed campaign performance and lead data directly back into your CRM." }
      ],
       faqs: [
        { question: "Is this safe for my ad account?", answer: "Yes, this tool will use the official Meta Business API and operate within all platform guidelines." },
        { question: "How much control do I have?", answer: "You will have full control. You can set budget caps, approve creative, and pause the campaign at any time. The agent acts as your co-pilot, not an autopilot." },
        { question: "When will this be available?", answer: "This feature is currently under active development and is on our short-term roadmap. Stay tuned for updates!" }
      ],
    },
    creationFields: [],
  },
  {
    id: 'audience-creator',
    title: 'Audience Creator AI',
    dashboardTitle: 'Audience Creator',
    description: 'Find high-intent buyers before they search.',
    icon: <Binoculars />,
    color: '#3b82f6', // blue-600
    cta: 'Generate Strategies',
    categories: ['Marketing', 'Lead Gen', 'Ads'],
    mindMapCategory: 'Meta Ads AI Suite',
    isPage: false,
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <h3 className="font-semibold text-xl text-foreground">Recommended Targeting Strategies</h3>
        <p className="text-muted-foreground">The AI has generated multiple distinct strategies for your project. Choose one to refine, or send it directly to the Campaign Builder.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.strategies.map((strategy: any, index: number) => (
            <AudienceResultCard key={index} strategy={strategy} toast={toast} />
          ))}
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Select a project from your library', icon: <Briefcase className="h-6 w-6" /> },
        { text: 'The AI analyzes project data and market signals', icon: <BrainCircuit className="h-6 w-6" /> },
        { text: 'Get multiple targeting strategies to choose from', icon: <ClipboardList className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Audience Discovery', manual: 'Broad guessing (e.g., "Age 30-50")', ai: 'Niche, high-intent segments based on real data', icon: <Users2 /> },
        { metric: 'Time to Research', manual: 'Hours of market research', ai: 'Instantaneous generation', icon: <Clock2 /> },
        { metric: 'Budget Efficiency', manual: 'High waste on wrong audiences', ai: 'Optimized ad spend, higher ROI', icon: <Wallet /> },
      ],
      synergy: [
        { tool: "Campaign Builder", benefit: "Design the perfect ad for the high-intent audience you've just identified." },
        { tool: "Instagram Content Creator", benefit: "Create organic posts that speak directly to the interests of your target persona." }
      ],
       faqs: [
        { question: "What platforms can I use these audiences on?", answer: "Our targeting suggestions are optimized for major platforms like Facebook, Instagram, and Google Ads. We provide you with the exact interests, demographics, and keywords to input." },
        { question: "How does the AI know who is a 'high-intent' buyer?", answer: "The AI analyzes anonymous data signals such as recent searches for mortgage calculators, activity in moving-related forums, and engagement with real estate content to identify users who are actively in the market." },
        { question: "Is this compliant with privacy regulations?", answer: "Yes. The system uses anonymized, aggregated data and adheres to all privacy regulations. It identifies audience *patterns* and *segments*, not individuals." }
      ],
    },
    creationFields: [
       { id: 'projectId', name: 'Project', type: 'select', options: mockProjects, placeholder: 'Select a project', description: 'Choose the project you want to create an audience for.' },
    ],
  },
  {
    id: 'insta-ads-designer',
    title: 'Insta Ads Designer AI',
    dashboardTitle: 'Insta Ads Designer',
    description: 'Create perfect ads for Instagram Stories & Feed.',
    icon: <Instagram />,
    color: '#ec4899', // pink-500
    cta: 'Generate Ad',
    categories: ['Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    isPage: false,
    renderResult: (result, toast) => (
       <div className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Generated Ad Copy</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-muted rounded-md relative group">
                    <p className="whitespace-pre-wrap">{result.adCopy}</p>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="h-4 w-4" /></Button>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Generated Ad Design (Brochure)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-hidden">
                    <iframe src={`${result.adDesign}#view=fitH`} className="w-full h-[600px]"/>
                </div>
                 <a href={result.adDesign} download="brochure.pdf" className="mt-4 inline-block">
                    <Button variant="outline"><Download className="mr-2"/> Download PDF</Button>
                </a>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Generated Landing Page Preview</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-lg overflow-hidden w-fit">
                    <Image src={result.landingPage} alt="Generated landing page" width={800} height={600} className="object-contain" />
                    </div>
                    <a href={result.landingPage} download="landing-page.png" className="mt-4 inline-block">
                        <Button variant="outline"><Download className="mr-2"/> Download Image</Button>
                    </a>
            </CardContent>
          </Card>
        </div>
    ),
    details: {
      steps: [
          { text: 'Upload a project brochure', icon: <Upload className="h-6 w-6" /> },
          { text: 'Select a focus (e.g., "luxury", "family")', icon: <Target className="h-6 w-6" /> },
          { text: 'Generate multiple ad variants instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time Investment', manual: '5-10 hours per campaign', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Cost & Resources', manual: 'Requires copywriter & designer', ai: 'Included in your subscription', icon: <Wallet /> },
        { metric: 'Quality & Testing', manual: 'Relies on guesswork, 1-2 variations', ai: 'Data-driven, 5+ variations to test', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Audience Creator", benefit: "Ensure your perfect ads are seen by people ready to buy." },
        { tool: "Instagram Admin", benefit: "Deploy your new ad across social channels to maximize reach." }
      ],
       faqs: [
        { question: "What kind of brochures can I use?", answer: "You can upload almost any standard PDF brochure from a developer or your own marketing materials. The AI is designed to extract key information like floor plans, features, and location." },
        { question: "Can I edit the ads after they are generated?", answer: "Absolutely. The AI-generated content serves as a powerful starting point. You can then tweak the copy, headlines, and calls-to-action to perfectly match your voice and campaign goals." },
        { question: "How are the ad visuals created?", answer: "The AI uses a combination of stock imagery, design templates, and an understanding of your brand's color palette to create visually appealing and effective ad graphics. You can also provide your own images for the AI to incorporate." }
      ],
    },
    creationFields: [
      { id: 'projectName', name: 'Project Name', type: 'text', placeholder: 'e.g., "Azure Lofts"', description: 'Provide a name if you are not uploading a brochure.' },
      { id: 'brochureDataUri', name: 'Developer Brochure (Optional)', type: 'file', description: 'Upload the original PDF. This is the best source of info.' },
      { id: 'focusArea', name: 'Ad Focus', type: 'select', options: ['Luxury & Prestige', 'Family-Friendly', 'Investment Opportunity', 'Modern & Urban', 'First-Time Buyer'], placeholder: 'Select the ad\'s main angle', description: 'What key aspect should the ad highlight?' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Exciting', 'Welcoming', 'Urgent', 'Sophisticated'], placeholder: 'Select a tone', description: 'Set the tone for the ad copy.' },
      { id: 'additionalInformation', name: 'Additional Information', type: 'textarea', placeholder: 'e.g., "Limited time offer: 2 years of condo fees waived."', description: 'Add any other key details or offers. (Optional)' },
    ],
  },
  {
    id: 'reel-ads-ai',
    title: 'Reel Ads AI',
    dashboardTitle: 'Reel Ads',
    description: 'Generate engaging video ads for Instagram Reels.',
    icon: <Clapperboard />,
    color: '#7c3aed',
    cta: 'Generate Reel Ad',
    categories: ['Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
  {
    id: 'facebook-ads-ai',
    title: 'Facebook Ads AI',
    dashboardTitle: 'Facebook Ads',
    description: 'Design effective ads for the Facebook platform.',
    icon: <Facebook />,
    color: '#2563eb',
    cta: 'Create Facebook Ad',
    categories: ['Ads', 'Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
  {
    id: 'instagram-admin-ai',
    title: 'Instagram Admin AI',
    dashboardTitle: 'Instagram Admin',
    description: 'Schedules posts and handles replies on Instagram.',
    icon: <UserCog />,
    color: '#c026d3',
    cta: 'Run Admin Task',
    categories: ['Sales Tools', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
  {
    id: 'instagram-content-creator',
    title: 'Instagram Content Creator AI',
    dashboardTitle: 'Instagram Content',
    description: "Turn one idea into a one-week content plan for Instagram.",
    icon: <Share2 />,
    color: '#e11d48',
    cta: 'Generate Content Plan',
    categories: ['Marketing', 'Social & Comms', 'Ads'],
    mindMapCategory: 'Meta Ads AI Suite',
    isPage: false,
    renderResult: (result, toast) => (
      <div className="space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">Weekly Post Plan</h3>
          <div className="space-y-4">
            {result.posts.map((post: any, index: number) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg border">
                <p className="font-bold text-foreground mb-1">{post.day}</p>
                <p className="text-foreground/80 whitespace-pre-wrap">{post.postContent}</p>
                <p className="text-sm italic text-muted-foreground mt-2">
                  <span className="font-semibold not-italic">Image Suggestion:</span> {post.imageSuggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold text-lg mb-2">Hashtag Strategy</h3>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Primary Hashtags (Broad Reach)</p>
              <p className="text-sm text-muted-foreground">{result.hashtagStrategy.primary.join(' ')}</p>
            </div>
             <div>
              <p className="font-semibold">Secondary Hashtags (Niche Targeting)</p>
              <p className="text-sm text-muted-foreground">{result.hashtagStrategy.secondary.join(' ')}</p>
            </div>
             <div>
              <p className="font-semibold">Location Hashtags (Local Dominance)</p>
              <p className="text-sm text-muted-foreground">{result.hashtagStrategy.location.join(' ')}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] },
    creationFields: [
      { id: 'source', name: 'Topic or URL', type: 'text', placeholder: 'e.g., "The benefits of buying a new build property"', description: 'The core idea for your week of content.' },
      { id: 'platform', name: 'Platform', type: 'text', value: 'Instagram', description: 'The social media platform.', hidden: true },
      { id: 'tone', name: 'Tone', type: 'select', options: ['Professional', 'Friendly', 'Exciting', 'Educational', 'Humorous'], placeholder: 'Select a tone', description: 'The desired tone for the posts.' },
    ],
  },
  {
    id: 'story-planner-ai',
    title: 'Story Planner AI',
    dashboardTitle: 'Story Planner',
    description: 'Plan and design animated Instagram stories.',
    icon: <Film />,
    color: '#a855f7',
    cta: 'Generate Story',
    categories: ['Creative', 'Social & Comms'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
  {
    id: 'instagram-hashtags-ai',
    title: 'Instagram Hashtags AI',
    dashboardTitle: 'Instagram Hashtags',
    description: 'Generate a tiered hashtag strategy for any post.',
    icon: <Hash />,
    color: '#f97316',
    cta: 'Generate Hashtag Strategy',
    categories: ['Marketing', 'Social & Comms', 'Lead Gen'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
  {
    id: 'meta-ads-reports',
    title: 'Meta Ads Reports',
    description: 'Generate performance reports for your campaigns.',
    icon: <BarChart />,
    color: '#f59e0b',
    cta: 'Generate Ad Report',
    categories: ['Marketing', 'Ads'],
    mindMapCategory: 'Meta Ads AI Suite',
    creationFields: [],
    details: { steps: [], aiVsManual: [], synergy: [], faqs: [] }
  },
   
  // --- GENERAL MARKETING ---
  {
    id: 'landing-pages',
    title: 'Landing Page Builder AI',
    dashboardTitle: 'Landing Pages',
    description: 'Launch a high-converting page in minutes.',
    icon: <LayoutTemplate />,
    color: '#22c55e', // green-500
    cta: 'Create Landing Page',
    categories: ['Marketing', 'Web'],
    mindMapCategory: 'Marketing',
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
        { text: 'Provide project details', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Choose a style or provide inspiration', icon: <Palette className="h-6 w-6" /> },
        { text: 'Generate a complete landing page with a lead form', icon: <LayoutTemplate className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Build', manual: '1-2 days using a website builder', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Technical Skill', manual: 'Requires web design & dev knowledge', ai: 'None. Just provide the source.', icon: <Sparkles /> },
        { metric: 'Features', manual: 'Lead forms, galleries added manually', ai: 'All features included automatically', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Social Writer", benefit: "Generate promotional posts to drive traffic to your new landing page." },
        { tool: "Ad Creator", benefit: "Run a targeted ad campaign that clicks through to your beautiful new page." }
      ],
       faqs: [
        { question: "Can I use my own domain name?", answer: "Yes, you can connect your own custom domain name to the landing pages you create, ensuring a fully branded experience for your visitors." },
        { question: "Are the landing pages mobile-friendly?", answer: "Absolutely. Every landing page generated is fully responsive and looks great on all devices, from desktops to smartphones." },
        { question: "Is it optimized for SEO?", answer: "Yes. The AI automatically generates SEO-friendly titles, meta descriptions, and image alt-tags to help your page rank better on search engines." }
      ],
    },
    creationFields: [
      { id: 'projectName', name: 'Project Name', type: 'text', placeholder: 'e.g., "Azure Lofts"', description: 'The name of the project or listing.' },
      { id: 'projectDetails', name: 'Project Details', type: 'textarea', placeholder: 'e.g., "Luxury condos in downtown Miami..."', description: 'A detailed description of the property.' },
      { id: 'brandingStyle', name: 'Branding Style', type: 'select', options: ["Modern & Minimalist", "Luxury & Elegant", "Cozy & Welcoming", "Bold & Colorful"], placeholder: 'Select a branding style', description: 'Describe the desired look and feel.' },
      { id: 'projectBrochureDataUri', name: 'Project Brochure (Optional)', type: 'file', description: 'Upload a brochure to provide more context.' },
      { id: 'inspirationImageDataUri', name: 'Inspiration Image (Optional)', type: 'file', description: 'Upload a screenshot of a website you like to guide the style.' },
    ],
  },
  {
    id: 'market-reports',
    title: 'Market Reports AI',
    dashboardTitle: 'Market Reports',
    description: 'Hyper-local trends and insights.',
    icon: <LineChart />,
    color: '#f59e0b', // amber-500
    cta: 'Generate Market Report',
    categories: ['Marketing', 'Editing', 'Sales Tools'],
    mindMapCategory: 'Marketing',
    renderResult: (result, toast) => (
      <div className="space-y-6 text-foreground">
        <h3 className="text-2xl font-bold font-heading">{result.reportTitle}</h3>
        <Separator />
        <div>
          <h4 className="font-semibold text-lg mb-1">Executive Summary</h4>
          <p className="text-foreground/80">{result.executiveSummary}</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold text-lg mb-2">Key Market Trends</h4>
          <ul className="space-y-3">
            {result.marketTrends.map((item: any, index: number) => (
              <li key={index} className="p-3 bg-muted/50 rounded-md">
                <p className="font-semibold">{item.trend}</p>
                <p className="text-sm text-muted-foreground">{item.analysis}</p>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold text-lg mb-1">Pricing Analysis</h4>
          <p className="text-foreground/80">{result.pricingAnalysis}</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold text-lg mb-1">Future Outlook</h4>
          <p className="text-foreground/80">{result.futureOutlook}</p>
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Enter a neighborhood or address', icon: <MapPin className="h-6 w-6" /> },
        { text: 'Select report type (e.g., buyer, seller, investor)', icon: <Search className="h-6 w-6" /> },
        { text: 'Generate a branded, data-rich PDF report', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Create', manual: 'Hours pulling MLS data and designing', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Data Scope', manual: 'Limited to basic MLS stats', ai: 'Includes supply/demand, price trends, sentiment', icon: <Sparkles /> },
        { metric: 'Branding', manual: 'Requires manual design work', ai: 'Automatically branded with your logo & colors', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Landing Page Builder", benefit: "Create a landing page with a lead form to download your hyper-local market report." },
        { tool: "Social Writer", benefit: "Generate a week's worth of posts summarizing the key findings from your new report." }
      ],
       faqs: [
        { question: "Where does the market data come from?", answer: "Our AI synthesizes data from multiple trusted sources, including public records, MLS data feeds, and local economic indicators to provide a comprehensive and up-to-date market snapshot." },
        { question: "Can I customize the reports?", answer: "Yes, you can add your own commentary, select which sections to include, and ensure your branding is prominently displayed before finalizing the report." },
        { question: "How are these different from standard MLS reports?", answer: "While they use MLS data as a foundation, our AI reports add another layer of insight, analyzing trends, predicting future movements, and presenting the information in a client-friendly, easy-to-understand format." }
      ],
    },
    creationFields: [
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Beverly Hills, CA"', description: 'The neighborhood or city for the report.' },
      { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., "2-bedroom condos"', description: 'Specify a property type or focus for the report.' },
      { id: 'reportType', name: 'Report Type', type: 'select', options: ['Investor', 'Home Buyer', 'Seller'], placeholder: 'Select report audience', description: 'Tailor the report for a specific audience.' },
    ],
  },
  {
    id: 'email-creator',
    title: 'Email Campaigns AI',
    dashboardTitle: 'Email Campaigns',
    description: 'Design, write, and schedule.',
    icon: <Mail />,
    color: '#0ea5e9', // sky-500
    cta: 'Send Email Campaign',
    categories: ['Marketing', 'Social & Comms', 'Sales Tools'],
    mindMapCategory: 'Marketing',
    details: {
      steps: [
        { text: 'Define your campaign goal (e.g., New Listing)', icon: <Target className="h-6 w-6" /> },
        { text: 'Provide a link or topic for content', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Generate a sequence of emails instantly', icon: <Mail className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '2-4 hours for a 3-part sequence', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Design & Layout', manual: 'Requires knowledge of email builders', ai: 'Generates clean, mobile-friendly HTML', icon: <Sparkles /> },
        { metric: 'Subject Lines', manual: 'Guesswork, low open rates', ai: 'A/B tested variations for high engagement', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Market Reports", benefit: "Generate a local report, then use this tool to create an email campaign to share it with your list." },
        { tool: "CRM Memory", benefit: "Personalize your email campaigns at scale using deep client insights from the assistant." }
      ],
       faqs: [
        { question: "Can I connect this to my email provider?", answer: "The AI generates the raw content (subject lines) and HTML for the email bodies. You can then easily copy and paste this into any major email marketing platform like Mailchimp, Constant Contact, or others." },
        { question: "Does it write a single email or a sequence?", answer: "It can do both! You can ask for a single promotional email or specify a multi-part sequence, such as a 3-day follow-up campaign for new leads." },
        { question: "Are the emails personalized?", answer: "Yes, the AI can insert placeholders like `[First Name]` that your email marketing tool will automatically populate, making your campaigns feel personal to each recipient." }
      ],
    },
    creationFields: [
      { id: 'goal', name: 'Campaign Goal', type: 'select', options: ["New Listing Announcement", "Open House Invitation", "Monthly Newsletter", "Cold Lead Nurturing Sequence", "Post-Viewing Follow-up"], placeholder: 'Select a campaign type', description: 'What is the purpose of this email campaign?' },
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic', description: 'The AI will use this as the basis for the content.' },
      { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Humorous', 'Informative'], placeholder: 'Select a tone', description: 'Set the mood for your emails.' },
    ],
  },
  
  // --- CREATIVE SUITE ---
  {
    id: 'rebranding',
    title: 'Rebranding AI',
    dashboardTitle: 'Rebranding',
    description: 'Swap logos, colors, contacts in one click.',
    icon: <Palette />,
    color: '#f97316', // orange-600
    cta: 'Generate Rebranded Brochure',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
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
        { text: 'The AI applies your saved brand settings', icon: <UserCog className="h-6 w-6" /> },
        { text: 'Download the rebranded brochure instantly', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
         { metric: 'Time to Rebrand', manual: '2-4 hours in design software', ai: 'Fast by default', icon: <Clock2 /> },
         { metric: 'Required Skill', manual: 'Proficiency in Adobe InDesign/Canva', ai: 'Ability to upload a file', icon: <Sparkles /> },
         { metric: 'Consistency', manual: 'Prone to human error and typos', ai: 'Perfectly consistent every time', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Ad Creator", benefit: "Use your newly rebranded brochure to power an ad campaign." },
        { tool: "Landing Page Builder", benefit: "Generate a branded landing page that perfectly matches your rebranded brochure." }
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
      { id: 'companyName', name: 'Company Name', type: 'text', placeholder: 'Your company name', description: 'Used for branding and generating a logo if needed.' },
      { id: 'contactDetails', name: 'Contact Details', type: 'textarea', placeholder: 'Your Name\nYour Phone\nYour Email', description: 'The contact info to place in the brochure.' },
      { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Luxury', 'Modern'], placeholder: 'Select a tone', description: 'The tone to use for any generated text.' },
      { id: 'colors', name: 'Colors', type: 'text', placeholder: 'e.g., "Blue and Gold"', description: 'The color scheme to use for rebranding.' },
    ],
  },
  {
    id: 'pdf-editor',
    title: 'PDF Editor AI',
    dashboardTitle: 'PDF Editor',
    description: 'Edit text, images, and layout with prompts.',
    icon: <PenTool />,
    color: '#eab308', // yellow-500
    cta: 'Generate Edited PDF',
    categories: ['Creative', 'Editing'],
    mindMapCategory: 'Creative Suite',
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
         { metric: 'Time to Edit', manual: 'Hours finding source files or using clunky editors', ai: 'Fast by default', icon: <Clock2 /> },
         { metric: 'Software Cost', manual: 'Requires expensive Acrobat Pro subscription', ai: 'Included in your suite', icon: <Wallet /> },
         { metric: 'Ease of Use', manual: 'Complex tools and formatting issues', ai: 'As easy as sending a text message', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Rebranding", benefit: "After rebranding a brochure, use the editor to make final tweaks to pricing or contact info." },
        { tool: "Listing Generator", benefit: "Generate a new listing description and then use the editor to paste it into your existing brochure." }
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

  // --- SALES ENABLEMENT ---
  {
    id: 'investor-matching',
    title: 'Investor Matching AI',
    dashboardTitle: 'Investor Matching',
    description: 'Pair budgets with the right projects.',
    icon: <Users2 />,
    color: '#6366f1', // indigo-500
    cta: 'Generate Investor Match',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
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
        { metric: 'Time to Match', manual: 'Hours reviewing CRM and spreadsheets', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Match Accuracy', manual: 'Relies on memory, may miss clients', ai: 'Data-driven, based on past deals & stated goals', icon: <Sparkles /> },
        { metric: 'Personalization', manual: 'Generic email blast to all investors', ai: 'Generates personalized outreach for each match', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "CRM Memory", benefit: "The investor matcher uses the deep client knowledge from the CRM assistant to find non-obvious matches based on past conversations." },
        { tool: "Rebranding", benefit: "Instantly create a personalized, rebranded brochure of the property for each of the top investor matches." }
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
    id: 'property-finder-listing-ai',
    title: 'Property Finder Listing AI',
    dashboardTitle: 'Property Finder Listing',
    description: 'Optimize your listings for Property Finder.',
    icon: <Building />,
    color: '#d946ef', // fuchsia-600
    cta: 'Create Listing',
    categories: ['Sales Tools', 'Editing', 'Web'],
    mindMapCategory: 'Sales Enablement',
    renderResult: (result, toast) => (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Generated Title</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.title}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.title, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Generated Description</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.description}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.description, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Suggested Keywords</h3>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">{result.keywords.join(', ')}</p>
          </div>
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Enter key property details (address, beds, baths)', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Mention 1-2 unique features', icon: <Sparkles className="h-6 w-6" /> },
        { text: 'Generate a full, persuasive listing description', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '30-60 minutes of creative writing', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'SEO & Keywords', manual: 'Guesswork on what terms to use', ai: 'Automatically includes relevant local keywords', icon: <Sparkles /> },
        { metric: 'Completeness', manual: 'Often forgets key selling points', ai: 'Structured to include all critical information', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Ad Creator", benefit: "Use your new listing description as the source material for a targeted ad campaign." },
        { tool: "Landing Page Builder", benefit: "Instantly create a beautiful single-property website using your new listing details." }
      ],
       faqs: [
        { question: "Can I choose the tone of the listing?", answer: "Yes, you can specify a tone such as 'Luxurious,' 'Family-Friendly,' or 'Great for First-Time Buyers,' and the AI will adjust its language and emphasis accordingly." },
        { question: "Is the output ready to copy and paste into the MLS?", answer: "Absolutely. The generated text is formatted to be easily copied and pasted into MLS systems and other listing sites like Zillow or Redfin." },
        { question: "How does it know what keywords to use for SEO?", answer: "The AI analyzes the property's location and features to include relevant local keywords (like neighborhood names, school districts, or nearby landmarks) that a potential buyer is likely to search for." }
      ],
    },
    creationFields: [
      { id: 'platform', name: 'Platform', type: 'text', placeholder: '', description: '', value: 'Property Finder', hidden: true },
      { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., 123 Main St, Anytown, USA', description: 'The address of the property.' },
      { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 4 beds, 3 baths, 2,500 sqft', description: 'Provide the basic stats.' },
      { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Renovated kitchen with quartz countertops, backyard oasis with a pool', description: 'What makes this property special?' },
      { id: 'tone', name: 'Tone', type: 'select', options: ['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent'], placeholder: 'Select a tone', description: 'The tone of voice for the listing.' },
    ],
  },
  {
    id: 'bayut-listing-ai',
    title: 'Bayut Listing AI',
    dashboardTitle: 'Bayut Listing',
    description: 'Craft perfect listings for the Bayut portal.',
    icon: <Building />,
    color: '#22c55e', // green-500
    cta: 'Create Listing',
    categories: ['Sales Tools', 'Editing', 'Web'],
    mindMapCategory: 'Sales Enablement',
    renderResult: (result, toast) => (
       <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Generated Title</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.title}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.title, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Generated Description</h3>
          <div className="p-4 bg-muted rounded-md relative group">
            <p className="whitespace-pre-wrap">{result.description}</p>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.description, toast)}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Suggested Keywords</h3>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">{result.keywords.join(', ')}</p>
          </div>
        </div>
      </div>
    ),
    details: {
      steps: [
        { text: 'Enter key property details (address, beds, baths)', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Mention 1-2 unique features', icon: <Sparkles className="h-6 w-6" /> },
        { text: 'Generate a full, persuasive listing description', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Writing Time', manual: '30-60 minutes of creative writing', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'SEO & Keywords', manual: 'Guesswork on what terms to use', ai: 'Automatically includes relevant local keywords', icon: <Sparkles /> },
        { metric: 'Completeness', manual: 'Often forgets key selling points', ai: 'Structured to include all critical information', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Ad Creator", benefit: "Use your new listing description as the source material for a targeted ad campaign." },
        { tool: "Landing Page Builder", benefit: "Instantly create a beautiful single-property website using your new listing details." }
      ],
       faqs: [
        { question: "Can I choose the tone of the listing?", answer: "Yes, you can specify a tone such as 'Luxurious,' 'Family-Friendly,' or 'Great for First-Time Buyers,' and the AI will adjust its language and emphasis accordingly." },
        { question: "Is the output ready to copy and paste into Bayut?", answer: "Absolutely. The generated text is formatted to be easily copied and pasted directly into the Bayut listing portal." },
        { question: "How does it know what keywords to use for SEO?", answer: "The AI analyzes the property's location and features to include relevant local keywords (like neighborhood names, school districts, or nearby landmarks) that a potential buyer is likely to search for on Bayut." }
      ],
    },
    creationFields: [
      { id: 'platform', name: 'Platform', type: 'text', placeholder: '', description: '', value: 'Bayut', hidden: true },
      { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., Villa 1, The Lakes, Dubai', description: 'The address of the a property.' },
      { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 5 beds, 6 baths, 4,500 sqft', description: 'Provide the basic stats.' },
      { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Upgraded interior, private pool, lake view', description: 'What makes this property special?' },
      { id: 'tone', name: 'Tone', type: 'select', options: ['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent'], placeholder: 'Select a tone', description: 'The tone of voice for the listing.' },
    ],
  },
  {
    id: 'offer-generator',
    title: 'Multi-Offer Builder AI',
    dashboardTitle: 'Multi-Offer Builder',
    description: 'Compare options side-by-side.',
    icon: <Briefcase />,
    color: '#78716c', // stone-500
    cta: 'Create Offer Package',
    categories: ['Sales Tools', 'Editing'],
    mindMapCategory: 'Sales Enablement',
    details: {
      steps: [
        { text: 'Select multiple properties for the client', icon: <Building className="h-6 w-6" /> },
        { text: 'Input the client\'s budget and terms', icon: <Wallet className="h-6 w-6" /> },
        { text: 'Generate a professional offer comparison PDF', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Document Creation Time', manual: '1-2 hours in Word or Excel', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Accuracy', manual: 'Prone to copy-paste errors and typos', ai: 'Calculations and details are always accurate', icon: <BadgeCheck /> },
        { metric: 'Professionalism', manual: 'Inconsistent formatting', ai: 'Generates a clean, branded, client-ready document', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Investor Matching", benefit: "After finding the top properties for an investor, use this tool to present them in a professional package." },
        { tool: "CRM Memory", benefit: "Pull the client's specific requirements directly from the CRM to pre-fill the offer terms." }
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
    id: 'whatsapp-campaigns',
    title: 'WhatsApp Manager AI',
    dashboardTitle: 'WhatsApp Manager',
    description: 'Personalized broadcasts + drips.',
    icon: <Phone />,
    color: '#16a34a', // green-600
    cta: 'Send WhatsApp Campaign',
    categories: ['Sales Tools', 'Social & Comms', 'Lead Gen'],
    mindMapCategory: 'Sales Enablement',
    details: {
      steps: [
        { text: 'Upload your client contact list', icon: <Upload className="h-6 w-6" /> },
        { text: 'Draft your message or follow-up sequence', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Send or schedule your campaign instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Time to Contact 100 Clients', manual: 'Hours of manual copy-pasting', ai: 'Fast by default', icon: <Clock2 /> },
        { metric: 'Personalization', manual: 'Generic, prone to errors', ai: 'Personalized with [Name], [Property], etc.', icon: <Sparkles /> },
        { metric: 'Follow-up Consistency', manual: 'Easy to forget or miss someone', ai: 'Automated sequences ensure no lead is lost', icon: <BadgeCheck /> },
      ],
      synergy: [
        { tool: "Social Leads", benefit: "Directly import new leads and add them to an automated welcome message sequence on WhatsApp." },
        { tool: "CRM Memory", benefit: "Use insights from the CRM to send highly targeted messages, like wishing a client a happy birthday or reminding them of an anniversary." }
      ],
       faqs: [
        { question: "Is this compliant with WhatsApp's policies?", answer: "Yes, this tool is designed to work within WhatsApp's Business Platform policies. It's intended for sending transactional messages and engaging with clients who have opted in to communication, not for spam." },
        { question: "Can it handle replies?", answer: "The tool is primarily for outbound campaigns. For managing two-way conversations, it works best when integrated with our AI Page Admin or Instagram Chat Bot." },
        { question: "What does 'personalization' mean?", answer: "If you upload a contact list with columns like 'Name' or 'Property of Interest', you can use placeholders like [Name] in your message. The tool will automatically replace the placeholder with the correct data for each contact, making your messages feel personal." }
      ],
    },
    creationFields: [
      { id: 'contacts', name: 'Contact List', type: 'file', description: 'Upload a CSV with names and numbers.' },
      { id: 'campaignType', name: 'Campaign Type', type: 'select', options: ["New Listing Announcement", "Open House Invitation", "Price Reduction Alert", "Post-Viewing Follow-up"], placeholder: 'Select a message template', description: 'Choose the goal of your campaign.' },
      { id: 'sendTime', name: 'Schedule', type: 'select', options: ['Send Immediately', 'Schedule for 1 hour from now', 'Schedule for tomorrow at 9 AM'], placeholder: 'Select send time', description: 'When should the campaign be sent?' },
    ],
  },
  
  // --- CORE INTELLIGENCE ---
  {
    id: 'ai-brand-creator',
    title: 'Brand Creator AI',
    dashboardTitle: 'Brand Creator',
    description: "Create your brand onboarding from documents.",
    icon: <Wrench />,
    color: '#10b981', // emerald-500
    cta: 'Create Brand Kit',
    categories: ['Sales Tools', 'Creative'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    details: {
      steps: [
        { text: 'Upload documents (brand guide, project lists)', icon: <Upload /> },
        { text: "Tell the assistant to set up your workspace", icon: <Bot /> },
        { text: 'The AI configures your brand, projects & more', icon: <Sparkles /> },
      ],
      aiVsManual: [
        { metric: 'Setup Time', manual: '1-2 hours of manual data entry', ai: 'Under 5 minutes', icon: <Clock2 /> },
        { metric: 'Accuracy', manual: 'Prone to typos and copy-paste errors', ai: 'Extracts data directly from source documents', icon: <BadgeCheck /> },
        { metric: 'Completeness', manual: 'Easy to forget details or projects', ai: 'Comprehensive setup from all provided files', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "AI Assistant", benefit: "This tool is a command for the AI assistant, showcasing its ability to perform administrative tasks." },
        { tool: "Brand Management", benefit: "The extracted brand information automatically populates your Brand Kit." }
      ],
      faqs: [
        { question: "What kind of documents work best?", answer: "Structured documents like brand guides (PDF), project lists (CSV or PDF), or even a simple Word document with your company details work great. The more structured the data, the better the extraction." },
        { question: "Will this overwrite my existing settings?", answer: "The AI will present you with the information it has extracted and ask for confirmation before applying any changes to your workspace." },
        { question: "Is this a one-time thing?", answer: "You can use this tool anytime you have new projects or updated brand information to quickly update your suite's configuration." }
      ],
    },
    creationFields: [
      { id: 'command', name: 'Command', type: 'text', placeholder: "e.g., Set up my brand and projects from these files.", description: "Tell the AI what you want to do." },
      { id: 'documents', name: 'Source Documents', type: 'file', multiple: true, description: 'Upload one or more files (PDF, CSV, TXT) for the AI to analyze.' },
    ],
  },
  {
    id: 'projects-finder',
    title: 'Market Library Access AI',
    dashboardTitle: 'Market Library',
    description: "Access our verified Market Library to build your project portfolio.",
    icon: <Search />,
    color: '#fde047', // yellow-300
    cta: 'Search Market Library',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Core Intelligence',
    badge: 'NEW',
    isPage: true,
    details: {
      steps: [
        { text: 'Define your target area and criteria', icon: <MapPin /> },
        { text: 'AI scans public records and news for signals', icon: <BrainCircuit /> },
        { text: 'Get a report of potential off-market deals', icon: <FileText /> },
      ],
      aiVsManual: [
        { metric: 'Opportunity Sourcing', manual: 'Relies on word-of-mouth and existing network', ai: 'Scans thousands of data points continuously', icon: <Network /> },
        { metric: 'Time Investment', manual: 'Hours of manual research per week', ai: 'Automated, on-demand reports', icon: <Clock2 /> },
        { metric: 'Deal Flow', manual: 'Limited and sporadic', ai: 'Consistent, proactive deal sourcing', icon: <Sparkles /> },
      ],
      synergy: [
        { tool: "Investor Matching", benefit: "Once a potential project is found, instantly match it with the right clients from your database." },
        { tool: "Market Reports", benefit: "Generate a detailed market analysis for a newly discovered project to validate its potential." }
      ],
      faqs: [
        { question: "What kind of projects can it find?", answer: "The AI can identify a range of opportunities, from single-lot development potential and fixer-uppers to larger plots suitable for multi-unit construction." },
        { question: "Where does the AI get its information?", answer: "The AI scans a wide array of public data sources, including permit applications, zoning changes, property records, and local news articles to find signals of potential development or sales." },
        { question: "Is this information verified?", answer: "The AI provides you with a list of potential leads and the source of the information. It is designed to be a powerful starting point for your own due diligence and outreach." }
      ],
    },
    creationFields: [
      { id: 'group-filters', name: 'Search Filters', type: 'group-header', description: 'Set your criteria to find relevant projects.'},
      { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., "Austin, TX" or "Zip code 90210"', description: 'The city, neighborhood, or zip code to search in.' },
      { id: 'status', name: 'Project Status', type: 'select', options: ["Ready to move", "Under Construction", "New Launch"], placeholder: 'Select a project status', description: 'Filter by the current stage of the project.' },
      { id: 'developer', name: 'Developer(s) (Optional)', type: 'text', placeholder: 'e.g., "Toll Brothers", "Hines"', description: 'Focus on projects by specific developers.'},
      { id: 'minPrice', name: 'Min Price', type: 'number', placeholder: 'e.g., 500000', description: 'The minimum price for the project.' },
      { id: 'maxPrice', name: 'Max Price', type: 'number', placeholder: 'e.g., 2000000', description: 'The maximum price for the project.' },
      { id: 'setup', name: 'Configure Listing Websites', type: 'button', cta: 'Go to Settings to add Listing Sites', description: 'Add the primary listing websites for your market in the settings for better results.' },
    ],
  },
  {
    id: 'crm-assistant',
    title: 'CRM Memory AI',
    dashboardTitle: 'CRM Memory',
    description: 'Remembers every client detail.',
    icon: <Database />,
    color: '#0d9488', // teal-600
    cta: 'Get Client Record',
    categories: ['Sales Tools', 'Lead Gen'],
    mindMapCategory: 'Core Intelligence',
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
    id: 'ai-assistant',
    title: 'Assistant AI',
    dashboardTitle: 'Assistant',
    description: 'Your personal, trainable AI partner.',
    icon: <BrainCircuit />,
    color: '#84cc16', // lime-500
    cta: 'Train Assistant',
    categories: ['Sales Tools'],
    mindMapCategory: 'Core Intelligence',
    badge: 'BETA',
    details: {
      steps: [
        { text: 'Give your assistant core instructions', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Upload documents to its knowledge base', icon: <Upload className="h-6 w-6" /> },
        { text: 'Chat with it anywhere in the app', icon: <MessageCircle className="h-6 w-6" /> },
      ],
      aiVsManual: [
        { metric: 'Knowledge Recall', manual: 'Limited to your own memory and notes', ai: 'Instantly recalls every detail from every file', icon: <Database /> },
        { metric: 'Task Execution', manual: 'You have to do everything yourself', ai: 'Can summarize, draft, compare, and role-play', icon: <Sparkles /> },
        { metric: 'Availability', manual: 'You need sleep and breaks', ai: 'Always on, always ready to assist 24/7', icon: <Clock2 /> },
      ],
      synergy: [
        { tool: "CRM Memory", benefit: "The Assistant is the user-facing interface for the powerful memory stored in the CRM." },
        { tool: "All Tools", benefit: "The Assistant has access to all uploaded documents, making every tool more context-aware and powerful." }
      ],
       faqs: [
        { question: "What's the difference between this and ChatGPT?", answer: "While both are powered by advanced AI, the Super Seller Suite Assistant is specifically designed for real estate and is integrated with your private data. You can upload brochures, reports, and client lists, and the assistant will use that private knowledge to give you hyper-relevant, contextual answers that a public tool like ChatGPT could never provide." },
        { question: "Is my data used to train Google's models?", answer: "No. Absolutely not. The knowledge base you provide for your assistant is kept completely private and secure. It is only used to inform the responses for your account and is never used for training the underlying AI models." },
        { question: "What kind of documents can I upload?", answer: "You can upload PDFs, text files, and CSVs. This is perfect for market reports, property brochures, client databases, legal documents, and more. The more knowledge you give your assistant, the more powerful it becomes." }
      ],
    },
    creationFields: [
       { id: 'assistant-redirect', name: 'Train Your Assistant', type: 'button', cta: 'Go to Assistant Training', description: 'Personalize your AI by giving it instructions and knowledge.' },
    ],
  },
  
  // --- INTERNAL & HIDDEN ---
  {
    id: 'superfreetime',
    title: 'SuperFreeTime Game',
    description: 'A hidden mini-game to find a secret key and win a prize.',
    icon: <Key />,
    color: '#a1a1aa', // zinc-400
    cta: 'Play Game',
    categories: ['All'],
    mindMapCategory: 'Internal',
    details: {
      steps: [{ text: 'It is a secret.', icon: <Sparkles /> }],
      aiVsManual: [{ metric: 'Fun', manual: 'Work, work, work.', ai: 'A delightful surprise.', icon: <Sparkles /> }],
      synergy: [{ tool: 'AI Assistant', benefit: 'Winning the game gives you a secret code to unlock a reward from the Assistant.' }],
      faqs: [{ question: "What is this?", answer: "It's a secret game for you to enjoy. Have fun!" }],
    },
    creationFields: [],
  },
];

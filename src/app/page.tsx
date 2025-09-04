
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
  Gem,
  Sparkles,
  Gauge,
  Mails,
  Binoculars,
  Video,
  BarChart,
  Repeat,
  CalendarCheck,
  Award,
  Megaphone,
  Zap,
  Users,
  TrendingUp,
  Filter,
  Lightbulb,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  Clock,
  Briefcase,
  PenTool,
  MessageCircle,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  ClipboardList,
  FilePlus,
  Network,
  Handshake,
  Headset,
  BookOpen,
  Camera,
  LineChart,
  FileSearch,
  Building,
  Key,
  X,
  Clapperboard,
  Film,
  UserCog,
  MessageSquare,
  CheckCircle,
  Upload,
  MousePointerClick,
  Send,
  Plus,
  Link,
  Users2,
  Clock2,
  BadgeCheck,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ShinyButton } from '@/components/ui/shiny-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from '@/components/ui/progress';
import { CreationTool } from '@/components/creation-tool';


type Feature = (typeof features)[0];

const features = [
  {
    id: 'ad-creation',
    title: 'Instant Ad Creation',
    description: 'Generate high-performance ad copy and visuals from any brochure in seconds.',
    icon: <Megaphone />,
    color: 'from-pink-500/80 to-pink-600/80',
    cta: 'Ad',
    details: {
      steps: [
          { text: 'Upload your property brochure (PDF)', icon: <FileUp className="h-6 w-6" /> },
          { text: 'Select a focus (e.g., "luxury", "family")', icon: <Target className="h-6 w-6" /> },
          { text: 'Generate multiple ad variants instantly', icon: <Sparkles className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Time Investment',
          manual: '5-10 hours per campaign',
          ai: 'Under 60 seconds',
          icon: <Clock2 />,
        },
        {
          metric: 'Cost & Resources',
          manual: 'Requires copywriter & designer',
          ai: 'Included in your subscription',
          icon: <Wallet />,
        },
        {
          metric: 'Quality & Testing',
          manual: 'Relies on guesswork, 1-2 variations',
          ai: 'Data-driven, 5+ variations to test',
          icon: <BadgeCheck />,
        },
      ],
      synergy: [
        { tool: "Precision Targeting", benefit: "Ensure your perfect ads are seen by people ready to buy." },
        { tool: "AI Page Admin", benefit: "Deploy your new ad across social channels to maximize reach." }
      ]
    },
    creationFields: [
      { id: 'brochure', name: 'Property Brochure', type: 'file', description: 'Upload the PDF brochure.' },
      { id: 'focus', name: 'Ad Focus', type: 'text', placeholder: 'e.g., Family-friendly, Luxury, Investment', description: 'What aspect should the ad highlight?' },
      { id: 'tone', name: 'Tone of Voice', type: 'text', placeholder: 'e.g., Professional, Exciting, Welcoming', description: 'Set the tone for the ad copy.' },
    ],
    faqs: [
      {
        question: "What kind of brochures can I use?",
        answer: "You can upload almost any standard PDF brochure from a developer or your own marketing materials. The AI is designed to extract key information like floor plans, features, and location."
      },
      {
        question: "Can I edit the ads after they are generated?",
        answer: "Absolutely. The AI-generated content serves as a powerful starting point. You can then tweak the copy, headlines, and calls-to-action to perfectly match your voice and campaign goals."
      },
      {
        question: "How are the ad visuals created?",
        answer: "The AI uses a combination of stock imagery, design templates, and an understanding of your brand's color palette to create visually appealing and effective ad graphics. You can also provide your own images for the AI to incorporate."
      }
    ],
  },
  {
    id: 'targeting',
    title: 'Precision Targeting',
    description: 'Our AI analyzes your project and identifies high-intent buyers.',
    icon: <Target />,
    color: 'from-blue-500/80 to-blue-600/80',
    cta: 'Targeting Profile',
    details: {
      steps: [
        { text: 'Describe your ideal buyer persona', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Provide details about the property', icon: <Building className="h-6 w-6" /> },
        { text: 'Get detailed audience settings for ads', icon: <ClipboardList className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Audience Discovery',
          manual: 'Broad guessing (e.g., "Age 30-50")',
          ai: 'Niche, high-intent segments',
          icon: <Users2 />,
        },
        {
          metric: 'Time to Research',
          manual: 'Hours of market research',
          ai: 'Under 30 seconds',
          icon: <Clock2 />,
        },
        {
          metric: 'Budget Efficiency',
          manual: 'High waste on wrong audiences',
          ai: 'Optimized ad spend, higher ROI',
          icon: <Wallet />,
        },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Design the perfect ad for the high-intent audience you've just identified." },
        { tool: "AI Social Post Writer", benefit: "Create organic posts that speak directly to the interests of your target persona." }
      ]
    },
    creationFields: [
      { id: 'propertyDetails', name: 'Property Details', type: 'textarea', placeholder: 'e.g., 3-bed condo in downtown, waterfront views, near tech hub...', description: 'Describe the property and its key selling points.' },
      { id: 'audiencePersona', name: 'Ideal Buyer Persona', type: 'textarea', placeholder: 'e.g., Young professionals in tech, aged 25-35, interested in smart homes and city living...', description: 'Describe the person you want to reach.' },
    ],
    faqs: [
      {
        question: "What platforms can I use these audiences on?",
        answer: "Our targeting suggestions are optimized for major platforms like Facebook, Instagram, and Google Ads. We provide you with the exact interests, demographics, and keywords to input."
      },
      {
        question: "How does the AI know who is a 'high-intent' buyer?",
        answer: "The AI analyzes anonymous data signals such as recent searches for mortgage calculators, activity in moving-related forums, and engagement with real estate content to identify users who are actively in the market."
      },
      {
        question: "Is this compliant with privacy regulations?",
        answer: "Yes. The system uses anonymized, aggregated data and adheres to all privacy regulations. It identifies audience *patterns* and *segments*, not individuals."
      }
    ],
  },
  {
    id: 'rebranding',
    title: 'Automated Rebranding',
    description: 'Instantly rebrand any brochure with your logo, colors, and voice.',
    icon: <Palette />,
    color: 'from-orange-500/80 to-orange-600/80',
    cta: 'Rebranded Brochure',
    details: {
      steps: [
        { text: 'Upload any developer\'s brochure (PDF)', icon: <Upload className="h-6 w-6" /> },
        { text: 'Provide your logo & contact info', icon: <FilePlus className="h-6 w-6" /> },
        { text: 'Download the rebranded brochure instantly', icon: <FileText className="h-6 w-6" /> },
      ],
      aiVsManual: [
         {
          metric: 'Time to Rebrand',
          manual: '2-4 hours in design software',
          ai: 'Under 1 minute',
          icon: <Clock2 />,
        },
        {
          metric: 'Required Skill',
          manual: 'Proficiency in Adobe InDesign/Canva',
          ai: 'Ability to upload a file',
          icon: <BrainCircuit />,
        },
        {
          metric: 'Consistency',
          manual: 'Prone to human error and typos',
          ai: 'Perfectly consistent every time',
          icon: <BadgeCheck />,
        },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Use your newly rebranded brochure to power an ad campaign." },
        { tool: "Landing Page Generator", benefit: "Generate a branded landing page that perfectly matches your rebranded brochure." }
      ]
    },
    creationFields: [
      { id: 'developerBrochure', name: 'Developer Brochure', type: 'file', description: 'Upload the original PDF.' },
      { id: 'yourLogo', name: 'Your Logo', type: 'file', description: 'Upload your personal or company logo (PNG, JPG). Optional.' },
      { id: 'contactInfo', name: 'Your Contact Info', type: 'text', placeholder: 'e.g., John Doe - 555-123-4567', description: 'This will be added to the brochure.' },
      { id: 'brandColors', name: 'Brand Colors', type: 'text', placeholder: 'e.g., Royal Blue and Gold', description: 'Primary colors for accents.' },
    ],
    faqs: [
      {
        question: "Will this work with any PDF?",
        answer: "It works best with text-based PDFs, which are standard for most property brochures. It may be less effective on image-only PDFs or scans."
      },
      {
        question: "What if I don't have a logo?",
        answer: "No problem. You can simply add your name and contact information. The tool will format it professionally within the brochure."
      },
       {
        question: "Can it change the text to match my 'brand voice'?",
        answer: "Yes. You can specify a tone (e.g., 'professional,' 'friendly,' 'luxurious'), and the AI can subtly adjust headings and key phrases to align with your brand's voice."
      }
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Generator',
    description: 'Generate persuasive landing pages that captivate buyers.',
    icon: <LayoutTemplate />,
    color: 'from-green-500/80 to-green-600/80',
    cta: 'Landing Page',
    details: {
      steps: [
        { text: 'Provide a property brochure or link', icon: <Link className="h-6 w-6" /> },
        { text: 'Specify your branding preferences', icon: <Palette className="h-6 w-6" /> },
        { text: 'Generate a complete landing page', icon: <LayoutTemplate className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Time to Build',
          manual: '1-2 days using a website builder',
          ai: 'Under 60 seconds',
          icon: <Clock2 />,
        },
        {
          metric: 'Technical Skill',
          manual: 'Requires web design & dev knowledge',
          ai: 'None. Just provide the source.',
          icon: <BrainCircuit />,
        },
        {
          metric: 'Features',
          manual: 'Lead forms, galleries added manually',
          ai: 'All features included automatically',
          icon: <BadgeCheck />,
        },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Generate promotional posts to drive traffic to your new landing page." },
        { tool: "Instant Ad Creation", benefit: "Run a targeted ad campaign that clicks through to your beautiful new page." }
      ]
    },
    creationFields: [
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Link to property info or upload brochure below', description: 'Provide a URL to the property listing or website.' },
      { id: 'brochure', name: 'Or Upload Brochure', type: 'file', description: 'Alternatively, upload a PDF brochure.' },
      { id: 'branding', name: 'Branding Style', type: 'text', placeholder: 'e.g., Modern, Minimalist, Luxury', description: 'Describe the desired look and feel.' },
    ],
    faqs: [
      {
        question: "Can I use my own domain name?",
        answer: "Yes, you can connect your own custom domain name to the landing pages you create, ensuring a fully branded experience for your visitors."
      },
      {
        question: "Are the landing pages mobile-friendly?",
        answer: "Absolutely. Every landing page generated is fully responsive and looks great on all devices, from desktops to smartphones."
      },
      {
        question: "Is it optimized for SEO?",
        answer: "Yes. The AI automatically generates SEO-friendly titles, meta descriptions, and image alt-tags to help your page rank better on search engines."
      }
    ],
  },
  {
    id: 'social-posts',
    title: 'AI Social Post Writer',
    description: "Generate a week's worth of social content from a single link or topic.",
    icon: <Share2 />,
    color: 'from-rose-500/80 to-rose-600/80',
    cta: 'Social Post',
    details: {
      steps: [
        { text: 'Enter a topic, URL, or property address', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Choose your platforms (e.g., FB, IG)', icon: <Share2 className="h-6 w-6" /> },
        { text: 'Get a week of content with images & hashtags', icon: <CalendarCheck className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Content Creation Time',
          manual: '2-3 hours for a week\'s content',
          ai: 'Under 1 minute',
          icon: <Clock2 />,
        },
        {
          metric: 'Creativity',
          manual: 'Struggles with writer\'s block',
          ai: 'Generates endless creative angles',
          icon: <Lightbulb />,
        },
        {
          metric: 'Completeness',
          manual: 'Forgets hashtags or image ideas',
          ai: 'Includes text, hashtags, and visuals',
          icon: <BadgeCheck />,
        },
      ],
      synergy: [
        { tool: "AI Page Admin", benefit: "Automatically schedule your newly generated posts for maximum engagement." },
        { tool: "Landing Page Generator", benefit: "Create a page for a new listing and then use this tool to generate promotional posts for it." }
      ]
    },
    creationFields: [
      { id: 'source', name: 'Content Source', type: 'text', placeholder: 'Paste a URL or type a topic, e.g., "Market update for downtown"', description: 'The AI will use this as inspiration.' },
      { id: 'platforms', name: 'Social Platforms', type: 'text', placeholder: 'e.g., Facebook, Instagram, LinkedIn', description: 'Tailor the posts for specific platforms.' },
      { id: 'tone', name: 'Tone of Voice', type: 'text', placeholder: 'e.g., Informative, Humorous, Urgent', description: 'Set the mood for your posts.' },
    ],
    faqs: [
      {
        question: "What kind of topics work best?",
        answer: "You can use local market news, articles about home improvement, community events, or even just a property address. The more specific the source, the more tailored the content."
      },
      {
        question: "Can I generate content for Instagram?",
        answer: "Yes! The AI can generate captions, hashtag suggestions, and ideas for visuals that are perfectly suited for Instagram's format."
      },
      {
        question: "Can I review the posts before they are published?",
        answer: "Of course. The AI generates the posts and saves them as drafts. You have full editorial control to review, edit, and approve every post before it goes live."
      }
    ],
  },
  {
    id: 'story-designer',
    title: 'AI Story Designer',
    description: 'Craft compelling stories for Instagram and Facebook in seconds.',
    icon: <Film />,
    color: 'from-fuchsia-500/80 to-fuchsia-600/80',
    cta: 'Story',
    details: {
      steps: [
        { text: 'Upload 3-5 property photos', icon: <Camera className="h-6 w-6" /> },
        { text: 'Choose a vibe (e.g., "Modern", "Luxury")', icon: <Palette className="h-6 w-6" /> },
        { text: 'Generate multiple story variants to post', icon: <Clapperboard className="h-6 w-6" /> },
      ],
      aiVsManual: [
         {
          metric: 'Design Time',
          manual: '15-30 minutes per story in Canva',
          ai: 'Under 60 seconds for 3-5 variants',
          icon: <Clock2 />,
        },
        {
          metric: 'Design Skill',
          manual: 'Requires a good eye for design',
          ai: 'Professional designs, automatically',
          icon: <BrainCircuit />,
        },
        {
          metric: 'Visual Appeal',
          manual: 'Static templates',
          ai: 'Dynamic animations & trending effects',
          icon: <Sparkles />,
        },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Get caption ideas for your story to make it even more engaging." },
        { tool: "AI Page Admin", benefit: "Schedule your new story to post at the perfect time for maximum views." }
      ]
    },
    creationFields: [
      { id: 'photos', name: 'Property Photos', type: 'file', multiple: true, description: 'Upload 3-5 high-quality images.' },
      { id: 'vibe', name: 'Story Vibe', type: 'text', placeholder: 'e.g., Upbeat & Modern, Elegant & Luxurious, Cozy & Warm', description: 'This influences music, text, and effects.' },
      { id: 'callToAction', name: 'Call to Action', type: 'text', placeholder: 'e.g., "Swipe up for tour!", "DM for info"', description: 'The final text prompt for viewers.' },
    ],
    faqs: [
      {
        question: "Can I add music?",
        answer: "Yes. The AI suggests royalty-free music that matches the 'vibe' you select. You can also upload your own audio tracks."
      },
      {
        question: "Is my branding automatically added?",
        answer: "Yes, once you set up your brand kit with your logo and colors, the AI automatically incorporates them into every story design."
      },
      {
        question: "Can I customize the text and images?",
        answer: "Absolutely. The AI provides a finished product as a starting point. You have full control to edit the text, swap out images, and change the animations."
      }
    ],
  },
  {
    id: 'reel-designer',
    title: 'AI Reel Designer',
    description: 'Create professional video reels from photos and text effortlessly.',
    icon: <Clapperboard />,
    color: 'from-violet-500/80 to-violet-600/80',
    cta: 'Reel',
    details: {
      steps: [
        { text: 'Upload photos or video clips', icon: <Video className="h-6 w-6" /> },
        { text: 'Provide key selling points as text', icon: <PenTool className="h-6 w-6" /> },
        { text: 'Get a polished reel synced to trending audio', icon: <Send className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Editing Time',
          manual: 'Hours of complex timeline editing',
          ai: 'Under 3 minutes',
          icon: <Clock2 />,
        },
        {
          metric: 'Audio',
          manual: 'Difficult to find trending audio',
          ai: 'Synced automatically to licensed audio',
          icon: <BrainCircuit />,
        },
        {
          metric: 'Pacing & Effects',
          manual: 'Hard to get right',
          ai: 'Intelligently paced with effects',
          icon: <Sparkles />,
        },
      ],
      synergy: [
        { tool: "Instant Ad Creation", benefit: "Promote your final reel with a targeted ad campaign to reach thousands." },
        { tool: "AI Page Admin", benefit: "Share your reel with the Page Admin for automatic posting at peak times." }
      ]
    },
    creationFields: [
      { id: 'media', name: 'Photos or Video Clips', type: 'file', multiple: true, description: 'Upload your visual assets.' },
      { id: 'sellingPoints', name: 'Key Selling Points', type: 'textarea', placeholder: '- Breathtaking ocean views\n- Newly renovated kitchen\n- 5 minutes from the beach', description: 'Use bullet points for text overlays in the video.' },
      { id: 'vibe', name: 'Reel Vibe', type: 'text', placeholder: 'e.g., High-energy, Cinematic, Relaxing', description: 'This influences the music and editing style.' },
    ],
    faqs: [
      {
        question: "Does the AI choose the music?",
        answer: "Yes, the AI analyzes your footage and selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select."
      },
      {
        question: "What if I only have a few photos?",
        answer: "That's fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects like zooms and pans to make static images feel alive."
      },
      {
        question: "Can I add a voiceover?",
        answer: "Yes. You can record a voiceover directly in the tool, or upload a pre-recorded audio file. The AI can even generate a voiceover for you."
      }
    ],
  },
  {
    id: 'page-admin',
    title: 'AI Page Admin',
    description: 'Your personal AI assistant to manage your social media pages.',
    icon: <UserCog />,
    color: 'from-cyan-500/80 to-cyan-600/80',
    cta: 'Page Admin Setup',
    details: {
      steps: [
        { text: 'Connect your Facebook & Instagram pages', icon: <Network className="h-6 w-6" /> },
        { text: 'Set your response preferences', icon: <UserCog className="h-6 w-6" /> },
        { text: 'Let the AI handle scheduling and replies 24/7', icon: <Clock className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Weekly Time Spent',
          manual: '5-10 hours managing pages',
          ai: 'Minutes to review suggestions',
          icon: <Clock2 />,
        },
        {
          metric: 'Response Time',
          manual: 'Hours, misses messages overnight',
          ai: 'Instant, 24/7 responsiveness',
          icon: <MessageCircle />,
        },
        {
          metric: 'Lead Capture',
          manual: 'Inconsistent, easy to miss',
          ai: 'Flags high-intent leads automatically',
          icon: <Filter />,
        },
      ],
      synergy: [
        { tool: "AI Social Post Writer", benefit: "Create a fully automated content pipeline from idea to publication." },
        { tool: "AI Sales Master Chat", benefit: "When the AI flags a high-intent lead, use the chat to practice your response." }
      ]
    },
    creationFields: [
      { id: 'connect', name: 'Connect Accounts', type: 'button', cta: 'Connect Facebook & Instagram', description: 'Authorize the AI to manage your pages.' },
      { id: 'faq', name: 'Property FAQ', type: 'textarea', placeholder: 'Price: $550,000\nBedrooms: 3\nOpen House: Sat 1-3 PM', description: 'Provide info for the AI to answer common questions.' },
    ],
    faqs: [
      {
        question: "Can the AI answer complex questions?",
        answer: "The AI is trained to handle common, factual questions (price, square footage, open house times). For complex or nuanced inquiries, it will intelligently flag the conversation and notify you for personal review."
      },
      {
        question: "Will it post without my approval?",
        answer: "You have full control. You can set the AI to be fully autonomous, or have it queue up all posts in a 'drafts' folder for you to approve with one click."
      },
      {
        question: "Which social media platforms are supported?",
        answer: "Currently, the AI Page Admin integrates with Facebook Pages and Instagram Business accounts. We are actively working on adding support for other platforms like LinkedIn."
      }
    ],
  },
  {
    id: 'sales-master-chat',
    title: 'AI Sales Master Chat',
    description: 'Chat with legendary sales personas to sharpen your skills.',
    icon: <MessageSquare />,
    color: 'from-lime-500/80 to-lime-600/80',
    cta: 'Chat Session',
    details: {
      steps: [
        { text: 'Choose an AI sales persona to chat with', icon: <Users className="h-6 w-6" /> },
        { text: 'Role-play a client scenario (e.g., negotiation)', icon: <Handshake className="h-6 w-6" /> },
        { text: 'Get instant feedback on your approach', icon: <Lightbulb className="h-6 w-6" /> },
      ],
      aiVsManual: [
        {
          metric: 'Training Availability',
          manual: 'Expensive seminars, finding a mentor',
          ai: 'On-demand, 24/7, risk-free practice',
          icon: <Clock2 />,
        },
        {
          metric: 'Feedback',
          manual: 'Subjective, not always available',
          ai: 'Instant, objective, based on proven models',
          icon: <BadgeCheck />,
        },
        {
          metric: 'Cost',
          manual: 'Can cost thousands for coaching',
          ai: 'Included in your subscription',
          icon: <Wallet />,
        },
      ],
      synergy: [
        { tool: "Precision Targeting", benefit: "Practice handling objections and questions from the specific buyer personas you've identified." },
        { tool: "AI Page Admin", benefit: "After the AI flags a high-intent lead, use the chat to prepare for your first call." }
      ]
    },
    creationFields: [
      { id: 'persona', name: 'Choose Persona', type: 'select', options: ['The Challenger', 'The Closer', 'The Relationship Builder'], description: 'Select an AI sales coach to chat with.' },
      { id: 'scenario', name: 'Your Scenario', type: 'textarea', placeholder: 'My client wants to lowball the offer on 123 Main St. How should I respond?', description: 'Describe the situation you want to practice.' },
    ],
    faqs: [
      {
        question: "Are the personas based on real people?",
        answer: "The personas are archetypes based on well-known sales methodologies (e.g., 'The Challenger Sale,' 'SPIN Selling'). They are designed to embody specific, proven strategies to challenge your thinking."
      },
      {
        question: "Can I upload my own scripts for practice?",
        answer: "Yes, you can paste your own scripts into the chat and ask the AI persona to critique them or role-play the other side of the conversation. It's a great way to prepare for a specific call."
      },
      {
        question: "Does the chat save my conversations?",
        answer: "Yes, your conversations are saved privately in your account, so you can review them later to track your progress and revisit key insights and feedback."
      }
    ],
  },
];

const FeatureCard = ({
  feature,
  onClick,
}: {
  feature: Feature;
  onClick: (feature: Feature) => void;
}) => {
  const ctaPrefix = {
    'Ad': 'Generate your first',
    'Targeting Profile': 'Build a',
    'Rebranded Brochure': 'Create your',
    'Landing Page': 'Generate a',
    'Social Post': 'Write a',
    'Story': 'Design a',
    'Reel': 'Produce a',
    'Page Admin Setup': 'Set up your',
    'Chat Session': 'Start a'
  }[feature.cta] || 'Create your first';


  return (
    <div
      className={cn(
        'group relative flex flex-col [perspective:1000px] transition-all duration-300',
        'hover:shadow-2xl hover:z-20 hover:-translate-y-2'
      )}
      onClick={() => onClick(feature)}
    >
      <div
        className={cn(
          'relative w-full h-[420px] text-white rounded-3xl cursor-pointer',
          'transition-transform duration-700 ease-in-out [transform-style:preserve-3d]',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br rounded-3xl',
            'transition-opacity duration-500',
            feature.color,
            '[backface-visibility:hidden]',
          )}
        >
            <div className="z-10 flex flex-col h-full">
              <div className="mb-4 p-3 bg-white/20 rounded-full w-fit">
                {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
              </div>
              <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
              <p className="text-lg opacity-90 flex-grow">{feature.description}</p>
              <div
                className='bg-white/10 hover:bg-white/20 text-white w-full backdrop-blur-sm border border-white/20 mt-auto rounded-md text-sm font-medium h-11 px-8 inline-flex items-center justify-center gap-2'
              >
                <span>{ctaPrefix} <strong className="font-semibold">{feature.cta}</strong></span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const FeatureModal = ({ feature, onClose }: { feature: Feature | null, onClose: () => void }) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground max-w-5xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className={cn("p-8 rounded-t-2xl bg-gradient-to-br", feature.color)}>
               <div className="flex items-center justify-between">
                  <div className='flex items-center gap-4'>
                    <div className="p-4 bg-white/20 rounded-full w-fit">
                      {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-1">{feature.title}</h2>
                      <p className="text-lg text-white/80">{feature.description}</p>
                    </div>
                  </div>
                   <div className='flex items-center gap-2'>
                     <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/20">Login</Button>
                   </div>
               </div>
            </div>
            
            <div className='p-8'>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">How to Use</TabsTrigger>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="comparison">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 text-foreground/90">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {feature.details.steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            {step.icon}
                          </div>
                          <p className="font-semibold text-foreground">Step {i+1}</p>
                          <p className='text-sm text-foreground/70'>{step.text}</p>
                        </div>
                      ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-center text-primary">Manual Process</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border">
                           <div className="flex items-center gap-3 mb-2">
                            {React.cloneElement(item.icon, { className: "h-5 w-5 text-muted-foreground" })}
                            <h4 className="font-semibold text-foreground">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.manual}</p>
                        </div>
                      ))}
                    </div>
                     <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-center text-primary">AI-Powered Suite</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                           <div className="flex items-center gap-3 mb-2">
                             {React.cloneElement(item.icon, { className: "h-5 w-5 text-primary" })}
                            <h4 className="font-semibold text-primary">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.ai}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="create">
                  <CreationTool feature={feature} />
                </TabsContent>

                <TabsContent value="synergy" className="space-y-4 text-foreground/90">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {feature.details.synergy.map((s, index) => (
                      <div key={index} className="bg-card p-4 rounded-lg border flex flex-col gap-3">
                         <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 text-primary rounded-md">
                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                            </div>
                            <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="p-2 bg-secondary text-secondary-foreground rounded-md">
                               <h4 className="font-semibold text-sm">{s.tool}</h4>
                            </div>
                        </div>
                        <div className="text-sm text-foreground/80 pl-1">
                          <p>{s.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq">
                  <Accordion type="single" collapsible className="w-full">
                    {feature.faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            <div className="p-6 text-center">
              <Button variant="outline" size="lg" className='text-base'>
                  Create your first {feature.cta} today
              </Button>
            </div>
            
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);

  const handleCardClick = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            A salesperson with tools is a super-seller.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            A salesperson without tools is just looking for help. Explore the tools below.
          </p>
        </div>

        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12 max-w-[120rem] mx-auto"
        >
          {features.map((feature) => (
            <FeatureCard 
                key={feature.id} 
                feature={feature} 
                onClick={handleCardClick}
            />
          ))}
        </div>
      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}

    

    
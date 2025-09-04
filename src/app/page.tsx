
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ShinyButton } from '@/components/ui/shiny-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type Feature = (typeof features)[0];

const features = [
  {
    id: 'ad-creation',
    title: 'Instant Ad Creation',
    description: 'Generate high-performance ad copy and visuals from any brochure in seconds.',
    icon: <Megaphone />,
    color: 'from-pink-500/80 to-pink-600/80',
    cta: 'Create an Ad',
    details: {
      useCase: "Our AI analyzes your property brochures and instantly generates multiple high-converting ad variants optimized for platforms like Facebook, Instagram, and Google. It understands the unique selling points, target demographics, and creates compelling copy and visuals to match.",
      aiVsManual: "A manual campaign involves hours of brainstorming, copywriting, and graphic design, often with inconsistent results. Our AI delivers multiple, data-driven ad options in under 60 seconds, allowing you to test and deploy campaigns at a fraction of the time and cost.",
      experienceLevel: "Zero. If you can upload a PDF brochure, you can generate a professional ad campaign. The AI handles all the creative and strategic heavy lifting.",
      synergy: "Use **Precision Targeting** to identify the perfect audience for your new ad, then deploy it across your social channels with the **AI Page Admin** to maximize reach and engagement."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=1',
        dataAiHint: 'modern living room',
        description: 'AI-generated ad for a luxury downtown condo.'
      },
      {
        image: 'https://picsum.photos/600/400?random=2',
        dataAiHint: 'suburban house',
        description: 'Facebook ad variant focusing on a family-friendly layout.'
      },
      {
        image: 'https://picsum.photos/600/400?random=3',
        dataAiHint: 'apartment amenities',
        description: 'Instagram ad highlighting community amenities like the pool and gym.'
      }
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
    cta: 'Target Buyers',
    details: {
      useCase: "Move beyond basic demographics like age and location. Our AI identifies high-intent buyer personas by analyzing millions of data points, including online behavior, life events (like a new job or growing family), and psychographic signals, ensuring your ads reach the most qualified audience.",
      aiVsManual: "Manual targeting relies on guesswork and broad categories ('interested in real estate'). Our AI builds a detailed profile of your ideal buyer, finding niche audiences you'd never think of, which drastically improves your return on ad spend and lead quality.",
      experienceLevel: "Zero. Describe your property and ideal buyer in plain English (e.g., 'young families looking for a 3-bedroom house near good schools'), and the AI will generate the perfect audience profile for you to use on platforms like Facebook and Google.",
      synergy: "Once you've created a campaign with **Instant Ad Creation**, apply your new Precision Targeting audience to ensure your perfectly crafted ads are seen by people ready to make a move."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=4',
        dataAiHint: 'data dashboard',
        description: 'Audience profile for "First-Time Homebuyers in Tech".'
      },
      {
        image: 'https://picsum.photos/600/400?random=5',
        dataAiHint: 'map targeting',
        description: 'Geographic targeting focused on users within a 10-mile radius who have shown interest in moving.'
      },
      {
        image: 'https://picsum.photos/600/400?random=6',
        dataAiHint: 'interest graph',
        description: 'Interest-based targeting for "Luxury Investors" who follow high-end financial publications.'
      }
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
    cta: 'Rebrand a Brochure',
    details: {
      useCase: "Upload any developer's project brochure, and our AI will instantly rebrand it with your logo, contact information, and brand colors, giving you a polished, professional marketing asset in seconds. It's perfect for quickly preparing materials for a client or an open house.",
      aiVsManual: "Manually rebranding a PDF requires design software like Adobe InDesign and hours of tedious work. Our AI reads the document, identifies the correct places for your branding, and applies it flawlessly in under a minute.",
      experienceLevel: "Zero. If you have your logo and contact info, you're ready to go. The AI handles all the complex formatting and placement automatically.",
      synergy: "After rebranding a brochure, use it to power an **Instant Ad Campaign** or generate a beautiful **Landing Page**. It becomes the source material for your entire marketing funnel."
    },
sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=7',
        dataAiHint: 'brochure before',
        description: 'Original developer brochure with generic branding.'
      },
      {
        image: 'https://picsum.photos/600/400?random=8',
        dataAiHint: 'brochure after',
        description: 'The same brochure, instantly rebranded with your logo and contact information.'
      },
      {
        image: 'https://picsum.photos/600/400?random=9',
        dataAiHint: 'logo color palette',
        description: 'AI automatically applies your brand\'s color palette throughout the document.'
      }
    ],
    faqs: [
      {
        question: "Will this work with any PDF?",
        answer: "It works best with text-based PDFs, which are standard for most property brochures. The AI can read the text and identify where to place your information. It may be less effective on image-only PDFs or scans."
      },
      {
        question: "What if I don't have a logo?",
        answer: "No problem. You can simply add your name and contact information. The tool will format it professionally within the brochure. You can also use our **AI Logo Generator** to create one on the fly."
      },
       {
        question: "Can it change the text to match my 'brand voice'?",
        answer: "Yes. You can specify a tone (e.g., 'professional,' 'friendly,' 'luxurious'), and the AI can subtly adjust headings and key phrases to align with your brand's voice while keeping the core facts of the brochure intact."
      }
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Generator',
    description: 'Generate persuasive landing pages that captivate buyers.',
    icon: <LayoutTemplate />,
    color: 'from-green-500/80 to-green-600/80',
    cta: 'Generate a Page',
    details: {
      useCase: "Create stunning, high-converting single-property websites with a single click. Our AI pulls property details, images, and key features from a brochure or MLS listing to build a beautiful, mobile-responsive landing page designed to capture leads.",
      aiVsManual: "Building a landing page manually requires web development skills or complex page-builder tools like Squarespace, taking hours or even days. Our AI generates a complete, professional page in seconds, including a photo gallery, features list, and contact form.",
      experienceLevel: "Zero. No coding or design skills are required. If you can provide a property address or a brochure, you can generate a gorgeous landing page. It's that easy.",
      synergy: "Drive traffic to your new page by linking it from your **AI Social Posts** and **Instant Ad Campaigns**. All leads captured on the page will be automatically added to your CRM."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=10',
        dataAiHint: 'website hero section',
        description: 'A beautiful hero section with a compelling headline and lead capture form.'
      },
      {
        image: 'https://picsum.photos/600/400?random=11',
        dataAiHint: 'photo gallery',
        description: 'An elegant, automatically generated photo gallery of the property.'
      },
      {
        image: 'https://picsum.photos/600/400?random=12',
        dataAiHint: 'map view',
        description: 'An embedded map showing the location and nearby amenities.'
      }
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
        answer: "Yes. The AI automatically generates SEO-friendly titles, meta descriptions, and image alt-tags based on the property details to help your page rank better on search engines like Google."
      }
    ],
  },
  {
    id: 'social-posts',
    title: 'AI Social Post Writer',
    description: "Generate a week's worth of social content from a single link or topic.",
    icon: <Share2 />,
    color: 'from-rose-500/80 to-rose-600/80',
    cta: 'Write Social Posts',
    details: {
      useCase: "Never worry about what to post again. Give our AI a link to a news article, a blog post, or just a topic (e.g., 'local market update'), and it will generate a full week's worth of engaging social media content for Twitter, Facebook, LinkedIn, and Instagram.",
      aiVsManual: "Manually creating a week of content can take hours of brainstorming, writing, and tailoring posts for different platforms. Our AI does the heavy lifting in under a minute, providing a variety of high-quality posts, each adapted to the specific format and tone of each platform.",
      experienceLevel: "Zero. If you can copy and paste a link or type a phrase, you can create an entire social media content calendar. The AI suggests relevant hashtags and images for you.",
      synergy: "Use the **AI Page Admin** to automatically schedule the generated posts at the optimal times for maximum engagement. This creates a fully automated content pipeline, from idea to publication."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=13',
        dataAiHint: 'twitter post',
        description: 'A concise, engaging Twitter post with relevant hashtags.'
      },
      {
        image: 'https://picsum.photos/600/400?random=14',
        dataAiHint: 'linkedin article',
        description: 'A professional LinkedIn post perfect for building your authority in the market.'
      },
      {
        image: 'https://picsum.photos/600/400?random=15',
        dataAiHint: 'facebook post',
        description: 'A more detailed Facebook post with an eye-catching image suggestion.'
      }
    ],
    faqs: [
      {
        question: "What kind of topics work best?",
        answer: "You can use local market news, articles about home improvement, community events, or even just a property address. The more specific the source, the more tailored the content will be."
      },
      {
        question: "Can I generate content for Instagram?",
        answer: "Yes! The AI can generate captions, hashtag suggestions, and ideas for visuals (like carousels or polls) that are perfectly suited for Instagram's format."
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
    cta: 'Design a Story',
    details: {
      useCase: "This tool transforms your property photos and key details into engaging, multi-slide stories for Instagram and Facebook. It automatically adds animated text, stylish graphics, and your branding, creating a professional-looking story that grabs attention and stops the scroll.",
      aiVsManual: "Manually creating a single animated story with varied layouts in an app like Canva can take 15-30 minutes. The AI Story Designer generates 3-5 unique, ready-to-post story variants in under 60 seconds, complete with music suggestions.",
      experienceLevel: "Zero. If you can upload a photo and type a key feature (e.g., 'Newly Renovated Kitchen'), you can create a professional-grade social media story. No design or animation skills needed.",
      synergy: "Use the **AI Social Post Writer** to get caption ideas for your story, then use the **AI Page Admin** to schedule it for the optimal time. You can also use it to promote an open house from a **Landing Page**."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=16',
        dataAiHint: 'instagram story modern',
        description: 'A "Just Listed" story with a modern, animated text overlay.'
      },
      {
        image: 'https://picsum.photos/600/400?random=17',
        dataAiHint: 'facebook story luxury',
        description: 'A multi-slide story showcasing luxury features with elegant transitions.'
      },
      {
        image: 'https://picsum.photos/600/400?random=18',
        dataAiHint: 'open house invite',
        description: 'An animated Open House invitation with a countdown sticker.'
      }
    ],
    faqs: [
      {
        question: "Can I add music?",
        answer: "Yes. The AI suggests royalty-free music that matches the 'vibe' you select (e.g., 'Modern', 'Luxurious', 'Upbeat'). You can also upload your own audio tracks to maintain brand consistency."
      },
      {
        question: "Is my branding automatically added?",
        answer: "Yes, once you set up your brand kit with your logo and colors in your profile, the AI automatically incorporates them into every story design, ensuring a consistent and professional look."
      },
      {
        question: "Can I customize the text and images?",
        answer: "Absolutely. The AI provides a finished product as a starting point. You have full control to edit the text, swap out images, and change the animations before finalizing your story."
      }
    ],
  },
  {
    id: 'reel-designer',
    title: 'AI Reel Designer',
    description: 'Create professional video reels from photos and text effortlessly.',
    icon: <Clapperboard />,
    color: 'from-violet-500/80 to-violet-600/80',
    cta: 'Produce Viral Reels',
    details: {
      useCase: "An AI-powered video editor that turns your static property photos and text descriptions into dynamic, attention-grabbing video reels. It's perfect for platforms like Instagram, TikTok, and YouTube Shorts. The AI intelligently edits your clips, adds transitions, and syncs them to trending audio.",
      aiVsManual: "Manually editing a simple video reel can take hours using complex software like Adobe Premiere Pro. The AI Reel Designer produces a polished, ready-to-post video in under 3 minutes, handling all the technical editing for you.",
      experienceLevel: "Zero. No video editing knowledge is required. Simply upload your photos or short video clips, provide some key features as text, and the AI does the rest.",
      synergy: "Use photos from a listing, pull a compelling narrative from the **AI Sales Master Chat**, and promote the final reel with an **Instant Ad Campaign** to reach thousands of potential buyers."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=19',
        dataAiHint: 'video editor interface',
        description: 'AI automatically syncs photo transitions to the beat of the music.'
      },
      {
        image: 'https://picsum.photos/600/400?random=20',
        dataAiHint: 'real estate reel',
        description: 'A finished 15-second reel showcasing a property\'s best features.'
      },
      {
        image: 'https://picsum.photos/600/400?random=21',
        dataAiHint: 'text animation',
        description: 'Dynamic text overlays that highlight key information like "Waterfront Views".'
      }
    ],
    faqs: [
      {
        question: "Does the AI choose the music?",
        answer: "Yes, the AI analyzes your footage and selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select, ensuring your video feels current and engaging."
      },
      {
        question: "What if I only have a few photos?",
        answer: "That's perfectly fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects like Ken Burns (slow zoom/pan) and parallax to make static images feel alive."
      },
      {
        question: "Can I add a voiceover?",
        answer: "Yes. You can record a voiceover directly in the tool, or upload a pre-recorded audio file. The AI can even generate a voiceover for you based on a script you provide."
      }
    ],
  },
  {
    id: 'page-admin',
    title: 'AI Page Admin',
    description: 'Your personal AI assistant to manage your social media pages.',
    icon: <UserCog />,
    color: 'from-cyan-500/80 to-cyan-600/80',
    cta: 'Put Your Page on Autopilot',
    details: {
      useCase: "Let our AI Page Admin handle the day-to-day of your social media presence. It can schedule posts, respond to common inquiries, and flag important comments for your attention, freeing you up to focus on closing deals. It's like having a social media manager on your team 24/7.",
      aiVsManual: "Manually, you'd spend 5-10 hours per week checking comments, responding to DMs, and scheduling posts. The AI Page Admin automates this entire process while ensuring instant responsiveness, so no lead is ever left waiting.",
      experienceLevel: "Zero. Simply connect your social pages and set up your response preferences one time. The AI learns from your properties and your brand voice to provide authentic, helpful interactions.",
      synergy: "Connect it to your **AI Social Post Writer** to create a fully automated content pipeline. Let it handle inquiries from your **Instant Ad Campaigns** around the clock, even while you sleep."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=22',
        dataAiHint: 'social media dashboard',
        description: 'The main dashboard showing scheduled posts and recent activity.'
      },
      {
        image: 'https://picsum.photos/600/400?random=23',
        dataAiHint: 'automated response',
        description: 'An example of the AI instantly replying to a comment asking for the price.'
      },
      {
        image: 'https://picsum.photos/600/400?random=24',
        dataAiHint: 'lead notification',
        description: 'A lead with high buying intent is automatically flagged for your personal attention.'
      }
    ],
    faqs: [
      {
        question: "Can the AI answer complex questions?",
        answer: "The AI is trained to handle common, factual questions (e.g., 'How many bedrooms?', 'What's the square footage?'). For complex or nuanced inquiries, it will intelligently flag the conversation and notify you for personal review."
      },
      {
        question: "Will it post without my approval?",
        answer: "You have full control. You can set the AI to be fully autonomous, or you can have it queue up all posts and responses in a 'drafts' folder for you to approve with a single click."
      },
      {
        question: "Which social media platforms are supported?",
        answer: "Currently, the AI Page Admin integrates with Facebook Pages and Instagram Business accounts. We are actively working on adding support for LinkedIn and other platforms."
      }
    ],
  },
  {
    id: 'sales-master-chat',
    title: 'AI Sales Master Chat',
    description: 'Chat with legendary sales personas to sharpen your skills.',
    icon: <MessageSquare />,
    color: 'from-lime-500/80 to-lime-600/80',
    cta: 'Chat with Sales Legends',
    details: {
      useCase: "An interactive chat simulator where you can practice sales scripts, brainstorm negotiation tactics, and get advice from a variety of AI-powered sales personas, each modeled after a legendary sales archetype. It's a risk-free environment to hone your skills.",
      aiVsManual: "Manual sales training involves expensive seminars, role-playing with colleagues (who are often too busy), or trial-and-error with real clients where mistakes can be costly. The AI Sales Master Chat provides an on-demand, 24/7 training ground that's always available.",
      experienceLevel: "Zero. It's a simple chat interface. Just choose your persona, type your question or sales scenario, and get an instant, insightful response.",
      synergy: "Use the **AI Social Post Writer** to generate a post about a new listing, then jump into the **Sales Master Chat** to practice how you'd handle incoming calls about it. Role-play overcoming objections before you ever face them in real life."
    },
    sliderContent: [
      {
        image: 'https://picsum.photos/600/400?random=25',
        dataAiHint: 'chat interface',
        description: 'Choose your persona: The Challenger, The Closer, or The Relationship Builder.'
      },
      {
        image: 'https://picsum.photos/600/400?random=26',
        dataAiHint: 'sales conversation',
        description: 'Role-playing a negotiation scenario for a higher commission.'
      },
      {
        image: 'https://picsum.photos/600/400?random=27',
        dataAiHint: 'script feedback',
        description: 'Getting instant feedback on how to improve your opening line for a cold call.'
      }
    ],
    faqs: [
      {
        question: "Are the personas based on real people?",
        answer: "The personas are archetypes based on well-known sales methodologies (e.g., 'The Challenger Sale', 'SPIN Selling'). They are designed to embody specific, proven strategies to give you a well-rounded training experience."
      },
      {
        question: "Can I upload my own scripts for practice?",
        answer: "Yes, you can paste your own scripts into the chat and ask the AI persona to critique them, provide feedback, or even role-play the other side of the conversation with you."
      },
      {
        question: "Does the chat save my conversations?",
        answer: "Yes, your conversations are saved privately in your account, so you can review them later to track your progress and revisit key insights."
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

  return (
    <div
      className={cn(
        "group relative flex flex-col [perspective:1000px] transition-all duration-300",
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
                Learn More
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
               <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-full w-fit">
                    {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-1">{feature.title}</h2>
                    <p className="text-lg text-white/80">{feature.description}</p>
                  </div>
               </div>
            </div>
            
            <div className='p-8'>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="comparison">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 text-foreground/90">
                    <h3 className="text-2xl font-semibold">How It Works</h3>
                    <p>{feature.details.useCase}</p>
                    <p><strong className='text-primary'>Experience Level:</strong> {feature.details.experienceLevel}</p>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                    <h3 className="text-2xl font-semibold">AI vs. Manual</h3>
                    <p>{feature.details.aiVsManual}</p>
                </TabsContent>

                <TabsContent value="use-cases">
                  <Carousel className="w-full max-w-xl mx-auto">
                    <CarouselContent>
                      {feature.sliderContent.map((slide, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="rounded-lg overflow-hidden border">
                              <Image src={slide.image} alt={slide.description} width={600} height={400} data-ai-hint={slide.dataAiHint}/>
                            </div>
                            <p className="text-center text-sm text-foreground/70 mt-2">{slide.description}</p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className='-left-8' />
                    <CarouselNext className='-right-8' />
                  </Carousel>
                </TabsContent>

                <TabsContent value="synergy" className="space-y-4 text-foreground/90">
                  <h3 className="text-2xl font-semibold">Works Best With</h3>
                  <p dangerouslySetInnerHTML={{ __html: feature.details.synergy.replace(/\*\*(.*?)\*\*/g, "<span class='font-semibold text-primary/90 bg-primary/10 py-1 px-2 rounded-md'>$1</span>") }} />
                </TabsContent>

                <TabsContent value="faq">
                  <Accordion type="single" collapsible className="w-full">
                    {feature.faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            <div className="p-8 text-center bg-card/50 rounded-b-2xl">
               <ShinyButton>
                Try for free
                <ArrowRight />
              </ShinyButton>
            </div>
            
            <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20">
              <X className="h-6 w-6" />
            </button>
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


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
      useCase: [
          'Analyzes property brochures to understand unique selling points.',
          'Instantly generates multiple high-converting ad variants.',
          'Optimizes copy and visuals for Facebook, Instagram, and Google.'
        ],
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
      useCase: [
          'Describe your property and ideal buyer in plain English.',
          'AI generates a detailed profile with specific demographics, interests, and online behaviors.',
          'Get the exact audience settings to use for Facebook & Google Ads.'
        ],
      aiVsManual: "Manual targeting is a guessing game. Our AI finds niche audiences you'd never think of, drastically improving your ad spend and lead quality.",
      experienceLevel: 'Zero. If you can describe your client, you can use this tool.',
      synergy: "Combine with **Instant Ad Creation** to ensure your perfect ads are seen by people ready to buy."
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
        description: 'Geographic targeting for users who have shown interest in moving.'
      },
      {
        image: 'https://picsum.photos/600/400?random=6',
        dataAiHint: 'interest graph',
        description: 'Interest-based targeting for "Luxury Investors".'
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
      useCase: [
          'Upload any developer\'s project brochure.',
          'Instantly applies your logo, contact info, and brand colors.',
          'Adjusts headings to align with your brand\'s tone of voice.'
        ],
      aiVsManual: "Manually rebranding a PDF requires design software and hours of work. Our AI does it in under a minute.",
      experienceLevel: "Zero. If you have your logo and contact info, you're ready.",
      synergy: "Use your rebranded brochure to power an **Instant Ad Campaign** or generate a **Landing Page**."
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
        description: 'AI automatically applies your brand\'s color palette.'
      }
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
    cta: 'Generate a Page',
    details: {
      useCase: [
          'Creates stunning single-property websites with one click.',
          'Pulls property details, images, and features from brochures or MLS listings.',
          'Builds a complete, mobile-responsive page with a photo gallery and lead form.'
        ],
      aiVsManual: "Building a landing page manually takes hours or days. Our AI generates a complete, professional page in seconds.",
      experienceLevel: 'Zero. No coding or design skills required.',
      synergy: "Drive traffic to your new page by linking it from your **AI Social Posts** and **Instant Ad Campaigns**."
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
    cta: 'Write Social Posts',
    details: {
      useCase: [
          'Generates a full week of social content from a single URL or topic.',
          'Creates tailored posts for Twitter, Facebook, LinkedIn, and Instagram.',
          'Suggests relevant hashtags and eye-catching images.'
        ],
      aiVsManual: "Manually creating a week of content can take hours. Our AI does it in under a minute, providing a variety of high-quality posts.",
      experienceLevel: "Zero. If you can copy and paste a link, you can create a content calendar.",
      synergy: "Use the **AI Page Admin** to automatically schedule the generated posts for maximum engagement."
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
        description: 'A professional LinkedIn post perfect for building your authority.'
      },
      {
        image: 'https://picsum.photos/600/400?random=15',
        dataAiHint: 'facebook post',
        description: 'A more detailed Facebook post with an image suggestion.'
      }
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
    cta: 'Design a Story',
    details: {
      useCase: [
          'Transforms property photos into engaging, multi-slide social media stories.',
          'Automatically adds animated text, stylish graphics, and your branding.',
          'Generates 3-5 unique, ready-to-post story variants in under 60 seconds.'
        ],
      aiVsManual: "Manually creating a single animated story in Canva can take 15-30 minutes. The AI generates 3-5 unique variants in under 60 seconds.",
      experienceLevel: 'Zero. If you can upload a photo, you can create a professional-grade story.',
      synergy: "Use the **AI Social Post Writer** to get caption ideas for your story, then use the **AI Page Admin** to schedule it."
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
    cta: 'Produce Viral Reels',
    details: {
      useCase: [
          'Turns static photos into dynamic, attention-grabbing video reels.',
          'Intelligently adds transitions and syncs them to trending audio.',
          'Perfect for Instagram, TikTok, and YouTube Shorts.'
        ],
      aiVsManual: "Manually editing a reel can take hours with complex software. The AI produces a polished, ready-to-post video in under 3 minutes.",
      experienceLevel: 'Zero. No video editing knowledge is required. Upload photos and the AI does the rest.',
      synergy: "Promote your final reel with an **Instant Ad Campaign** to reach thousands of potential buyers."
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
        description: 'Dynamic text overlays that highlight key information.'
      }
    ],
    faqs: [
      {
        question: "Does the AI choose the music?",
        answer: "Yes, the AI analyzes your footage and selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select."
      },
      {
        question: "What if I only have a few photos?",
        answer: "That's fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects to make static images feel alive."
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
    cta: 'Put Your Page on Autopilot',
    details: {
      useCase: [
          'Handles day-to-day social media management 24/7.',
          'Schedules posts for peak engagement times.',
          'Instantly responds to common inquiries and flags important comments.'
        ],
      aiVsManual: "Manually, you'd spend 5-10 hours per week checking comments and scheduling posts. The AI Page Admin automates this while ensuring instant responsiveness.",
      experienceLevel: "Zero. Simply connect your social pages and set your preferences one time.",
      synergy: "Connect it to your **AI Social Post Writer** to create a fully automated content pipeline."
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
        description: 'A lead with high buying intent is automatically flagged for your attention.'
      }
    ],
    faqs: [
      {
        question: "Can the AI answer complex questions?",
        answer: "The AI is trained to handle common, factual questions. For complex inquiries, it will intelligently flag the conversation and notify you for personal review."
      },
      {
        question: "Will it post without my approval?",
        answer: "You have full control. You can set the AI to be fully autonomous, or have it queue up all posts in a 'drafts' folder for you to approve."
      },
      {
        question: "Which social media platforms are supported?",
        answer: "Currently, the AI Page Admin integrates with Facebook Pages and Instagram Business accounts. We are actively working on adding support for other platforms."
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
      useCase: [
          'Practice sales scripts and negotiation tactics in a risk-free environment.',
          'Chat with AI personas modeled after legendary sales archetypes.',
          'Get instant, insightful feedback to hone your skills 24/7.'
        ],
      aiVsManual: "Manual sales training involves expensive seminars or trial-and-error with real clients. The AI provides an on-demand, 24/7 training ground.",
      experienceLevel: "Zero. It's a simple chat interface. Choose your persona and start typing.",
      synergy: "Use the **AI Social Post Writer** to generate a post, then jump into the chat to practice handling incoming calls about it."
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
        description: 'Getting instant feedback on how to improve your opening line.'
      }
    ],
    faqs: [
      {
        question: "Are the personas based on real people?",
        answer: "The personas are archetypes based on well-known sales methodologies (e.g., 'The Challenger Sale'). They are designed to embody specific, proven strategies."
      },
      {
        question: "Can I upload my own scripts for practice?",
        answer: "Yes, you can paste your own scripts into the chat and ask the AI persona to critique them or role-play the other side of the conversation."
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
              <Tabs defaultValue="use-cases" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="comparison">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 text-foreground/90">
                    <h3 className="text-2xl font-semibold text-primary">How It Works</h3>
                    <ul className="space-y-3">
                      {feature.details.useCase.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="!mt-8">
                      <span className='font-semibold text-primary'>Experience Level:</span> 
                      <span className='ml-2 bg-primary/10 text-primary-foreground/90 py-1 px-3 rounded-full text-sm font-medium'>
                        {feature.details.experienceLevel}
                      </span>
                    </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                    <h3 className="text-2xl font-semibold text-primary">AI vs. Manual</h3>
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
                  <h3 className="text-2xl font-semibold text-primary">Works Best With</h3>
                  <p dangerouslySetInnerHTML={{ __html: feature.details.synergy.replace(/\*\*(.*?)\*\*/g, "<span class='font-semibold text-primary/90 bg-primary/10 py-1 px-2 rounded-md'>$1</span>") }} />
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

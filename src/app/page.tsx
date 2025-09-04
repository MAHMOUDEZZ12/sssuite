
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
      useCase: "Our AI analyzes your property brochures and instantly generates multiple high-converting ad variants optimized for platforms like Facebook, Instagram, and Google.",
      aiVsManual: "Manually, you might spend hours brainstorming copy and working with a designer. Our AI delivers multiple options in under 60 seconds, saving you time and money while maximizing performance.",
      experienceLevel: "Zero. If you can upload a brochure, you can generate a professional ad campaign.",
      synergy: "Combine with **Precision Targeting** to ensure your perfectly crafted ads reach the ideal high-intent buyers.",
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
      useCase: "Move beyond basic demographics. Our AI identifies high-intent buyer personas based on online behavior, life events, and psychographic data, ensuring your ads reach the most qualified audience.",
      aiVsManual: "Manual targeting relies on guesswork and broad categories. Our AI analyzes millions of data points to find niche audiences you'd never think of, drastically improving your ROI.",
      experienceLevel: "Zero. Just describe your ideal buyer in plain English, and the AI will build the perfect audience for you.",
      synergy: "Use these targeted audiences when you launch an **Instant Ad Campaign** to maximize your ad spend.",
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
      useCase: "Upload any developer's project brochure, and our AI will instantly rebrand it with your logo, contact information, and brand colors, giving you a polished, professional asset in seconds.",
      aiVsManual: "Manually rebranding a PDF requires design software and hours of tedious work. Our AI does it flawlessly in under a minute.",
      experienceLevel: "Zero. If you have your logo and contact info, you're ready to go.",
      synergy: "After rebranding a brochure, use it to power an **Instant Ad Campaign** or generate a **Landing Page**.",
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
        answer: "It works best with text-based PDFs, which are standard for most property brochures. The AI can read the text and identify where to place your information. It may be less effective on image-only PDFs."
      },
      {
        question: "What if I don't have a logo?",
        answer: "No problem. You can simply add your name and contact information. The tool will format it professionally within the brochure."
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
      useCase: "Create stunning, high-converting landing pages for your listings with a single click. Our AI pulls property details and images to build a beautiful page designed to capture leads.",
      aiVsManual: "Building a landing page manually requires web development skills or complex page-builder tools, taking hours or days. Our AI generates a complete, mobile-responsive page in seconds.",
      experienceLevel: "Zero. No coding or design skills are required. It's that easy.",
      synergy: "Drive traffic to your new page by linking it from your **AI Social Posts** and **Instant Ad Campaigns**.",
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
      useCase: "Never worry about what to post again. Give our AI a link to a news article, a blog post, or just a topic, and it will generate a full week's worth of engaging social media content for all your platforms.",
      aiVsManual: "Manually creating a week of content can take hours of brainstorming and writing. Our AI does the heavy lifting in under a minute, providing a variety of posts tailored to different platforms.",
      experienceLevel: "Zero. If you can copy and paste a link, you can create a content calendar.",
      synergy: "Use the **AI Page Admin** to automatically schedule the posts at the optimal times for maximum engagement.",
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
        answer: "Yes! The AI can generate captions, hashtag suggestions, and ideas for visuals that are perfectly suited for Instagram's format."
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
      useCase: "A tool that transforms your property photos and key details into engaging, multi-slide stories for Instagram and Facebook, complete with animated text, graphics, and your branding.",
      aiVsManual: "Manually, creating a single story with varied layouts and animations can take 15-30 minutes. The AI Story Designer generates 3-5 unique, ready-to-post story variants in under 60 seconds.",
      experienceLevel: "Zero. If you can upload a photo and type a sentence, you can create professional-grade stories.",
      synergy: "Combine with **AI Social Post Writer** to get the copy for your story, then use **AI Page Admin** to schedule it for the optimal time.",
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
        answer: "The AI suggests royalty-free music that matches the 'vibe' you select (e.g., 'Modern', 'Luxurious'). You can also upload your own audio tracks to maintain brand consistency."
      },
      {
        question: "Is my branding automatically added?",
        answer: "Yes, once you set up your brand kit with your logo and colors, the AI automatically incorporates them into every story design, ensuring a consistent and professional look."
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
      useCase: "An AI-powered video editor that turns your static property photos and text descriptions into dynamic, attention-grabbing video reels for platforms like Instagram, TikTok, and YouTube Shorts.",
      aiVsManual: "Manually, editing a simple video reel can take hours using complex software. The AI Reel Designer produces a polished, ready-to-post video in under 3 minutes.",
      experienceLevel: "Zero. No video editing knowledge is required.",
      synergy: "Use photos from a listing, pull copy from the **AI Script Generator**, and promote the final reel with an **Instant Ad Campaign**.",
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
        answer: "Yes, the AI selects from a library of trending, commercially-licensed audio tracks that match the 'vibe' you select for your reel, ensuring your video feels current and engaging."
      },
      {
        question: "What if I only have a few photos?",
        answer: "That's perfectly fine! The AI is skilled at creating dynamic videos even with a small number of assets by using effects like Ken Burns (slow zoom/pan) to make static images feel alive."
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
      useCase: "Imagine your social media pages running on intelligent autopilot. Our AI Page Admin is more than a scheduler—it's a digital extension of you, handling comments, messages, and scheduling 24/7.",
      aiVsManual: "Manually, you'd spend 5-10 hours per week checking comments and DMs. The AI Page Admin automates this entire process while ensuring instant responsiveness.",
      experienceLevel: "Zero. Simply connect your social pages and set up your response preferences one time.",
      synergy: "Connect it to your **AI Social Post Writer** to create a fully automated content pipeline. Let it handle inquiries from your **Instant Ad Campaigns** around the clock.",
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
        answer: "The AI is trained to handle common, factual questions (e.g., 'How many bedrooms?', 'What's the square footage?'). For complex or nuanced inquiries, it will intelligently flag the conversation for your personal review."
      },
      {
        question: "Will it post without my approval?",
        answer: "You have full control. You can set the AI to be fully autonomous, or you can have it queue up all posts and responses in a 'drafts' folder for you to approve with a single click."
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
      useCase: "An interactive chat simulator where you can practice sales scripts, brainstorm negotiation tactics, and get advice from a variety of AI-powered sales personas.",
      aiVsManual: "Manual sales training involves expensive seminars or trial-and-error with real clients. The AI Sales Master Chat provides a safe, on-demand training ground available 24/7.",
      experienceLevel: "Zero. It's a simple chat interface. Just type your question or scenario and get an instant response.",
      synergy: "Use the **AI Script Generator** to create a cold call script, then practice it with the **AI Sales Master** before making real calls.",
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
        answer: "The personas are archetypes based on well-known sales methodologies. They are designed to embody specific, proven strategies to give you a well-rounded training experience."
      },
      {
        question: "Can I upload my own scripts for practice?",
        answer: "Yes, you can paste your own scripts into the chat and ask the AI persona to critique them, provide feedback, or even role-play the other side of the conversation with you."
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
      <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/20 text-foreground max-w-4xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className={cn("p-8 rounded-t-2xl bg-gradient-to-br", feature.color)}>
               <div className="mb-4 p-4 bg-white/20 rounded-full w-fit">
                {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{feature.title}</h2>
              <p className="text-lg text-white/80">{feature.description}</p>
            </div>
            
            <div className='p-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Details</h3>
                  <p className="text-foreground/80">{feature.details.useCase}</p>
                  <p className="text-foreground/80"><strong className='text-primary'>AI vs. Manual:</strong> {feature.details.aiVsManual}</p>
                  <p className="text-foreground/80"><strong className='text-primary'>Experience Level:</strong> {feature.details.experienceLevel}</p>
                  <p className="text-foreground/80" dangerouslySetInnerHTML={{ __html: `<strong class='text-primary'>Synergy:</strong> ${feature.details.synergy.replace(/\*\*(.*?)\*\*/g, "<span class='font-semibold text-foreground/90'>$1</span>")}` }} />
                </div>
                
                <Separator />

                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {feature.faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-2xl font-semibold text-center">See it in Action</h3>
                <Carousel className="w-full max-w-lg mx-auto">
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            <Separator />

            <div className="p-8 text-center">
               <ShinyButton>
                {feature.cta}
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


'use client';

import React, { useState } from 'react';
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

  FileText,
  Megaphone,
  Users,
  BookOpen,
  Tag,
  Blocks,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Instant Ad Creation',
    description:
      'Generate stunning, high-performance ad copy and visuals from any project brochure in seconds. Dominate your market, instantly.',
    icon: <Megaphone />,
    callToAction: 'Activate Ad AI',
    backText: 'Generate Your Leads with AI',
    color: 'from-pink-500/80 to-pink-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'AI-Powered Ad Generation',
    spotlightDescription: 'Transform your marketing with AI-driven ad creation. Upload a brochure, and our system generates multiple ad variations, complete with compelling copy and visuals, all tailored to your target audience. A/B test different approaches and optimize for maximum engagement.'
  },
  {
    title: 'Precision Targeting',
    description:
      'Our AI analyzes your project and identifies high-intent buyers. Stop guessing and start closing with hyper-specific targeting.',
    icon: <Target />,
    callToAction: 'Find Your Buyers',
    backText: 'Close More Deals, Faster',
    color: 'from-blue-500/80 to-blue-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
    spotlightTitle: 'Hyper-Specific Audience Targeting',
    spotlightDescription: 'Our AI goes beyond simple demographics. It analyzes online behavior, life events, and purchasing patterns to identify high-intent buyers. Get detailed audience personas and targeting parameters for platforms like Facebook, Google, and LinkedIn.'
  },
  {
    title: 'Automated Rebranding',
    description:
      'Upload any project brochure. Our AI instantly rebrands it with your logo, colors, and voice. Total brand synergy, zero effort.',
    icon: <Palette />,
    callToAction: 'Master Your Brand',
    backText: 'Achieve Perfect Brand Synergy',
    color: 'from-orange-500/80 to-orange-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
    spotlightTitle: 'Instant Brochure Rebranding',
    spotlightDescription: 'Maintain brand consistency across all your marketing materials. Upload any developer brochure, and our AI will instantly apply your branding—logo, color palette, and tone of voice—creating a professional, cohesive look in seconds.'
  },
  {
    title: 'Landing Page Generator',
    description:
      'Automatically generate beautiful, persuasive landing pages that captivate buyers and drive action. No coding, just results.',
    icon: <LayoutTemplate />,
    callToAction: 'Build Your Funnel',
    backText: 'Captivate Buyers Instantly',
    color: 'from-green-500/80 to-green-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'High-Conversion Landing Pages',
    spotlightDescription: 'Generate stunning, mobile-responsive landing pages with a single click. Our AI uses proven marketing frameworks to write persuasive copy and select engaging visuals, ensuring your pages are optimized for lead capture.'
  },
  {
    title: 'Full Campaign Automation',
    description:
      'The ultimate power-up. Upload a single brochure and watch as our platform builds a complete, branded marketing campaign.',
    icon: <Bot />,
    callToAction: 'Go Autopilot',
    backText: 'Launch a Full Campaign in One Click',
    color: 'from-purple-500/80 to-purple-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
    spotlightTitle: 'One-Click Campaign Deployment',
    spotlightDescription: 'The ultimate sales accelerator. Upload a single brochure, and our AI will orchestrate an entire marketing campaign: ads, landing pages, social media posts, and email follow-ups, all branded and ready to launch.'
  },
  {
    title: 'PDF Ads',
    description:
      'Transform static PDF brochures into dynamic, clickable ads ready for any platform.',
    icon: <FileText />,
    callToAction: 'Animate Your PDFs',
    backText: 'Make PDFs Perform',
    color: 'from-teal-500/80 to-teal-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
    spotlightTitle: 'Dynamic PDF Advertisements',
    spotlightDescription: 'Breathe new life into your existing marketing materials. Transform static PDF brochures into interactive, clickable ads perfect for social media and email campaigns, driving engagement and capturing leads directly from the document.'
  },
  {
    title: 'Lead Management',
    description:
      'AI-powered lead scoring and organization to prioritize your hottest prospects.',
    icon: <Users />,
    callToAction: 'Focus on Hot Leads',
    backText: 'Never Miss an Opportunity',
    color: 'from-red-500/80 to-red-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'Intelligent Lead Management',
    spotlightDescription: 'Our smart CRM automatically organizes and scores your leads based on their engagement and profile data. Get at-a-glance insights into your most promising prospects, so you can focus your energy where it counts.'
  },
  {
    title: 'Brochure Rebranding',
    description:
      'Instantly apply your branding to any developer brochure, making it your own.',
    icon: <BookOpen />,
    callToAction: 'Claim Your Brand',
    backText: 'Brand it Yours',
    color: 'from-indigo-500/80 to-indigo-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
    spotlightTitle: 'Effortless Brochure Rebranding',
    spotlightDescription: 'Instantly rebrand any developer brochure with your own logo, contact information, and color scheme. Project a professional, unified brand image across all your marketing materials, without any design work.'
  },
  {
    title: 'Offer Management',
    description:
      'Create, send, and track offers with automated follow-ups and reminders.',
    icon: <Tag />,
    callToAction: 'Streamline Offers',
    backText: 'Close Deals Faster',
    color: 'from-yellow-500/80 to-yellow-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
    spotlightTitle: 'Seamless Offer Management',
    spotlightDescription: 'Streamline your sales process with our offer management system. Create, send, and track offers in one place. Automated reminders and follow-ups ensure you never miss a deadline, helping you close deals faster.'
  },
  {
    title: 'Calendar Sync',
    description:
      'Automatically schedule viewings and meetings with qualified leads, synced to your calendar.',
    icon: <CalendarCheck />,
    callToAction: 'Automate Scheduling',
    backText: 'Fill Your Calendar',
    color: 'from-cyan-500/80 to-cyan-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'Automated Calendar Coordination',
    spotlightDescription: 'Eliminate the back-and-forth of scheduling. Qualified leads can book viewings and meetings directly from your landing pages and ads, with events automatically synced to your personal calendar.'
  },
  {
    title: 'Bulk Actions',
    description:
      "Send personalized emails, update lead statuses, and manage your pipeline in bulk.",
    icon: <Blocks />,
    callToAction: 'Work Smarter',
    backText: 'Multiply Your Efforts',
    color: 'from-lime-500/80 to-lime-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
    spotlightTitle: 'Efficient Bulk Operations',
    spotlightDescription: 'Save hours of manual work. Send personalized email campaigns, update lead statuses, and organize your pipeline with powerful bulk actions. Work smarter, not harder.'
  },
  {
    title: 'AI Chatbot',
    description:
      'Engage website visitors 24/7 with an AI chatbot that answers questions and captures leads.',
    icon: <MessageSquare />,
    callToAction: 'Engage 24/7',
    backText: 'Never Lose a Visitor',
    color: 'from-fuchsia-500/80 to-fuchsia-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
    spotlightTitle: '24/7 AI-Powered Chatbot',
    spotlightDescription: 'Turn your website into a lead generation machine. Our AI chatbot engages visitors 24/7, answering common questions, qualifying prospects, and scheduling appointments, even while you sleep.'
  },
  {
    title: 'AI Lead Scoring',
    description:
      'Prioritize your hottest leads. Our AI analyzes engagement and predicts which prospects are most likely to convert.',
    icon: <Gauge />,
    callToAction: 'Focus Your Energy',
    backText: 'Focus on Ready-to-Buy Leads',
    color: 'from-sky-500/80 to-sky-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'Predictive Lead Scoring',
    spotlightDescription: 'Focus your time and energy on the leads that matter most. Our AI analyzes user behavior, engagement data, and demographic information to score your prospects, predicting their likelihood to convert.'
  },
  {
    title: 'Copywriting Assistant',
    description:
      'Generate persuasive property descriptions, emails, and social posts in any tone of voice.',
    icon: <Sparkles />,
    callToAction: 'Write Like a Pro',
    backText: 'Find the Perfect Words, Instantly',
    color: 'from-amber-500/80 to-amber-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
    spotlightTitle: 'AI Copywriting Assistant',
    spotlightDescription: "Never stare at a blank page again. Generate persuasive property descriptions, engaging email newsletters, and captivating social media posts in any tone of voice. Let our AI be your creative partner."
  },
  {
    title: 'AI Social Post Writer',
    description: 'Instantly generate a week\'s worth of social media content from a single link or topic.',
    icon: <Share2 />,
    callToAction: 'Automate Social Media',
    backText: 'Fill Your Content Calendar',
    color: 'from-rose-500/80 to-rose-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
    spotlightTitle: 'Automated Social Content',
    spotlightDescription: "Feed the content beast without the burnout. Provide a link or a topic, and our AI will generate a week's worth of engaging social media posts, complete with hashtags and suggested imagery."
  },
  {
    title: 'Closing Intelligence',
    description:
      'Get the final advantage. AI-powered insights and talking points to help you navigate negotiations and close the deal.',
    icon: <Award />,
    callToAction: 'Close with Confidence',
    backText: 'Seal the Deal, Every Time',
    color: 'from-emerald-500/80 to-emerald-600/80',
    shape: 'rounded-3xl',
    spotlightTitle: 'AI-Powered Negotiation Insights',
    spotlightDescription: "Enter the negotiation with an unfair advantage. Our AI provides data-driven talking points, objection handling strategies, and insights into buyer motivations to help you close with confidence and secure the best terms."
  },
];

const FeatureCard = ({
  feature,
  index,
  onHover,
}: {
  feature: (typeof features)[0];
  index: number;
  onHover: (feature: (typeof features)[0]) => void;
}) => (
  <div
    className="group flex flex-col [perspective:1000px] animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
    onMouseEnter={() => onHover(feature)}
  >
    <div
      className={cn(
        'relative w-full h-full text-white transition-transform duration-700 ease-in-out flex-grow',
        'shadow-2xl hover:shadow-primary/50',
        feature.shape,
        '[transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'
      )}
    >
      {/* Front of the card */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br',
          feature.color,
          feature.shape,
          '[backface-visibility:hidden]'
        )}
      >
        <div className="z-10 flex flex-col h-full">
          <div className="mb-4 p-3 bg-white/20 rounded-full w-fit">
            {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
          </div>
          <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
          <p className="text-lg opacity-90 flex-grow">{feature.description}</p>
          <Button
            size="lg"
            variant="ghost"
            className="bg-white/10 hover:bg-white/20 text-white w-full backdrop-blur-sm border border-white/20 mt-auto"
          >
            {feature.callToAction}{' '}
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Back of the card */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br',
          feature.color,
          feature.shape,
          '[backface-visibility:hidden] [transform:rotateY(180deg)]'
        )}
      >
        <h3 className="text-4xl font-bold text-center drop-shadow-lg">
          {feature.backText}
        </h3>
      </div>
    </div>
  </div>
);

const Spotlight = ({
  feature,
}: {
  feature: (typeof features)[0] | null;
}) => (
  <Card className="mb-12 lg:mb-24 bg-card/50 border-border/20 backdrop-blur-sm min-h-[200px]">
    <CardContent className="p-8">
      {feature ? (
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4 text-primary">{feature.spotlightTitle}</h2>
          <p className="text-lg text-foreground/80">{feature.spotlightDescription}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-lg text-foreground/60">Hover over a card to see the details</p>
        </div>
      )}
    </CardContent>
  </Card>
);


export default function Home() {
  const [spotlightFeature, setSpotlightFeature] = useState<(typeof features)[0] | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Your Real Estate Sales, Amplified.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            Unlock AI-powered tools to create stunning marketing, find
            high-intent buyers, and close deals faster. Level up your sales
            game.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="text-lg py-7 px-8">Start Your Free Trial</Button>
            <Button size="lg" variant="outline" className="text-lg py-7 px-8">
              See it in Action
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
            <Spotlight feature={spotlightFeature} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} onHover={setSpotlightFeature} />
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

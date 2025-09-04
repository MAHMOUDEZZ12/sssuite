
'use client';

import React from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Confetti } from '@/components/confetti';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ShinyButton } from '@/components/ui/shiny-button';

type Feature = (typeof features)[0];

const features = [
  {
    id: 'ad-creation',
    title: 'Instant Ad Creation',
    description: 'Generate high-performance ad copy and visuals from any brochure in seconds.',
    longDescription: 'Our AI analyzes your property brochures and instantly generates multiple high-converting ad variants optimized for platforms like Facebook, Instagram, and Google. Say goodbye to writer\'s block and hello to effortless, effective advertising.',
    icon: <Megaphone />,
    color: 'from-pink-500/80 to-pink-600/80',
    cta: 'Create an Ad',
    synergies: {
      'ad-creation': "Create High-Converting Ads",
      targeting: 'Fine-tune with buyer personas.',
      rebranding: 'Match your new brand.',
      'landing-pages': 'Drive traffic to pages.',
      'social-posts': 'Turn concepts into blitz.',
    },
  },
  {
    id: 'targeting',
    title: 'Precision Targeting',
    description: 'Our AI analyzes your project and identifies high-intent buyers.',
    longDescription: 'Move beyond basic demographics. Our AI identifies high-intent buyer personas based on online behavior, life events, and psychographic data, ensuring your ads reach the most qualified audience.',
    icon: <Target />,
    color: 'from-blue-500/80 to-blue-600/80',
    cta: 'Target Buyers',
    synergies: {
      'ad-creation': 'Power ads with audience.',
      'targeting': "Target Your Ideal Buyers",
      rebranding: 'Rebrand for niche markets.',
      'landing-pages': 'Drive high-intent buyers.',
      'social-posts': 'Tailor content to demos.',
    },
  },
  {
    id: 'rebranding',
    title: 'Automated Rebranding',
    description: 'Instantly rebrand any brochure with your logo, colors, and voice.',
    longDescription: 'Upload any developer\'s project brochure, and our AI will instantly rebrand it with your logo, contact information, and brand colors, giving you a polished, professional asset in seconds.',
    icon: <Palette />,
    color: 'from-orange-500/80 to-orange-600/80',
    cta: 'Rebrand a Brochure',
    synergies: {
      'ad-creation': 'Generate on-brand ads.',
      targeting: 'Adapt voice for segments.',
      'rebranding': "Apply Your Branding",
      'landing-pages': 'Brand landing pages instantly.',
      'social-posts': 'Maintain consistent brand voice.',
    },
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Generator',
    description: 'Generate persuasive landing pages that captivate buyers.',
    longDescription: 'Create stunning, high-converting landing pages for your listings with a single click. Our AI pulls property details and images to build a beautiful page designed to capture leads.',
    icon: <LayoutTemplate />,
    color: 'from-green-500/80 to-green-600/80',
    cta: 'Generate a Page',
    synergies: {
      'ad-creation': 'Perfect destination for clicks.',
      targeting: 'Build pages for audiences.',
      rebranding: 'Generate branded pages.',
      'landing-pages': "Generate Landing Pages",
      'social-posts': 'Link posts to pages.',
    },
  },
  {
    id: 'social-posts',
    title: 'AI Social Post Writer',
    description: "Generate a week's worth of social content from a single link or topic.",
    longDescription: 'Never worry about what to post again. Give our AI a link to a news article, a blog post, or just a topic, and it will generate a full week\'s worth of engaging social media content for all your platforms.',
    icon: <Share2 />,
    color: 'from-rose-500/80 to-rose-600/80',
    cta: 'Write Social Posts',
    synergies: {
      'ad-creation': 'Promote campaigns on social.',
      targeting: 'Write posts that resonate.',
      rebranding: 'Generate on-brand content.',
      'landing-pages': 'Drive traffic to pages.',
      'social-posts': "Write Social Content",
    },
  },
  {
    id: 'lead-gen',
    title: 'AI Lead Generation',
    description: 'Find and qualify high-intent buyers and sellers automatically.',
    icon: <Users />,
    color: 'from-teal-500/80 to-teal-600/80',
    cta: 'Generate Leads',
    longDescription: 'Our platform actively scours public data and online signals to identify potential buyers and sellers in your market, delivering a stream of qualified leads directly to your dashboard.',
    synergies: {
      'ad-creation': 'Capture leads from campaigns.',
      'lead-gen': 'Automate Lead Generation',
    },
  },
  {
    id: 'competitor-analysis',
    title: 'Competitor Ad Analysis',
    description: 'See your competitors\' ads, targeting, and messaging.',
    icon: <Binoculars />,
    color: 'from-indigo-500/80 to-indigo-600/80',
    cta: 'Analyze Competitors',
    longDescription: 'Get a strategic advantage by analyzing your competitors\' marketing efforts. See their ads, understand their messaging, and discover the audiences they\'re targeting to find opportunities to outperform them.',
    synergies: {
      'ad-creation': 'Create standout ads.',
      'competitor-analysis': 'Analyze Competitor Strategy',
    },
  },
  {
    id: 'market-analysis',
    title: 'Real-Time Market Analysis',
    description: 'Access live data on pricing, trends, and inventory.',
    icon: <TrendingUp />,
    color: 'from-cyan-500/80 to-cyan-600/80',
    cta: 'Analyze the Market',
    longDescription: 'Make data-driven decisions with access to real-time market trends, pricing insights, and inventory levels. Position yourself as the market expert and provide invaluable advice to your clients.',
    synergies: {
      'ad-creation': 'Create ads reflecting market.',
      'market-analysis': 'Get Real-Time Market Data',
    },
  },
  {
    id: 'auto-follow-up',
    title: 'Automated Follow-Up',
    description: 'Engage every lead instantly with personalized email and SMS sequences.',
    icon: <Repeat />,
    color: 'from-amber-500/80 to-amber-600/80',
    cta: 'Automate Follow-Ups',
    longDescription: 'Instantly engage every new lead with intelligent, multi-touch follow-up campaigns. Our AI-powered sequences nurture leads via email and SMS, ensuring you\'re always top-of-mind.',
    synergies: {
      'auto-follow-up': 'Automate Lead Follow-Up',
    },
  },
  {
    id: 'performance-dashboard',
    title: 'Performance Dashboard',
    description: 'Track every metric, from ad clicks to closed deals, in one place.',
    icon: <Gauge />,
    color: 'from-purple-500/80 to-purple-600/80',
    cta: 'View Dashboard',
    longDescription: 'Get a 360-degree view of your business with our comprehensive performance dashboard. Track ad spend, lead conversion rates, ROI, and your entire sales funnel in one intuitive interface.',
    synergies: {
      'performance-dashboard': 'Track Your Performance',
    },
  },
  {
    id: 'email-campaigns',
    title: 'AI Email Campaigns',
    description: 'Create and automate beautiful, high-converting email blasts.',
    icon: <Mail />,
    color: 'from-lime-500/80 to-lime-600/80',
    cta: 'Launch a Campaign',
    longDescription: 'Design and send stunning email newsletters and marketing blasts with our AI-powered editor. Generate compelling copy, choose from beautiful templates, and automate your sends to nurture your audience.',
    synergies: {
      'email-campaigns': 'Launch Email Campaigns',
    },
  },
  {
    id: 'crm-integration',
    title: 'Seamless CRM Integration',
    description: 'Sync all your data with the CRM you already use.',
    icon: <Network />,
    color: 'from-red-500/80 to-red-600/80',
    cta: 'Connect Your CRM',
    longDescription: 'Super Sales Suite seamlessly integrates with the CRM you already know and love. Keep your data synchronized and your workflow efficient without having to switch platforms.',
    synergies: {
      'crm-integration': 'Connect Your CRM',
    },
  },
  {
    id: 'brochure-rebrand',
    title: 'Brochure Rebranding',
    description: 'Upload any project brochure. Our AI instantly rebrands it.',
    icon: <FilePlus />,
    color: 'from-emerald-500/80 to-emerald-600/80',
    cta: 'Rebrand a Brochure',
    longDescription: 'Take any property brochure and make it your own. Our AI rebranding tool lets you add your logo, contact details, and brand styling to any PDF, creating a professional marketing asset in seconds.',
    synergies: {
      'brochure-rebrand': 'Rebrand Any Brochure',
    },
  },
  {
    id: 'offer-management',
    title: 'Offer Management Portal',
    description: 'Receive, counter, and accept offers in one streamlined portal.',
    icon: <Handshake />,
    color: 'from-yellow-500/80 to-yellow-600/80',
    cta: 'Manage Offers',
    longDescription: 'Streamline the negotiation process. Our offer management portal allows you to receive, review, counter, and accept offers digitally, keeping all communication logged and organized.',
    synergies: {
      'offer-management': 'Manage All Your Offers',
    },
  },
  {
    id: 'calendar-sync',
    title: 'Smart Calendar Sync',
    description: 'Sync your schedule and let qualified leads book meetings.',
    icon: <Calendar />,
    color: 'from-violet-500/80 to-violet-600/80',
    cta: 'Sync Your Calendar',
    longDescription: 'Connect your calendar and let our system book meetings for you. Qualified leads can see your availability and schedule a showing or consultation directly, eliminating back-and-forth emails.',
    synergies: {
      'calendar-sync': 'Sync Your Calendar',
    },
  },
  {
    id: 'bulk-actions',
    title: 'Bulk Campaign Actions',
    description: 'Launch ads, emails, and updates across all listings at once.',
    icon: <ClipboardList />,
    color: 'from-stone-500/80 to-stone-600/80',
    cta: 'Perform Bulk Actions',
    longDescription: 'Efficiency is key. With bulk actions, you can launch a new ad campaign, send an email update, or apply a price change across dozens of listings simultaneously.',
    synergies: {
      'bulk-actions': 'Perform Bulk Actions',
    },
  },
  {
    id: 'ai-chatbot',
    title: '24/7 AI Chatbot',
    description: 'Engage and qualify website visitors, even when you\'re asleep.',
    icon: <Bot />,
    color: 'from-sky-500/80 to-sky-600/80',
    cta: 'Activate AI Chatbot',
    longDescription: 'Deploy an AI-powered chatbot on your website to engage visitors 24/7. It can answer common questions, qualify leads, and even book appointments, ensuring you never miss an opportunity.',
    synergies: {
      'ai-chatbot': 'Engage Visitors 24/7',
    },
  },
  {
    id: 'pdf-ads',
    title: 'Interactive PDF Ads',
    description: 'Convert static PDFs into engaging, trackable lead magnets.',
    icon: <FileText />,
    color: 'from-fuchsia-500/80 to-fuchsia-600/80',
    cta: 'Make PDFs Interactive',
    longDescription: 'Turn your static brochures and flyers into interactive lead generation tools. Embed videos, forms, and links directly into your PDFs and track engagement to see what\'s working.',
    synergies: {
      'pdf-ads': 'Make PDFs Interactive',
    },
  },
  {
    id: 'video-ads',
    title: 'AI Video Ad Generator',
    description: 'Create compelling short-form video ads from photos and text.',
    icon: <Video />,
    color: 'from-orange-400/80 to-orange-500/80',
    cta: 'Generate Video Ads',
    longDescription: 'No video editing skills? No problem. Our AI can create dynamic, short-form video ads for social media using your property photos, ad copy, and branding.',
    synergies: {
      'video-ads': 'Generate Video Ads',
    },
  },
  {
    id: 'content-syndication',
    title: 'Content Syndication',
    description: 'Automatically push your listings and content to partner sites.',
    icon: <Network />,
    color: 'from-green-400/80 to-green-500/80',
    cta: 'Syndicate Content',
    longDescription: 'Amplify your reach by automatically syndicating your listings and content to a network of real estate portals and partner websites, driving more traffic and visibility.',
    synergies: {
      'content-syndication': 'Syndicate Your Content',
    },
  },
  {
    id: 'client-portal',
    title: 'White-Label Client Portal',
    description: 'Give clients a branded, real-time view of their campaign performance.',
    icon: <Briefcase />,
    color: 'from-blue-400/80 to-blue-500/80',
    cta: 'Launch Client Portal',
    longDescription: 'Impress your clients with a professional, white-labeled portal where they can log in to see their campaign performance, review leads, and track progress in real-time.',
    synergies: {
      'client-portal': 'Provide a Client Portal',
    },
  },
  {
    id: 'ai-negotiator',
    title: 'AI-Powered Negotiator',
    description: 'Let our AI handle initial offers and counter-offers for you.',
    icon: <BrainCircuit />,
    color: 'from-pink-400/80 to-pink-500/80',
    cta: 'Let AI Negotiate',
    longDescription: 'Save time and let our AI handle the initial back-and-forth of negotiation. Set your parameters, and the AI will field initial offers and counter-offers, only looping you in when it\'s time for a final decision.',
    synergies: {
      'ai-negotiator': 'Let AI Negotiate',
    },
  },
  {
    id: 'pms-integration',
    title: 'PMS Integration',
    description: 'Sync with your property management software for seamless data flow.',
    icon: <Building />,
    color: 'from-teal-400/80 to-teal-500/80',
    cta: 'Connect Your PMS',
    longDescription: 'For agents who also handle property management, our platform integrates with popular PMS software to keep tenant data, maintenance requests, and financials all in sync.',
    synergies: {
      'pms-integration': 'Connect Your PMS',
    },
  },
  {
    id: 'training-modules',
    title: 'Agent Training Modules',
    description: 'Access a library of AI-powered training to sharpen your skills.',
    icon: <BookOpen />,
    color: 'from-indigo-400/80 to-indigo-500/80',
    cta: 'Start Training',
    longDescription: 'Sharpen your skills with our built-in library of training modules. Learn about the latest in digital marketing, AI best practices, and advanced sales techniques.',
    synergies: {
      'training-modules': 'Access Agent Training',
    },
  },
  {
    id: 'virtual-tours',
    title: 'Immersive Virtual Tours',
    description: 'Create and embed stunning 3D tours that captivate buyers.',
    icon: <Camera />,
    color: 'from-rose-400/80 to-rose-500/80',
    cta: 'Create Virtual Tours',
    longDescription: 'Create and showcase stunning 3D virtual tours of your properties. Our platform makes it easy to embed these tours into landing pages and share them in your marketing campaigns.',
    synergies: {
      'virtual-tours': 'Create Immersive Virtual Tours',
    },
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Project and prove the value of an investment property.',
    icon: <DollarSign />,
    color: 'from-lime-400/80 to-lime-600/80',
    cta: 'Calculate ROI',
    longDescription: 'Empower your investor clients by quickly calculating the potential ROI on any property. Input key figures to generate a professional report showcasing cap rate, cash flow, and long-term value.',
    synergies: {
      'roi-calculator': 'Calculate Property ROI',
    },
  },
  {
    id: 'listing-management',
    title: 'Centralized Listing Management',
    description: 'Manage all your listings across all platforms from one place.',
    icon: <ClipboardCheck />,
    color: 'from-amber-400/80 to-amber-500/80',
    cta: 'Manage Listings',
    longDescription: 'Manage all your property listings from a single dashboard. Update pricing, edit descriptions, and syndicate changes to all connected platforms with a single click.',
    synergies: {
      'listing-management': 'Manage All Your Listings',
    },
  },
  {
    id: 'open-house-scheduler',
    title: 'Open House Scheduler',
    description: 'Plan, promote, and manage open house attendance.',
    icon: <CalendarCheck />,
    color: 'from-purple-400/80 to-purple-500/80',
    cta: 'Schedule Open Houses',
    longDescription: 'Organize and promote your open houses effortlessly. Create event pages, send invitations, manage RSVPs, and follow up with attendees automatically.',
    synergies: {
      'open-house-scheduler': 'Schedule Open Houses',
    },
  },
  {
    id: 'closing-assistance',
    title: 'AI Closing Assistant',
    description: 'Automate document collection and deadline reminders for smooth closings.',
    icon: <Key />,
    color: 'from-cyan-400/80 to-cyan-500/80',
    cta: 'Automate Closings',
    longDescription: 'Ensure a smooth closing process every time. Our AI assistant helps you track deadlines, automate document requests, and keep all parties informed, reducing stress and saving time.',
    synergies: {
      'closing-assistance': 'Automate Your Closings',
    },
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description: 'Our AI predicts which leads will convert and which houses will sell.',
    icon: <Lightbulb />,
    color: 'from-red-400/80 to-red-500/80',
    cta: 'Get Predictions',
    longDescription: 'Leverage the power of predictive analytics to focus your efforts. Our AI scores leads based on their likelihood to convert and identifies properties that are poised to sell, helping you work smarter.',
    synergies: {
      'predictive-analytics': 'Predict Which Leads Convert',
    },
  },
  {
    id: 'referral-program',
    title: 'Automated Referral Program',
    description: 'Turn your happy clients into a powerful referral engine.',
    icon: <Users />,
    color: 'from-emerald-400/80 to-emerald-500/80',
    cta: 'Automate Referrals',
    longDescription: 'Create a powerful referral engine with our automated program. Systematically ask satisfied clients for referrals and track the new business they generate.',
    synergies: {
      'referral-program': 'Automate Your Referrals',
    },
  },
  {
    id: 'gamified-sales',
    title: 'Gamified Sales Contests',
    description: 'Boost team motivation with leaderboards, badges, and rewards.',
    icon: <Award />,
    color: 'from-yellow-400/80 to-yellow-500/80',
    cta: 'Gamify Sales',
    longDescription: 'Foster friendly competition and boost motivation with gamified sales contests. Track progress on leaderboards, award badges for achievements, and keep your team engaged and performing at their best.',
    synergies: {
      'gamified-sales': 'Gamify Your Sales',
    },
  },
  {
    id: 'dynamic-pricing',
    title: 'Dynamic Pricing Suggestions',
    description: 'Use AI to recommend the optimal price based on market data.',
    icon: <Sparkles />,
    color: 'from-violet-400/80 to-violet-500/80',
    cta: 'Get Price Suggestions',
    longDescription: 'Price your listings with confidence. Our AI analyzes comparable properties, market velocity, and unique features to suggest the optimal listing price to attract buyers and maximize value.',
    synergies: {
      'dynamic-pricing': 'Get Dynamic Price Suggestions',
    },
  },
  {
    id: 'a/b-testing',
    title: 'A/B Testing Engine',
    description: 'Test everything from ad copy to email subject lines to find what works.',
    icon: <Filter />,
    color: 'from-stone-400/80 to-stone-500/80',
    cta: 'A/B Test Everything',
    longDescription: 'Stop guessing and start knowing what works. Our A/B testing engine lets you easily test different ad headlines, images, email subject lines, and calls-to-action to continuously improve your results.',
    synergies: {
      'a/b-testing': 'A/B Test Everything',
    },
  },
  {
    id: 'local-seo',
    title: 'Local SEO Booster',
    description: 'Dominate local search results and be the go-to agent in your area.',
    icon: <MapPin />,
    color: 'from-sky-400/80 to-sky-500/80',
    cta: 'Boost Local SEO',
    longDescription: 'Become the go-to agent in your neighborhood. Our Local SEO Booster helps you optimize your online presence to rank higher in local search results and attract more organic leads.',
    synergies: {
      'local-seo': 'Boost Your Local SEO',
    },
  },
  {
    id: 'community-engagement',
    title: 'Community Engagement Tools',
    description: 'Build and manage your online community with AI-powered tools.',
    icon: <Headset />,
    color: 'from-fuchsia-400/80 to-fuchsia-500/80',
    cta: 'Engage Your Community',
    longDescription: 'Build a thriving online community around your brand. Our tools help you manage Facebook groups, schedule content, and engage with members to establish yourself as a trusted local expert.',
    synergies: {
      'community-engagement': 'Engage Your Community',
    },
  },
  {
    id: 'automated-reporting',
    title: 'Automated Client Reporting',
    description: 'Send beautiful, automated performance reports to your clients.',
    icon: <BarChart />,
    color: 'from-orange-300/80 to-orange-400/80',
    cta: 'Automate Reports',
    longDescription: 'Keep your clients informed and impressed with automated, professional-looking performance reports. Schedule weekly or monthly updates that showcase the value you\'re providing.',
    synergies: {
      'automated-reporting': 'Automate Client Reports',
    },
  },
  {
    id: 'script-generator',
    title: 'AI Script Generator',
    description: 'Generate scripts for cold calls, video ads, and follow-up messages.',
    icon: <PenTool />,
    color: 'from-green-300/80 to-green-400/80',
    cta: 'Generate Scripts',
    longDescription: 'Always know what to say. Our AI script generator creates effective scripts for cold calls, video ads, voicemail messages, and follow-up emails, tailored to your specific goals and tone of voice.',
    synergies: {
      'script-generator': 'Generate Sales Scripts',
    },
  },
  {
    id: 'drip-campaigns',
    title: 'Long-Term Drip Campaigns',
    description: 'Nurture leads for months or even years with automated campaigns.',
    icon: <Mails />,
    color: 'from-blue-300/80 to-blue-400/80',
    cta: 'Create Drip Campaigns',
    longDescription: 'Play the long game with automated drip campaigns. Nurture cold leads and past clients for months or even years with a steady stream of valuable content, keeping you top-of-mind when they\'re ready to act.',
    synergies: {
      'drip-campaigns': 'Create Drip Campaigns',
    },
  },
  {
    id: 'task-automation',
    title: 'Task Automation',
    description: 'Automate your to-do list and focus on what matters most.',
    icon: <ClipboardList />,
    color: 'from-pink-300/80 to-pink-400/80',
    cta: 'Automate Tasks',
    longDescription: 'Automate the repetitive tasks that fill up your day. Create workflows that trigger tasks, send notifications, and update your CRM, freeing you up to focus on dollar-producing activities.',
    synergies: {
      'task-automation': 'Automate Your Tasks',
    },
  },
  {
    id: 'feedback-surveys',
    title: 'Automated Feedback Surveys',
    description: 'Collect valuable feedback from clients and leads automatically.',
    icon: <MessageCircle />,
    color: 'from-teal-300/80 to-teal-400/80',
    cta: 'Collect Feedback',
    longDescription: 'Systematically collect feedback to improve your services. Automatically send surveys to new leads, post-showing, or post-closing to gather valuable insights and testimonials.',
    synergies: {
      'feedback-surveys': 'Collect Client Feedback',
    },
  },
  {
    id: 'real-time-alerts',
    title: 'Real-Time Activity Alerts',
    description: 'Get instant notifications for hot lead activity on your site.',
    icon: <Zap />,
    color: 'from-indigo-300/80 to-indigo-400/80',
    cta: 'Get Real-Time Alerts',
    longDescription: 'Speed-to-lead is critical. Get instant notifications on your phone or desktop the moment a hot lead takes action, like visiting a pricing page or re-visiting a listing.',
    synergies: {
      'real-time-alerts': 'Get Real-Time Alerts',
    },
  },
  {
    id: 'compliance-checker',
    title: 'Compliance Checker',
    description: 'Ensure your marketing materials meet all regulatory standards.',
    icon: <ShieldCheck />,
    color: 'from-rose-300/80 to-rose-400/80',
    cta: 'Ensure Compliance',
    longDescription: 'Stay out of trouble with our built-in compliance checker. Our AI scans your ad copy and marketing materials to flag potential issues with fair housing, RESPA, and local advertising regulations.',
    synergies: {
      'compliance-checker': 'Ensure Compliance',
    },
  },
  {
    id: 'document-generator',
    title: 'Document Generator',
    description: 'Automatically generate contracts, CMAs, and other documents.',
    icon: <FileUp />,
    color: 'from-lime-300/80 to-lime-400/80',
    cta: 'Generate Documents',
    longDescription: 'Save hours of paperwork. Automatically generate Comparative Market Analyses (CMAs), purchase agreements, and other essential documents using templates and data from your listings and CRM.',
    synergies: {
      'document-generator': 'Generate Documents',
    },
  },
  {
    id: 'property-websites',
    title: 'Single Property Websites',
    description: 'Create a stunning, dedicated website for each listing in minutes.',
    icon: <LayoutTemplate />,
    color: 'from-amber-300/80 to-amber-400/80',
    cta: 'Create Property Websites',
    longDescription: 'Give your premier listings the attention they deserve. In minutes, you can create a beautiful, single-page website for a property, complete with a gallery, virtual tour, and lead capture form.',
    synergies: {
      'property-websites': 'Create Property Websites',
    },
  },
  {
    id: 'multi-language',
    title: 'Multi-Language Support',
    description: 'Translate your marketing materials into multiple languages.',
    icon: <MessageCircle />,
    color: 'from-purple-300/80 to-purple-400/80',
    cta: 'Translate Content',
    longDescription: 'Serve a diverse clientele by translating your marketing materials into multiple languages. Our AI provides high-quality translations for ads, landing pages, and email campaigns.',
    synergies: {
      'multi-language': 'Translate Your Content',
    },
  },
  {
    id: 'voice-search',
    title: 'Voice Search Optimization',
    description: 'Optimize your content to be found via voice assistants.',
    icon: <Headset />,
    color: 'from-cyan-300/80 to-cyan-400/80',
    cta: 'Optimize for Voice',
    longDescription: 'Capture the growing traffic from voice search. We help optimize your online content to answer the types of questions people ask Siri, Alexa, and Google Assistant.',
    synergies: {
      'voice-search': 'Optimize for Voice Search',
    },
  },
  {
    id: 'vr-staging',
    title: 'Virtual Reality Staging',
    description: 'Stage properties virtually to help buyers visualize their new home.',
    icon: <Gem />,
    color: 'from-red-300/80 to-red-400/80',
    cta: 'Virtually Stage Homes',
    longDescription: 'Help buyers visualize a vacant property\'s potential with virtual staging. Choose from various furniture styles to digitally furnish photos and create a more appealing online presentation.',
    synergies: {
      'vr-staging': 'Virtually Stage Homes',
    },
  },
  {
    id: 'market-reports',
    title: 'Hyper-Local Market Reports',
    description: 'Generate beautiful, data-rich reports for any neighborhood.',
    icon: <FileSearch />,
    color: 'from-emerald-300/80 to-emerald-400/80',
    cta: 'Generate Market Reports',
    longDescription: 'Generate beautiful, data-rich market reports for any neighborhood or zip code. Use them as powerful lead magnets or to inform your clients and position yourself as a local expert.',
    synergies: {
      'market-reports': 'Generate Market Reports',
    },
  },
  {
    id: 'agent-collaboration',
    title: 'Team Collaboration Tools',
    description: 'Collaborate with your team on listings, leads, and campaigns.',
    icon: <Users />,
    color: 'from-yellow-300/80 to-yellow-400/80',
    cta: 'Collaborate With Team',
    longDescription: 'Work more effectively as a team. Collaborate on ad campaigns, share leads, manage team tasks, and maintain a unified brand presence across all your marketing efforts.',
    synergies: {
      'agent-collaboration': 'Collaborate With Your Team',
    },
  },
  {
    id: 'commission-tracking',
    title: 'Commission Tracking',
    description: 'Track your commissions and get projections for future earnings.',
    icon: <LineChart />,
    color: 'from-violet-300/80 to-violet-400/80',
    cta: 'Track Commissions',
    longDescription: 'Get a clear picture of your earnings. Track commissions from closed deals, monitor your pipeline, and get accurate projections for your future income.',
    synergies: {
      'commission-tracking': 'Track Your Commissions',
    },
  },
  {
    id: 'social-listening',
    title: 'Social Media Listening',
    description: 'Track mentions of your brand and identify potential leads.',
    icon: <Binoculars />,
    color: 'from-stone-300/80 to-stone-400/80',
    cta: 'Listen to Social Media',
    longDescription: 'Monitor social media for mentions of your brand, your competitors, and keywords that indicate buying or selling intent. Join relevant conversations and identify leads in real-time.',
    synergies: {
      'social-listening': 'Listen to Social Media',
    },
  },
  {
    id: 'chat-integration',
    title: 'Live Chat Integration',
    description: 'Add live chat to your website and talk to visitors in real-time.',
    icon: <MessageCircle />,
    color: 'from-sky-300/80 to-sky-400/80',
    cta: 'Add Live Chat',
    longDescription: 'Engage website visitors in real-time with live chat. Answer questions, provide information, and convert more visitors into qualified leads without them having to pick up the phone.',
    synergies: {
      'chat-integration': 'Add Live Chat',
    },
  },
  {
    id: 'contract-management',
    title: 'Contract Management',
    description: 'Manage the entire lifecycle of your contracts, from draft to signature.',
    icon: <FileText />,
    color: 'from-fuchsia-300/80 to-fuchsia-400/80',
    cta: 'Manage Contracts',
    longDescription: 'Streamline your paperwork with our contract management system. Draft contracts from templates, send them for e-signature, and track their status all in one place.',
    synergies: {
      'contract-management': 'Manage Your Contracts',
    },
  },
  {
    id: 'showing-feedback',
    title: 'Automated Showing Feedback',
    description: 'Automatically request and collect feedback after every showing.',
    icon: <ClipboardCheck />,
    color: 'from-orange-200/80 to-orange-300/80',
    cta: 'Get Showing Feedback',
    longDescription: 'Automatically request feedback from buyer\'s agents after every showing. Collect valuable insights to share with your sellers and make strategic adjustments to your listing.',
    synergies: {
      'showing-feedback': 'Get Showing Feedback',
    },
  },
  {
    id: 'expense-tracking',
    title: 'Expense Tracking',
    description: 'Track all your business expenses and see where your money is going.',
    icon: <DollarSign />,
    color: 'from-green-200/80 to-green-300/80',
    cta: 'Track Expenses',
    longDescription: 'Keep your finances in order. Track all your business expenses, from marketing spend to software subscriptions, to get a clear picture of your profitability and prepare for tax time.',
    synergies: {
      'expense-tracking': 'Track Your Expenses',
    },
  },
  {
    id: 'brand-kit',
    title: 'Centralized Brand Kit',
    description: 'Store your logos, colors, and fonts for easy access.',
    icon: <Briefcase />,
    color: 'from-blue-200/80 to-blue-300/80',
    cta: 'Create Brand Kit',
    longDescription: 'Ensure brand consistency across all your marketing. Store your logos, color palettes, fonts, and brand voice guidelines in a central kit for easy access by you or your team.',
    synergies: {
      'brand-kit': 'Create Your Brand Kit',
    },
  },
  {
    id: 'interactive-maps',
    title: 'Interactive Property Maps',
    description: 'Create beautiful, interactive maps of your listings.',
    icon: <MapPin />,
    color: 'from-pink-200/80 to-pink-300/80',
    cta: 'Create Interactive Maps',
    longDescription: 'Bring your listings to life with interactive maps. Showcase property locations, nearby amenities, school districts, and points of interest to give buyers a comprehensive view of the area.',
    synergies: {
      'interactive-maps': 'Create Interactive Maps',
    },
  },
  {
    id: 'event-promotion',
    title: 'Event Promotion Tools',
    description: 'Promote your open houses, webinars, and other events.',
    icon: <Megaphone />,
    color: 'from-teal-200/80 to-teal-300/80',
    cta: 'Promote Events',
    longDescription: 'Maximize attendance for your open houses, webinars, and client appreciation events. Our tools help you create registration pages, send promotional emails, and manage your attendee list.',
    synergies: {
      'event-promotion': 'Promote Your Events',
    },
  },
  {
    id: 'content-calendar',
    title: 'Content Calendar',
    description: 'Plan and schedule all your content in one visual calendar.',
    icon: <Calendar />,
    color: 'from-indigo-200/80 to-indigo-300/80',
    cta: 'Plan Content',
    longDescription: 'Plan your marketing with a visual content calendar. Schedule social media posts, email newsletters, and blog articles to maintain a consistent and strategic online presence.',
    synergies: {
      'content-calendar': 'Plan Your Content',
    },
  },
  {
    id: '3d-floor-plans',
    title: '3D Floor Plan Generator',
    description: 'Turn standard floor plans into immersive 3D models.',
    icon: <Gem />,
    color: 'from-rose-200/80 to-rose-300/80',
    cta: 'Generate 3D Floor Plans',
    longDescription: 'Transform flat, boring floor plans into immersive 3D models. Help buyers understand the layout and flow of a home before they ever step inside.',
    synergies: {
      '3d-floor-plans': 'Generate 3D Floor Plans',
    },
  },
];

const FeatureCard = ({
  feature,
  hoveredId,
  setHoveredId,
  onClick,
}: {
  feature: Feature;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onClick: (feature: Feature) => void;
}) => {
  const isHovered = hoveredId === feature.id;

  return (
    <div
      className={cn(
        "group relative flex flex-col [perspective:1000px] transition-all duration-300",
        isHovered ? 'z-10' : '',
        'hover:shadow-2xl hover:!opacity-100 hover:z-20 hover:-translate-y-2'
      )}
      onMouseEnter={() => setHoveredId(feature.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onClick(feature)}
    >
      <div
        className={cn(
          'relative w-full h-[420px] text-white rounded-3xl cursor-pointer',
          'transition-transform duration-700 ease-in-out [transform-style:preserve-3d]',
           isHovered ? '[transform:rotateY(180deg)]' : ''
        )}
      >
        {/* Front of the card */}
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
                {feature.cta}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
        </div>

        {/* Back of the card - Active State */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br rounded-3xl',
            feature.color,
            '[backface-visibility:hidden] [transform:rotateY(180deg)]'
          )}
        >
            <h3 className="text-4xl font-bold text-center drop-shadow-lg">
              { (feature.synergies as any)[feature.id] || "Unlock Potential"}
            </h3>
        </div>
      </div>
    </div>
  );
};

const FeatureModal = ({ feature, onClose }: { feature: Feature | null, onClose: () => void }) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground max-w-2xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className={cn("p-12 rounded-t-2xl bg-gradient-to-br", feature.color)}>
               <div className="mb-4 p-4 bg-white/20 rounded-full w-fit mx-auto">
                {React.cloneElement(feature.icon, { className: 'h-12 w-12 text-white' })}
              </div>
            </div>
            <div className='p-8 pt-4 text-center'>
              <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
              <p className="text-lg text-foreground/80 mb-8">{feature.longDescription}</p>
               <ShinyButton>
                Start Your Free Trial
                <ArrowRight />
              </ShinyButton>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  const { toast } = useToast();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [clickedCards, setClickedCards] = React.useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);


  const handleCardClick = (feature: Feature) => {
    setSelectedFeature(feature);

    const newClicked = new Set(clickedCards);
    newClicked.add(feature.id);
    setClickedCards(newClicked);

    if (newClicked.size === 1) {
      toast({
        title: "Great start! ✨",
        description: "Click two more cards to see the magic.",
      });
    } else if (newClicked.size === 3) {
      toast({
        title: "Awesome! You're getting it. 🚀",
        description: "The possibilities are endless.",
      });
      setShowConfetti(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showConfetti && <Confetti />}
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
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
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


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Check, Cpu, Globe, Instagram, MessageCircle, Network, Bot, Send, Loader2, Sparkles, Upload, ArrowRight, Share2, FileText, Link as LinkIcon, File, Plus, Video, Phone, Users2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

const deploymentChannels = [
    { icon: <Globe />, title: "Your Website" },
    { icon: <FileText />, title: "Advertising Landing Page" },
    { icon: <Instagram />, title: "Instagram DM" },
    { icon: <MessageCircle />, title: "Standalone Agent Site" },
    { icon: <LinkIcon />, title: "Insta Bio Link" },
    { icon: <Share2 />, title: "Realtor Listing Portfolio" },
];

const TrainingScenarioTabs = () => {
    const languages = ['Hello', 'Hola', 'こんにちは', 'مرحبا', '你好', 'Bonjour'];
    const [currentLang, setCurrentLang] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLang(prev => (prev + 1) % languages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [languages.length]);

    return (
         <Tabs defaultValue="doc" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="doc"><Upload className="mr-2 h-4 w-4" /> From Document</TabsTrigger>
                <TabsTrigger value="link"><LinkIcon className="mr-2 h-4 w-4" /> From Link</TabsTrigger>
                <TabsTrigger value="prompt"><Sparkles className="mr-2 h-4 w-4" /> From Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="doc">
                <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-sm text-center text-muted-foreground mb-2">QUERY</p>
                    <p className="font-medium text-center">"Based on our <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">Company_Profile.pdf</span>, who is our CEO?"</p>
                    <div className="text-center my-2 text-muted-foreground">↓</div>
                    <p className="text-sm text-center text-muted-foreground mb-2">RESPONSE</p>
                    <p className="font-medium text-center">"The CEO of Super Seller Suite is Gemini, an AI model from Google."</p>
                </div>
            </TabsContent>
            <TabsContent value="link">
                 <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-sm text-center text-muted-foreground mb-2">QUERY</p>
                    <p className="font-medium text-center">"Summarize the key points from this article about the new launch: <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">/blog/new-launch</span>"</p>
                     <div className="text-center my-2 text-muted-foreground">↓</div>
                     <p className="text-sm text-center text-muted-foreground mb-2">RESPONSE</p>
                    <p className="font-medium text-center">"The new launch offers 1-3 bedroom apartments with a 2-year post-handover payment plan and a 4% DLD waiver for early buyers."</p>
                </div>
            </TabsContent>
            <TabsContent value="prompt">
                <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-sm text-center text-muted-foreground mb-2">QUERY</p>
                    <p className="font-medium text-center">"For the next 24 hours, all inquiries should be told about our new 15% cashback offer on the first installment."</p>
                     <div className="text-center my-2 text-muted-foreground">↓</div>
                    <div className="text-center">
                         <p className="text-sm text-center text-muted-foreground mb-2">RESPONSE</p>
                        <div className="h-16 flex items-center justify-center">
                             <p className="font-semibold text-primary">Accessing Real-time Knowledge...</p>
                             <div className="relative h-12 flex items-center justify-center">
                                 <AnimatePresence>
                                     <motion.span
                                         key={currentLang}
                                         initial={{ opacity: 0, y: -10 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         exit={{ opacity: 0, y: 10 }}
                                         transition={{ duration: 0.5 }}
                                         className="absolute text-2xl font-bold text-foreground"
                                     >
                                        {languages[currentLang]}
                                     </motion.span>
                                 </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}


const ChatBubble = ({ from, children, avatarFallback, delay=0 }: { from: 'user' | 'ai', children: React.ReactNode, avatarFallback: string, delay?: number }) => {
    return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn("flex items-start gap-4 w-full", from === 'user' ? "justify-end" : "justify-start")}
        >
            {from === 'ai' && <Avatar className="w-12 h-12 shrink-0"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-6 w-6" /></AvatarFallback></Avatar>}
            <div className={cn(
                "w-full max-w-2xl p-6 rounded-3xl shadow-lg", 
                from === 'user' ? "bg-primary text-primary-foreground rounded-br-lg" : "bg-card border rounded-bl-lg"
            )}>
                {children}
            </div>
             {from === 'user' && <Avatar className="w-12 h-12 shrink-0"><AvatarFallback>{avatarFallback}</AvatarFallback></Avatar>}
        </motion.div>
    );
};


export default function ChatbotProductPage() {
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleStartChat = (e: React.FormEvent) => {
        e.preventDefault();
        setIsChatStarted(true);
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6 space-y-12">
                
                <ChatBubble from="ai" avatarFallback="AI">
                    <div className="text-center lg:text-left">
                        <PageHeader 
                            icon={<Bot className="h-12 w-12" />}
                            title="Meet Your New Best Agent"
                            description="I am a 24/7 AI expert trained on the real estate market and your private company data. I answer questions, capture leads, and work everywhere your clients are."
                        />
                         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                             <Link href="/signup">
                                <ShinyButton>Get Your AI Agent Now</ShinyButton>
                            </Link>
                         </div>
                    </div>
                </ChatBubble>

                <AnimatePresence>
                    {isChatStarted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-12"
                        >
                            <ChatBubble from="user" avatarFallback="U">
                                <p className="text-xl font-medium">{inputValue || "This sounds powerful. Where can I actually use this bot?"}</p>
                            </ChatBubble>

                             <ChatBubble from="ai" avatarFallback="AI" delay={0.5}>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">You can deploy me anywhere.</h2>
                                <p className="mt-2 text-md text-muted-foreground mb-6">After training me in your dashboard, you can add me to any digital touchpoint in seconds.</p>
                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {deploymentChannels.map(channel => (
                                        <div key={channel.title} className="p-3 bg-muted/10 rounded-lg flex items-center gap-3">
                                            <div className="p-2 text-primary">{channel.icon}</div>
                                            <span className="font-semibold text-sm text-foreground/80">{channel.title}</span>
                                        </div>
                                    ))}
                                 </div>
                            </ChatBubble>
                            
                             <ChatBubble from="ai" avatarFallback="AI" delay={1}>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">I do more than just chat.</h2>
                                <p className="mt-2 text-md text-muted-foreground mb-6">I am a full sales and lead-capture agent. I can be configured to:</p>
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="flex items-center gap-3 p-3"><Video className="h-5 w-5 text-primary" /><span className="font-medium text-sm">Send Promotional Videos</span></div>
                                     <div className="flex items-center gap-3 p-3"><FileText className="h-5 w-5 text-primary" /><span className="font-medium text-sm">Distribute Brochures Instantly</span></div>
                                     <div className="flex items-center gap-3 p-3"><Phone className="h-5 w-5 text-primary" /><span className="font-medium text-sm">Collect Phone Numbers via Forms</span></div>
                                     <div className="flex items-center gap-3 p-3"><Users2 className="h-5 w-5 text-primary" /><span className="font-medium text-sm">Match Listings to Client Needs</span></div>
                                </div>
                            </ChatBubble>

                             <ChatBubble from="user" avatarFallback="U" delay={1.5}>
                                 <p className="text-xl font-medium">Impressive. How would I train you to know about my specific company and projects?</p>
                            </ChatBubble>
                            
                             <ChatBubble from="ai" avatarFallback="AI" delay={2}>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">You train me in your private Training Center.</h2>
                                <p className="mt-2 text-md text-muted-foreground mb-6">It's a simple, visual process. You can upload documents, provide website links, or give me real-time instructions. The more context you give me, the smarter I become.</p>
                                <TrainingScenarioTabs />
                            </ChatBubble>
                        </motion.div>
                    ) : (
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                         >
                            <ChatBubble from="user" avatarFallback="U">
                                 <form onSubmit={handleStartChat} className="flex items-center gap-4">
                                     <Input
                                        name="user-query"
                                        placeholder="Ask anything related to the real estate market..."
                                        className="text-xl flex-grow bg-primary/10 border-primary/20 placeholder:text-white/70"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                     />
                                     <Button type="submit" size="lg">Send</Button>
                                 </form>
                            </ChatBubble>
                         </motion.div>
                    )}
                </AnimatePresence>

             </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

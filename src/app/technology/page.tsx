
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Check, Cpu, Globe, Instagram, MessageCircle, Network, Bot, Send, Loader2, Sparkles, Upload, ArrowRight, Share2, FileText, Link as LinkIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

type ChatMessage = {
    from: 'user' | 'ai';
    text: string | React.ReactNode;
};

const LiveChatbotDemo = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { from: 'ai', text: 'I am an AI assistant with 25 years of real estate experience. I have also been trained on the "Super Seller Suite" company profile. Feel free to ask me about the company or the general market.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessageText = input;
        setMessages(prev => [...prev, { from: 'user', text: userMessageText }]);
        setInput('');
        setIsLoading(true);

        try {
            // Simulate a query that requires private data
            if (userMessageText.toLowerCase().includes('ceo') && userMessageText.toLowerCase().includes('super seller suite')) {
                 setTimeout(() => {
                    setMessages(prev => [...prev, { from: 'ai', text: (
                        <div>
                            <p className="font-semibold text-primary mb-1">Accessing Private Knowledge...</p>
                            <p>Based on the 'Company_Profile.pdf' you provided, the CEO of Super Seller Suite is a highly advanced language model from Google.</p>
                        </div>
                    )}]);
                    setIsLoading(false);
                }, 1500);
            } else {
                 const response = await fetch('/api/run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        toolId: 'market-chat-assistant',
                        payload: { message: userMessageText }
                    })
                });
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                setMessages(prev => [...prev, { from: 'ai', text: data.reply }]);
                setIsLoading(false);
            }
        } catch (error: any) {
            setMessages(prev => [...prev, { from: 'ai', text: `Sorry, I encountered an error: ${error.message}` }]);
            setIsLoading(false);
        }
    };
    
     return (
        <Card className="w-full max-w-md h-[600px] bg-background rounded-2xl border-2 border-primary/20 shadow-2xl shadow-primary/10 flex flex-col">
            <CardHeader className="p-4 border-b flex-row items-center gap-3">
                <Bot className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="font-bold text-lg">Your AI Sales Agent</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Online and ready to help
                    </p>
                </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'ai' && <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>}
                            <div className={cn("max-w-[85%] rounded-2xl p-3 text-sm", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>
                            <div className="rounded-2xl p-3 bg-muted rounded-bl-none">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-3 border-t bg-background rounded-b-xl">
                <div className="flex items-center gap-2">
                    <Input placeholder="Ask about the market or our company..." value={input} onChange={e => setInput(e.target.value)} disabled={isLoading} />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}><Send className="h-4 w-4" /></Button>
                </div>
            </form>
        </Card>
    );
}


export default function ChatbotProductPage() {
  const deploymentChannels = [
      { icon: <Globe />, title: "Your Website", description: "Embed a chat widget on any page." },
      { icon: <FileText />, title: "Advertising Landing Page", description: "Convert ad clicks into conversations." },
      { icon: <Instagram />, title: "Instagram DM", description: "Let the AI handle initial inquiries in your inbox." },
      { icon: <MessageCircle />, title: "Standalone Agent Site", description: "Share a direct link to your AI agent." },
      { icon: <LinkIcon />, title: "Insta Bio Link", description: "Make your 'link in bio' an interactive agent." },
      { icon: <Share2 />, title: "Realtor Listing Portfolio", description: "Add a chatbot to agent profile pages on your brokerage site." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="text-center lg:text-left">
                        <PageHeader 
                            icon={<Bot className="h-12 w-12" />}
                            title="Meet Your New Best Agent"
                            description="Give your business a 24/7 AI expert trained on the real estate market and your private company data. It answers questions, captures leads, and works everywhere your clients are."
                        />
                         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                             <Link href="/signup">
                                <ShinyButton>Get Your AI Agent Now</ShinyButton>
                            </Link>
                            <Link href="/pricing">
                                <Button variant="ghost" size="lg">View Pricing <ArrowRight /></Button>
                            </Link>
                         </div>
                    </div>
                     <div className="flex justify-center">
                        <LiveChatbotDemo />
                    </div>
                </div>
             </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Train Once, Deploy Anywhere</h2>
                 <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Your AI agent is a versatile tool. After training it with your knowledge in our central dashboard, you can add it to any digital touchpoint.</p>
                 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deploymentChannels.map(channel => (
                        <Card key={channel.title}>
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 text-primary rounded-full w-fit">{channel.icon}</div>
                                <CardTitle>{channel.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{channel.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <BrainCircuit className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your AI, Your Knowledge</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Our assistant is built on a unique dual-knowledge system. It combines broad market intelligence with your specific, private company data for unparalleled expertise.</p>
                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1"><Sparkles className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Global Market Intelligence</h4>
                                    <p className="text-md text-foreground/70">The AI comes pre-trained with 25 years of real estate expertise, ready to answer questions about market trends, investment strategies, and neighborhood details.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1"><Upload className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Your Private Training Center</h4>
                                    <p className="text-md text-foreground/70">
                                        This is the game-changer. Use our simple dashboard to upload your own private documents—brochures, price lists, and company profiles. The AI uses this data to answer specific questions about <span className="font-bold text-primary">your</span> business, making it a true expert on your brand.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/brand" className="mt-8 inline-block">
                             <Button variant="outline">Go to the Training Center</Button>
                        </Link>
                    </div>
                     <div className="hidden lg:block">
                        <Card className="bg-card/50">
                            <CardHeader>
                                <CardTitle>Training Scenario</CardTitle>
                                <CardDescription>See how your private data empowers the AI.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 justify-start">
                                     <div className="p-2 bg-muted rounded-md border text-muted-foreground flex items-center gap-2 text-sm">
                                        <Upload className="h-4 w-4" />
                                        <span>You upload <span className="font-semibold text-foreground">Company_Profile.pdf</span></span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 justify-end">
                                    <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-br-none max-w-sm shadow-md">
                                        <p>A customer asks: "Who is the CEO of Super Seller Suite?"</p>
                                    </div>
                                    <Avatar className="w-10 h-10"><AvatarFallback>C</AvatarFallback></Avatar>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-6 w-6"/></AvatarFallback></Avatar>
                                    <div className="bg-muted border p-3 rounded-2xl rounded-bl-none max-w-sm shadow-sm">
                                        <p className="font-semibold text-primary">Accessing Private Knowledge...</p>
                                        <p>Based on the 'Company_Profile.pdf' you provided, the CEO of Super Seller Suite is a highly advanced language model from Google.</p>
                                    </div>
                                </div>
                             </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

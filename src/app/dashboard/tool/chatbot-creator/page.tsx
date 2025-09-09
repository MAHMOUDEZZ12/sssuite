
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Bot, Copy, MessageCircle, Send, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { CodeBlock } from '@/components/code-block';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

const embedCode = `
<div id="s3-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>
<script>
  (function() {
    const container = document.getElementById('s3-chatbot-container');
    
    // Create Iframe
    const iframe = document.createElement('iframe');
    iframe.src = "https://YOUR_APP_DOMAIN/chatbot-widget"; // This would be the real app URL
    iframe.style.border = 'none';
    iframe.style.width = '350px';
    iframe.style.height = '500px';
    iframe.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    iframe.style.borderRadius = '0.75rem';
    iframe.style.display = 'none'; // Initially hidden
    
    // Create Button
    const button = document.createElement('button');
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.5 9.5 0 0 1-5.863 5.863A5.5 5.5 0 1 1 12 2.5Z"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/></svg>';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '9999px';
    button.style.backgroundColor = '#2563EB'; // Primary color
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';

    button.onclick = () => {
      iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
      button.innerHTML = iframe.style.display === 'none' ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.5 9.5 0 0 1-5.863 5.863A5.5 5.5 0 1 1 12 2.5Z"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';
    };

    container.appendChild(button);
    container.appendChild(iframe);
    
    // This is a simplified version. A real implementation would handle iframe communication.
    // For this prototype, we'll build the chat UI inside the iframe page directly.
  })();
</script>
`.trim();


type ChatMessage = {
    from: 'user' | 'ai';
    text: string;
};

const ChatbotPreview = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { from: 'ai', text: 'Hello! How can I help you with the real estate market today?' }
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

        setMessages(prev => [...prev, { from: 'user', text: input }]);
        const userMessage = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolId: 'market-chat-assistant',
                    payload: { message: userMessage }
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setMessages(prev => [...prev, { from: 'ai', text: data.reply }]);
        } catch (error: any) {
            setMessages(prev => [...prev, { from: 'ai', text: `Sorry, I encountered an error: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm h-[500px] bg-background rounded-xl border shadow-2xl flex flex-col">
            <header className="p-3 border-b flex items-center gap-3">
                <Bot className="h-6 w-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Real Estate Assistant</h3>
                    <p className="text-xs text-green-500">● Online</p>
                </div>
            </header>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'ai' && <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>}
                            <div className={cn("max-w-[75%] rounded-2xl p-3 text-sm", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
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
                    <Input placeholder="Ask about the market..." value={input} onChange={e => setInput(e.target.value)} disabled={isLoading} />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}><Send className="h-4 w-4" /></Button>
                </div>
            </form>
        </div>
    );
};

export default function ChatbotCreatorPage() {
    const { toast } = useToast();

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        toast({
            title: "Code Copied!",
            description: "The embed code has been copied to your clipboard.",
        });
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Embeddable Site Assistant"
                description="Add an AI chatbot to your website. Train it on your private data for company-specific knowledge."
                icon={<Bot className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Train Your Assistant</CardTitle>
                        <CardDescription>
                            The chatbot's intelligence comes from your AI Command Center. Upload documents to its knowledge base to give it specific knowledge about your projects and company.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/assistant">
                           <Button variant="outline">
                               <BookOpen className="mr-2 h-4 w-4" />
                               Go to AI Command Center
                           </Button>
                        </Link>
                    </CardContent>
                    <CardHeader>
                        <CardTitle>2. Copy Your Embed Code</CardTitle>
                        <CardDescription>
                            This snippet contains everything needed to add the chat widget to your site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeBlock>{embedCode}</CodeBlock>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                        <Button onClick={copyCode}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Code
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            <strong>Tip for WordPress/Elementor:</strong> Drag a "Custom HTML" widget onto your page and paste this code inside it. That's it!
                        </p>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. Test Your Assistant</CardTitle>
                        <CardDescription>
                            Here is a live preview of how the chatbot will behave on your site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ChatbotPreview />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

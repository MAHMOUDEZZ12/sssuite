
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, GripVertical, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';


export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const assistantName = 'Your AI Assistant';
  
  const mockMessages = [
    { from: 'ai', text: "Hello! How can I help you accelerate your sales today?" },
    { from: 'user', text: "Create a new project for 'Azure Lofts', generate a promotional video for it, and save the final video to my drive." },
    { from: 'ai', text: "Of course. I've initiated the following workflow:\n1. **Project Created**: 'Azure Lofts' is now set up.\n2. **Video Generation**: Creating a 30-second promo video.\n3. **File Transfer**: The final video will be saved to your connected Google Drive.\n\nI will notify you when the video is ready." },
  ];

  if (!isOpen) {
      return (
        <button
            aria-label="Open AI Assistant"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-pink-500 p-4 text-white shadow-lg hover:bg-pink-400 animate-in fade-in zoom-in"
        >
            <Sparkles className="h-6 w-6" />
      </button>
      )
  }


  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/50 animate-in fade-in">
          <div className="m-4 w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-4 animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-pink-400"/>
                {assistantName}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-sm text-neutral-400 hover:text-neutral-200">Close</button>
            </div>
            
            <CardContent className="p-0 mt-3">
                <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                    {mockMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={cn(
                        "flex items-end gap-2",
                        msg.from === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {msg.from === 'ai' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20 text-primary">
                            <Bot className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={cn(
                            "max-w-xs rounded-2xl p-3 text-sm",
                            msg.from === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        )}
                        >
                        {msg.text}
                        </div>
                        {msg.from === 'user' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))}
                </div>
                </ScrollArea>
            </CardContent>
            
             <CardFooter className="p-0 pt-3 border-t">
                <div className="flex w-full items-center gap-2">
                    <Input placeholder={`Ask: “Turn this brochure into a WhatsApp reply”...`} />
                    <Button size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
          </div>
        </div>
    </>
  );
}

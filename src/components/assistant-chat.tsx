
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [assistantName, setAssistantName] = useState('Casey');

  const mockMessages = [
    { from: 'ai', text: "Hello! How can I help you accelerate your sales today?" },
    { from: 'user', text: "What are the key selling points for the Azure Lofts property?" },
    { from: 'ai', text: "Based on the brochure, the key selling points for Azure Lofts are: 1) Panoramic ocean views from every unit, 2) State-of-the-art amenities including a rooftop pool and private cinema, and 3) A prime downtown location with a 98 walk score." },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Assistant Chat"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-full max-w-md transition-all duration-300 ease-in-out",
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <Card className="shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
              </div>
              <div>
                <CardTitle>{assistantName}</CardTitle>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
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
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center gap-2">
              <Input placeholder={`Ask ${assistantName}...`} />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

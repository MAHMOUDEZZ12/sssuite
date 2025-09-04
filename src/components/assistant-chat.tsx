
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';


const DEFAULT_POSITION = { x: 24, y: 24 };

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const assistantName = 'My Assistant';

  const mockMessages = [
    { from: 'ai', text: "Hello! How can I help you accelerate your sales today?" },
    { from: 'user', text: "What are the key selling points for the Azure Lofts property?" },
    { from: 'ai', text: "Based on the brochure, the key selling points for Azure Lofts are: 1) Panoramic ocean views from every unit, 2) State-of-the-art amenities including a rooftop pool and private cinema, and 3) A prime downtown location with a 98 walk score." },
  ];

   const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dragRef.current) {
      setIsDragging(true);
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
      // Prevent text selection while dragging
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = window.innerWidth - e.clientX + offsetRef.current.x;
      const newY = window.innerHeight - e.clientY + offsetRef.current.y;
      
      // Clamp position to be within viewport
      const clampedX = Math.max(8, Math.min(newX, window.innerWidth - (dragRef.current?.offsetWidth || 64) - 8));
      const clampedY = Math.max(8, Math.min(newY, window.innerHeight - (dragRef.current?.offsetHeight || 64) - 8));

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const resetPosition = () => {
    setPosition(DEFAULT_POSITION);
  }

  useEffect(() => {
    window.addEventListener('resetChatPosition', resetPosition);
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('resetChatPosition', resetPosition);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        ref={dragRef}
        className="fixed z-50"
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg flex-col"
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          onMouseDown={handleMouseDown}
          aria-label="Toggle Assistant Chat"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed z-50 w-full max-w-md transition-all duration-300 ease-in-out",
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
         style={{
          right: `${position.x}px`,
          bottom: `${position.y + 80}px`,
        }}
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

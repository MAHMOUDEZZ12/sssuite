
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BrainCircuit, Upload, Sparkles, BookOpen, Wand2, FileText, Bot } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const samplePrompts = [
    { title: "Summarize Market Trends", prompt: "Summarize the latest market trends for downtown luxury condos based on the Q2 report I uploaded." },
    { title: "Draft a Follow-up Email", prompt: "Draft a polite but persistent follow-up email to Jane Doe regarding the offer on 123 Main St." },
    { title: "Analyze a Brochure", prompt: "What are the top 3 selling points from the 'Azure Lofts' brochure?" },
    { title: "Generate Social Post Ideas", prompt: "Give me 5 Instagram post ideas for the new listing at 456 Ocean Ave." },
    { title: "Compare Two Properties", prompt: "Create a comparison table for a client between 'Azure Lofts' and 'Maple Creek Development'." },
    { title: "Role-play a Negotiation", prompt: "Let's role-play. I'm the seller's agent for 123 Main St, and you're a buyer's agent with a low offer. Start the conversation." },
]


export default function AssistantPage() {

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Train Your Assistant"
        description="Personalize your AI assistant by giving it a name, instructions, and knowledge."
        icon={<BrainCircuit className="h-8 w-8" />}
      />

      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personality"><Bot className="mr-2 h-4 w-4" /> Personality</TabsTrigger>
          <TabsTrigger value="knowledge"><BookOpen className="mr-2 h-4 w-4" /> Knowledge Base</TabsTrigger>
          <TabsTrigger value="prompts"><Wand2 className="mr-2 h-4 w-4" /> Prompt Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle>Assistant Personality</CardTitle>
              <CardDescription>Define how your assistant interacts and what its core purpose is.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="assistant-name">Assistant Name</Label>
                  <Input id="assistant-name" placeholder="e.g., 'Market Maven' or 'Casey'" defaultValue="My Assistant" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="assistant-instructions">Core Instructions</Label>
                  <Textarea 
                    id="assistant-instructions" 
                    placeholder="e.g., You are a real estate marketing expert. Your goal is to help me create compelling content and find leads..."
                    rows={8}
                    defaultValue="You are an expert real estate sales and marketing assistant. Your primary function is to help the user save time, create high-quality marketing materials, and identify sales opportunities. You should be professional, insightful, and proactive. Use the knowledge provided in the 'Knowledge Base' to inform your answers."
                   />
               </div>
            </CardContent>
            <CardFooter>
                 <Button>Save Personality</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Upload files, brochures, and data to give your assistant context. The AI will use this information to provide more relevant and accurate responses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-8 text-center border-2 border-dashed rounded-lg">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium text-foreground">
                        Upload Documents
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Drag and drop files here, or click to browse.
                    </p>
                    <Button className="mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                    </Button>
                </div>
                 <div>
                    <h4 className="font-medium text-lg mb-2">Uploaded Files</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                <span className="font-mono text-sm">Azure_Lofts_Brochure.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                <span className="font-mono text-sm">Market_Report_Q2.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Prompt Library</CardTitle>
                        <CardDescription>Use these expert-crafted prompts to get the most out of your assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {samplePrompts.map((prompt) => (
                            <div key={prompt.title} className="p-3 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                                <p className="font-semibold">{prompt.title}</p>
                                <p className="text-sm text-muted-foreground italic">"{prompt.prompt}"</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Prompt Generator</CardTitle>
                        <CardDescription>Learn how to write better prompts to get better results from the AI.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label>What is your goal?</Label>
                           <Select>
                               <SelectTrigger>
                                 <SelectValue placeholder="e.g., Create content, analyze data..." />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="create">Create Content</SelectItem>
                                 <SelectItem value="analyze">Analyze Data</SelectItem>
                                 <SelectItem value="strategize">Develop a Strategy</SelectItem>
                               </SelectContent>
                           </Select>
                        </div>
                         <div className="space-y-2">
                           <Label>What is the context?</Label>
                            <Input placeholder="e.g., A new luxury condo listing" />
                        </div>
                         <div className="space-y-2">
                           <Label>What format should the output be?</Label>
                            <Input placeholder="e.g., A bulleted list, a paragraph, a table" />
                        </div>
                         <div className="space-y-2">
                           <Label>Generated Prompt</Label>
                           <Textarea 
                                readOnly
                                value="Based on the new luxury condo listing, create a bulleted list of 5 social media post ideas."
                                className="italic text-muted-foreground"
                           />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

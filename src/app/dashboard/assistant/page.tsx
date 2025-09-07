
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BrainCircuit, Upload, Sparkles, BookOpen, Wand2, FileText, Bot, Loader2, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { fileToDataUri } from '@/lib/tools-client';
import { aiBrandCreator } from '@/ai/flows/ai-brand-creator';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';


const samplePrompts = [
    { title: "Summarize Market Trends", prompt: "Summarize the latest market trends for downtown luxury condos based on the Q2 report I uploaded." },
    { title: "Draft a Follow-up Email", prompt: "Draft a polite but persistent follow-up email to Jane Doe regarding the offer on 123 Main St." },
    { title: "Analyze a Brochure", prompt: "What are the top 3 selling points from the 'Azure Lofts' brochure?" },
    { title: "Generate Social Post Ideas", prompt: "Give me 5 Instagram post ideas for the new listing at 456 Ocean Ave." },
    { title: "Compare Two Properties", prompt: "Create a comparison table for a client between 'Azure Lofts' and 'Maple Creek Development'." },
    { title: "Role-play a Negotiation", prompt: "Let's role-play. I'm the seller's agent for 123 Main St, and you're a buyer's agent with a low offer. Start the conversation." },
]

type MockFile = { id: number; name: string; type: string; icon: React.ReactNode; size: string; file?: File };


export default function AssistantPage() {
    const { toast } = useToast();
    const [goal, setGoal] = useState("create");
    const [context, setContext] = useState("a bulleted list of social media post ideas");
    const [format, setFormat] = useState("for a new luxury condo listing");
    const [generatedPrompt, setGeneratedPrompt] = useState("Based on the new luxury condo listing, create a bulleted list of 5 social media post ideas.");

    const [isTraining, setIsTraining] = useState(false);
    const [files, setFiles] = useState<MockFile[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

    const handleGeneratePrompt = () => {
        const goalTextMap: { [key: string]: string } = {
            create: "create",
            analyze: "analyze",
            strategize: "develop a strategy for"
        };

        const fullGoalText = goalTextMap[goal] || "do something with";
        const fullContext = context || "the provided information";
        const fullFormat = format || "a paragraph";

        const prompt = `Act as an expert real estate marketing assistant. Your task is to ${fullGoalText} ${fullFormat} based on ${fullContext}.`;
        setGeneratedPrompt(prompt);
    }
    
    const handleAssetFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (!uploadedFiles) return;

        const newFiles: MockFile[] = Array.from(uploadedFiles).map((file, index) => ({
        id: files.length + index + 1,
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'File',
        icon: <FileText className="h-10 w-10 text-muted-foreground" />,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        file: file,
        }));

        setFiles(prev => [...prev, ...newFiles]);
    };
    
    const handleSelectFile = (fileId: number) => {
      setSelectedFiles(prev => 
          prev.includes(fileId) 
              ? prev.filter(id => id !== fileId) 
              : [...prev, fileId]
      );
    };
  
    const handleDeleteFiles = () => {
        setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
        setSelectedFiles([]);
    }

    const handleTrainAssistant = async () => {
        const filesToTrain = files.filter(f => selectedFiles.includes(f.id) && f.file);
        if (filesToTrain.length === 0) {
            toast({
                title: "No Files Selected",
                description: "Please upload and select at least one file to train the assistant.",
                variant: "destructive"
            });
            return;
        }
        
        setIsTraining(true);
        toast({
            title: "Training Started",
            description: `The assistant is learning from ${filesToTrain.length} file(s). This may take a moment.`,
        });

        try {
            const fileDataUris = await Promise.all(
            filesToTrain.map(f => fileToDataUri(f.file!))
            );

            const result = await aiBrandCreator({
            command: "Analyze the provided documents to understand my business. Extract key information like my company name, brand colors, contact info, and current projects. Use this to help configure my workspace.",
            documents: fileDataUris,
            });

            toast({
                title: "AI Training Complete!",
                description: result.summary,
            });
        
        } catch (error) {
            console.error("AI training failed:", error);
            toast({
                title: "An Error Occurred",
                description: "The AI was unable to process the documents. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsTraining(false);
            setSelectedFiles([]);
        }
    }


  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Train Your Assistant"
        description="Personalize your AI assistant by giving it instructions and knowledge."
        icon={<BrainCircuit className="h-8 w-8" />}
      />

      <Tabs defaultValue="knowledge" className="w-full">
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
                  <Input 
                    id="assistant-name" 
                    defaultValue="My Assistant"
                  />
                  <p className="text-sm text-muted-foreground">Give your assistant a name to make it feel more personal.</p>
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
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div>
                            <CardTitle>Knowledge Base</CardTitle>
                            <CardDescription>
                                Upload brochures, reports, and data to give your assistant context. The AI will use this information to provide more relevant and accurate responses.
                            </CardDescription>
                        </div>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <Button onClick={handleTrainAssistant} disabled={selectedFiles.length === 0 || isTraining}>
                                {isTraining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                                {isTraining ? 'Training...' : `Train on ${selectedFiles.length > 0 ? `${selectedFiles.length} file(s)` : 'Selection'}`}
                            </Button>
                            <Button onClick={handleDeleteFiles} disabled={selectedFiles.length === 0} variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete {selectedFiles.length > 0 ? `${selectedFiles.length} file(s)` : 'Selection'}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <label htmlFor="knowledge-file-upload" 
                        className="relative block w-full p-8 text-center border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium text-foreground">
                            Upload Documents
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Drag and drop files here, or click to browse.
                        </p>
                         <Input
                            id="knowledge-file-upload"
                            type="file"
                            ref={fileInputRef}
                            className="sr-only"
                            onChange={handleAssetFileUpload}
                            multiple
                        />
                    </label>
                    {files.length > 0 && (
                         <div>
                            <h4 className="font-medium text-lg mb-2">Uploaded Files</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {files.map((file) => (
                                    <Card 
                                        key={file.id} 
                                        className={cn(
                                            "group relative transition-all duration-200 cursor-pointer",
                                            selectedFiles.includes(file.id) && "border-primary ring-2 ring-primary/50"
                                        )}
                                        onClick={() => handleSelectFile(file.id)}
                                    >
                                        <div className="absolute top-2 right-2 z-10">
                                            <Checkbox
                                                checked={selectedFiles.includes(file.id)}
                                                onCheckedChange={() => handleSelectFile(file.id)}
                                                aria-label={`Select file ${file.name}`}
                                            />
                                        </div>
                                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                            <div className="mb-4">{file.icon}</div>
                                            <p className="font-semibold text-sm truncate w-full" title={file.name}>{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{file.size}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
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
                           <Select value={goal} onValueChange={setGoal}>
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
                            <Input placeholder="e.g., A new luxury condo listing" value={format} onChange={e => setFormat(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                           <Label>What format should the output be?</Label>
                            <Input placeholder="e.g., A bulleted list, a paragraph, a table" value={context} onChange={e => setContext(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                           <Label>Generated Prompt</Label>
                           <Textarea 
                                readOnly
                                value={generatedPrompt}
                                className="italic text-muted-foreground"
                                rows={4}
                           />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleGeneratePrompt}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Prompt
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

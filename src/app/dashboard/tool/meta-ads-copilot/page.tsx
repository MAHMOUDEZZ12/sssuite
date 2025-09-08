
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Facebook, Upload, ArrowRight, CheckCircle, Lightbulb, Copy, LayoutDashboard, BarChart2, GalleryVertical, PlusCircle, Send, Link as LinkIcon, MessageCircle, ArrowLeft, Building, Wallet, Calendar, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { createMetaCampaign } from '@/ai/flows/create-meta-campaign';
import { CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';

type Campaign = {
    id: number | string;
    name: string;
    objective: string;
    budget: number;
    status: string;
};

const initialMockCampaigns: Campaign[] = [
    { id: 1, name: "Emaar Beachfront Leads", objective: "LEAD_GENERATION", budget: 5000, status: "Active" },
    { id: 2, name: "Damac Hills 2 Awareness", objective: "AWARENESS", budget: 3000, status: "Completed" },
    { id: 3, name: "Sobha Hartland Traffic", objective: "TRAFFIC", budget: 7500, status: "Paused" },
];

const mockAnalyticsData = [
  { name: 'Week 1', reach: 4000, clicks: 240, cpl: 5.20 },
  { name: 'Week 2', reach: 3000, clicks: 139, cpl: 4.80 },
  { name: 'Week 3', reach: 2000, clicks: 980, cpl: 2.50 },
  { name: 'Week 4', reach: 2780, clicks: 390, cpl: 3.10 },
];

const campaignWorkflows = [
    { id: 'Lead Generation to Landing Page', title: 'Leads to Landing Page', description: 'Drive traffic to a webpage to capture leads via a form.', icon: <LinkIcon className="h-5 w-5"/> },
    { id: 'Lead Generation to WhatsApp', title: 'Leads to WhatsApp', description: 'Start direct conversations with potential buyers on WhatsApp.', icon: <MessageCircle className="h-5 w-5"/> },
    { id: 'Lead Generation to Instagram', title: 'Leads to Instagram DMs', description: 'Engage with users directly in their Instagram Direct Messages.', icon: <Facebook className="h-5 w-5"/> },
];

type CampaignStep = 'project' | 'workflow' | 'media' | 'budget' | 'review';

const ResultDisplay = ({ result, toast, onPublish }: { result: CreateMetaCampaignOutput, toast: any, onPublish: (campaign: Campaign) => void }) => {
    
    const handlePublish = () => {
        const totalBudget = result.adSets.reduce((total, set) => total + (set.dailyBudget * 1), 0) * 14; // Simplified
        const newCampaign: Campaign = {
            id: result.publishedCampaignId ? parseInt(result.publishedCampaignId.replace('campaign-',''), 10) : Date.now(),
            name: result.campaignName,
            objective: result.campaignObjective,
            budget: totalBudget,
            status: "Active",
        };
        onPublish(newCampaign);
        toast({ title: 'Campaign Published!', description: `${result.campaignName} is now live on Meta.` });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Campaign Strategy: {result.campaignName}</CardTitle>
                            <CardDescription>
                                Meta Objective: <Badge>{result.campaignObjective}</Badge>
                            </CardDescription>
                        </div>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    <Send className="mr-2 h-4 w-4"/>
                                    Publish to Meta
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to publish this campaign?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will simulate publishing the "{result.campaignName}" campaign to your connected Meta account. This is a demonstration and will not spend real money.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handlePublish}>Yes, Publish Campaign</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Ad Sets</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {result.adSets.map((adSet, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{adSet.name}</CardTitle>
                                        <CardDescription>Daily Budget: ${adSet.dailyBudget.toFixed(2)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{adSet.targetingSummary}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Ad Creatives to Test</h3>
                        <div className="space-y-4">
                             {result.adCreatives.map((creative, index) => (
                                <Card key={index} className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <p className="font-semibold">Headline: "{creative.headline}"</p>
                                        <p className="text-sm my-2">Body: "{creative.bodyText}"</p>
                                        <p className="text-sm"><span className="font-semibold">Suggested CTA:</span> <Badge variant="secondary">{creative.callToAction}</Badge></p>
                                        <p className="text-sm mt-2 italic text-muted-foreground"><span className="font-semibold not-italic">Image Idea:</span> {creative.imageSuggestion}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary/20">
                <CardHeader className="flex-row items-center gap-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <CardTitle>Optimization Advice</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{result.optimizationAdvice}</p>
                </CardContent>
            </Card>
        </div>
    );
};

const CreativeLibraryTab = ({ creatives, toast }: { creatives: CreateMetaCampaignOutput['adCreatives'] | null, toast: any }) => {
    const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
    const [generatingId, setGeneratingId] = useState<number | null>(null);
    
    const handleGenerateImage = (index: number, suggestion: string) => {
        setGeneratingId(index);
        setTimeout(() => {
            // In a real app, this would be an API call. Here we simulate it.
            const imageUrl = `https://picsum.photos/seed/${suggestion.replace(/\s/g,'')}/600/400`;
            setGeneratedImages(prev => ({ ...prev, [index]: imageUrl }));
            setGeneratingId(null);
            toast({ title: 'Image Generated!', description: 'Your new creative is ready.' });
        }, 2000);
    };

    if (!creatives || creatives.length === 0) {
        return (
             <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Generate a campaign to see your creative library.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatives.map((creative, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-base">{creative.headline}</CardTitle>
                        <CardDescription className="text-xs italic">Image Idea: {creative.imageSuggestion}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-4 overflow-hidden relative">
                             {generatingId === index && (
                                <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                                    <p className="text-sm text-muted-foreground">Generating...</p>
                                </div>
                            )}
                            {generatedImages[index] ? (
                                <Image src={generatedImages[index]} alt={creative.imageSuggestion} width={600} height={400} className="object-cover w-full h-full" />
                            ) : (
                                <ImageIcon className="h-10 w-10 text-muted-foreground/50"/>
                            )}
                        </div>
                        <p className="text-sm mt-3">{creative.bodyText}</p>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full" onClick={() => handleGenerateImage(index, creative.imageSuggestion)} disabled={generatingId !== null}>
                            {generatingId === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Generate Image
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default function CampaignBuilderPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CreateMetaCampaignOutput | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialMockCampaigns);
    const [activeTab, setActiveTab] = useState("generator");

    const [currentStep, setCurrentStep] = useState<CampaignStep>('project');
    const [campaignData, setCampaignData] = useState<Partial<CreateMetaCampaignInput & { projectId: string, projectBrochureFile: File | null }>>({});

    const handleNextStep = (step: CampaignStep) => {
        // Validation could be added here for each step
        setCurrentStep(step);
    };

    const updateCampaignData = (update: Partial<typeof campaignData>) => {
        setCampaignData(prev => ({ ...prev, ...update }));
    };

    const handleGeneration = async () => {
        if (!campaignData.campaignGoal || !campaignData.projectBrochureFile || !campaignData.budget || !campaignData.durationDays) {
            toast({ title: 'Missing Information', description: 'Please complete all steps before generating.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const brochureUri = await fileToDataUri(campaignData.projectBrochureFile);
            
            const payload: CreateMetaCampaignInput = {
                campaignGoal: campaignData.campaignGoal,
                projectBrochureDataUri: brochureUri,
                budget: Number(campaignData.budget),
                durationDays: Number(campaignData.durationDays)
            };
            
            const responseData = await createMetaCampaign(payload);
            setResult(responseData);

        } catch (e: any) {
            console.error(e);
            toast({
              title: "Generation Failed",
              description: e.message,
              variant: 'destructive',
          });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePublishCampaign = (newCampaign: Campaign) => {
        setCampaigns(prev => [newCampaign, ...prev]);
        setActiveTab("dashboard");
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 'project':
                return (
                    <div className="space-y-2">
                        <Label htmlFor="projectId">Which project is this campaign for?</Label>
                        <Select onValueChange={(val) => updateCampaignData({ projectId: val })} defaultValue={campaignData.projectId}>
                            <SelectTrigger id="projectId">
                                <SelectValue placeholder="Select a project from your library" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                                <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                                <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                );
            case 'workflow':
                return (
                    <div className="space-y-2">
                        <Label>What is the primary goal of this campaign?</Label>
                        <div className="grid grid-cols-1 gap-2">
                            {campaignWorkflows.map(wf => (
                                <button key={wf.id} type="button" onClick={() => updateCampaignData({ campaignGoal: wf.id })}
                                    className={cn('flex items-start text-left gap-3 p-3 rounded-lg border transition-colors',
                                        campaignData.campaignGoal === wf.id ? 'bg-primary/10 border-primary' : 'bg-muted/50 hover:bg-muted')}>
                                    {wf.icon}
                                    <div>
                                        <p className="font-semibold">{wf.title}</p>
                                        <p className="text-xs text-muted-foreground">{wf.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'media':
                return (
                    <div className="space-y-2">
                        <Label htmlFor="projectBrochure">Upload the campaign media (Brochure)</Label>
                        <Input id="projectBrochure" type="file" accept=".pdf" onChange={(e) => updateCampaignData({ projectBrochureFile: e.target.files?.[0] || null })} />
                        {campaignData.projectBrochureFile && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {campaignData.projectBrochureFile.name} uploaded.</p>}
                    </div>
                );
            case 'budget':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="budget">What is the total campaign budget ($)?</Label>
                            <Input id="budget" type="number" placeholder="e.g., 500" value={campaignData.budget || ''} onChange={(e) => updateCampaignData({ budget: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="durationDays">And for how many days will it run?</Label>
                            <Input id="durationDays" type="number" placeholder="e.g., 14" value={campaignData.durationDays || ''} onChange={(e) => updateCampaignData({ durationDays: Number(e.target.value) })} />
                        </div>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold">Review your campaign setup:</h4>
                        <div className="p-4 border rounded-lg bg-muted/50 space-y-2 text-sm">
                            <p><strong>Project:</strong> {campaignData.projectId || 'Not set'}</p>
                            <p><strong>Workflow:</strong> {campaignData.campaignGoal || 'Not set'}</p>
                            <p><strong>Media:</strong> {campaignData.projectBrochureFile?.name || 'Not set'}</p>
                            <p><strong>Budget:</strong> ${campaignData.budget?.toLocaleString() || 'Not set'} for {campaignData.durationDays || 'N/A'} days</p>
                        </div>
                    </div>
                );
        }
    };

    const getStepButton = () => {
        switch (currentStep) {
            case 'project': return <Button onClick={() => handleNextStep('workflow')} disabled={!campaignData.projectId}>Next <ArrowRight /></Button>;
            case 'workflow': return <Button onClick={() => handleNextStep('media')} disabled={!campaignData.campaignGoal}>Next <ArrowRight /></Button>;
            case 'media': return <Button onClick={() => handleNextStep('budget')} disabled={!campaignData.projectBrochureFile}>Next <ArrowRight /></Button>;
            case 'budget': return <Button onClick={() => handleNextStep('review')} disabled={!campaignData.budget || !campaignData.durationDays}>Review Campaign <ArrowRight /></Button>;
            case 'review': return (
                <Button size="lg" onClick={handleGeneration} disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building Campaign...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Campaign Structure</>}
                </Button>
            );
        }
    };
    
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Campaign Builder AI"
                description="Your dedicated suite for Facebook & Instagram advertising. Define, generate, monitor, and optimize your campaigns."
                icon={<Facebook className="h-8 w-8" />}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="generator"><PlusCircle className="mr-2 h-4 w-4" />Campaign Generator</TabsTrigger>
                    <TabsTrigger value="dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</TabsTrigger>
                    <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
                    <TabsTrigger value="creatives"><GalleryVertical className="mr-2 h-4 w-4" />Creative Library</TabsTrigger>
                </TabsList>

                <TabsContent value="generator">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-6">
                        <div className="lg:col-span-1 space-y-8 sticky top-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="capitalize">{currentStep} Setup</CardTitle>
                                            <CardDescription>Step {['project', 'workflow', 'media', 'budget', 'review'].indexOf(currentStep) + 1} of 5</CardDescription>
                                        </CardHeader>
                                        <CardContent className="min-h-[150px]">
                                            {renderStepContent()}
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            {currentStep !== 'project' && <Button variant="ghost" onClick={() => handleNextStep(['project', 'workflow', 'media', 'budget', 'review'][['project', 'workflow', 'media', 'budget', 'review'].indexOf(currentStep) - 1])}><ArrowLeft /> Back</Button>}
                                            <div className="ml-auto">
                                                {getStepButton()}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-2">
                            {isLoading && (
                                <Card className="flex items-center justify-center h-96">
                                    <div className="text-center text-muted-foreground">
                                        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                        <p className="font-semibold">Your AI Co-Pilot is building your campaign...</p>
                                        <p className="text-sm">This may take up to a minute.</p>
                                    </div>
                                </Card>
                            )}
                            {result ? (
                                <ResultDisplay result={result} toast={toast} onPublish={handlePublishCampaign} />
                            ) : !isLoading && (
                                <Card className="flex items-center justify-center h-96 border-dashed">
                                    <div className="text-center text-muted-foreground">
                                        <Facebook className="h-16 w-16 mx-auto mb-4 opacity-10" />
                                        <h3 className="text-lg font-semibold text-foreground">Your Campaign Plan Awaits</h3>
                                        <p>Complete the setup steps to let the AI build your path to success.</p>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="dashboard">
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Campaign Dashboard</CardTitle>
                            <CardDescription>Overview of your active and past campaigns.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign Name</TableHead>
                                        <TableHead>Objective</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns.map((campaign) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell className="font-medium">{campaign.name}</TableCell>
                                            <TableCell><Badge variant="outline">{campaign.objective}</Badge></TableCell>
                                            <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                                            <TableCell><Badge>{campaign.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="analytics">
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Performance Analytics</CardTitle>
                            <CardDescription>Visualizing the performance of the 'Emaar Beachfront Leads' campaign.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={mockAnalyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                    <Legend />
                                    <Bar dataKey="reach" fill="hsl(var(--primary))" />
                                    <Bar dataKey="clicks" fill="hsl(var(--accent-foreground))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="creatives">
                     <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Creative Library</CardTitle>
                            <CardDescription>A gallery of your AI-generated ad creatives and suggestions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreativeLibraryTab creatives={result?.adCreatives || null} toast={toast} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}

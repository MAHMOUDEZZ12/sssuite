
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createMetaCampaign } from '@/ai/flows/create-meta-campaign';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Facebook, Upload, ArrowRight, CheckCircle, Lightbulb, Copy, LayoutDashboard, BarChart2, GalleryVertical, PlusCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


// Define schemas here, on the client, for form validation.
export const CreateMetaCampaignInputSchema = z.object({
  campaignGoal: z.string().describe('The primary business objective for the campaign (e.g., "Generate leads for Azure Lofts").'),
  projectBrochureDataUri: z.string().optional().describe(
    "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This is the primary source of truth for the campaign."
  ),
  targetAudience: z.string().describe('A brief description of the ideal customer (e.g., "Young professionals and first-time homebuyers").'),
  budget: z.number().describe('The total campaign budget.'),
  durationDays: z.number().describe('The number of days the campaign should run.'),
});
export type CreateMetaCampaignInput = z.infer<typeof CreateMetaCampaignInputSchema>;

export const CreateMetaCampaignOutputSchema = z.object({
  campaignName: z.string().describe("A suitable name for the campaign."),
  campaignObjective: z.string().describe("The recommended Meta campaign objective (e.g., 'LEAD_GENERATION', 'AWARENESS', 'TRAFFIC')."),
  adSets: z.array(z.object({
    name: z.string().describe("The name for this ad set."),
    targetingSummary: z.string().describe("A summary of the recommended audience targeting for this ad set."),
    dailyBudget: z.number().describe("The suggested daily budget for this ad set."),
  })).describe("An array of suggested ad sets for the campaign."),
  adCreatives: z.array(z.object({
    headline: z.string().describe("A compelling headline for the ad."),
    bodyText: z.string().describe("The primary text for the ad creative."),
    callToAction: z.string().describe("The recommended call-to-action button text (e.g., 'Learn More', 'Sign Up')."),
    imageSuggestion: z.string().describe("A detailed suggestion for the ad's visual (e.g., 'A high-quality photo of the modern kitchen with natural light.')."),
  })).describe("An array of ad creative variations to test."),
  optimizationAdvice: z.string().describe("A final piece of expert advice for running this campaign successfully."),
});
export type CreateMetaCampaignOutput = z.infer<typeof CreateMetaCampaignOutputSchema>;


const formSchema = z.object({
  campaignGoal: z.string().min(10, 'Please provide a clear campaign goal.'),
  projectBrochure: z.custom<FileList>().refine(files => files && files.length > 0, 'A project brochure is required.'),
  targetAudience: z.string().min(10, 'Please describe your target audience.'),
  budget: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Budget must be a positive number." }),
  durationDays: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Duration must be a positive number." }),
});

type FormData = z.infer<typeof formSchema>;

const initialMockCampaigns = [
    { id: 1, name: "Azure Lofts Lead Gen", objective: "LEAD_GENERATION", budget: 500, status: "Active" },
    { id: 2, name: "Maple Creek Awareness", objective: "AWARENESS", budget: 300, status: "Completed" },
    { id: 3, name: "Oceanview Villas Traffic", objective: "TRAFFIC", budget: 750, status: "Paused" },
];

const mockAnalyticsData = [
  { name: 'Week 1', reach: 4000, clicks: 240, cpl: 5.20 },
  { name: 'Week 2', reach: 3000, clicks: 139, cpl: 4.80 },
  { name: 'Week 3', reach: 2000, clicks: 980, cpl: 2.50 },
  { name: 'Week 4', reach: 2780, clicks: 390, cpl: 3.10 },
];

type Campaign = typeof initialMockCampaigns[0];

const ResultDisplay = ({ result, toast, onPublish }: { result: CreateMetaCampaignOutput, toast: any, onPublish: (campaign: Campaign) => void }) => {
    const { getValues } = useForm<FormData>();
    const formData = getValues();
    
    const handlePublish = () => {
        const newCampaign: Campaign = {
            id: Date.now(),
            name: result.campaignName,
            objective: result.campaignObjective,
            budget: Number(formData.budget),
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


export default function CampaignBuilderPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CreateMetaCampaignOutput | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialMockCampaigns);
  const [activeTab, setActiveTab] = useState("generator");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { control, handleSubmit, formState: { errors } } = form;

  const handleGeneration = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);

    try {
        const brochureUri = await fileToDataUri(data.projectBrochure[0]);
        const payload: CreateMetaCampaignInput = {
            campaignGoal: data.campaignGoal,
            projectBrochureDataUri: brochureUri,
            targetAudience: data.targetAudience,
            budget: Number(data.budget),
            durationDays: Number(data.durationDays)
        };

        const response = await createMetaCampaign(payload);
        setResult(response);

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
                    <div className="lg:col-span-1 space-y-8">
                      <Card>
                        <CardHeader>
                            <CardTitle>Campaign Setup</CardTitle>
                            <CardDescription>Provide the core details for your campaign.</CardDescription>
                        </CardHeader>
                         <form onSubmit={handleSubmit(handleGeneration)}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                   <Label htmlFor="campaignGoal">Campaign Goal</Label>
                                   <Controller name="campaignGoal" control={control} render={({ field }) => (
                                        <Textarea id="campaignGoal" placeholder="e.g., Generate high-quality leads for the new Azure Lofts project." {...field} />
                                   )} />
                                   {errors.campaignGoal && <p className="text-sm text-destructive">{errors.campaignGoal.message}</p>}
                                </div>
                                <div className="space-y-2">
                                   <Label htmlFor="projectBrochure">Project Brochure</Label>
                                     <Controller name="projectBrochure" control={control} render={({ field: { onChange, ...fieldProps } }) => (
                                        <Input id="projectBrochure" type="file" accept=".pdf" onChange={(e) => onChange(e.target.files)} {...fieldProps} />
                                    )} />
                                    {errors.projectBrochure && <p className="text-sm text-destructive">{errors.projectBrochure.message as string}</p>}
                                </div>
                                <div className="space-y-2">
                                   <Label htmlFor="targetAudience">Target Audience</Label>
                                   <Controller name="targetAudience" control={control} render={({ field }) => (
                                        <Textarea id="targetAudience" placeholder="e.g., Young professionals, aged 25-40, interested in luxury urban living and technology." {...field} />
                                   )} />
                                    {errors.targetAudience && <p className="text-sm text-destructive">{errors.targetAudience.message}</p>}
                                </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <Label htmlFor="budget">Total Budget ($)</Label>
                                       <Controller name="budget" control={control} render={({ field }) => (
                                            <Input id="budget" type="number" placeholder="e.g., 500" {...field} />
                                       )} />
                                       {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                       <Label htmlFor="durationDays">Duration (days)</Label>
                                       <Controller name="durationDays" control={control} render={({ field }) => (
                                            <Input id="durationDays" type="number" placeholder="e.g., 14" {...field} />
                                       )} />
                                       {errors.durationDays && <p className="text-sm text-destructive">{errors.durationDays.message}</p>}
                                    </div>
                                 </div>
                            </CardContent>
                            <CardFooter>
                                 <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building Campaign...</> : <><Sparkles className="mr-2 h-5 w-5" />Generate Campaign Structure</>}
                                </Button>
                            </CardFooter>
                         </form>
                      </Card>
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
                         {result && (
                            <ResultDisplay result={result} toast={toast} onPublish={handlePublishCampaign} />
                         )}
                         {!isLoading && !result && (
                            <Card className="flex items-center justify-center h-96 border-dashed">
                                <div className="text-center text-muted-foreground">
                                    <Image src="https://picsum.photos/400/300" data-ai-hint="abstract marketing chart" alt="Campaign waiting" width={400} height={300} className="mx-auto mb-4 rounded-lg opacity-30" />
                                    <h3 className="text-lg font-semibold text-foreground">Your Campaign Plan Awaits</h3>
                                    <p>Fill out the setup form and let the AI build your path to success.</p>
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
                        <CardDescription>Visualizing the performance of the 'Azure Lofts Lead Gen' campaign.</CardDescription>
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
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {result?.adCreatives.map((creative, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-base">{creative.headline}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-square bg-muted rounded-md flex items-center justify-center p-4">
                                        <p className="text-sm text-center text-muted-foreground italic">{creative.imageSuggestion}</p>
                                    </div>
                                    <p className="text-sm mt-2">{creative.bodyText}</p>
                                </CardContent>
                            </Card>
                        )) || (
                             <div className="col-span-full text-center py-12 text-muted-foreground">
                                <p>Generate a campaign to see your creative library.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </main>
  );
}

    
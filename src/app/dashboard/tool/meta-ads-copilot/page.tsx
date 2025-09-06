
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createMetaCampaign, CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/ai/flows/create-meta-campaign';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Facebook, Upload, ArrowRight, CheckCircle, Lightbulb, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { fileToDataUri } from '@/lib/tools-client';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const schema = z.object({
  campaignGoal: z.string().min(10, 'Please provide a clear campaign goal.'),
  projectBrochure: z.custom<FileList>().refine(files => files && files.length > 0, 'A project brochure is required.'),
  targetAudience: z.string().min(10, 'Please describe your target audience.'),
  budget: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Budget must be a positive number." }),
  durationDays: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Duration must be a positive number." }),
});

type FormData = z.infer<typeof schema>;

const ResultDisplay = ({ result, toast }: { result: CreateMetaCampaignOutput, toast: any }) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!' });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Campaign Strategy: {result.campaignName}</CardTitle>
                    <CardDescription>
                        Meta Objective: <Badge>{result.campaignObjective}</Badge>
                    </CardDescription>
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


export default function MetaAdsCopilotPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CreateMetaCampaignOutput | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Meta Ads AI Co-Pilot"
        description="Your dedicated agent for Facebook & Instagram advertising. Define your goal and let the AI build the campaign."
        icon={<Facebook className="h-8 w-8" />}
      />

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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
                    <ResultDisplay result={result} toast={toast} />
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
    </main>
  );
}

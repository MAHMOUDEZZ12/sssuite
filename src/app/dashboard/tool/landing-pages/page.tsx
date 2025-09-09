
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, Upload, Download, MonitorPlay, LayoutTemplate, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { fileToDataUri } from '@/lib/tools-client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { track } from '@/lib/events';
import { useCanvas } from '@/context/CanvasContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const visualStyles = [
    { id: "Modern & Minimalist", label: "Modern & Minimalist" },
    { id: "Luxury & Elegant", label: "Luxury & Elegant" },
    { id: "Cozy & Welcoming", label: "Cozy & Welcoming" },
    { id: "Bold & Colorful", label: "Bold & Colorful" },
];

const pageSections = [
    { label: "Hero + Form", sections: 2 },
    { label: "Hero + Features + Form", sections: 3 },
    { label: "Hero + Gallery + Form", sections: 4 },
    { label: "Hero + Features + Gallery + Map + Form", sections: 5 },
];

const StructureMockup = ({ label, sections, isSelected, onClick }: { label: string, sections: number, isSelected: boolean, onClick: () => void }) => {
    return (
        <button onClick={onClick} className={cn("block w-full text-left p-2 rounded-lg border-2 transition-all", isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-muted-foreground/50")}>
            <div className="w-full h-40 bg-muted/50 rounded-md p-3 flex flex-col gap-2">
                <div className="h-1/3 bg-primary/20 rounded-sm"></div>
                {sections > 2 && <div className="h-1/3 bg-primary/20 rounded-sm"></div>}
                {sections > 3 && <div className="h-1/6 bg-primary/20 rounded-sm"></div>}
                {sections > 4 && <div className="h-1/6 bg-primary/20 rounded-sm"></div>}
                <div className="flex-grow bg-secondary/50 rounded-sm"></div>
            </div>
            <p className="text-sm font-medium text-center mt-2">{label}</p>
        </button>
    )
}


const EditInCanvas = ({ pageHtml, onSave, onCancel }: { pageHtml: string; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');
    return (
        <div className="space-y-4">
            <iframe srcDoc={pageHtml} className="w-full h-[500px] rounded-lg border" title="Landing Page Preview"/>
            <h3 className="font-semibold">Editing Instructions</h3>
            <Textarea 
                placeholder={`Tell the AI what to change on this page...\n\ne.g., "Change the hero image to something more modern. Make the primary color a deep blue."`}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(instructions)}>Update Page</Button>
            </div>
        </div>
    )
}

type Step = 'project' | 'details' | 'style' | 'structure' | 'brochure';
const steps: Step[] = ['project', 'details', 'style', 'structure', 'brochure'];


export default function LandingPageBuilderPage() {
    const { toast } = useToast();
    const { openCanvas, closeCanvas } = useCanvas();
    const [isLoading, setIsLoading] = useState(false);
    const [resultHtml, setResultHtml] = useState<string | null>(null);

    const [currentStep, setCurrentStep] = useState<Step>('project');
    const [formData, setFormData] = useState({
        projectName: '',
        projectDetails: '',
        brandingStyle: [] as string[],
        numberOfSections: 3,
        projectBrochure: null as File | null,
    });

    const handleNextStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };
     const handlePrevStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        const { projectName, projectDetails, brandingStyle } = formData;
        if (!projectName || !projectDetails || brandingStyle.length === 0) {
            toast({ title: 'Missing Information', description: 'Please complete all steps before generating.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResultHtml(null);
        track('landing_page_generation_started', { brandingStyle: brandingStyle.join(', ') });

        try {
            const brochureUri = formData.projectBrochure ? await fileToDataUri(formData.projectBrochure) : undefined;
            const payload = {
                projectName: formData.projectName,
                projectDetails: formData.projectDetails,
                brandingStyle: formData.brandingStyle.join(', '),
                numberOfSections: formData.numberOfSections,
                projectBrochureDataUri: brochureUri,
            };
            const responseData = await generateLandingPage(payload);
            setResultHtml(responseData.landingPageHtml);
            track('landing_page_generation_succeeded');
            toast({ title: 'Landing Page Generated!', description: 'Your new page is ready for review and editing in the canvas.'});
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('landing_page_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };
    
    const openInCanvas = () => {
        if (!resultHtml) return;
        openCanvas(
            <EditInCanvas
                pageHtml={resultHtml}
                onCancel={closeCanvas}
                onSave={(instructions) => {
                    toast({
                        title: 'Page Update Queued...',
                        description: 'The AI is rebuilding your page with the new instructions.',
                    });
                     // In a real app, this would re-run the generation flow with the new instructions
                    console.log('Re-generating with instructions:', instructions);
                    closeCanvas();
                }}
            />,
            `Editing: ${formData.projectName} Landing Page`,
            "Provide instructions to modify your generated page."
        );
    }
    
    const renderStepContent = () => {
      switch(currentStep) {
        case 'project':
          return (
            <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} placeholder="e.g., Emaar Beachfront" autoFocus/>
            </div>
          );
        case 'details':
          return (
             <div className="space-y-2">
                <Label htmlFor="projectDetails">Offer Details</Label>
                <Textarea id="projectDetails" value={formData.projectDetails} onChange={e => setFormData({...formData, projectDetails: e.target.value})} placeholder="Describe the main offer or message for this page. e.g., 'Luxury 1-3 bedroom apartments with stunning sea views and a 2-year post-handover payment plan...'" rows={4} autoFocus/>
            </div>
          );
        case 'style':
           return (
                <div className="space-y-2">
                    <Label>Visual Style(s)</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {visualStyles.map(item => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={item.id} 
                                    checked={formData.brandingStyle.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            brandingStyle: checked ? [...prev.brandingStyle, item.id] : prev.brandingStyle.filter(s => s !== item.id)
                                        }));
                                    }}
                                />
                                <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'structure':
            return (
                 <div className="space-y-2">
                    <Label>Page Structure</Label>
                    <p className="text-sm text-muted-foreground">Visually select the layout for your page.</p>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                        {pageSections.map(s => (
                            <StructureMockup 
                                key={s.sections}
                                label={s.label}
                                sections={s.sections}
                                isSelected={formData.numberOfSections === s.sections}
                                onClick={() => setFormData({...formData, numberOfSections: s.sections})}
                            />
                        ))}
                     </div>
                 </div>
            );
        case 'brochure':
            return (
                <div className="space-y-2">
                    <Label htmlFor="projectBrochure">Brochure (Optional)</Label>
                    <Input id="projectBrochure" type="file" onChange={e => setFormData({...formData, projectBrochure: e.target.files?.[0] || null})} />
                     {formData.projectBrochure && <p className="text-sm text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {formData.projectBrochure.name} selected.</p>}
                </div>
            );
        default:
          return null;
      }
    };


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Landing Page Builder"
                description="Use the AI to construct your perfect landing page, then open it in the canvas to make live edits."
                icon={<LayoutTemplate className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleGeneration}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                     <CardHeader>
                                        <CardTitle className="capitalize">{currentStep} Setup</CardTitle>
                                        <CardDescription>Step {steps.indexOf(currentStep) + 1} of {steps.length}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="min-h-[180px]">
                                        {renderStepContent()}
                                    </CardContent>
                                </motion.div>
                            </AnimatePresence>
                             <CardFooter className="flex justify-between">
                                <Button type="button" variant="ghost" onClick={handlePrevStep} disabled={currentStep === 'project'}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                {currentStep === 'brochure' ? (
                                    <Button type="submit" size="lg" disabled={isLoading}>
                                        {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Page</>}
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={handleNextStep}>
                                        Next <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center h-96">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">Your AI Co-Pilot is building your page...</p>
                                <p className="text-sm">This may take up to a minute, especially with image generation.</p>
                            </div>
                        </Card>
                    ) : resultHtml ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Live Preview</CardTitle>
                                <CardDescription>Your generated landing page is ready. You can now publish it or edit it in the canvas.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden h-[600px]">
                                    <iframe srcDoc={resultHtml} className="w-full h-full" title="Landing Page Preview" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex-wrap gap-2">
                                <Button onClick={openInCanvas}>
                                    <Pen className="mr-2" /> Edit in Canvas
                                </Button>
                                <a href={`data:text/html;charset=UTF-8,${encodeURIComponent(resultHtml)}`} download={`${formData.projectName}-landing-page.html`}>
                                   <Button variant="outline"><Download className="mr-2" /> Download HTML</Button>
                                </a>
                                <Button onClick={() => toast({title: "Published!", description: "Your landing page is now live."})}>
                                    <MonitorPlay className="mr-2" /> Publish Page
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Palette className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Landing Page Canvas</h3>
                            <p className="text-muted-foreground">Complete the setup steps to let the AI architect your high-converting page.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}

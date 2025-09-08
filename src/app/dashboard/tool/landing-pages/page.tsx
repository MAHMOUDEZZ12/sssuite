'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, GalleryHorizontal, Map, Mail, Download, MonitorPlay, LayoutTemplate } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { fileToDataUri } from '@/lib/tools-client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { track } from '@/lib/events';

type SectionType = 'hero' | 'features' | 'gallery' | 'location' | 'contact';

interface BlockOption {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

const blockOptions: Record<SectionType, BlockOption[]> = {
    hero: [
        { id: 'hero-image-left', name: 'Image Left, Text Right', description: 'Classic layout with a prominent image.', icon: <div className="w-8 h-6 border rounded-sm flex"><div className="w-1/2 h-full bg-muted"/><div className="w-1/2 h-full p-1"><div className="w-full h-1 bg-muted-foreground/50 rounded-sm"/><div className="w-2/3 h-1 bg-muted-foreground/50 rounded-sm mt-1"/></div></div> },
        { id: 'hero-image-right', name: 'Text Left, Image Right', description: 'A balanced and modern approach.', icon: <div className="w-8 h-6 border rounded-sm flex"><div className="w-1/2 h-full p-1"><div className="w-full h-1 bg-muted-foreground/50 rounded-sm"/><div className="w-2/3 h-1 bg-muted-foreground/50 rounded-sm mt-1"/></div><div className="w-1/2 h-full bg-muted"/></div> },
        { id: 'hero-full-bg', name: 'Full Background Image', description: 'Impactful and immersive hero section.', icon: <div className="w-8 h-6 border rounded-sm flex items-center justify-center bg-muted"><div className="w-2/3 h-2/3 bg-background/50 rounded-sm p-1"><div className="w-full h-1 bg-muted-foreground/50 rounded-sm"/><div className="w-2/3 h-1 bg-muted-foreground/50 rounded-sm mt-1"/></div></div> },
    ],
    features: [
        { id: 'features-grid-3', name: '3-Column Grid', description: 'Showcase key features side-by-side.', icon: <GalleryHorizontal/> },
        { id: 'features-list-icon', name: 'List with Icons', description: 'A clean, scannable list of amenities.', icon: <Pen/> },
    ],
    gallery: [
        { id: 'gallery-masonry', name: 'Masonry Grid', description: 'A dynamic, modern image gallery.', icon: <GalleryHorizontal/> },
        { id: 'gallery-carousel', name: 'Image Carousel', description: 'A classic slideshow for photos.', icon: <GalleryHorizontal/> },
    ],
    location: [
        { id: 'location-map-left', name: 'Map Left, Text Right', description: 'Show location with context.', icon: <Map/> },
        { id: 'location-map-full', name: 'Full-Width Map', description: 'An interactive, full-width map.', icon: <Map/> },
    ],
    contact: [
        { id: 'contact-form-simple', name: 'Simple Form', description: 'A clean and effective lead form.', icon: <Mail/> },
        { id: 'contact-form-detailed', name: 'Detailed Form', description: 'Capture more information from leads.', icon: <Mail/> },
    ]
};


export default function LandingPageBuilderPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [resultHtml, setResultHtml] = useState<string | null>(null);
    const [projectName, setProjectName] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [brandingStyle, setBrandingStyle] = useState('');
    const [projectBrochure, setProjectBrochure] = useState<File | null>(null);

    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectName || !projectDetails || !brandingStyle) {
            toast({ title: 'Missing Information', description: 'Please fill out all project fields before generating.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResultHtml(null);
        track('landing_page_generation_started', { brandingStyle });

        try {
            const brochureUri = projectBrochure ? await fileToDataUri(projectBrochure) : undefined;
            const payload = {
                projectName,
                projectDetails,
                brandingStyle,
                projectBrochureDataUri: brochureUri,
            };
            const responseData = await generateLandingPage(payload);
            setResultHtml(responseData.landingPageHtml);
            track('landing_page_generation_succeeded');
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

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Landing Page Builder"
                description="Use the AI-powered modular builder to construct and publish your perfect landing page."
                icon={<LayoutTemplate className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Project Setup</CardTitle>
                            <CardDescription>Provide the core details for your page.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleGeneration}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="projectName">Project Name</Label>
                                    <Input id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g., Emaar Beachfront" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="projectDetails">Project Details</Label>
                                    <Textarea id="projectDetails" value={projectDetails} onChange={e => setProjectDetails(e.target.value)} placeholder="e.g., Luxury 1-3 bedroom apartments..." rows={4} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brandingStyle">Visual Style</Label>
                                    <Select value={brandingStyle} onValueChange={setBrandingStyle}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Modern & Minimalist">Modern & Minimalist</SelectItem>
                                            <SelectItem value="Luxury & Elegant">Luxury & Elegant</SelectItem>
                                            <SelectItem value="Cozy & Welcoming">Cozy & Welcoming</SelectItem>
                                            <SelectItem value="Bold & Colorful">Bold & Colorful</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="projectBrochure">Brochure (Optional)</Label>
                                    <Input id="projectBrochure" type="file" onChange={e => setProjectBrochure(e.target.files?.[0] || null)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Building Page...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Page with AI</>}
                                </Button>
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
                                <CardDescription>Your generated landing page is ready. You can now publish it or make further edits.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden h-[600px]">
                                    <iframe srcDoc={resultHtml} className="w-full h-full" title="Landing Page Preview" />
                                </div>
                            </CardContent>
                            <CardFooter className="gap-2">
                                <a href={`data:text/html;charset=UTF-8,${encodeURIComponent(resultHtml)}`} download={`${projectName}-landing-page.html`}>
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
                            <p className="text-muted-foreground">Fill out the project setup and let the AI architect your high-converting page.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}

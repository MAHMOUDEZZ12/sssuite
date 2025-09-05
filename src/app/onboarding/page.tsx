
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { StepHeader } from '@/components/ui/step-header';
import { ProjectCard } from '@/components/ui/project-card';
import { ProviderTile } from '@/components/ui/provider-tile';
import { Check, ChevronRight, X, ArrowLeft, Loader2, Sparkles, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Image from 'next/image';

const MOCK_DEVELOPERS = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Aldar'];
const MOCK_PROJECTS_PASS1 = [
    { badge: 'Suggested', name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour', priceFrom: 'AED 2.5M', unitTypes: ['Apartment'], handover: 'Ready' },
    { badge: 'Suggested', name: 'Damac Lagoons', developer: 'Damac', area: 'Dubailand', priceFrom: 'AED 1.8M', unitTypes: ['Townhouse', 'Villa'], handover: '2026' }
];

const MOCK_PROJECTS_PASS2 = [
    { name: 'Address The Bay', developer: 'Emaar', area: 'Dubai Harbour' },
    { name: 'Safa Two', developer: 'Damac', area: 'Safa Park' },
    { name: 'Creek Waters 2', developer: 'Emaar', area: 'Dubai Creek Harbour' },
    { name: 'Sobha Hartland II', developer: 'Sobha', area: 'MBR City' },
    { name: 'Design Quarter', developer: 'Meraas', area: 'd3' },
    { name: 'The Oasis', developer: 'Emaar', area: 'Dubailand' },
    { name: 'Volta', developer: 'Damac', area: 'Downtown Dubai' },
    { name: 'Palm Jebel Ali', developer: 'Nakheel', area: 'Jebel Ali' },
    { name: 'GHAF Woods', developer: 'Majid Al Futtaim', area: 'Global Village' },
    { name: 'Alana', developer: 'Emaar', area: 'The Valley' },
    { name: 'Rivana', developer: 'Emaar', area: 'The Valley' },
    { name: 'Golf Greens', developer: 'Damac', area: 'Damac Hills' },
];

function OnboardingComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const step = parseInt(searchParams.get('step') || '1', 10);

    const [draft, setDraft] = useState({
        city: 'Dubai',
        country: 'UAE',
        devFocus: ['Emaar'],
        firstPass: {} as Record<string, 'relevant' | 'not'>,
        scanSelected: [] as string[],
        shortlist: [] as string[],
        brandKit: { logoUrl: null as string | null, colors: { primary: '', accent: '' }, contact: { name: '', phone: '', email: '', whatsappUrl: '' } },
        connections: {} as Record<string, 'connected'|'skipped'>,
        payment: { status: 'skipped' } as { status: 'added'|'skipped' },
        progress: { step: 1, ts: Date.now() },
    });
    
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    const updateDraft = (data: Partial<typeof draft>) => {
        setDraft(prev => ({ ...prev, ...data, progress: { step, ts: Date.now() } }));
        console.log("Draft updated", { ...draft, ...data });
    };
    
    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setLogoPreview(result);
            updateDraft({ brandKit: { ...draft.brandKit, logoUrl: result }});
          };
          reader.readAsDataURL(file);
        }
    };

    const toggleDeveloper = (dev: string) => {
        const newDevs = draft.devFocus.includes(dev)
            ? draft.devFocus.filter(d => d !== dev)
            : [...draft.devFocus, dev];
        updateDraft({ devFocus: newDevs });
    };
    
    const handleFirstPass = (projectName: string, status: 'relevant' | 'not') => {
        updateDraft({ firstPass: { ...draft.firstPass, [projectName]: status } });
    };

    const isStep1Complete = draft.devFocus.length > 0 && Object.keys(draft.firstPass).length === MOCK_PROJECTS_PASS1.length;

    const nextStep = () => router.push(`/onboarding?step=${step + 1}`);
    const prevStep = () => router.push(`/onboarding?step=${step - 1}`);
    const finishOnboarding = () => {
        toast({ title: "Setup Complete!", description: "Welcome to your new dashboard." });
        router.push('/dashboard');
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Card>
                        <CardHeader>
                            <StepHeader title="Let's build your project library" subtitle="We'll start by confirming your market and identifying key developers." />
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div>
                                <h3 className="font-semibold mb-2">1. Confirm your city</h3>
                                <div className="flex items-center gap-4 rounded-xl border p-4 bg-neutral-900">
                                    <p>We found you in: <span className="font-bold text-lime-400">{draft.city}, {draft.country}</span></p>
                                    <Button variant="ghost" size="sm" className="ml-auto border border-neutral-700">Change city</Button>
                                    <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300">Yes, that's me</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. Which developers do you work with?</h3>
                                <p className="text-sm text-neutral-400 mb-3">Choose 1–3 to start. This helps us find relevant projects.</p>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_DEVELOPERS.map(dev => (
                                        <button key={dev}
                                            onClick={() => toggleDeveloper(dev)}
                                            aria-pressed={draft.devFocus.includes(dev)}
                                            className={cn("rounded-full border px-3 py-1 text-sm transition-colors", draft.devFocus.includes(dev) ? 'border-lime-400 bg-lime-900/50 text-lime-300' : 'border-neutral-700 hover:bg-neutral-900')}>
                                            {dev}
                                        </button>
                                    ))}
                                    <button className="rounded-full border border-dashed border-neutral-700 px-3 py-1 text-sm text-neutral-400 hover:border-lime-400 hover:text-lime-400">
                                        + Add new
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">3. Are these projects relevant?</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {MOCK_PROJECTS_PASS1.map(proj => (
                                        <ProjectCard key={proj.name} project={proj} actions={
                                            <div className="flex gap-2">
                                                <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300" onClick={() => handleFirstPass(proj.name, 'relevant')}>Relevant</Button>
                                                <Button size="sm" variant="ghost" className="border border-neutral-700" onClick={() => handleFirstPass(proj.name, 'not')}>Not relevant</Button>
                                            </div>
                                        } />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={nextStep} className="ml-auto bg-lime-400 text-black hover:bg-lime-300" disabled={!isStep1Complete}>Continue <ChevronRight /></Button>
                        </CardFooter>
                    </Card>
                );
            case 2:
                return (
                    <Card>
                        <CardHeader>
                            <StepHeader title="Your data. Your control." />
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <ul className="space-y-3">
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-lime-400 mt-1 shrink-0" /><div><span className="font-semibold">We tailor everything to your market.</span><br /><span className="text-neutral-400">Your city and developer choices help us show you what's relevant.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-lime-400 mt-1 shrink-0" /><div><span className="font-semibold">Your assets stay private.</span><br /><span className="text-neutral-400">Your data, brand, and contacts are yours alone unless you explicitly publish them.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-lime-400 mt-1 shrink-0" /><div><span className="font-semibold">No charges today.</span><br /><span className="text-neutral-400">Add a card to enable exports and publishing later. You can cancel anytime.</span></div></li>
                           </ul>
                            <Collapsible>
                                <CollapsibleTrigger className="text-sm text-neutral-400 underline">How we use your data</CollapsibleTrigger>
                                <CollapsibleContent>
                                    <p className="text-sm text-neutral-400 mt-2">We use your data strictly to power your tools. We do not sell your data or use it to train models for other users. Your privacy is paramount.</p>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="ghost" className="border border-neutral-700" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={nextStep} className="bg-lime-400 text-black hover:bg-lime-300">Add Payment Method</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 3:
                return (
                     <Card>
                        <CardHeader>
                            <StepHeader title="Add a payment method" subtitle="Used for exports & publishing. No charge to start." />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="•••• •••• •••• 4242" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry">Expires</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="save-card" defaultChecked />
                                <label htmlFor="save-card" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Save as default payment method
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                             <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="ghost" className="border border-neutral-700" onClick={() => { updateDraft({ payment: { status: 'skipped'} }); nextStep(); }}>Skip for now</Button>
                                 <Button onClick={() => {
                                     toast({ title: "Card saved.", description: "You won't be charged now." });
                                     updateDraft({ payment: { status: 'added' } });
                                     nextStep();
                                 }} className="bg-lime-400 text-black hover:bg-lime-300">Save Card</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 4:
                return (
                     <Card>
                        <CardHeader>
                            <StepHeader title="Here's a broader scan based on your choices." subtitle="Select 5-8 projects to build your initial library. This helps the AI understand your focus." />
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {MOCK_PROJECTS_PASS2.map(proj => (
                                    <ProjectCard 
                                        key={proj.name} 
                                        project={proj} 
                                        selectable 
                                        selected={draft.scanSelected.includes(proj.name)}
                                        onToggle={() => {
                                            const newSelection = draft.scanSelected.includes(proj.name)
                                                ? draft.scanSelected.filter(p => p !== proj.name)
                                                : [...draft.scanSelected, proj.name];
                                            updateDraft({ scanSelected: newSelection });
                                        }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                             <div className="flex gap-2">
                                 <Button variant="ghost" className="border border-neutral-700" onClick={nextStep}>Skip</Button>
                                 <Button onClick={nextStep} className="bg-lime-400 text-black hover:bg-lime-300">Use Selected</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
            case 5:
                return (
                     <Card>
                        <CardHeader>
                            <StepHeader title="Make it yours." subtitle="Add your brand to personalize all AI-generated content." />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-neutral-900 hover:border-lime-400 transition-colors">
                                       <Input id="logo" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
                                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                         {logoPreview ? (
                                            <Image src={logoPreview} alt="Logo preview" layout="fill" className="object-contain rounded-md p-2" />
                                         ) : (
                                           <div className="text-center text-neutral-400">
                                             <Upload className="mx-auto h-8 w-8 mb-1" />
                                             <p className="text-xs">Drag & drop or click</p>
                                           </div>
                                         )}
                                       </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="extract-colors" />
                                        <label htmlFor="extract-colors" className="text-sm font-medium">
                                            Extract colors from logo
                                        </label>
                                    </div>
                                </div>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <Input type="text" placeholder="#000000" />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Accent Color</Label>
                                    <Input type="text" placeholder="#FFFFFF" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <Label>Contact Info</Label>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input type="text" placeholder="Your Name" />
                                    <Input type="email" placeholder="Email Address" />
                                    <Input type="tel" placeholder="Phone Number" />
                                    <Input type="url" placeholder="WhatsApp Link (optional)" />
                                </div>
                             </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                             <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="ghost" className="border border-neutral-700" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={nextStep} className="bg-lime-400 text-black hover:bg-lime-300">Save Brand</Button>
                            </div>
                        </CardFooter>
                    </Card>
                );
             case 6:
                return (
                     <Card>
                        <CardHeader>
                            <StepHeader title="Connect your accounts" subtitle="Unlock automations for posting, messaging, and more. You can always do this later." />
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <ProviderTile name="Instagram" onClick={() => {}} />
                                <ProviderTile name="Facebook Page" onClick={() => {}} />
                                <ProviderTile name="YouTube" onClick={() => {}} />
                                <ProviderTile name="Gmail" onClick={() => {}} />
                                <ProviderTile name="WhatsApp Business" onClick={() => {}} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <Button onClick={nextStep} className="bg-lime-400 text-black hover:bg-lime-300">Continue</Button>
                        </CardFooter>
                    </Card>
                );
             case 7:
                 return (
                    <Card className="text-center">
                        <CardHeader>
                             <div className="mx-auto w-fit p-4 bg-lime-400/10 text-lime-400 rounded-full mb-4">
                                <Sparkles className="h-10 w-10" />
                             </div>
                            <StepHeader title="You're all set. Choose your start." />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-neutral-400">Your brand and project library are ready. Your payment method is on file for when you need to export or publish.</p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="text-left bg-neutral-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-base">Free Plan</CardTitle>
                                        <CardDescription>5 generations, watermark on exports</CardDescription>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left border-lime-400 bg-lime-900/30">
                                    <CardHeader>
                                        <CardTitle className="text-base text-lime-300">Pro Plan</CardTitle>
                                        <CardDescription className="text-lime-400/80">Unlimited, no watermark, brand on</CardDescription>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left bg-neutral-900/50">
                                    <CardHeader>
                                        <CardTitle className="text-base">Team Plan</CardTitle>
                                        <CardDescription>Multi-brand, multi-user access</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                             <p className="text-xs text-neutral-500">You won't be charged until you upgrade or perform a paid action.</p>
                        </CardContent>
                        <CardFooter>
                           <Button onClick={finishOnboarding} className="w-full md:w-auto mx-auto bg-lime-400 text-black hover:bg-lime-300">Go to Dashboard</Button>
                        </CardFooter>
                    </Card>
                 );
            default:
                return <div>Invalid step</div>;
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
            {renderStep()}
        </div>
    );
}


export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex-1 flex items-center justify-center">
                 <Suspense fallback={<Loader2 className="animate-spin h-8 w-8" />}>
                    <OnboardingComponent />
                 </Suspense>
            </main>
        </div>
    )
}

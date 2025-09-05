
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
import { ingestChat, ChatAction, ChatEvent } from '@/lib/chat';

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

// This would be your authenticated user's ID
const MOCK_UID = 'user123';

async function assistantDo(text: string, action: ChatAction) {
  try {
    const event: ChatEvent = {
      uid: MOCK_UID, 
      eventId: crypto.randomUUID(),
      role: "assistant",
      text, 
      action,
      meta: { source: "onboarding_flow" },
    };
    await ingestChat(event);
  } catch (error) {
    console.error("Failed to ingest chat event:", error);
    // You might want to show a toast to the user here in a real app
  }
}


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
        brandKit: { logoUrl: null as string | null, colors: { primary: '#36454F', accent: '#98FF98' }, contact: { name: '', phone: '', email: '', whatsappUrl: '' } },
        connections: {} as Record<string, 'connected'|'skipped'>,
        payment: { status: 'skipped' } as { status: 'added'|'skipped' },
        progress: { step: 1, ts: Date.now() },
    });
    
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    const updateDraft = (data: Partial<typeof draft>) => {
        setDraft(prev => ({ ...prev, ...data, progress: { step, ts: Date.now() } }));
        // In a real app, you would also save this to Firestore here
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
        assistantDo("Onboarding complete. Ready for my first command.", { type: "logMetric", name: "onboarding_completed" });
        toast({ title: "Setup Complete!", description: "Welcome to your new dashboard." });
        router.push('/dashboard');
    }
    
    const handleSaveCard = () => {
        assistantDo("User added a payment method.", { type: "savePaymentMethodStart" });
        toast({ title: "Card saved.", description: "You won't be charged now." });
        updateDraft({ payment: { status: 'added' } });
        nextStep();
    }
    
    const handleSkipPayment = () => {
        assistantDo("User skipped payment.", { type: "logMetric", name: "onboarding_payment_skipped" });
        updateDraft({ payment: { status: 'skipped'} }); 
        nextStep();
    }
    
    const handleSaveBrand = () => {
        assistantDo("I've saved your brand identity. It will now be used across the suite.", { 
            type: "addBrand", 
            name: "Default Brand Kit", // You'd get this from a form field
            primary: draft.brandKit.colors.primary,
            accent: draft.brandKit.colors.accent,
        });
        nextStep();
    }
    
    const handleFinalizeShortlist = () => {
        assistantDo("Okay, I've created your initial project library.", { type: "logMetric", name: "onboarding_shortlist_finalized", props: { projects: draft.scanSelected } });
        nextStep();
    };


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
                                <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/20">
                                    <p>We found you in: <span className="font-bold text-primary">{draft.city}, {draft.country}</span></p>
                                    <Button variant="ghost" size="sm" className="ml-auto">Change city</Button>
                                    <Button size="sm">Yes, that's me</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. Which developers do you work with?</h3>
                                <p className="text-sm text-muted-foreground mb-3">Choose 1–3 to start. This helps us find relevant projects.</p>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_DEVELOPERS.map(dev => (
                                        <button key={dev}
                                            onClick={() => toggleDeveloper(dev)}
                                            aria-pressed={draft.devFocus.includes(dev)}
                                            className={cn("rounded-full border px-3 py-1 text-sm transition-colors", draft.devFocus.includes(dev) ? 'border-primary bg-primary/20 text-primary' : 'border-border hover:bg-muted/50')}>
                                            {dev}
                                        </button>
                                    ))}
                                    <button className="rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary">
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
                                                <Button size="sm" onClick={() => handleFirstPass(proj.name, 'relevant')}>Relevant</Button>
                                                <Button size="sm" variant="ghost" onClick={() => handleFirstPass(proj.name, 'not')}>Not relevant</Button>
                                            </div>
                                        } />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={nextStep} className="ml-auto" disabled={!isStep1Complete}>Continue <ChevronRight /></Button>
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
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">We tailor everything to your market.</span><br /><span className="text-muted-foreground">Your city and developer choices help us show you what's relevant.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">Your assets stay private.</span><br /><span className="text-muted-foreground">Your data, brand, and contacts are yours alone unless you explicitly publish them.</span></div></li>
                               <li className="flex items-start gap-3"><Check className="h-5 w-5 text-green-500 mt-1 shrink-0" /><div><span className="font-semibold">No charges today.</span><br /><span className="text-muted-foreground">Add a card to enable exports and publishing later. You can cancel anytime.</span></div></li>
                           </ul>
                            <Collapsible>
                                <CollapsibleTrigger className="text-sm text-muted-foreground underline">How we use your data</CollapsibleTrigger>
                                <CollapsibleContent>
                                    <p className="text-sm text-muted-foreground mt-2">We use your data strictly to power your tools. We do not sell your data or use it to train models for other users. Your privacy is paramount.</p>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep}><ArrowLeft /> Back</Button>
                            <div className="flex gap-2">
                                 <Button variant="outline" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={nextStep}>Add Payment Method</Button>
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
                                 <Button variant="outline" onClick={handleSkipPayment}>Skip for now</Button>
                                 <Button onClick={handleSaveCard}>Save Card</Button>
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
                                 <Button variant="outline" onClick={nextStep}>Skip</Button>
                                 <Button onClick={handleFinalizeShortlist}>Use Selected ({draft.scanSelected.length})</Button>
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
                                    <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary transition-colors">
                                       <Input id="logo" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
                                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                         {logoPreview ? (
                                            <Image src={logoPreview} alt="Logo preview" layout="fill" className="object-contain rounded-md p-2" />
                                         ) : (
                                           <div className="text-center text-muted-foreground">
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
                                    <Input type="text" placeholder="#000000" value={draft.brandKit.colors.primary} onChange={(e) => updateDraft({ brandKit: {...draft.brandKit, colors: {...draft.brandKit.colors, primary: e.target.value}}})} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Accent Color</Label>
                                    <Input type="text" placeholder="#FFFFFF" value={draft.brandKit.colors.accent} onChange={(e) => updateDraft({ brandKit: {...draft.brandKit, colors: {...draft.brandKit.colors, accent: e.target.value}}})} />
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
                                 <Button variant="outline" onClick={nextStep}>Skip for now</Button>
                                 <Button onClick={handleSaveBrand}>Save Brand</Button>
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
                            <Button onClick={nextStep}>Continue</Button>
                        </CardFooter>
                    </Card>
                );
             case 7:
                 return (
                    <Card className="text-center">
                        <CardHeader>
                             <div className="mx-auto w-fit p-4 bg-primary/10 text-primary rounded-full mb-4">
                                <Sparkles className="h-10 w-10" />
                             </div>
                            <StepHeader title="You're all set. Choose your starting plan." />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">Your brand and project library are ready. You can start for free or pick a plan.</p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="text-left bg-muted/50 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Student</CardTitle>
                                        <CardDescription>Learn & build, free domain included.</CardDescription>
                                        <Button className="mt-2" variant="outline">Start Student</Button>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left border-primary bg-primary/20 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-primary">Seller</CardTitle>
                                        <CardDescription className="text-primary/80">Publish ready, upgrade later.</CardDescription>
                                        <Button className="mt-2">Start Seller</Button>
                                    </CardHeader>
                                </Card>
                                 <Card className="text-left bg-muted/50 text-center">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Marketer</CardTitle>
                                        <CardDescription>Run ads, automations & targeting.</CardDescription>
                                         <Button className="mt-2" variant="outline">Start Marketer</Button>
                                    </CardHeader>
                                </Card>
                            </div>
                             <p className="text-xs text-muted-foreground">You can always change your plan later. No charges until you confirm.</p>
                        </CardContent>
                        <CardFooter>
                           <Button onClick={finishOnboarding} className="w-full md:w-auto mx-auto" variant="secondary">Finish Setup & Go to Dashboard</Button>
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

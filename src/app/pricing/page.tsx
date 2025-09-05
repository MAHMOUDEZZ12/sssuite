
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import { Switch } from '@/components/ui/switch';

const pricingTiers = [
    {
        name: 'Pay as you go',
        price: '$12',
        description: 'Perfect for occasional use with full access to core tools.',
        features: [
            '50 AI generations',
            `Access to all ${tools.length} core AI tools`,
            'Per-project pricing',
            'Community support',
        ],
        cta: 'Get Started',
        variant: 'outline'
    },
    {
        name: 'Super',
        price: '$99',
        pricePeriod: '/ month',
        description: 'The ultimate toolkit for serious agents and small teams.',
        features: [
            'Trainable AI Assistant',
            `Access to all ${tools.length} AI tools`,
            'Unlimited projects',
            '10,000 AI generations per month',
            'Connect social & email accounts',
            'Priority email support',
        ],
        cta: 'Start Your Super Trial',
        variant: 'default',
        isFeatured: true
    },
    {
        name: 'Enterprise',
        price: 'Starting from $189',
        pricePeriod: '/ month',
        description: 'For large brokerages and teams needing advanced features.',
        features: [
            'Everything in Super, plus:',
            '4 users access',
            'Trainable AI Agent',
            'Team management & billing',
            'Advanced security & compliance',
            'Custom integrations (API access)',
            'Dedicated account manager',
            'Onboarding & training',
        ],
        cta: 'Contact Sales',
        variant: 'outline'
    }
]


export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Find the Plan That's Right for You
          </h1>
           <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Choose a plan that fits your needs and start closing more deals today. Simple, transparent pricing with no hidden fees.
          </p>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-12">
            <span className={cn("font-medium", !isAnnual && "text-primary")}>Monthly</span>
            <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                aria-label="Toggle annual pricing"
            />
            <span className={cn("font-medium", isAnnual && "text-primary")}>
                Annual (Save 30%)
            </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {pricingTiers.map((tier) => (
                 <Card 
                    key={tier.name}
                    className={cn(
                        "flex flex-col h-full",
                        tier.isFeatured && "border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/20"
                    )}
                 >
                    <CardHeader className="h-48">
                        {tier.isFeatured && (
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Star className="h-5 w-5 text-primary" />
                                <p className="font-semibold text-primary">Most Popular</p>
                            </div>
                        )}
                        <CardTitle className="text-3xl font-heading text-center">{tier.name}</CardTitle>
                        <CardDescription className="text-center">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                       <div className="text-center mb-8 h-20">
                          <span className="text-5xl font-bold">
                             {tier.name === 'Super' ? (isAnnual ? '$69' : '$99') : tier.price}
                          </span>
                          {tier.pricePeriod && <span className="text-muted-foreground">{tier.pricePeriod}</span>}
                           {tier.name === 'Super' && isAnnual && (
                            <p className="text-sm text-muted-foreground">billed annually</p>
                          )}
                       </div>
                       <ul className="space-y-4 text-foreground/80">
                         {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary" />
                                <span>{feature}</span>
                            </li>
                         ))}
                       </ul>
                    </CardContent>
                    <CardFooter>
                       <Link href="/signup" className="w-full">
                           {tier.isFeatured ? (
                                <ShinyButton className="w-full">{tier.cta}</ShinyButton>
                           ) : (
                                <Button className="w-full" variant={tier.variant as any}>{tier.cta}</Button>
                           )}
                       </Link>
                    </CardFooter>
                 </Card>
            ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

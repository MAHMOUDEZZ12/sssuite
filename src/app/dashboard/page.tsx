
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, Target, Palette, Share2, LineChart, Briefcase, Bot, Home, Building, Megaphone, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';

const workflowSteps = [
    {
        title: "The Ground",
        description: "First, set up your foundation. Add your brand assets and define your target projects and markets.",
        icon: <Building className="h-8 w-8" />,
        links: [
            { href: "/dashboard/brand", text: "Setup Brand & Assets" },
            { href: "/dashboard/tool/projects-finder", text: "Build Project Library" },
        ]
    },
    {
        title: "The Factory",
        description: "Next, generate your creative. Create ads, social content, landing pages, and more from your library.",
        icon: <Megaphone className="h-8 w-8" />,
        links: [
            { href: "/dashboard/marketing", text: "Go to Marketing Suite" },
        ]
    },
    {
        title: "The Market",
        description: "Then, launch your campaigns. Target the right buyers and distribute your message across platforms.",
        icon: <Target className="h-8 w-8" />,
        links: [
            { href: "/dashboard/tool/meta-ads-copilot", text: "Launch Meta Campaign" },
            { href: "/dashboard/tool/audience-creator", text: "Find Target Audience" },
        ]
    },
    {
        title: "The Close",
        description: "Finally, manage your pipeline. Track leads, nurture client relationships, and close more deals.",
        icon: <Users className="h-8 w-8" />,
        links: [
            { href: "/dashboard/leads", text: "Manage Leads (CRM)" },
            { href: "/dashboard/clients", text: "View Client Pages" },
        ]
    },
]

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to Gemin"
        description="This is your intelligent ground. Follow the workflow to get started."
        icon={<Home className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {workflowSteps.map((step, index) => (
            <Card key={step.title} className="flex flex-col">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit shrink-0">
                            {step.icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-primary">Step {index + 1}</p>
                            <CardTitle className="text-2xl font-heading">{step.title}</CardTitle>
                        </div>
                    </div>
                    <CardDescription className="pt-4">{step.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <div className="flex flex-col w-full gap-2">
                        {step.links.map(link => (
                             <Link href={link.href} key={link.href}>
                                <Button variant="outline" className="w-full justify-between">
                                    {link.text}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                             </Link>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}

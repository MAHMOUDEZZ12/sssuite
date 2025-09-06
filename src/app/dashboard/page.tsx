

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate, Briefcase, Bot } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

export default function DashboardPage() {

  return (
    <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to Gemin"
        description="This is your intelligent ground. Select a service to begin."
        icon={<Home className="h-8 w-8" />}
      />

        <div>
            <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                Popular Tools
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.filter(t => ['ad-creation', 'rebranding', 'social-posts', 'landing-pages', 'market-reports', 'pdf-editor'].includes(t.id)).map(tool => (
                     <DashboardServiceCard 
                        key={tool.id}
                        title={tool.title}
                        description={tool.description}
                        href={`/dashboard/tool/${tool.id}`}
                        guideHref={`/blog/${tool.id}`}
                        icon={tool.icon}
                        color={tool.color}
                    />
                ))}
             </div>
        </div>
    </main>
  );
}

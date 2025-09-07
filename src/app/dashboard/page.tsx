
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
  const popularTools = tools.filter(t => ['insta-ads-designer', 'rebranding', 'instagram-content-creator', 'landing-pages', 'market-reports', 'pdf-editor'].includes(t.id));


  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to Gemin"
        description="This is your intelligent ground. Select a service to begin."
        icon={<Home className="h-8 w-8" />}
      />

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading tracking-tight">
            Popular Tools
          </h2>
           <Link href="/dashboard/marketing">
              <Button variant="ghost">View All Tools <ArrowRight className="ml-2 h-4 w-4"/></Button>
           </Link>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map(tool => (
                 <DashboardServiceCard 
                    key={tool.id}
                    title={tool.dashboardTitle || tool.title}
                    description={tool.description}
                    href={tool.isPage ? `/dashboard/tool/${tool.id}` : `/dashboard/tool/${tool.id}`}
                    guideHref={`/blog/${tool.id}`}
                    icon={tool.icon}
                    color={tool.color}
                />
            ))}
         </div>
      </div>
    </div>
  );
}

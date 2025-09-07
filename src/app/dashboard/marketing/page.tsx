
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Megaphone } from 'lucide-react';
import { tools } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';

const marketingTools = tools.filter(t => 
    t.mindMapCategory === 'Marketing' || 
    t.categories.includes('Ads') || 
    t.categories.includes('Social & Comms') ||
    t.categories.includes('Lead Gen')
).filter(t => t.id !== 'superfreetime');

export default function MarketingDashboardPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Super Marketing Suite"
        description="Your command center for high-performance marketing campaigns."
        icon={<Megaphone className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marketingTools.map(tool => (
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
    </main>
  );
}

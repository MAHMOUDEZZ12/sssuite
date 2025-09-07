
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Puzzle } from 'lucide-react';
import { tools } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';

const marketingTools = tools.filter(t => 
    t.mindMapCategory === 'Marketing' || 
    t.categories.includes('Ads') || 
    t.categories.includes('Social & Comms') ||
    t.categories.includes('Lead Gen') ||
    t.categories.includes('Creative') ||
    t.categories.includes('Editing')
).filter(t => t.id !== 'superfreetime' && t.id !== 'ai-assistant');

const appsThatNeedConnection = [
    'meta-ads-copilot',
    'audience-creator',
    'insta-ads-designer',
    'instagram-admin-ai',
    'email-creator',
    'whatsapp-campaigns'
];

const connectionPlatform: {[key: string]: string} = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-campaigns': 'WhatsApp Business'
}

export default function MarketingDashboardPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Apps"
        description="Your command center for all AI-powered applications. Add apps to your workspace to get started."
        icon={<Puzzle className="h-8 w-8" />}
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
                connectionRequired={connectionPlatform[tool.id]}
            />
        ))}
      </div>
    </main>
  );
}

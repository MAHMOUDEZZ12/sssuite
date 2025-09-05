
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools } from '@/lib/tools-client';
import { IntegrationCard } from '@/components/ui/integration-card';
import { ServiceCard } from '@/components/ui/service-card';


export default function DashboardPage() {
  return (
    <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to the Super Seller Suite!"
        description="Get started by exploring some of our most powerful AI tools below."
        icon={<PlusCircle className="h-8 w-8" />}
      />

       <div>
            <IntegrationCard />
       </div>

        <div>
            <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                Ready to create?
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.slice(0,6).map(tool => (
                     <ServiceCard 
                        key={tool.id}
                        title={tool.title}
                        description={tool.description}
                        href={`/dashboard/tool/${tool.id}`}
                        guideHref={`/blog/${tool.id}`}
                    />
                ))}
             </div>
        </div>

    </main>
  );
}


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools } from '@/lib/tools-client';
import { IntegrationCard } from '@/components/ui/integration-card';
import { ServiceCard } from '@/components/ui/service-card';


const QuickStartCard = ({ title, description, icon, href, guideHref }: { title: string; description: string; icon: React.ReactNode; href: string; guideHref: string }) => (
    <Card className="group hover:border-primary/30 transition-colors hover:bg-card/80 flex flex-col">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                    {icon}
                </div>
                <CardTitle className='text-xl font-heading'>{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className='text-muted-foreground'>{description}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-3">
             <Link href={href}>
                <Button>Use Tool</Button>
            </Link>
             <Link href={guideHref}>
                <Button variant="link">Read Guide</Button>
            </Link>
        </CardFooter>
    </Card>
)


export default function DashboardPage() {
  return (
    <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to the Super Seller Suite!"
        description="Get started by exploring some of our most powerful AI tools below."
        icon={<PlusCircle className="h-8 w-8" />}
      />

       <div>
            <IntegrationCard
                title="Connect Your Accounts"
                description="Connect your social media and email accounts to enable the AI to work across your platforms. This unlocks features like automated post scheduling and CRM integration. Add your payment details to access all pro features."
                icon={<LinkIcon className='h-6 w-6' />}
                ctaHref='/dashboard/settings?tab=connections'
                ctaText='Go to Connection Settings'
            />
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

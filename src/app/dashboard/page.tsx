
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';

const QuickStartCard = ({ title, description, icon, href }: { title: string; description: string; icon: React.ReactNode; href: string; }) => (
    <Link href={href}>
        <Card className="group hover:border-primary/30 transition-colors hover:bg-card/80 cursor-pointer">
            <CardHeader className='flex-row items-center gap-4'>
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                    {icon}
                </div>
                <CardTitle className='text-xl font-heading'>{title}</CardTitle>
                 <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>{description}</p>
            </CardContent>
        </Card>
    </Link>
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
            <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                Ready to create?
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickStartCard 
                    title="Generate Ad Copy"
                    description="Create compelling ad copy and visuals from a simple property brochure."
                    icon={<Target className="h-6 w-6"/>}
                    href="/dashboard/tool/ad-creation"
                />
                 <QuickStartCard 
                    title="Rebrand a Brochure"
                    description="Instantly apply your branding to any developer's marketing materials."
                    icon={<Palette className="h-6 w-6"/>}
                    href="/dashboard/tool/rebranding"
                />
                 <QuickStartCard 
                    title="Write Social Posts"
                    description="Generate a week's worth of engaging social media content in seconds."
                    icon={<Share2 className="h-6 w-6"/>}
                    href="/dashboard/tool/social-posts"
                />
                  <QuickStartCard 
                    title="Market Report"
                    description="Generate a hyper-local market report to share with clients."
                    icon={<LineChart className="h-6 w-6"/>}
                    href="/dashboard/tool/market-reports"
                />
                 <QuickStartCard 
                    title="Create a Landing Page"
                    description="Instantly generate a beautiful, high-converting landing page for a listing."
                    icon={<LayoutTemplate className="h-6 w-6"/>}
                    href="/dashboard/tool/landing-pages"
                />
                 <QuickStartCard 
                    title="Edit a PDF"
                    description="Make changes to any PDF brochure with simple text commands."
                    icon={<PenTool className="h-6 w-6"/>}
                    href="/dashboard/tool/pdf-editor"
                />
             </div>
        </div>

        <div>
            <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                Unlock powerful automations
            </h3>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-4'>
                        <div className='p-3 bg-primary/10 text-primary rounded-lg'>
                           <Share2 className='h-6 w-6' />
                        </div>
                       <span className='font-heading'>Connect Your Accounts</span>
                    </CardTitle>
                    <CardDescription>
                        Connect your social media and email accounts to enable the AI to work across your platforms. This unlocks features like automated post scheduling and CRM integration. Add your payment details to access all pro features.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/settings?tab=connections">
                        <Button>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Go to Connection Settings
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>

    </main>
  );
}

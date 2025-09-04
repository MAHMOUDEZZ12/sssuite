
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Facebook, Instagram, Mail, MessageCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart } from 'lucide-react';
import Link from 'next/link';

const ConnectAccountCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="flex flex-col items-center justify-center p-6 text-center bg-card/50 border-primary/10">
    <div className="mb-4 text-primary">{icon}</div>
    <h4 className="font-semibold text-lg mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-4">{children}</p>
    <Button variant="outline">
        <LinkIcon className="mr-2 h-4 w-4" />
        Connect
    </Button>
  </Card>
);

const QuickStartCard = ({ title, description, icon, href }: { title: string; description: string; icon: React.ReactNode; href: string; }) => (
    <Link href={href}>
        <Card className="group hover:border-primary/30 transition-colors hover:bg-card/80 cursor-pointer">
            <CardHeader className='flex-row items-center gap-4'>
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                    {icon}
                </div>
                <CardTitle className='text-xl'>{title}</CardTitle>
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
      <Card className='bg-gradient-to-br from-primary/10 via-card to-card border-primary/20'>
        <CardHeader>
          <CardTitle>Welcome to your Super Sales Suite!</CardTitle>
          <CardDescription>
            Get started by connecting your accounts. This will enable the AI to work across your platforms, saving you time and unlocking powerful automations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ConnectAccountCard icon={<Facebook className="h-10 w-10" />} title="Facebook">
                Connect your Facebook page to manage posts, comments, and run ad campaigns.
            </ConnectAccountCard>
             <ConnectAccountCard icon={<Instagram className="h-10 w-10" />} title="Instagram">
                Link your Instagram account for AI-powered DM responses and story creation.
            </ConnectAccountCard>
             <ConnectAccountCard icon={<Mail className="h-10 w-10" />} title="Google/Outlook">
                Allow access to your calendar and email for the CRM Memory Assistant.
            </ConnectAccountCard>
             <ConnectAccountCard icon={<MessageCircle className="h-10 w-10" />} title="WhatsApp">
                Enable direct client communication and automated campaign messages.
            </ConnectAccountCard>
        </CardContent>
      </Card>
      
        <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">
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
    </main>
  );
}

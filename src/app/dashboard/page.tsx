
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Facebook, Instagram, Mail, MessageCircle, Link as LinkIcon } from 'lucide-react';

const ConnectAccountCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="flex flex-col items-center justify-center p-6 text-center">
    <div className="mb-4 text-primary">{icon}</div>
    <h4 className="font-semibold text-lg mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-4">{children}</p>
    <Button variant="outline">
        <LinkIcon className="mr-2 h-4 w-4" />
        Connect
    </Button>
  </Card>
);


export default function DashboardPage() {
  return (
    <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
      <Card>
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
      
      <div className="flex flex-1 w-full items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[40vh]">
        <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
                Ready to create?
            </h3>
            <p className="text-sm text-muted-foreground">
                Select a tool from the sidebar or start a new project to begin.
            </p>
            <Button size="lg" className="mt-4">
                <PlusCircle className="mr-2 h-5 w-5" />
                Start a new project
            </Button>
        </div>
      </div>
    </main>
  );
}

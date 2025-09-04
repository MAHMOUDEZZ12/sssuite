
'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bot,
  Clapperboard,
  Database,
  FileText,
  Film,
  LayoutTemplate,
  LineChart,
  Mail,
  Megaphone,
  MessageSquare,
  Palette,
  PenTool,
  Phone,
  Share2,
  Target,
  UserCog,
  UserPlus,
  Users2,
  Video,
  Briefcase,
} from 'lucide-react';

const allTools = [
    { id: 'ad-creation', title: 'Instant Ad Creation', icon: <Megaphone /> },
    { id: 'targeting', title: 'Precision Targeting', icon: <Target /> },
    { id: 'rebranding', title: 'Automated Rebranding', icon: <Palette /> },
    { id: 'pdf-editor', title: 'PDF Smart Editor', icon: <PenTool /> },
    { id: 'landing-pages', title: 'Landing Page Generator', icon: <LayoutTemplate /> },
    { id: 'social-posts', title: 'Social Post Writer', icon: <Share2 /> },
    { id: 'story-designer', title: 'AI Story Designer', icon: <Film /> },
    { id: 'reel-designer', title: 'AI Reel Designer', icon: <Clapperboard /> },
    { id: 'tiktok-editor', title: 'TikTok Video Editor', icon: <Video /> },
    { id: 'page-admin', title: 'AI Page Admin', icon: <UserCog /> },
    { id: 'sales-master-chat', title: 'AI Sales Master Chat', icon: <MessageSquare /> },
    { id: 'crm-assistant', title: 'CRM Memory Assistant', icon: <Database /> },
    { id: 'lead-generation', title: 'Social Lead Generation', icon: <UserPlus /> },
    { id: 'market-reports', title: 'Market Trend Reports', icon: <LineChart /> },
    { id: 'investor-matching', title: 'Investor Matching', icon: <Users2 /> },
    { id: 'listing-generator', title: 'Listing Details Generator', icon: <FileText /> },
    { id: 'offer-generator', title: 'Multi-Project Offer Generator', icon: <Briefcase /> },
    { id: 'email-creator', title: 'Email Marketing Creator', icon: <Mail /> },
    { id: 'instagram-bot', title: 'Instagram Chat Bot', icon: <Bot /> },
    { id: 'whatsapp-campaigns', title: 'WhatsApp Campaign Manager', icon: <Phone /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {allTools.map((tool, index) => (
                <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton href="#" isActive={index === 0} tooltip={{children: tool.title}}>
                        {tool.icon}
                        <span>{tool.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage
                src="https://picsum.photos/100"
                alt="User"
                data-ai-hint="profile picture"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

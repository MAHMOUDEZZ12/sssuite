
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  ChevronRight,
  Contact,
  Brush,
  Star,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const marketingTools = [
  { id: 'ad-creation', title: 'Instant Ad Creation', icon: <Megaphone /> },
  { id: 'targeting', title: 'Precision Targeting', icon: <Target /> },
  { id: 'market-reports', title: 'Market Trend Reports', icon: <LineChart /> },
  { id: 'lead-generation', title: 'Social Lead Generation', icon: <UserPlus /> },
];

const designTools = [
  { id: 'rebranding', title: 'Automated Rebranding', icon: <Brush /> },
  { id: 'story-designer', title: 'AI Story Designer', icon: <Film /> },
  { id: 'reel-designer', title: 'AI Reel Designer', icon: <Clapperboard /> },
  { id: 'tiktok-editor', title: 'TikTok Video Editor', icon: <Video /> },
]

const contentTools = [
  { id: 'pdf-editor', title: 'PDF Smart Editor', icon: <PenTool /> },
  { id: 'listing-generator', title: 'Listing Details Generator', icon: <FileText /> },
  { id: 'landing-pages', title: 'Landing Page Generator', icon: <LayoutTemplate /> },
  { id: 'email-creator', title: 'Email Marketing Creator', icon: <Mail /> },
];

const socialMediaTools = [
    { id: 'social-posts', title: 'Social Post Writer', icon: <Share2 /> },
    { id: 'page-admin', title: 'AI Page Admin', icon: <UserCog /> },
    { id: 'instagram-bot', title: 'Instagram Chat Bot', icon: <Bot /> },
    { id: 'whatsapp-campaigns', title: 'WhatsApp Campaign Manager', icon: <Phone /> },
]

const salesTools = [
  { id: 'sales-master-chat', title: 'AI Sales Master Chat', icon: <MessageSquare /> },
  { id: 'crm-assistant', title: 'CRM Memory Assistant', icon: <Database /> },
  { id: 'investor-matching', title: 'Investor Matching', icon: <Users2 /> },
  { id: 'offer-generator', title: 'Multi-Project Offer Generator', icon: <Briefcase /> },
];


const SidebarMenuGroup = ({
  title,
  tools,
  isActive,
}: {
  title: string;
  tools: { id: string; title: string; icon: React.ReactNode }[];
  isActive?: boolean;
}) => (
  <Collapsible defaultOpen={isActive}>
    <CollapsibleTrigger asChild>
      <div className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-muted rounded-md">
        <span className="text-sm font-semibold">{title}</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-90" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenu className="pl-4 py-2">
        {tools.map((tool, index) => (
          <SidebarMenuItem key={tool.id}>
            <SidebarMenuButton href="#" isActive={isActive && index === 0} tooltip={{ children: tool.title }}>
              {tool.icon}
              <span>{tool.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </CollapsibleContent>
  </Collapsible>
);

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
            <div className='p-2'>
              <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary-foreground font-semibold border-2 border-primary/20">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" />
                  My Assistant
              </Button>
            </div>
          <div className="flex flex-col gap-2 p-2">
            <SidebarMenuGroup title="Marketing" tools={marketingTools} isActive />
            <SidebarMenuGroup title="Design Tools" tools={designTools} />
            <SidebarMenuGroup title="Content Tools" tools={contentTools} />
            <SidebarMenuGroup title="Social Media" tools={socialMediaTools} />
            <SidebarMenuGroup title="Sales & CRM" tools={salesTools} />
          </div>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex flex-col gap-2 p-2'>
                 <Separator className='mb-2' />
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Briefcase />
                            <span>My Projects</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Contact />
                            <span>Leads (CRM)</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Database />
                            <span>Data Storage</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Palette />
                            <span>My Brand</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Share2 />
                            <span>Connection</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#">
                            <Settings />
                            <span>Setting</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </div>
          <div className="flex items-center gap-3 p-2 pt-0">
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

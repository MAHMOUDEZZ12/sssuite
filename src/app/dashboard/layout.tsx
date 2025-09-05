
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  LifeBuoy,
  Server,
  BrainCircuit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { tools } from '@/lib/tools-client.tsx';
import { AssistantChat } from '@/components/assistant-chat';

const marketingTools = tools.filter(t => t.mindMapCategory === 'Marketing');
const creativeTools = tools.filter(t => t.mindMapCategory === 'Creative Suite');
const salesTools = tools.filter(t => t.mindMapCategory === 'Sales Enablement');
const socialTools = tools.filter(t => t.categories.includes('Social & Comms'));


const SidebarMenuGroup = ({
  title,
  tools,
}: {
  title: string;
  tools: { id: string; title: string; icon: React.ReactNode }[];
}) => {
    const pathname = usePathname();
    const isActive = tools.some(tool => pathname.endsWith(tool.id));
    
    return (
      <Collapsible defaultOpen={isActive}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-muted rounded-md group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">{title}</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-90" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="pl-4 py-2 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:py-0">
            {tools.map((tool) => (
              <SidebarMenuItem key={tool.id}>
                <Link href={`/dashboard/tool/${tool.id}`}>
                  <SidebarMenuButton isActive={pathname.endsWith(tool.id)} tooltip={{ children: tool.title }}>
                      {tool.icon}
                      <span className="group-data-[collapsible=icon]:hidden">{tool.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-2">
            <SidebarMenuGroup title="Marketing" tools={marketingTools} />
            <SidebarMenuGroup title="Creative Suite" tools={creativeTools} />
            <SidebarMenuGroup title="Sales & CRM" tools={salesTools} />
            <SidebarMenuGroup title="Social Media" tools={socialTools} />
          </div>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex flex-col gap-2 p-2'>
                 <Separator className='mb-2' />
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/dashboard/assistant">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/assistant')}>
                                <BrainCircuit />
                                <span className="group-data-[collapsible=icon]:hidden">Train Assistant</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <Separator />
                    <SidebarMenuItem>
                        <Link href="/dashboard/projects">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/projects')}>
                                <Briefcase />
                                <span className="group-data-[collapsible=icon]:hidden">My Projects</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/dashboard/leads">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/leads')}>
                                <Contact />
                                <span className="group-data-[collapsible=icon]:hidden">Leads (CRM)</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/dashboard/data">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/data')}>
                                <Database />
                                <span className="group-data-[collapsible=icon]:hidden">Data Storage</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <Link href="/dashboard/brand">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/brand')}>
                                <Palette />
                                <span className="group-data-[collapsible=icon]:hidden">My Brand</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                         <Link href="/dashboard/settings">
                            <SidebarMenuButton isActive={pathname.startsWith('/dashboard/settings')}>
                                <Settings />
                                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <Separator />
                     <SidebarMenuItem>
                        <Link href="/status">
                            <SidebarMenuButton>
                                <Server />
                                <span className="group-data-[collapsible=icon]:hidden">System Status</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <a href="mailto:support@supersalessuite.com">
                            <SidebarMenuButton>
                                <LifeBuoy />
                                <span className="group-data-[collapsible=icon]:hidden">Report an Issue</span>
                            </SidebarMenuButton>
                        </a>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </div>
            <Separator />
          <div className="flex items-center gap-3 p-2">
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
      <SidebarInset>
        {children}
        <AssistantChat />
      </SidebarInset>
    </SidebarProvider>
  );
}

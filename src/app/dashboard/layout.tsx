
'use client';

import * as React from 'react';
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
  Home,
  Briefcase,
  Palette,
  Database,
  Megaphone,
  Brush,
  Users2,
  BrainCircuit,
  Settings,
  Server,
  LifeBuoy,
  ChevronRight,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { tools } from '@/lib/tools-client.tsx';
import { AssistantChat } from '@/components/assistant-chat';
import { usePathname } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';

const marketingTools = tools.filter(t => t.mindMapCategory === 'Marketing');
const creativeTools = tools.filter(t => t.mindMapCategory === 'Creative Suite');
const salesTools = tools.filter(t => t.mindMapCategory === 'Sales Enablement');
const coreIntelTools = tools.filter(t => t.mindMapCategory === 'Core Intelligence');


const SidebarMenuGroup = ({
  title,
  icon,
  tools,
}: {
  title: string;
  icon: React.ReactNode;
  tools: { id: string; title: string; icon: React.ReactNode }[];
}) => {
    const pathname = usePathname();
    const isActive = tools.some(tool => pathname.endsWith(tool.id));
    
    return (
      <Collapsible defaultOpen={isActive}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-muted rounded-md group-data-[collapsible=icon]:hidden">
            <span className="flex items-center gap-2 text-sm font-semibold">
                {icon}
                {title}
            </span>
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
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard">
                      <SidebarMenuButton isActive={pathname === '/dashboard'}>
                          <Home />
                          <span className="group-data-[collapsible=icon]:hidden">Home</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/projects">
                      <SidebarMenuButton isActive={pathname.startsWith('/dashboard/projects')}>
                          <Briefcase />
                          <span className="group-data-[collapsible=icon]:hidden">Projects</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/brand">
                      <SidebarMenuButton isActive={pathname.startsWith('/dashboard/brand')}>
                          <Palette />
                          <span className="group-data-[collapsible=icon]:hidden">Brand & Assets</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/data">
                      <SidebarMenuButton isActive={pathname.startsWith('/dashboard/data')}>
                          <Database />
                          <span className="group-data-[collapsible=icon]:hidden">Storage</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
              <Separator />
            <SidebarMenuGroup title="Marketing" icon={<Megaphone/>} tools={marketingTools} />
            <SidebarMenuGroup title="Creative Suite" icon={<Brush />} tools={creativeTools} />
            <SidebarMenuGroup title="Sales Enablement" icon={<Users2 />} tools={salesTools} />
             <SidebarMenuGroup title="Core Intelligence" icon={<BrainCircuit />} tools={coreIntelTools} />
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
                                <span className="group-data-[collapsible=icon]:hidden">Your AI Assistant</span>
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
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <SidebarInset>
            {children}
            <AssistantChat />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

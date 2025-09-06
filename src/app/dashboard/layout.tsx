
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarInput,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Logo } from '@/components/logo';
import {
  Home,
  Megaphone,
  Brush,
  Users2,
  BrainCircuit,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { tools as allTools } from '@/lib/tools-client.tsx';
import { AssistantChat } from '@/components/assistant-chat';
import { usePathname } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';

const marketingTools = allTools.filter(t => t.mindMapCategory === 'Marketing');
const creativeTools = allTools.filter(t => t.mindMapCategory === 'Creative Suite');
const salesTools = allTools.filter(t => t.mindMapCategory === 'Sales Enablement');
const coreIntelTools = allTools.filter(t => t.mindMapCategory === 'Core Intelligence');

// Exclude tools that have their own page from the generic tool link
const tools = allTools.filter(t => !t.isPage);


const SidebarMenuGroup = ({
  title,
  icon,
  tools,
}: {
  title: string;
  icon: React.ReactNode;
  tools: { id: string; title: string; icon: React.ReactNode, isPage?: boolean }[];
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
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMarketingTools = marketingTools.filter(tool => tool.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCreativeTools = creativeTools.filter(tool => tool.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSalesTools = salesTools.filter(tool => tool.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCoreIntelTools = coreIntelTools.filter(tool => tool.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-2">
            <div className="relative group-data-[collapsible=icon]:hidden">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <SidebarInput 
                placeholder="Search tools..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard">
                      <SidebarMenuButton isActive={pathname === '/dashboard'}>
                          <Home />
                          <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/marketing">
                      <SidebarMenuButton isActive={pathname.startsWith('/dashboard/marketing')}>
                          <Megaphone />
                          <span className="group-data-[collapsible=icon]:hidden">Marketing Suite</span>
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
              <Separator />
            {filteredMarketingTools.length > 0 && <SidebarMenuGroup title="Marketing Tools" icon={<Megaphone/>} tools={filteredMarketingTools} />}
            {filteredCreativeTools.length > 0 && <SidebarMenuGroup title="Creative Suite" icon={<Brush />} tools={filteredCreativeTools} />}
            {filteredSalesTools.length > 0 && <SidebarMenuGroup title="Sales Enablement" icon={<Users2 />} tools={filteredSalesTools} />}
            {filteredCoreIntelTools.length > 0 && <SidebarMenuGroup title="Core Intelligence" icon={<BrainCircuit />} tools={filteredCoreIntelTools} />}
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
                 </SidebarMenu>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <AssistantChat />
      </SidebarInset>
    </SidebarProvider>
  );
}

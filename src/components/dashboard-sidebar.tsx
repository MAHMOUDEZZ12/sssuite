
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { Separator } from './ui/separator';
import { Home, Users, Building, Megaphone, Palette, Bot, LifeBuoy, Settings } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';
import { tools } from '@/lib/tools-client';

const mainNav = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/dashboard/projects', label: 'Projects', icon: Building },
  { href: '/dashboard/brand', label: 'Brand Kit', icon: Palette },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
];

const secondaryNav = [
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
];

const getToolFromPath = (path: string) => {
    if (!path.startsWith('/dashboard/tool/')) return null;
    const toolId = path.split('/')[3];
    return tools.find(t => t.id === toolId) || null;
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { addTab } = useTabManager();
  const router = useRouter();
  
  const handleNavigation = (href: string, label: string, e: React.MouseEvent) => {
      e.preventDefault();
      addTab({ href, label });
      router.push(href);
  }
  
  const renderToolItem = (tool: (typeof tools)[0]) => {
     const href = `/dashboard/tool/${tool.id}`;
     return (
        <SidebarMenuItem key={tool.id}>
             <Link href={href} passHref legacyBehavior>
                <SidebarMenuButton
                    onClick={(e) => handleNavigation(href, tool.title, e)}
                    isActive={pathname === href}
                    tooltip={tool.title}
                    className="justify-start"
                >
                    {React.cloneElement(tool.icon, {style: {color: tool.color}})}
                    <span>{tool.title}</span>
                </SidebarMenuButton>
             </Link>
        </SidebarMenuItem>
     )
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <p className="px-3 text-xs font-semibold text-muted-foreground tracking-wider mb-2 group-data-[collapsible=icon]:hidden">MAIN</p>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                     onClick={(e) => handleNavigation(item.href, item.label, e)}
                     isActive={pathname === item.href}
                     tooltip={item.label}
                     className="justify-start"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}

            <Separator className="my-4 group-data-[collapsible=icon]:hidden" />
            <p className="px-3 text-xs font-semibold text-muted-foreground tracking-wider mb-2 group-data-[collapsible=icon]:hidden">CREATIVE SUITE</p>
            {tools.filter(t => t.mindMapCategory === 'Creative Suite').map(renderToolItem)}

            <Separator className="my-4 group-data-[collapsible=icon]:hidden" />
            <p className="px-3 text-xs font-semibold text-muted-foreground tracking-wider mb-2 group-data-[collapsible=icon]:hidden">SALES ENABLEMENT</p>
            {tools.filter(t => t.mindMapCategory === 'Sales Enablement').map(renderToolItem)}
            
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                        <SidebarMenuButton
                            onClick={(e) => handleNavigation(item.href, item.label, e)}
                            isActive={pathname === item.href}
                            tooltip={item.label}
                            className="justify-start"
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


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
import { Home, Users, Building, Megaphone, Palette, Bot, Settings } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';

const mainNav = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/dashboard/projects', label: 'Projects', icon: Building },
  { href: '/dashboard/brand', label: 'Brand & Assets', icon: Palette },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
];

const secondaryNav = [
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { addTab } = useTabManager();
  const router = useRouter();
  
  const handleNavigation = (href: string, label: string, e: React.MouseEvent) => {
      e.preventDefault();
      addTab({ href, label });
      router.push(href);
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
                     isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                        <SidebarMenuButton
                            onClick={(e) => handleNavigation(item.href, item.label, e)}
                            isActive={pathname.startsWith(item.href)}
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

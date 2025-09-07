
'use client';

import * as React from 'react';
import { AssistantChat } from '@/components/assistant-chat';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardFooter } from '@/components/dashboard-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { TabProvider } from '@/context/TabManagerContext';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <SidebarProvider>
         <div className="flex flex-col min-h-screen">
          <DashboardHeader />
            <div className="flex flex-1">
              <DashboardSidebar />
              <SidebarInset>
                <main className="flex-1 overflow-y-auto">{children}</main>
              </SidebarInset>
            </div>
           <DashboardFooter />
           <AssistantChat />
         </div>
      </SidebarProvider>
    </TabProvider>
  );
}

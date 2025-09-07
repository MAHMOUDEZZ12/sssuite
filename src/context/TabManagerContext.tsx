
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { tools } from '@/lib/tools-client';

interface Tab {
  href: string;
  label: string;
}

interface TabManagerContextType {
  openTabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  removeTab: (href: string) => void;
}

const TabManagerContext = createContext<TabManagerContextType | undefined>(undefined);

const navMap: {[key: string]: string} = {
    '/dashboard': 'Home',
    '/dashboard/marketing': 'Marketing',
    '/dashboard/projects': 'Projects',
    '/dashboard/brand': 'Brand Kit',
    '/dashboard/clients': 'Clients',
    '/dashboard/assistant': 'AI Assistant',
    '/dashboard/settings': 'Settings',
    '/dashboard/support': 'Support',
};

const getLabelForPath = (path: string): string => {
    if (navMap[path]) return navMap[path];
    if (path.startsWith('/dashboard/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    return 'Page';
}


export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Add initial tab on load if it's a dashboard page
    if (pathname.startsWith('/dashboard')) {
        const initialTab = { href: pathname, label: getLabelForPath(pathname) };
        setOpenTabs([initialTab]);
        setActiveTab(initialTab);
    }
  }, []);

  useEffect(() => {
    // Sync active tab with current path
    const currentTab = openTabs.find(tab => tab.href === pathname);
    if (currentTab) {
        setActiveTab(currentTab);
    } else if (pathname.startsWith('/dashboard')) {
        // If the path is not in openTabs, add it
        addTab({ href: pathname, label: getLabelForPath(pathname) });
    }
  }, [pathname, openTabs]);


  const addTab = (newTab: Tab) => {
    setOpenTabs((prevTabs) => {
      // Prevent duplicates
      if (prevTabs.some(tab => tab.href === newTab.href)) {
        return prevTabs;
      }
      return [...prevTabs, newTab];
    });
  };

  const removeTab = (hrefToRemove: string) => {
    setOpenTabs((prevTabs) => prevTabs.filter((tab) => tab.href !== hrefToRemove));
  };

  const value = { openTabs, activeTab, addTab, removeTab };

  return (
    <TabManagerContext.Provider value={value}>
      {children}
    </TabManagerContext.Provider>
  );
};

export const useTabManager = () => {
  const context = useContext(TabManagerContext);
  if (context === undefined) {
    throw new Error('useTabManager must be used within a TabProvider');
  }
  return context;
};

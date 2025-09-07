
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LifeBuoy, LogOut, Settings, User, Search, Home, Megaphone, Building, Palette, Users, Bot, Menu } from "lucide-react";
import React from "react";
import { GlobalSearch } from "./ui/global-search";
import { useTheme } from "./theme-switcher";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Logo } from "./logo";
import { useTabManager } from "@/context/TabManagerContext";

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

export function DashboardHeader() {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { setTheme, themes } = useTheme();
    const { user, loading } = useAuth();
    const router = useRouter();
    const { addTab } = useTabManager();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/login');
    };
    
    const handleNavigation = (href: string, label: string, e: React.MouseEvent) => {
        e.preventDefault();
        addTab({ href, label });
        router.push(href);
    }

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
                <div className="flex items-center gap-4">
                    <Logo />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Menu className="h-4 w-4 mr-2" />
                          Menu
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {mainNav.map((item) => (
                            <Link href={item.href} key={item.href} passHref legacyBehavior>
                                <DropdownMenuItem onClick={(e: any) => handleNavigation(item.href, item.label, e)}>
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.label}
                                </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                         <DropdownMenuGroup>
                           {secondaryNav.map((item) => (
                            <Link href={item.href} key={item.href} passHref legacyBehavior>
                                <DropdownMenuItem onClick={(e: any) => handleNavigation(item.href, item.label, e)}>
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.label}
                                </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="flex flex-1 justify-center max-w-md">
                   <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setIsSearchOpen(true)}>
                     <Search className="mr-2 h-4 w-4" />
                     Search tools, projects, leads... (⌘K)
                   </Button>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User Avatar'} />
                                    <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user?.displayName || "My Account"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/dashboard/settings"><DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem></Link>
                             <a href="mailto:support@supersalessuite.com">
                                <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    Support
                                </DropdownMenuItem>
                             </a>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            {themes.map((t) => (
                                <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                                <t.icon className="mr-2 h-4 w-4" />
                                <span>{t.label}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                 <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <GlobalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        </>
    );
}

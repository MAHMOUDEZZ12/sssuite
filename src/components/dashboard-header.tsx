
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LifeBuoy, LogOut, Settings, User, Briefcase, Palette, UserPlus, Search } from "lucide-react";
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from "./theme-switcher";
import { Input } from "./ui/input";

export function DashboardHeader() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/dashboard/projects', label: 'Projects' },
        { href: '/dashboard/brand', label: 'Brand'},
        { href: '/dashboard/leads', label: 'Leads'},
    ];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-4">
                 <Link href="/dashboard" className="text-xl font-bold text-foreground/80 hover:text-foreground transition-colors">
                    AI Smart Ground
                 </Link>
            </div>
            
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects, leads, or tools..." className="pl-9" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href}>
                            <Button variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'} size="sm">
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </nav>
                
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Don's Avatar" />
                                <AvatarFallback>D</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Don's Account</DropdownMenuLabel>
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
                         <ThemeSwitcher />
                        <DropdownMenuSeparator />
                        <Link href="/login"><DropdownMenuItem>
                             <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem></Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

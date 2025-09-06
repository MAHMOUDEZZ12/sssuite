
'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LifeBuoy, LogOut, Settings, User } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="ml-auto flex items-center gap-4">
                <ThemeSwitcher />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User Avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard/brand"><DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile & Brand
                        </DropdownMenuItem></Link>
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

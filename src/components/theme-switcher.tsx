
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Laptop } from 'lucide-react';

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'theme-x3', label: 'System X3', icon: Laptop },
  { value: 'theme-darks1', label: 'Dark S1', icon: Laptop },
  { value: 'theme-lights2', label: 'Light S2', icon: Laptop },
  { value: 'theme-pinkpurple', label: 'Pink/Purple', icon: Laptop },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('theme-x3');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
        setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const ActiveIcon = themes.find(t => t.value === theme)?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ActiveIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
            <t.icon className="mr-2 h-4 w-4" />
            <span>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

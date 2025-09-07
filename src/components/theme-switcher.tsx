
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Laptop, Bot } from 'lucide-react';

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
  { value: 'theme-pinkpurple', label: 'Pink/Purple', icon: Bot },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
        setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Clear existing theme classes
    themes.forEach(t => root.classList.remove(t.value));
    
    let activeTheme = theme;
    if (theme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    root.classList.add(activeTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      {themes.map((t) => (
        <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
          <t.icon className="mr-2 h-4 w-4" />
          <span>{t.label}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
}

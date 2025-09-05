
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Component, Wind, BrainCircuit, Rocket, Zap, Puzzle, Copy } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';


const technologies = [
  {
    name: 'Next.js & React',
    description: 'The application is built using the Next.js App Router for optimal performance, server-side rendering, and a modern React framework.',
    icon: <Component className="h-8 w-8" />,
  },
  {
    name: 'Tailwind CSS & ShadCN UI',
    description: 'Styling is handled by Tailwind CSS for utility-first design, with a component library built on top of ShadCN UI for a consistent and professional look and feel.',
    icon: <Wind className="h-8 w-8" />,
  },
  {
    name: 'Genkit & Google AI',
    description: 'All AI capabilities are powered by Genkit, an open-source framework from Google that simplifies building production-ready AI flows, integrated with Gemini models.',
    icon: <BrainCircuit className="h-8 w-8" />,
  },
];

export default function TechnologyPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader 
            icon={<Zap className="h-8 w-8" />}
            title="Technology Stack"
            description="The modern, robust, and scalable technologies we use to power the Super Seller Suite."
        />

        <section className='mt-12'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">{tech.icon}</div>
                  <CardTitle className="text-2xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}

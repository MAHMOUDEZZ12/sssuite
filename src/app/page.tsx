import Image from "next/image";
import React from 'react';
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Rocket,
  Scan,
  Share2,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container text-center">
            <Badge variant="outline" className="mb-4 bg-card font-semibold">Super Sales AI Suite</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
              Unlock Your Real Estate Potential with AI
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80">
              Treble S AI is the ultimate sales suite, empowering agents to create stunning marketing campaigns, target the right audience, and close more deals—no tech expertise required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-card">
                See a Demo
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full bg-background [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.7),rgba(255,255,255,0))]">
            <Image
              src="https://picsum.photos/1920/1080"
              alt="Modern architecture"
              data-ai-hint="modern architecture"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">A Cloud of Tools for the Modern Agent</h2>
              <p className="mt-4 text-foreground/70">From ad creation to lead generation, Treble S AI automates your marketing so you can focus on selling.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <Bot />, title: "AI-Powered Ad Generation", description: "Instantly create compelling ad copy and visuals from your project details. Let AI find the perfect words and images." },
                { icon: <Target />, title: "Intelligent Targeting", description: "Our AI analyzes your project to suggest the most effective audience targeting options on social media." },
                { icon: <Palette />, title: "AI Brochure Rebranding", description: "Upload a brochure and watch as AI rebrands it with your logo, colors, and contact info in seconds." },
                { icon: <LayoutTemplate />, title: "Landing Page Generator", description: "Generate beautiful, high-converting landing pages for your projects or your personal brand automatically." },
                { icon: <Share2 />, title: "Social Media Integration", description: "Connect your social accounts and let our platform guide you from ad creation to campaign launch seamlessly." },
                { icon: <FileUp />, title: "Effortless Asset Creation", description: "Just upload a brochure and project links. Our AI builds a complete set of marketing materials for you." }
              ].map((feature, i) => (
                <Card key={i} className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      {React.cloneElement(feature.icon, { className: "h-6 w-6" })}
                    </div>
                    <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">Launch a Campaign in 3 Simple Steps</h2>
                    <p className="mt-4 text-foreground/70">Our guided process makes digital marketing accessible to everyone.</p>
                </div>
                <div className="relative mt-16">
                    <div className="absolute left-1/2 top-10 hidden h-full w-px -translate-x-1/2 border-l-2 border-dashed border-border md:block" />
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                                <FileUp className="h-10 w-10"/>
                            </div>
                            <h3 className="mt-6 font-headline text-xl font-bold">1. Add Project Details</h3>
                            <p className="mt-2 text-foreground/70">Upload your project brochure, add links, and specify your focus. The more details, the better the AI performs.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                                <Scan className="h-10 w-10"/>
                            </div>
                            <h3 className="mt-6 font-headline text-xl font-bold">2. Generate &amp; Refine</h3>
                            <p className="mt-2 text-foreground/70">Treble S AI instantly creates rebranded brochures, ad copy, designs, and landing pages for your review.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                                <Rocket className="h-10 w-10"/>
                            </div>
                            <h3 className="mt-6 font-headline text-xl font-bold">3. Launch Your Ad</h3>
                            <p className="mt-2 text-foreground/70">With a few clicks, push your perfectly crafted and targeted ad live on your connected social media accounts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">Trusted by Agents Everywhere</h2>
              <p className="mt-4 text-foreground/70">Hear what real estate professionals are saying about Treble S AI.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {[
                { name: "Jessica M.", role: "Top-Producing Agent", testimonial: "Treble S AI has been a game-changer. I launched a campaign for a new luxury condo and got 20 qualified leads in the first week. I never thought I could do my own digital marketing.", avatar: "https://picsum.photos/100/100" },
                { name: "David Chen", role: "Boutique Brokerage Owner", testimonial: "The brochure rebranding tool alone is worth the price. My team saves hours on every new listing, and our materials have never looked more professional. It's an indispensable part of our workflow.", avatar: "https://picsum.photos/101/101" }
              ].map((t, i) => (
                <Card key={i} className="bg-card">
                  <CardContent className="pt-6">
                    <p className="italic text-foreground/80">"{t.testimonial}"</p>
                    <div className="mt-4 flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={t.avatar} alt={t.name} data-ai-hint="person face" />
                        <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-headline font-semibold">{t.name}</p>
                        <p className="text-sm text-foreground/60">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">Ready to Treble Your Sales?</h2>
            <p className="mx-auto mt-4 text-lg text-foreground/80">
              Join hundreds of agents transforming their business with the power of AI. Get started today and see the difference.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="#">
                  Sign Up for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}


import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <article className="prose prose-invert max-w-none text-foreground/80">
          <header className="mb-12 text-center">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                Privacy Policy
            </h1>
            <p className="text-lg text-foreground/60">Last updated: {new Date().toLocaleDateString()}</p>
          </header>

          <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
            <CardContent className="p-8 md:p-10 space-y-6">
                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to Super Seller Suite. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>
                </section>
                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and contact information that you voluntarily give to us when you register with the Service.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</li>
                        <li><strong>Data from Social Networks:</strong> User information from social networking sites, such as Facebook, Instagram, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.</li>
                    </ul>
                </section>
                 <section>
                    <h2>3. Use of Your Information</h2>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Enable user-to-user communications.</li>
                        <li>Generate a personal profile about you to make future visits to the Service more personalized.</li>
                        <li>Increase the efficiency and operation of the Service.</li>
                    </ul>
                </section>
                 <section>
                    <h2>4. Security of Your Information</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                </section>
                 <section>
                    <h2>5. Contact Us</h2>
                    <p>If you have questions or comments about this Privacy Policy, please contact us at: support@supersellersuite.com</p>
                </section>
            </CardContent>
          </Card>
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}

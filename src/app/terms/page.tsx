
import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <article className="prose prose-invert max-w-none text-foreground/80">
           <header className="mb-12 text-center">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                Terms of Service
            </h1>
            <p className="text-lg text-foreground/60">Last updated: {new Date().toLocaleDateString()}</p>
          </header>
          
          <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
            <CardContent className="p-8 md:p-10 space-y-6">
                <section>
                    <h2>1. Agreement to Terms</h2>
                    <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the Site or through other communications.</p>
                </section>
                <section>
                    <h2>2. Intellectual Property Rights</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Super Seller Suite and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Super Seller Suite.</p>
                </section>
                 <section>
                    <h2>3. User Content</h2>
                    <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
                    <p>By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</p>
                </section>
                 <section>
                    <h2>4. Termination</h2>
                    <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                </section>
                <section>
                    <h2>5. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
                </section>
            </CardContent>
          </Card>
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}

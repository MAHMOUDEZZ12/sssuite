
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <article className="prose prose-lg dark:prose-invert">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">Last updated: July 26, 2024</p>

          <h2>1. Agreement to Terms</h2>
          <p>By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.</p>

          <h2>2. Privacy Policy</h2>
          <p>Please refer to our <Link href="/privacy">Privacy Policy</Link> for information on how we collect, use and disclose information from our users.</p>

          <h2>3. Changes to Terms or Services</h2>
          <p>We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the updated Terms on the Site or through other communications. It’s important that you review the Terms whenever we update them or you use the Services.</p>

          <h2>4. Who May Use the Services?</h2>
          <p>You may use the Services only if you are 18 years or older and capable of forming a binding contract with Super Seller Suite, and not otherwise barred from using the Services under applicable law.</p>

          <h2>5. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@superseller.ai">support@superseller.ai</a>.</p>
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}


import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CookieConsent } from '@/components/cookie-consent';

const fontSans = PT_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});
const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Super Seller Suite: Your AI Co-Pilot for Real Estate',
  description: 'The AI-powered suite for real estate agents. Generate ads, target buyers, rebrand brochures, and close deals faster. Your new co-pilot for sales and marketing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontHeading.variable
      )}>
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}

    
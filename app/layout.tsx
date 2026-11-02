import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'BartaGuard (বার্তাগার্ড) — বোঝার আগে বিশ্বাস নয় | AI Consumer Digital Safety',
  description: 'Bangla-first AI digital safety assistant helping consumers identify suspicious messages, phishing attempts, impersonation, fake recruitment, and fraudulent payment requests.',
  keywords: [
    'BartaGuard',
    'বার্তাগার্ড',
    'AI Digital Safety',
    'Phishing Detector',
    'bKash scam detection',
    'Cybersecurity Bangladesh',
    'Ostad AIgnite Buildathon 2026',
    'Bangla Scam Detector'
  ],
  authors: [{ name: 'BartaGuard Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'BartaGuard (বার্তাগার্ড) — Understand Before You Trust',
    description: 'Protect yourself from suspicious messages and payment scams with real-time AI security analysis.',
    type: 'website',
  }
};

export const viewport: Viewport = {
  themeColor: '#0B1020',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="dark">
      <body className="min-h-screen bg-[#0B1020] text-slate-100 antialiased selection:bg-violet-600/30 selection:text-violet-200">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

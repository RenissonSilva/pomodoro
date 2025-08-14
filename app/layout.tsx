import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.example.com'),
  title: {
    default: 'Pomodoro Online Grátis | FocusZen',
    template: '%s • FocusZen',
  },
  description: 'Cronômetro Pomodoro online com PWA e foco em produtividade.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pomodoro Online Grátis | FocusZen',
    description: 'Timer Pomodoro online com PWA e foco em produtividade.',
    url: process.env.SITE_URL || 'https://www.example.com',
    siteName: 'FocusZen',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className='min-h-screen flex flex-col'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'FocusZen',
              url: process.env.SITE_URL || 'https://www.example.com',
            }),
          }}
        />
        <Header />
        <main className='container-prose flex-1 py-8'>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

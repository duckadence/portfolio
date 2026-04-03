import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { IBM_Plex_Mono, Inter, Space_Mono } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

import PageAnimate from './components/page-animate'; // Import the new component
const cx = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-univers-alt',
})

const activeFont = ibmPlexMono;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'home',
    template: '%s',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-slate-900 bg-[#f9fafb] dark:text-slate-100 dark:bg-[#0a0a0c]',
        activeFont.variable,
        activeFont.className
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <PageAnimate>
            {children}
<Footer />
          </PageAnimate> 
        </main>
      </body>
    </html>
  );
}


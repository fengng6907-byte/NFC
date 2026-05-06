import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gold Dutchy — Split Smarter, Settle Faster',
    template: '%s | Gold Dutchy',
  },
  description:
    'The intelligent expense-sharing platform for friends, trips, roommates & teams. Beautiful balance tracking with AI-powered categorization.',
  keywords: 'expense sharing, split bills, group expenses, money tracking, settle debts',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://gold-dutchy.vercel.app'),
  openGraph: {
    title:       'Gold Dutchy — Split Smarter, Settle Faster',
    description: 'Expense sharing with AI categorization, visual debt graphs & gamification.',
    type:        'website',
    siteName:    'Gold Dutchy',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Gold Dutchy — Split Smarter, Settle Faster',
  },
}

export const viewport: Viewport = {
  themeColor:    '#0D1B2A',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#F5F4F0] text-[#0D1B2A] font-sans">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: '14px',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                },
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

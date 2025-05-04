import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sensory | Spa & Barber Experience',
  description: 'Relax. Refresh. Rejuvenate. Book your spa and grooming experience at Sensory.',
  keywords: ['spa', 'barber', 'pedicure', 'facial', 'grooming', 'beauty', 'Sensory'],
  authors: [{ name: 'Sensory Team' }],
  openGraph: {
    title: 'Sensory Spa & Barber',
    description: 'The ultimate relaxation and grooming destination.',
    url: 'https://www.sensoryspa.com', // Update later when hosted
    siteName: 'Sensory Spa',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} font-sans antialiased bg-white text-gray-800`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


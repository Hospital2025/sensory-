import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sensory | Spa & Barber in Eldoret, Langas',
  description:
    'Relax, refresh, and rejuvenate at Sensory Spa & Barber — the premium grooming and spa destination in Langas, Eldoret.',
  keywords: [
    'spa in Eldoret',
    'barber in Langas',
    'pedicure Eldoret',
    'facial Langas',
    'grooming Eldoret',
    'Sensory spa',
    'Uasin Gishu beauty',
    'spa near me',
    'barbershop near me',
  ],
  authors: [{ name: 'Sensory Team' }],
  openGraph: {
    title: 'Sensory Spa & Barber in Langas, Eldoret',
    description:
      'Premium spa and grooming experience in Eldoret, Langas — book now for a relaxing time!',
    url: 'https://sensoryspa1.netlify.app/',
    siteName: 'Sensory Spa',
    locale: 'en_KE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sensory Spa & Barber",
              "image": "https://sensoryspa1.netlify.app/sensory.jpg", // Replace with actual image
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Langas",
                "addressLocality": "Eldoret",
                "addressRegion": "Uasin Gishu",
                "postalCode": "30100",
                "addressCountry": "KE"
              },
              "url": "https://sensoryspa1.netlify.app",
              "telephone": "0722110013", // Replace with real phone number
              "priceRange": "Ksh 300 - 5000",
              "openingHours": "Mo-Su 09:00-19:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -0.5143,
                "longitude": 35.2698
              },
              "sameAs": [
                "https://www.facebook.com/sensoryspa",
                "https://www.instagram.com/sensoryspa"
              ]
            }),
          }}
        />
      </Head>
      <body className={`${playfair.variable} font-sans antialiased bg-white text-gray-800`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


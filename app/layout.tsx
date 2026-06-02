import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// next/font descarga las fuentes en BUILD TIME y las sirve desde nuestro
// propio dominio. Beneficios:
//  1. Sin requests a fonts.googleapis.com → Google ya no ve la IP de cada
//     visitante (cumplimiento RGPD, ver caso DSGVO Alemania 2022).
//  2. Sin third-party que pueda ser comprometida → CSP puede ser estricta.
//  3. Performance: una conexión DNS menos, fuentes self-hosted con
//     Cache-Control immutable.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://citaliaapp.com'),
  title: {
    default: 'Citalia — Agente IA para Clínicas de Medicina Estética',
    template: '%s | Citalia',
  },
  description:
    'El primer agente de IA especializado en medicina estética que convierte mensajes de WhatsApp e Instagram en pacientes, 24/7. Primer mes gratis. Activo en 48h.',
  // Keywords pensadas para lo que busca una doctora/directora de clínica,
  // no para vocabulario de marketing/ventas.
  keywords: [
    'agente IA medicina estética',
    'chatbot clínica estética',
    'whatsapp bot medicina estética',
    'captar pacientes whatsapp',
    'responder mensajes whatsapp clínica',
    'automatizar consultas clínica estética',
    'inteligencia artificial clínica',
    'asistente virtual clínica estética',
  ],
  authors: [{ name: 'Citalia', url: 'https://citaliaapp.com' }],
  creator: 'Citalia',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://citaliaapp.com',
    siteName: 'Citalia',
    title: 'Citalia — Tu clínica vende mientras tú duermes',
    description:
      'Agente IA especializado en medicina estética. Convierte mensajes de WhatsApp e Instagram en pacientes a cualquier hora. Primer mes gratis.',
    // La imagen OG la genera /app/opengraph-image.tsx automáticamente.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Citalia — Tu clínica vende mientras tú duermes',
    description:
      'Agente IA especializado en medicina estética. Convierte mensajes de WhatsApp en pacientes 24/7.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // Bloquea formatos legacy de detección de número de teléfono en iOS Safari
  // que pueden reescribir contenido en runtime.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema.org. Contenido 100% estático y controlado por el
            código fuente: no hay user-input que pueda escapar a este bloque,
            por lo que dangerouslySetInnerHTML es seguro aquí. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Citalia',
              applicationCategory: 'BusinessApplication',
              description:
                'Agente de IA conversacional especializado en medicina estética. Atiende mensajes por WhatsApp e Instagram 24/7.',
              offers: {
                '@type': 'Offer',
                price: '349',
                priceCurrency: 'EUR',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  billingDuration: 'P1M',
                },
              },
              provider: {
                '@type': 'Organization',
                name: 'Citalia',
                url: 'https://citaliaapp.com',
                areaServed: {
                  '@type': 'Country',
                  name: 'España',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  email: 'hola@citaliaapp.com',
                  availableLanguage: 'Spanish',
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { LanguageProvider } from '../i18n/i18n'
import '../index.css'
import '../components/MouseGlow/MouseGlow.css'

export const metadata: Metadata = {
  title: 'João Vitor Lopes — Dev & Founder',
  description: 'João Vitor Lopes — Desenvolvedor Fullstack com mentalidade de produto. Criador do Ordemo, Chamou e Optic.',
  openGraph: {
    title: 'João Vitor Lopes — Dev & Founder',
    description: 'Construo produtos digitais do zero — da arquitetura ao deploy.',
    type: 'website',
  },
}

import MouseGlow from '../components/MouseGlow/MouseGlow'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/fav.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MouseGlow />
        <LanguageProvider>
            {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

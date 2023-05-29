import { ReactNode } from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Receita Inteligente',
  description: 'Encontre receitas de acordo com os ingredientes que você tem',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KQREF7TBQQ"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KQREF7TBQQ');
        `}
      </Script>
    </html>
  )
}

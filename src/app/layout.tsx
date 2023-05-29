import { ReactNode } from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
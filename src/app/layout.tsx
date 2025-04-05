import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import { ReactNode } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'UploadIt',
  description: 'UploadIt - The only storage solution you need.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} font-poppins antialiased`} cz-shortcut-listen='true'>
        <NextTopLoader color='rgb(var(--brand-color))' />
        {children}
      </body>
    </html>
  )
}

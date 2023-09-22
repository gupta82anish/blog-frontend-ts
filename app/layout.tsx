import UserContextProvider from '@/contexts/user-context'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Basic Blog Posts',
  description: 'Made by Anish Gupta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <Navbar />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
            {children}
          </div>
        </UserContextProvider>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Travel Planner',
  description: 'Plan your next adventure with our travel planner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <TopBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

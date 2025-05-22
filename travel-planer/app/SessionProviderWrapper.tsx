'use client';
import { SessionProvider } from "next-auth/react";
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Planner',
  description: 'Plan your next adventure with our travel planner',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}

export function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
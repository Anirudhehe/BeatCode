import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NextAuthProvider } from "./providers"

export const metadata = {
  title: 'BeatCode',
  icons: {
    icon: [
      { url: 'C:/Users/aniru/Desktop/projects/beatcode/public/favicon.ico' },
      { url: '/icon.png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
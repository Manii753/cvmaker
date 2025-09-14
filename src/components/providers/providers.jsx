'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="cv-builder-theme"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
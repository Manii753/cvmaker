import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV Builder - Create Professional Resumes',
  description: 'Build professional resumes with our easy-to-use resume builder. Choose from multiple templates and export to PDF.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
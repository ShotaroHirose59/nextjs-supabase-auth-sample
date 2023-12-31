import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from './components/supabase-listener'
import { ColorSchemeScript } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Supabase Auth',
  description: 'Supabase Auth',
}

// レイアウト
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <div className="flex flex-col min-h-screen">
            <SupabaseListener />
            <main className="flex-1 container max-w-screen-lg mx-auto px-1 py-5">{children}</main>

            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © All rights reserved | FullStackChannel
              </div>
            </footer>
          </div>
        </MantineProvider>
      </body>
    </html>
  )
}

export default RootLayout
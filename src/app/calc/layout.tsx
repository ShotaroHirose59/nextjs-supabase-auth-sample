// app/layout.tsx
import { Providers } from '../providers'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (

    <Providers>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </Providers>
  )
}
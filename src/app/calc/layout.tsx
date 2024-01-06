import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

// const theme = createTheme({
//   /** Put your mantine theme override here */
//   colorScheme: 'dark',
// });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <main>{children}</main>
    </MantineProvider>
  )
}

export default Layout
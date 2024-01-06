import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

// const theme = createTheme({
//   /** Put your mantine theme override here */
//   colorScheme: 'dark',
// });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <main>{children}</main>
    </MantineProvider>
  )
}

export default Layout
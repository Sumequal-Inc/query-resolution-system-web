'use client';

import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define your theme only inside this file
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0070f3' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
});

theme = responsiveFontSizes(theme);

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

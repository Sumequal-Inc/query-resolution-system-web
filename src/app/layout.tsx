import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from './context/AuthContext';

export const metadata: Metadata = {
  title: 'Query Resolution System',
  description: 'Secure portal for admin and users',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add head elements like meta tags here if needed */}
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

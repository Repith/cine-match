import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import QueryProvider from '@/components/providers/QueryProvider';

const robotoFlex = localFont({
  src: './fonts/RobotoFlexVF.ttf',
  variable: '--font-base',
  weight: '100 900',
});
const exo2 = localFont({
  src: './fonts/Exo2VF.ttf',
  variable: '--font-header',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CineMatch',
  description: 'Application to get your movie date in one click!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${exo2.variable} ${robotoFlex.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider defaultTheme="system" enableSystem>
            <SessionProviderWrapper>
              <Navbar />
              {children}
            </SessionProviderWrapper>
          </ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

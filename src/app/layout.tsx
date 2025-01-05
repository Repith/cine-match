import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} ${robotoFlex.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

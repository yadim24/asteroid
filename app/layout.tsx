import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Armageddon',
  description: 'Care about asteroids',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

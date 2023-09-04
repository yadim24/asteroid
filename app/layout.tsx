import clsx from 'clsx';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { inter } from './fonts';
import './globals.css';
import styles from './layout.module.css';

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
      <body className={clsx(styles.body, inter.className)}>
        <QueryProvider>
          <main>
            <Image
              className={styles.earth}
              src="/zemlia_lg.png"
              alt="earth"
              width={400}
              height={620}
              priority
            />
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

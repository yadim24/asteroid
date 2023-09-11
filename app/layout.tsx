import clsx from 'clsx';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { CartState } from './CartState';
import { QueryProvider } from './QueryProvider';
import { inter, passionOne } from './fonts';
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
          <header className={styles['header-wrapper']}>
            <Link
              href="/"
              className={clsx(styles['logo-name'], passionOne.className)}
            >
              ARMAGEDDON 2023
            </Link>
            <div className={styles['logo-text']}>
              <p>ООО “Команда им. Б. Уиллиса”.</p>
              <p>Взрываем астероиды с 1998 года.</p>
            </div>
          </header>
          <main className={styles['main-wrapper']}>
            <Image
              className={styles.earth}
              src="/zemlia_lg.png"
              alt="earth"
              width={400}
              height={620}
              priority
            />
            <div className={styles.container}>
              <div className={styles['list-wrapper']}>
                <CartState>{children}</CartState>
              </div>
            </div>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

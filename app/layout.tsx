import clsx from 'clsx';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartState } from './_providers/CartState';
import { QueryProvider } from './_providers/QueryProvider';
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
          <div className={styles['main-footer-wrapper']}>
            <main className={styles['main-wrapper']}>
              <Image
                className={styles.earth}
                src="/zemlia_lg.png"
                alt="Earth"
                width={400}
                height={620}
                priority
              />
              <Image
                className={styles['earth-md']}
                src="/zemlia_md.png"
                alt="Earth"
                width={304}
                height={436}
                priority
              />
              <Image
                className={styles['earth-mobile']}
                src="/zemlia_mobile.png"
                alt="Earth"
                width={48}
                height={436}
                priority
              />
              <div className={styles.container}>
                <div className={styles['list-wrapper']}>
                  <CartState>{children}</CartState>
                </div>
              </div>
            </main>
            <footer className={styles.footer}>
              <p>© Все права и планета защищены</p>
            </footer>
          </div>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

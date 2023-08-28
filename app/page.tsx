import clsx from 'clsx';
import Image from 'next/image';
import { ReactElement } from 'react';
import { Arrow } from './_components/Arrow';
import { Button } from './_components/Button';
import { passionOne } from './fonts';
import styles from './page.module.css';

export default function Home(): ReactElement {
  return (
    <>
      <header className={styles['header-wrapper']}>
        <p className={clsx(styles['logo-name'], passionOne.className)}>
          ARMAGEDDON 2023
        </p>
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
            <h1 className={styles.header}>Ближайшие подлёты астероидов</h1>
            <div className={styles.units}>
              <Button mode="invisible" isPressed>
                в километрах
              </Button>{' '}
              | <Button mode="invisible">в лунных орбитах</Button>
            </div>
            <div className={styles.list}>
              <div className={styles.asteroid}>
                <h2 className={styles.date}>12 сент 2023</h2>
                <div className={styles['data-container']}>
                  <div>
                    <p>5 652 334 км</p>
                    <div className={styles['arrow-wrapper']}>
                      <Arrow />
                    </div>
                  </div>
                  <Image
                    src="/asteroid.png"
                    alt="asteroid"
                    width={22}
                    height={24}
                  />
                  <div>
                    <p className={styles['asteroid-name']}>2021 FQ</p>
                    <p className={styles.diameter}>Ø 85 м</p>
                  </div>
                </div>
                <div className={styles['order-container']}>
                  <Button mode="primary">ЗАКАЗАТЬ</Button>
                  <div className={styles['warning-container']}>
                    <Image
                      src="/warning.svg"
                      alt="warning"
                      height={20}
                      width={20}
                    />
                    <span className={styles.dangerous}>Опасен</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.basket}>
              <p className={styles['basket-header']}>Корзина</p>
              <p className={styles['basket-content']}>2 астероида</p>
              <Button mode="secondary">Отправить</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AsteroidData } from './AsteroidData';
import { Button } from './_components/Button';
import { Warning } from './_components/Warning';
import { AsteroidDataType, getAsteroids } from './getAsteroids';
import styles from './page.module.css';

export default function Home(): ReactElement {
  const [isLunar, setIsLunar] = useState(false);
  const [cart, setCart] = useState<AsteroidDataType[]>([]);
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getAsteroids'],
    queryFn: ({ pageParam }) => getAsteroids({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.links.next,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const formatQty = (qty: number): string => {
    switch (qty.toString().at(-1)) {
      case '1':
        return `${qty} астероид`;
      case '2':
      case '3':
      case '4':
        return `${qty} астероида`;
      default:
        return `${qty} астероидов`;
    }
  };

  const addToCart = (asteroid: AsteroidDataType): void => {
    if (cart.includes(asteroid)) return;

    setCart([...cart, asteroid]);
  };

  return (
    <>
      <h1 className={styles.header}>Ближайшие подлёты астероидов</h1>
      <div className={styles.units}>
        <Button
          mode="invisible"
          isPressed={!isLunar}
          onClick={(): void => setIsLunar(false)}
        >
          в километрах
        </Button>{' '}
        |{' '}
        <Button
          mode="invisible"
          isPressed={isLunar}
          onClick={(): void => setIsLunar(true)}
        >
          в лунных орбитах
        </Button>
      </div>
      <div>
        {data?.pages.map((page) => (
          <Fragment key={page.links.self}>
            {Object.values(page.near_earth_objects)
              .flat()
              .map((asteroid) => (
                <Fragment key={asteroid.id}>
                  <AsteroidData asteroid={asteroid} isLunar={isLunar} />
                  <div className={styles['order-container']}>
                    <Button mode="primary" onClick={() => addToCart(asteroid)}>
                      {cart.includes(asteroid) ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
                    </Button>
                    {asteroid.is_potentially_hazardous_asteroid && <Warning />}
                  </div>
                </Fragment>
              ))}
          </Fragment>
        ))}
        <Image
          ref={ref}
          className={styles.loader}
          src="/loader.gif"
          alt="loading..."
          width={160}
          height={20}
        />
      </div>
      <div className={styles.basket}>
        <p className={styles['basket-header']}>Корзина</p>
        {cart.length ? (
          <p className={styles['basket-content']}>{formatQty(cart.length)}</p>
        ) : (
          <>&nbsp;</>
        )}
        <Button mode="secondary">Отправить</Button>
      </div>
    </>
  );
}

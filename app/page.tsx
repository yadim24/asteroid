'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, ReactElement, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AsteroidData } from './AsteroidData';
import { GlobalStateContext } from './GlobalStateContext';
import { Button } from './_components/Button';
import { Warning } from './_components/Warning';
import { formatQty } from './_shared/formatQty';
import { AsteroidDataType, getAsteroids } from './getAsteroids';
import { invariant } from './invariant';
import styles from './page.module.css';

export default function Home(): ReactElement {
  const contextValue = useContext(GlobalStateContext);
  invariant(contextValue != null, 'Не подключен провайдер!');
  const [globalState, dispatch] = contextValue;
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

  const addToCart = (asteroid: AsteroidDataType): void => {
    if (globalState.cart.includes(asteroid)) return;

    dispatch({ type: 'addedToCart', asteroid });
  };

  return (
    <>
      <h1 className={styles.header}>Ближайшие подлёты астероидов</h1>
      <div className={styles.units}>
        <Button
          mode="invisible"
          isPressed={!globalState.isLunar}
          onClick={() => dispatch({ type: 'toKm' })}
        >
          в километрах
        </Button>{' '}
        |{' '}
        <Button
          mode="invisible"
          isPressed={globalState.isLunar}
          onClick={() => dispatch({ type: 'toLunar' })}
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
                  <AsteroidData
                    asteroid={asteroid}
                    isLunar={globalState.isLunar}
                  />
                  <div className={styles['order-container']}>
                    <Button mode="primary" onClick={() => addToCart(asteroid)}>
                      {globalState.cart.includes(asteroid)
                        ? 'В КОРЗИНЕ'
                        : 'ЗАКАЗАТЬ'}
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
        <p className={styles['basket-content']}>
          {globalState.cart.length ? (
            formatQty(globalState.cart.length)
          ) : (
            <>&nbsp;</>
          )}
        </p>
        <Link className={styles['send-button']} href="/order">
          Отправить
        </Link>
      </div>
    </>
  );
}

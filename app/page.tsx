'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Arrow } from './_components/Arrow';
import { Button } from './_components/Button';
import { passionOne } from './fonts';
import { getAsteroids } from './getAsteroids';
import styles from './page.module.css';

export default function Home(): ReactElement {
  const [isLunar, setIsLunar] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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

  const formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    return formattedDate.toLocaleDateString('ru-RU', options);
  };

  const formatDistanceKm = (distance: string): string => {
    const options = { maximumFractionDigits: 0 };

    return `${parseFloat(distance).toLocaleString('ru-RU', options)} км`;
  };

  const formatDistanceLunar = (distance: string): string => {
    const options = { maximumFractionDigits: 0 };
    const formattedDistanceLunar = parseFloat(distance).toLocaleString(
      'ru-RU',
      options,
    );

    switch (formattedDistanceLunar.at(-1)) {
      case '1':
        return `${formattedDistanceLunar} лунная орбита`;
      case '2':
      case '3':
      case '4':
        return `${formattedDistanceLunar} лунные орбиты`;
      default:
        return `${formattedDistanceLunar} лунных орбит`;
    }
  };

  const formatName = (name: string): string => {
    if (name[0] !== '(') return name;

    return name.slice(1, name.length - 1);
  };

  const addToCart = (id: string): void => {
    if (cart.includes(id)) return;

    setCart([...cart, id]);
  };

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
        <div className={styles.container}>
          <div className={styles['list-wrapper']}>
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
            <div className={styles.list}>
              {data?.pages.map((page) => (
                <Fragment key={page.links.self}>
                  {Object.values(page.near_earth_objects)
                    .flat()
                    .map((asteroid) => (
                      <div className={styles.asteroid} key={asteroid.name}>
                        <h2 className={styles.date}>
                          {formatDate(
                            asteroid.close_approach_data[0].close_approach_date,
                          )}
                        </h2>
                        <div className={styles['data-container']}>
                          <div>
                            <p>
                              {isLunar
                                ? formatDistanceLunar(
                                    asteroid.close_approach_data[0]
                                      .miss_distance.lunar,
                                  )
                                : formatDistanceKm(
                                    asteroid.close_approach_data[0]
                                      .miss_distance.kilometers,
                                  )}
                            </p>
                            <div className={styles['arrow-wrapper']}>
                              <Arrow />
                            </div>
                          </div>
                          <Image
                            src="/asteroid.png"
                            alt="asteroid"
                            width={
                              asteroid.estimated_diameter.meters
                                .estimated_diameter_max < 100
                                ? 22
                                : 36
                            }
                            height={
                              asteroid.estimated_diameter.meters
                                .estimated_diameter_max < 100
                                ? 24
                                : 40
                            }
                          />
                          <div>
                            <p className={styles['asteroid-name']}>
                              {formatName(asteroid.name)}
                            </p>
                            <p className={styles.diameter}>{`Ø ${Math.round(
                              asteroid.estimated_diameter.meters
                                .estimated_diameter_max,
                            )} м`}</p>
                          </div>
                        </div>
                        <div className={styles['order-container']}>
                          <Button
                            mode="primary"
                            onClick={() => addToCart(asteroid.id)}
                          >
                            ЗАКАЗАТЬ
                          </Button>
                          {asteroid.is_potentially_hazardous_asteroid && (
                            <div className={styles['warning-container']}>
                              <Image
                                src="/warning.svg"
                                alt="warning"
                                height={20}
                                width={20}
                              />
                              <span className={styles.dangerous}>Опасен</span>
                            </div>
                          )}
                        </div>
                      </div>
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
                <p className={styles['basket-content']}>
                  {formatQty(cart.length)}
                </p>
              ) : (
                <>&nbsp;</>
              )}
              <Button mode="secondary">Отправить</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment, ReactElement, useState } from 'react';
import { Arrow } from './_components/Arrow';
import { Button } from './_components/Button';
import { passionOne } from './fonts';
import { getAsteroids } from './getAsteroids';
import styles from './page.module.css';

export default function Home(): ReactElement {
  const [isLunar, setIsLunar] = useState(false);

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
  });

  const formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    return formattedDate.toLocaleDateString('ru-RU', options);
  };

  const formatDistance = (distance: string): string => {
    const options = { maximumFractionDigits: 0 };

    return `${parseFloat(distance).toLocaleString('ru-RU', options)} км`;
  };

  const formatName = (name: string): string => {
    if (name[0] !== '(') return name;

    return name.slice(1, name.length - 1);
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
                              {formatDistance(
                                asteroid.close_approach_data[0].miss_distance
                                  .kilometers,
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
                          <Button mode="primary">ЗАКАЗАТЬ</Button>
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

'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ReactNode } from 'react';
import { getAsteroid } from '../../_rest-api/getAsteroid';
import { formatDate } from '../../_utils/formatDate';
import { formatDistanceKm } from '../../_utils/formatDistanceKm';
import { formatSpeed } from '../../_utils/formatSpeed';
import { formatName } from '../../_utils/formateName';
import styles from './page.module.css';

type Props = {
  params: {
    id: string;
  };
};

export default function Asteroid({ params: { id } }: Props): ReactNode {
  const { data, isLoading } = useQuery({
    queryKey: [getAsteroid.queryKey, { id }],
    queryFn: () => getAsteroid({ id }),
  });

  if (!data) return null;

  return (
    <>
      <h1 className={styles.header}>{formatName(data.name)}</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Время сближния</th>
            <th className={styles.th}>Расстояние до Земли, км</th>
            <th className={styles.th}>
              Скорость относительно Земли,
              <br />
              км/сек
            </th>
            <th className={styles.th}>Орбита вокруг тела</th>
          </tr>
        </thead>
        <tbody>
          {data.close_approach_data.map((date) => (
            <tr key={date.close_approach_date_full}>
              <td className={styles['td-date']}>
                {formatDate(date.close_approach_date_full, {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
              <td className={styles.td}>
                {formatDistanceKm(date.miss_distance.kilometers)}
              </td>
              <td className={styles.td}>
                {formatSpeed(date.relative_velocity.kilometers_per_second)}
              </td>
              <td className={styles.td}>{date.orbiting_body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <Image
          className={styles.loader}
          src="/loader.gif"
          alt="loading..."
          width={160}
          height={20}
        />
      )}
    </>
  );
}

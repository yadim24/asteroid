import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ReactNode } from 'react';
import { formatDate } from '../_shared/formatDate';
import { formatDistanceKm } from '../_shared/formatDistanceKm';
import { formatSpeed } from '../_shared/formatSpeed';
import { formatName } from '../_shared/formateName';
import { getAsteroid } from './getAsteroid';
import styles from './page.module.css';

type Props = {
  params: {
    id: string;
  };
};

export default function Asteroid({ params: { id } }: Props): ReactNode {
  const { data, isLoading } = useQuery({
    queryKey: ['getAsteroid'],
    queryFn: () => getAsteroid({ id }),
  });

  if (!data) return null;

  return (
    <>
      <h1 className={styles.header}>{formatName(data.name)}</h1>
      <table>
        <thead>
          <th>
            <td>Время сближения</td>
            <td>Расстояние до Земли</td>
            <td>Скорость относительно Земли</td>
            <td>Орбита вокруг тела</td>
          </th>
        </thead>
        <tbody>
          {data.close_approach_data.map((date) => (
            <tr key={date.close_approach_date_full}>
              <td>
                {formatDate(date.close_approach_date_full, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
              <td>{formatDistanceKm(date.miss_distance.kilometers)}</td>
              <td>
                {formatSpeed(date.relative_velocity.kilometers_per_second)}
              </td>
              <td>{date.orbiting_body}</td>
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

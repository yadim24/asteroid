import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './AsteroidData.module.css';
import { Arrow } from './_components/Arrow';
import { AsteroidDataType } from './_rest-api/getAsteroidList';
import { formatDate } from './_utils/formatDate';
import { formatDistanceKm } from './_utils/formatDistanceKm';
import { formatDistanceLunar } from './_utils/formatDistanceLunar';
import { formatName } from './_utils/formateName';

type Props = {
  asteroid: AsteroidDataType;
  isLunar: boolean;
};

export const AsteroidData: FC<Props> = ({ asteroid, isLunar }) => {
  const currentAsteroid = asteroid.close_approach_data[0];

  if (!currentAsteroid) {
    throw new Error('В индексе [0] отсуствуют астероиды');
  }

  return (
    <div className={styles.asteroid}>
      <h2 className={styles.date}>
        {formatDate(currentAsteroid.close_approach_date, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </h2>
      <div className={styles['data-container']}>
        <div>
          <p>
            {isLunar
              ? formatDistanceLunar(currentAsteroid.miss_distance.lunar)
              : formatDistanceKm(currentAsteroid.miss_distance.kilometers)}
          </p>
          <div className={styles['arrow-wrapper']}>
            <Arrow />
          </div>
        </div>
        <Image
          src="/asteroid.png"
          alt="asteroid"
          width={
            asteroid.estimated_diameter.meters.estimated_diameter_max < 100
              ? 22
              : 36
          }
          height={
            asteroid.estimated_diameter.meters.estimated_diameter_max < 100
              ? 24
              : 40
          }
        />
        <div>
          <Link
            className={styles['asteroid-name']}
            href={`/asteroids/${asteroid.id}`}
          >
            {formatName(asteroid.name)}
          </Link>
          <p className={styles.diameter}>{`Ø ${Math.round(
            asteroid.estimated_diameter.meters.estimated_diameter_max,
          )} м`}</p>
        </div>
      </div>
    </div>
  );
};

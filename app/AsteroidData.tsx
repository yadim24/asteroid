import Image from 'next/image';
import { FC } from 'react';
import styles from './AsteroidData.module.css';
import { Arrow } from './_components/Arrow';
import { formatDate } from './_shared/formatDate';
import { formatDistanceKm } from './_shared/formatDistanceKm';
import { formatDistanceLunar } from './_shared/formatDistanceLunar';
import { formatName } from './_shared/formateName';
import { AsteroidDataType } from './getAsteroids';

type Props = {
  asteroid: AsteroidDataType;
  isLunar: boolean;
};

export const AsteroidData: FC<Props> = ({ asteroid, isLunar }) => {
  return (
    <div className={styles.asteroid}>
      <h2 className={styles.date}>
        {formatDate(asteroid.close_approach_data[0].close_approach_date, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </h2>
      <div className={styles['data-container']}>
        <div>
          <p>
            {isLunar
              ? formatDistanceLunar(
                  asteroid.close_approach_data[0].miss_distance.lunar,
                )
              : formatDistanceKm(
                  asteroid.close_approach_data[0].miss_distance.kilometers,
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
          <p className={styles['asteroid-name']}>{formatName(asteroid.name)}</p>
          <p className={styles.diameter}>{`Ø ${Math.round(
            asteroid.estimated_diameter.meters.estimated_diameter_max,
          )} м`}</p>
        </div>
      </div>
    </div>
  );
};

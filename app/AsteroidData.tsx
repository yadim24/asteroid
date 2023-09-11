import Image from 'next/image';
import { FC } from 'react';
import styles from './AsteroidData.module.css';
import { Arrow } from './_components/Arrow';
import { AsteroidDataType } from './getAsteroids';

type Props = {
  asteroid: AsteroidDataType;
  isLunar: boolean;
};

export const AsteroidData: FC<Props> = ({ asteroid, isLunar }) => {
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

  return (
    <div className={styles.asteroid}>
      <h2 className={styles.date}>
        {formatDate(asteroid.close_approach_data[0].close_approach_date)}
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

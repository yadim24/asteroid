import Image from 'next/image';
import { ReactElement } from 'react';
import styles from './Warning.module.css';

export const Warning = (): ReactElement => {
  return (
    <div className={styles['warning-container']}>
      <Image src="/warning.svg" alt="warning" height={20} width={20} />
      <span className={styles.dangerous}>Опасен</span>
    </div>
  );
};

import { Fragment, ReactElement } from 'react';
import { AsteroidData } from '../AsteroidData';
import { Warning } from '../_components/Warning';
import styles from './page.module.css';

export default function Order(): ReactElement {
  return (
    <>
      <h1 className={styles.header}>Заказ отправлен!</h1>
      <div>
        {cart.map((asteroid) => (
          <Fragment key={asteroid.id}>
            <AsteroidData asteroid={asteroid} isLunar={isLunar} />
            {asteroid.is_potentially_hazardous_asteroid && <Warning />}
          </Fragment>
        ))}
      </div>
    </>
  );
}

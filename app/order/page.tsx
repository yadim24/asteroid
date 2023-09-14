'use client';

import Link from 'next/link';
import { Fragment, ReactElement, useContext } from 'react';
import { AsteroidData } from '../AsteroidData';
import { GlobalStateContext } from '../GlobalStateContext';
import { Warning } from '../_components/Warning';
import { invariant } from '../invariant';
import styles from './page.module.css';

export default function Order(): ReactElement {
  const contextValue = useContext(GlobalStateContext);
  invariant(contextValue != null, 'Не подключен провайдер!');
  const [globalState, dispatch] = contextValue;

  return (
    <>
      <h1 className={styles.header}>Заказ отправлен!</h1>
      <div className={styles['order-list']}>
        {globalState.cart.map((asteroid) => (
          <Fragment key={asteroid.id}>
            <AsteroidData asteroid={asteroid} isLunar={globalState.isLunar} />
            {asteroid.is_potentially_hazardous_asteroid ? (
              <Warning />
            ) : (
              <>&nbsp;</>
            )}
          </Fragment>
        ))}
      </div>
      <Link
        className={styles['return-button']}
        href="/"
        onClick={() => dispatch({ type: 'resetCart' })}
      >
        OK
      </Link>
    </>
  );
}

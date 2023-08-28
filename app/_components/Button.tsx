/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { inter } from '../fonts';
import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  mode?: 'invisible' | 'primary' | 'secondary';
  isPressed?: boolean;
};

export const Button: FC<Props> = ({
  children,
  mode = 'primary',
  className,
  isPressed,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={clsx(
        'button',
        inter.className,
        {
          [styles['button-invisible']]: mode === 'invisible',
          [styles['button-invisible-pressed']]: isPressed,
          [styles['button-primary']]: mode === 'primary',
          [styles['button-secondary']]: mode === 'secondary',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

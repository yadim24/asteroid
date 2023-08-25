/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import { inter } from '../fonts';
import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  mode?: 'invisible' | 'primary' | 'secondary';
};

export const Button: FC<Props> = ({
  text,
  mode = 'primary',
  className,
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
          [styles['button-primary']]: mode === 'primary',
          [styles['button-secondary']]: mode === 'secondary',
        },
        className,
      )}
    >
      {text}
    </button>
  );
};

import { MouseEvent } from 'react';
import clsx from 'clsx';
import styles from '@ui/Button.module.scss';

export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button = ({ type, disabled, className, onClick, children }: IButton) => {
  return (
    <button
      className={clsx(styles['button'], { [`${className}`]: !!className })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import clsx from 'clsx';
import styles from './Button.module.scss';

export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ type, disabled, className, children }: IButton) => {
  return (
    <button
      className={clsx(styles['button'], { [`${className}`]: !!className })}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

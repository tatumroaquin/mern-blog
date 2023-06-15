import clsx from 'clsx';
import styles from './Button.module.scss';

interface Button {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ type, disabled, className, children }: Button) => {
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

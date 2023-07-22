import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

interface Card {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<Card> = ({ children, className }) => {
  return (
    <div
      className={clsx(`${styles['card']}`, { [`${className}`]: !!className })}
    >
      {children}
    </div>
  );
};

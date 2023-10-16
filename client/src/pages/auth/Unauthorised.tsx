import { FC } from 'react';
import styles from './Unauthorised.module.scss';

export const Unauthorised: FC = () => {
  return (
    <div className={styles['unauthorised']}>
      <h1 className={styles['unauthorised__heading']}>Unauthorised</h1>
      <h1 className={styles['unauthorised__401']}>401</h1>
      <p className={styles['unauthorised__description']}>
        This is an admin only page, you are not allowed to access it.
      </p>
    </div>
  );
};

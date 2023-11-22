import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <div className={styles['footer']}>
      <p>
        &copy; {new Date().getFullYear()} Tatum Roaquin. All Rights Reserved.
      </p>
      <div>
        <NavLink className={styles['footer__link']} to='/privacy-policy'>
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
};

import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleNavLink({ isActive }: { isActive: boolean }) {
    return isActive ? styles['navbar__link--active'] : styles['navbar__link'];
  }

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__brand']}>
        <NavLink to='/'>
          <img src='/eye-code.png' alt="tatum's eye code logo" />
        </NavLink>
        <NavLink to='/'>
          <b>Tatum's Blog</b>
        </NavLink>
      </div>

      <button
        className={styles['navbar__hamburger']}
        onClick={() => {
          setIsExpanded((currentState) => !currentState);
        }}
      >
        <span></span>
      </button>

      <ul
        className={clsx(`${styles['navbar__items']}`, {
          [`${styles['navbar__items--expanded']}`]: isExpanded,
        })}
      >
        <li className={styles['navbar__item']}>
          <NavLink className={handleNavLink} to='/post/new'>
            New Post
          </NavLink>
        </li>
        <li className={styles['navbar__item']}>
          <NavLink className={handleNavLink} to='/auth/signin'>
            Sign In
          </NavLink>
        </li>
        <li className={styles['navbar__item']}>
          <NavLink className={handleNavLink} to='/about'>
            About
          </NavLink>
        </li>
        <li className={styles['navbar__item']}>
          <NavLink className={handleNavLink} to='/contact'>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { auth } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(Boolean(auth?.accessToken));

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
  }, [auth]);

  function handleNavLink({ isActive }: { isActive: boolean }) {
    return isActive ? styles['navbar__link--active'] : styles['navbar__link'];
  }

  function handleButton({ isActive }: { isActive: boolean }) {
    return isActive
      ? styles['navbar__button--active']
      : styles['navbar__button'];
  }

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__brand']}>
        <NavLink to='/'>
          <img src='/eye-code.png' alt="tatum's eye code logo" />
        </NavLink>
        <NavLink to='/'>
          <b>#!/blog/tatum</b>
        </NavLink>
      </div>

      <button
        className={styles['navbar__hamburger']}
        onFocus={() => setIsExpanded(true)}
        onBlur={(e) => {
          //https://github.com/facebook/react/issues/4210
          (e.relatedTarget as HTMLElement)?.click();
          setIsExpanded(false);
        }}
      >
        <span></span>
      </button>

      <ul
        className={clsx(`${styles['navbar__items']}`, {
          [`${styles['navbar__items--expanded']}`]: isExpanded,
        })}
      >
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/post/new'>
            <NavLink className={handleNavLink} to='/post/new'>
              New Post
            </NavLink>
          </li>
        )}
        {!isSignedIn && (
          <li className={styles['navbar__item']} key='/auth/signin'>
            <NavLink className={handleNavLink} to='/auth/signin'>
              Sign In
            </NavLink>
          </li>
        )}
        <li className={styles['navbar__item']} key='/about'>
          <NavLink className={handleNavLink} to='/about'>
            About
          </NavLink>
        </li>
        <li className={styles['navbar__item']} key='/contact'>
          <NavLink className={handleNavLink} to='/contact'>
            Contact
          </NavLink>
        </li>
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/user/view'>
            <NavLink className={handleNavLink} to='/user/view'>
              {!isExpanded && (
                <img
                  className={styles['navbar__profile']}
                  src='/account2.png'
                  alt='user account icon'
                />
              )}
              {isExpanded && 'Account'}
            </NavLink>
          </li>
        )}
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/auth/logout'>
            <Button>
              <NavLink className={handleButton} to='/auth/logout'>
                Logout
              </NavLink>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

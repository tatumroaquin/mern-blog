import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';
import styles from './NavBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { auth } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(Boolean(auth?.accessToken));
  const [isAdmin, setIsAdmin] = useState(
    Boolean(auth?.roles?.includes('admin'))
  );

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth]);

  function handleNavLink({ isActive }: { isActive: boolean }) {
    return isActive ? styles['navbar__link--active'] : styles['navbar__link'];
  }

  // function handleButton({ isActive }: { isActive: boolean }) {
  //   return isActive
  //     ? styles['navbar__button--active']
  //     : styles['navbar__button'];
  // }

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
        <li className={styles['navbar__item']} key='/post/all'>
          <NavLink className={handleNavLink} to='/post/all'>
            All Posts
          </NavLink>
        </li>
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
        {isSignedIn && isAdmin && (
          <li className={styles['navbar__item']} key='/admin'>
            <NavLink className={handleNavLink} to='/admin'>
              Admin
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
        <li className={styles['navbar__item']} key='/post/search'>
          <NavLink className={handleNavLink} to='/post/search'>
            {!isExpanded && <FontAwesomeIcon icon={faMagnifyingGlass} />}
            {isExpanded && 'Search'}
          </NavLink>
        </li>
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/user/view'>
            <NavLink className={handleNavLink} to='/user/view'>
              {!isExpanded && <FontAwesomeIcon icon={faCircleUser} size='lg' />}
              {isExpanded && 'Account'}
            </NavLink>
          </li>
        )}
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/auth/logout'>
            <NavLink to='/auth/logout'>
              <Button className={styles['navbar__item--logout']}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Button>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useAuth } from '@hooks/useAuth';
import styles from '@ui/NavBar.module.scss';

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
  const navbarRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsSignedIn(Boolean(auth?.accessToken));
    setIsAdmin(Boolean(auth?.roles?.includes('admin')));
  }, [auth]);

  useEffect(() => {
    function outsideClickHandler(e: any) {
      if (
        !hamburgerRef.current?.contains(e.target) &&
        !navbarRef.current?.contains(e.target)
      ) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', outsideClickHandler);

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  });

  function handleNavLink({ isActive }: { isActive: boolean }) {
    return isActive ? styles['navbar__link--active'] : styles['navbar__link'];
  }

  // function handleButton({ isActive }: { isActive: boolean }) {
  //   return isActive
  //     ? styles['navbar__button--active']
  //     : styles['navbar__button'];
  // }

  function handleExpand() {
    setIsExpanded((prev: boolean) => !prev);
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
        onClick={handleExpand}
        ref={hamburgerRef}
      >
        <span></span>
      </button>

      <ul
        className={clsx(`${styles['navbar__items']}`, {
          [`${styles['navbar__items--expanded']}`]: isExpanded,
        })}
        ref={navbarRef}
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
          <li className={styles['navbar__item']} key='/user/edit'>
            <NavLink className={handleNavLink} to='/user/edit'>
              {!isExpanded && <FontAwesomeIcon icon={faCircleUser} size='lg' />}
              {isExpanded && 'Account'}
            </NavLink>
          </li>
        )}
        {isSignedIn && (
          <li className={styles['navbar__item']} key='/auth/logout'>
            <NavLink className={handleNavLink} to='/auth/logout'>
              {!isExpanded && (
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              )}
              {isExpanded && 'Logout'}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

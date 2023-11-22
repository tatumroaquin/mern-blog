import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@ui/NavBar';
import { Footer } from './Footer';

interface Layout {
  children?: ReactNode;
}

export const Layout: FC<Layout> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

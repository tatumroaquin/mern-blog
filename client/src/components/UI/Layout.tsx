import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@ui/NavBar';

interface Layout {
  children?: ReactNode;
}

export const Layout: FC<Layout> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

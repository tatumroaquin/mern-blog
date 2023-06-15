import { FC } from 'react';
import { NavBar } from './NavBar';

interface Layout {
  children: React.ReactNode;
}

export const Layout: FC<Layout> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

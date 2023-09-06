import { Outlet } from 'react-router-dom';

import { Navbar } from '~/containers/Navbar';

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

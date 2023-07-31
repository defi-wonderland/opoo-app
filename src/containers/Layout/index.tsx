import { Outlet } from 'react-router-dom';

import { Footer } from '~/containers/Footer';
import { Navbar } from '~/containers/Navbar';

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

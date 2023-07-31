import { Outlet } from 'react-router-dom';

// import { Footer } from '~/containers/footer';
import { Navbar } from '~/containers/navbar';

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

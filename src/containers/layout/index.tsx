import { ReactNode } from 'react';

// import { Footer } from '~/containers/footer';
import { Navbar } from '~/containers/navbar';

export const AppLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
};

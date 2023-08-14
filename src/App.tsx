import '~/assets/fonts/opoo-icons/style.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import { RequestsDetails } from './pages/Requests/RequestsDetails';
import { About, Landing, Requests } from '~/pages';
import { AppLayout } from './containers/Layout';
import { Themable } from './components/Theme';
import { StateProvider } from './providers/StateProvider';
import { ModalProvider } from './providers';
import { Modals } from './containers/Modal/Modal';
import GlobalStyle from './GlobalStyle';
import { ScrollToTop } from './hooks';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={`/`} element={<AppLayout />}>
        {/* temporary until we have a landing page */}
        <Route path='/' element={<Navigate to='/requests' />} />
        <Route path={`/requests/`} element={<Requests />} />
        <Route path={`/requests/:id`} element={<RequestsDetails />} />
        <Route path={`/FAQ`} element={<Landing />} />
        <Route path={`/about`} element={<About />} />
        <Route path={`/docs`} element={<About />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <ModalProvider>
      <StateProvider>
        <Themable>
          <GlobalStyle />
          <ScrollToTop />
          <Modals />
          <AppRouter />
        </Themable>
      </StateProvider>
    </ModalProvider>
  );
}

export default App;

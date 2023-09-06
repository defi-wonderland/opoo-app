import '~/assets/fonts/opoo-icons/style.css';

import { Routes, Route } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { RequestsDetails } from './pages/Requests/RequestsDetails';
import { AppLayout } from './containers/Layout';
import { Themable } from './components/Theme';
import { StateProvider } from './providers/StateProvider';
import { ModalProvider } from './providers';
import { Modals } from './containers/Modal/Modal';
import GlobalStyle from './GlobalStyle';
import { ScrollToTop } from './hooks';
import { Requests } from '~/pages';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Requests />} />
        <Route path='/requests/:id' element={<RequestsDetails />} />
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
          <Tooltip id='opoo-tooltip' />
          <ScrollToTop />
          <Modals />
          <AppRouter />
        </Themable>
      </StateProvider>
    </ModalProvider>
  );
}

export default App;

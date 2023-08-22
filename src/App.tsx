import '~/assets/fonts/opoo-icons/style.css';

import { Routes, Route } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { RequestsDetails } from './pages/Requests/RequestsDetails';
import { About, Faq, Landing, Requests } from '~/pages';
import { AppLayout, RequestsLayout } from './containers/Layout';
import { Themable } from './components/Theme';
import { StateProvider } from './providers/StateProvider';
import { ModalProvider } from './providers';
import { Modals } from './containers/Modal/Modal';
import GlobalStyle from './GlobalStyle';
import { ScrollToTop } from './hooks';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />

      <Route element={<RequestsLayout />}>
        <Route path='/requests/' element={<Requests />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path='/requests/:id' element={<RequestsDetails />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/about' element={<About />} />
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

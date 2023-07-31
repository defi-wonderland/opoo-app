import '~/assets/fonts/opoo-icons/style.css';

import { Routes, Route } from 'react-router-dom';

import { RequestsDetails } from './pages/Requests/RequestsDetails';
import { About, Landing, Requests } from '~/pages';
import { AppLayout } from './containers/Layout';
import { Themable } from './components/Theme';
import { StateProvider } from './providers/StateProvider';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={`/`} element={<AppLayout />}>
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
    <StateProvider>
      <Themable>
        <AppRouter />
      </Themable>
    </StateProvider>
  );
}

export default App;

import '~/assets/fonts/opoo-icons/style.css';

import { Routes, Route } from 'react-router-dom';

import { Landing } from './pages/landing';
import { Requests } from './pages/requests';
import { RequestsDetails } from './pages/requests/RequestsDetails';
import { About } from './pages/about';
import { AppLayout } from './containers/Layout';
import { Themable } from './components/Theme';

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
    <Themable>
      <AppRouter />
    </Themable>
  );
}

export default App;

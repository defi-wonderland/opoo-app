import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Landing } from './pages/landing';
import { Requests } from './pages/requests';
import { AppLayout } from './containers/layout';
import { About } from './pages/about';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Landing />} />
      <Route path={`/FAQ`} element={<Landing />} />
      <Route path={`/about`} element={<About />} />
      <Route
        path={`/requests`}
        element={
          <AppLayout>
            <Requests />
          </AppLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return <AppRouter />;
}

export default App;

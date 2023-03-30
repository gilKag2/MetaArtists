import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import TopArtists from './pages/TopArtists';
import Artist from './pages/Artist';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthLayout, Layout, NotFoundPage } from './components';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { config } from 'dotenv';

// config();

const queryclient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='artists'>
              <Route index element={<TopArtists />} />
              <Route path=':id' element={<Artist />} />
            </Route>
            <Route path='auth' element={<AuthLayout />}>
              <Route index element={<Navigate to={'/auth/login'} />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, TopArtists, Artist, Login, Register } from './pages';
import { AuthLayout, Layout, NotFoundPage } from './components';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const queryclient = new QueryClient();


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

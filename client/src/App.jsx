import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';

import {
  HomePage, TopArtists, ArtistPage, Login, Register,
  NotFoundPage, CreateShowcase, Settings, Profile,
} from './pages';

import { AuthLayout, Layout, MainLayout } from './components';

const queryclient = new QueryClient();


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryclient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='auth' element={<AuthLayout />}>
              <Route index element={<Navigate to={'/auth/login'} />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='create' element={<CreateShowcase />} />
              <Route path='artists'>
                <Route index element={<TopArtists />} />
                <Route path=':artistId'>
                  <Route index element={<ArtistPage />} />
                  <Route path='create' element={<CreateShowcase />} />
                </Route>
              </Route>
            </Route>
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import TopArtists from './pages/TopArtists';
import Artist from './pages/Artist';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='artists'>
          <Route index element={<TopArtists />} />
          <Route path=':id' element={<Artist />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

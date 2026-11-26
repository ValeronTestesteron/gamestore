import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/store';
import { lazy, Suspense, useEffect } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Game = lazy(() => import('./pages/Game'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import Header from './components/Header';
import FullScreenLoader from './components/ui/FullScreenLoader';

function App() {
  const themeColor = useAppSelector((state) => state.themeSlice.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeColor === 'dark');
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <Header />

      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/store';
import { useEffect } from 'react';

import Home from './pages/Home';
import Game from './pages/Game';
import Wishlist from './pages/Wishlist';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const themeColor = useAppSelector((state) => state.themeSlice.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeColor === 'dark');
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

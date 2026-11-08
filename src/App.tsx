import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;

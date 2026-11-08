import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:slug" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;

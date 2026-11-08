import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchGames } from '../redux/slices/gamesSlice';

import VideoBanner from '../components/VideoBanner';
import Genres from '../components/Genres';
import GamesList from '../components/GamesList';
import GameSortDropdown from '../components/GameSortDropdown';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 12;

function Home() {
  const games = useAppSelector((state) => state.gamesSlice.games);
  const status = useAppSelector((state) => state.gamesSlice.status);
  const category = useAppSelector((state) => state.filterSlice.category);
  const currentSort = useAppSelector((state) => state.filterSlice.currentSort);
  const currentPage = useAppSelector((state) => state.filterSlice.currentPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGames({ category, sortUrl: currentSort?.sorting }));
  }, [category, currentSort?.sorting]);

  const totalPages = Math.ceil(games.count / PAGE_SIZE);

  const pagedGames = games.results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <VideoBanner />

      <div className="container w-full mx-auto">
        <div className="mt-15 mb-12">
          <h1 className="text-5xl font-bold">Игры</h1>
        </div>

        <div className="flex justify-between">
          <Genres />
          <GameSortDropdown />
        </div>

        {status === 'error' && (
          <div className="mt-5 text-xl font-bold">Возникла ошибка: загрузки</div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {status === 'loading' ? (
            skeletons
          ) : (
            <>
              {pagedGames.map((item) => (
                <GamesList key={item.id} {...item} />
              ))}

              <Pagination totalPages={totalPages} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchGames } from '../redux/slices/gamesSlice';

import VideoBanner from '../components/VideoBanner';
import Genres from '../components/Genres';
import GamesList from '../components/GamesList';
import GameSortDropdown from '../components/GameSortDropdown';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const games = useAppSelector((state) => state.gamesSlice.games);
  const status = useAppSelector((state) => state.gamesSlice.status);
  const categoryId = useAppSelector((state) => state.filterSlice.categoryId);
  const currentSort = useAppSelector((state) => state.filterSlice.currentSort);
  const currentPage = useAppSelector((state) => state.filterSlice.currentPage);

  const dispatch = useAppDispatch();

  const categoryUrl = `${categoryId ? `genres=${categoryId}&` : ''}`;
  const sortUrl = `${currentSort ? `ordering=${currentSort.sorting}&` : ''}`;
  const pageUrl = `${currentPage !== 1 ? `page=${currentPage}&` : ''}`;

  useEffect(() => {
    dispatch(fetchGames({ categoryUrl, sortUrl, pageUrl }));
  }, [categoryId, currentSort, currentPage]);

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
              {games.results && games.results.map((item) => <GamesList key={item.id} {...item} />)}

              <Pagination next={games.next} prev={games.previous} pagesCounts={games.count} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

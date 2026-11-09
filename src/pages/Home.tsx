import { useAppDispatch, useAppSelector } from '../redux/store';
import { useGetGamesQuery } from '../redux/api/gameApi';

import VideoBanner from '../components/VideoBanner';
import Genres from '../components/Genres';
import GamesList from '../components/GamesList';
import GameSortDropdown from '../components/GameSortDropdown';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const PAGE_SIZE = 12;

function Home() {
  const { data, isLoading, error } = useGetGamesQuery();
  const currentPage = useAppSelector((state) => state.filterSlice.currentPage);

  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const pagedGames = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  console.log(data, totalPages);

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

        {error && (
          <div className="mt-5 text-xl font-bold">{(error as FetchBaseQueryError).status}</div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {isLoading ? (
            skeletons
          ) : (
            <>
              {pagedGames && pagedGames.map((item) => <GamesList key={item.id} {...item} />)}

              <Pagination totalPages={totalPages} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

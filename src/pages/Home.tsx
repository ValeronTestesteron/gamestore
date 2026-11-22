import { useAppDispatch, useAppSelector } from '../redux/store';
import { useGetGamesQuery } from '../redux/api/gameApi';
import { useSearchParams } from 'react-router-dom';
import { setCurrentPage } from '../redux/slices/filterSlice';

import VideoBanner from '../components/VideoBanner';
import Genres from '../components/Genres';
import GamesList from '../components/GamesList';
import GameSortDropdown from '../components/GameSortDropdown';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import CloseIcon from '../components/ui/icons/CloseIcon';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const sort = searchParams.get('sort-by') ?? undefined;
  const currentPage = useAppSelector((state) => state.filterSlice.currentPage);
  const gamePerPage = useAppSelector((state) => state.filterSlice.gamePerPage);
  const dispatch = useAppDispatch();

  const { data = [], isLoading, error } = useGetGamesQuery({ category, sort });

  const totalPages = Math.ceil(data.length / gamePerPage);
  const pagedGames = data.slice((currentPage - 1) * gamePerPage, currentPage * gamePerPage);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <VideoBanner />

      <div className="container w-full mx-auto">
        <div className="mt-15 mb-12">
          <h1 className="flex justify-between items-center text-5xl font-bold">
            Игры
            {searchParams.size > 0 && (
              <button
                className="p-2 rounded-full border border-white cursor-pointer"
                title="Сбросить фильтры"
                onClick={() => {
                  setSearchParams();
                  dispatch(setCurrentPage(1));
                }}>
                <CloseIcon />
              </button>
            )}
          </h1>
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

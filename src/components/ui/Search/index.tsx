import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

import { useGetGamesQuery } from '../../../redux/api/gameApi';
import { setDebounceQuery } from '../../../redux/slices/filterSlice';

import Combobox from '../Combobox/Combobox';

type SearchType = {
  className: string;
  placeholder: string;
};

function Search({ className, placeholder }: SearchType) {
  const [searchQuery, setSearchQuery] = useState('');
  const debounceQuery = useAppSelector((state) => state.filterSlice.debounceQuery);
  const { data = [] } = useGetGamesQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setDebounceQuery(searchQuery));
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filterGames = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return data.filter((game) => game.title.toLowerCase().includes(query));
  }, [data, debounceQuery]);

  function onClearSearch() {
    setSearchQuery('');
  }

  return (
    <div className={`search relative flex items-center gap-4 ${className}`}>
      <input
        name="search"
        className="w-full p-3 pl-12 bg-gray-200 dark:bg-[#1e1f21] dark:text-white rounded-md focus:outline-none"
        placeholder={placeholder}
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <svg
        className="w-6 h-6 absolute ml-4 left-0 text-dark-gray"
        fill="none"
        stroke="#525151"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>

      {searchQuery && (
        <>
          <svg
            onClick={() => onClearSearch()}
            className="w-5 h-5 absolute mr-4 right-0 text-stone-700 cursor-pointer"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#48494a"
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
          </svg>

          <Combobox gameItems={filterGames} onClearSearch={onClearSearch} />
        </>
      )}
    </div>
  );
}

export default Search;

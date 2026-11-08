import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCurrentSort } from '../redux/slices/filterSlice';

function GameSortDropdown() {
  const [activeSortPopup, setActiveSortPopup] = useState(false);
  const sortOptions = useAppSelector((state) => state.filterSlice.sortOptions);
  const currentSort = useAppSelector((state) => state.filterSlice.currentSort);
  const dispatch = useAppDispatch();

  return (
    <div className="relative inline-block text-left">
      <div
        className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-[#181818] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:hover:bg-neutral-800 cursor-pointer"
        onClick={() => {
          setActiveSortPopup(!activeSortPopup);
        }}>
        Сортировать по:
        <svg
          className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {activeSortPopup && (
        <div className="absolute right-0 z-10 w-42 origin-top-left rounded-md bg-white shadow-lg focus:outline-none py-1 dark:bg-[#181818]">
          {sortOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setCurrentSort({ ...item }));
                setActiveSortPopup(false);
              }}
              className={`block px-4 py-2 text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${currentSort?.name === item.name ? 'bg-slate-900 hover:bg-slate-900 text-white' : ''}`}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameSortDropdown;

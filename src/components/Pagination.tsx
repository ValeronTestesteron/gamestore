import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCurrentPage } from '../redux/slices/filterSlice';

type PaginationProps = {
  next: string | null;
  prev: string | null;
  pagesCounts: number;
};

function Pagination({ next, prev, pagesCounts }: PaginationProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.filterSlice.currentPage);

  function splitPages() {
    const delta = 2;
    const range = [];

    for (let i = 1; i <= pagesCounts; i++) {
      if (i >= currentPage - delta && i <= currentPage + delta) range.push(i);
    }
    return range;
  }

  const paginationRange = splitPages();

  function onNextPage() {
    if (next) dispatch(setCurrentPage(currentPage + 1));
  }
  function onPrevPage() {
    if (prev) dispatch(setCurrentPage(currentPage - 1));
  }

  if (paginationRange.length <= 0) return;

  return (
    <div className="flex gap-1 mt-4">
      <button
        className="flex items-center justify-center h-9 w-9 rounded-3xl bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        onClick={() => onPrevPage()}
        disabled={prev === null}>
        <svg viewBox="0 0 20 20" width="25" height="25" fill="#fff" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {paginationRange.map((num) => (
        <button
          key={num}
          onClick={() => dispatch(setCurrentPage(num))}
          className={`flex items-center justify-center ${num === currentPage ? 'bg-red-600' : 'bg-slate-800'} h-9 w-9 p-2 text-sm font-semibold text-white rounded-3xl cursor-pointer`}>
          {num}
        </button>
      ))}
      <button
        className="flex items-center justify-center h-9 w-9 rounded-3xl bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        onClick={() => onNextPage()}
        disabled={next === null}>
        <svg viewBox="0 0 20 20" width="25" height="25" fill="#fff" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;

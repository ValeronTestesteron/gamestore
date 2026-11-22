import { setCurrentPage } from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSearchParams } from 'react-router-dom';

function Genres() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const categories = useAppSelector((state) => state.filterSlice.categories);
  const dispatch = useAppDispatch();

  return (
    <div className="genres flex flex-wrap gap-2 mb-7">
      {categories.map((item) => (
        <button
          key={item.slug || 'all'}
          onClick={() => {
            setSearchParams((prev) => {
              if (item.slug) prev.set('category', item.slug);
              else prev.delete('category');
              return prev;
            });
            dispatch(setCurrentPage(1));
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition cursor-pointer text-white ${
            category === item.slug
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-[#181818] hover:bg-slate-800 dark:hover:bg-neutral-800'
          }`}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Genres;

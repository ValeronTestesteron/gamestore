import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCategory } from '../redux/slices/filterSlice';

function Genres() {
  const activeCategory = useAppSelector((state) => state.filterSlice.category);
  const categories = useAppSelector((state) => state.filterSlice.categories);

  const dispatch = useAppDispatch();

  return (
    <div className="genres flex flex-wrap gap-2 mb-7">
      {categories.map((item) => (
        <div
          key={item.slug || 'all'}
          onClick={() => {
            dispatch(setCategory(item.slug));
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition cursor-pointer text-white ${
            activeCategory === item.slug
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-[#181818] hover:bg-slate-800 dark:hover:bg-neutral-800'
          }`}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Genres;

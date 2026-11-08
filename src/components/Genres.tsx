import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCategoryId } from '../redux/slices/filterSlice';

function Genres() {
  const activeCategoryId = useAppSelector((state) => state.filterSlice.categoryId);
  const genres = useAppSelector((state) => state.filterSlice.genres);

  const dispatch = useAppDispatch();

  return (
    <div className="genres flex gap-2 mb-7">
      {genres.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            dispatch(setCategoryId(item.id));
          }}
          className={`px-4 py-2 text-sm rounded-xl transition cursor-pointer text-white ${
            activeCategoryId === item.id
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-slate-900 hover:bg-slate-800'
          }`}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Genres;

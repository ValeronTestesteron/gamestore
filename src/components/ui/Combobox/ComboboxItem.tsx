import { Link } from 'react-router-dom';

type ComboboxItemProps = {
  id: number;
  title: string;
  thumbnail?: string;
  genre?: string;
  onClearSearch: () => void;
};

function ComboboxItem({ id, title, thumbnail, genre, onClearSearch }: ComboboxItemProps) {
  return (
    <Link
      to={`game/${id}`}
      onClick={() => onClearSearch()}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors group">
      <div className="w-10 h-14 bg-slate-200 rounded overflow-hidden flex-shrink-0">
        {thumbnail && <img src={thumbnail} alt={title} className="w-full h-full object-cover" />}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-800 dark:text-neutral-200 truncate transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-neutral-300 mt-0.5 truncate">{genre}</p>
      </div>
    </Link>
  );
}

export default ComboboxItem;

import { Link } from 'react-router-dom';

import type { Genres } from '../../../interfaces';

type ComboboxItemProps = {
  slug: string;
  name: string;
  image?: string;
  genres?: Genres[];
  onClearSearch: () => void;
};

function ComboboxItem({ slug, name, image, genres, onClearSearch }: ComboboxItemProps) {
  return (
    <Link
      to={`games/${slug}`}
      onClick={() => onClearSearch()}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors group">
      <div className="w-10 h-14 bg-slate-200 rounded overflow-hidden flex-shrink-0">
        {image && <img src={image} alt={image} className="w-full h-full object-cover" />}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-800 truncate transition-colors">{name}</h4>
        <p className="text-xs text-slate-500 mt-0.5 truncate">
          {genres && genres.map((gen) => gen.name).join(', ')}
        </p>
      </div>
    </Link>
  );
}

export default ComboboxItem;

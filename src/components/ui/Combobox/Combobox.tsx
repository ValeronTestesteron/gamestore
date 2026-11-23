import ComboboxItem from '../Combobox/ComboboxItem';

import type { GameItem } from '../../../interfaces';

type ComboboxProps = {
  gameItems: GameItem[];
  onClearSearch: () => void;
};

function Combobox({ gameItems, onClearSearch }: ComboboxProps) {
  return (
    <div className="absolute top-full z-50 w-full bg-white rounded-md max-h-80 overflow-y-auto dark:bg-[#1e1f21]">
      <div className="px-3 py-2 text-sm text-slate-400 dark:text-neutral-300">
        Результаты поиска: {gameItems?.length}
      </div>

      {gameItems?.length > 0 && (
        <div className="p-1.5 space-y-1">
          {gameItems.map((game) => (
            <ComboboxItem
              key={game.id}
              id={game.id}
              title={game.title}
              thumbnail={game.thumbnail}
              genre={game.genre}
              onClearSearch={onClearSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Combobox;

import GameSystemRequirements from './GameSystemRequirements';

import type { SystemRequirements } from '../../interfaces';

type GameInfoProps = {
  release_date?: string;
  developer?: string;
  publisher?: string;
  genre?: string;
  status?: string;
  minimum_system_requirements?: SystemRequirements;
};

function GameInfo({
  release_date,
  developer,
  publisher,
  genre,
  status,
  minimum_system_requirements,
}: GameInfoProps) {
  return (
    <div className="space-y-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-neutral-900 dark:border-neutral-800 sm:p-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-wide border-b border-slate-200 pb-3 mb-4 dark:text-white dark:border-neutral-700">
          Детали издания
        </h3>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
              Дата релиза
            </span>
            <span className="text-slate-800 font-medium dark:text-neutral-200">{release_date}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
              Разработчик
            </span>
            <span className="text-slate-800 font-medium dark:text-neutral-200">{developer}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
              Издатель
            </span>
            <span className="text-slate-800 font-medium dark:text-neutral-200">{publisher}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
              Жанр
            </span>
            <span className="text-slate-800 font-medium dark:text-neutral-200">{genre}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
              Статус
            </span>
            <span className="text-slate-800 font-medium dark:text-neutral-200">{status}</span>
          </div>
        </div>
      </div>
      <GameSystemRequirements minimum_system_requirements={minimum_system_requirements} />
    </div>
  );
}

export default GameInfo;

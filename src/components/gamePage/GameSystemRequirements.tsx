import type { SystemRequirements } from '../../interfaces';

type GameSystemRequirementsProps = {
  minimum_system_requirements?: SystemRequirements;
};

function GameSystemRequirements({ minimum_system_requirements }: GameSystemRequirementsProps) {
  return (
    <>
      {minimum_system_requirements && (
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-neutral-700">
          <h4 className="text-sm font-black text-slate-800 dark:text-white">
            Минимальные системные требования
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 dark:text-neutral-200">
            <li>ОС: {minimum_system_requirements?.os}</li>
            <li>Процессор: {minimum_system_requirements?.processor}</li>
            <li>Память: {minimum_system_requirements?.memory}</li>
            <li>Графика: {minimum_system_requirements?.graphics}</li>
            <li>Накопитель: {minimum_system_requirements.storage}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default GameSystemRequirements;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import type { GameDetail, ShortScreenshots } from '../interfaces';

function Game() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [game, setGame] = useState<GameDetail>();
  const [imagesList, setImagesList] = useState<ShortScreenshots[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      try {
        const { data } = await axios.get<GameDetail>(`${BASE_URL}/api/game`, { params: { id } });
        setGame(data);
        setImagesList(data.screenshots || []);
      } catch (e) {
        console.log(`Ошибка загрузки ${e instanceof Error ? e.message : e}`);
      }
    };

    fetchGame();
  }, [id]);

  const requirements = game?.minimum_system_requirements;

  return (
    <>
      {game && (
        <>
          <div className="relative flex items-center min-h-[500px] w-full overflow-hidden">
            <div className="container relative w-full mx-auto z-1">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-md">
                {game.title}
              </h1>
              <div className="px-2.5 py-1 text-white">
                {game.short_description} <br /> {game.release_date}
              </div>
            </div>
            <img
              src={game.thumbnail}
              alt={game.title}
              className="absolute top-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50"></div>
          </div>

          <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8 mb-8">
              <div className="lg:col-span-2 space-y-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white mb-3">
                  Доступно на:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs bg-white font-bolt text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm dark:bg-neutral-800 dark:text-white dark:border-neutral-700">
                    {game.platform}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-600 tracking-wide mt-10 dark:text-white">
                  О проекте
                </h3>
                <div className="text-slate-500 leading-relaxed text-base md:text-lg space-y-4 dark:text-neutral-300">
                  {game.description}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-wide mt-5 dark:text-white">
                  Медиа
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-4">
                  {imagesList &&
                    imagesList.map((item) => (
                      <div
                        key={item.id}
                        className="aspect-video bg-slate-200 rounded-xl overflow-hidden group border border-slate-200 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 dark:bg-neutral-900 dark:border-neutral-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-wide border-b border-slate-200 pb-3 mb-4 dark:text-white dark:border-neutral-700">
                    Детали издания
                  </h3>

                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
                        Дата релиза
                      </span>
                      {game.release_date && (
                        <span className="text-slate-800 font-medium dark:text-neutral-200">
                          {game.release_date}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
                        Разработчик
                      </span>
                      {game.developer && (
                        <span className="text-slate-800 font-medium dark:text-neutral-200">
                          {game.developer}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
                        Издатель
                      </span>
                      {game.publisher && (
                        <span className="text-slate-800 font-medium dark:text-neutral-200">
                          {game.publisher}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
                        Жанр
                      </span>
                      {game.genre && (
                        <span className="text-slate-800 font-medium dark:text-neutral-200">
                          {game.genre}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-600 font-black text-xs uppercase tracking-wider dark:text-white">
                        Статус
                      </span>
                      {game.status && (
                        <span className="text-slate-800 font-medium dark:text-neutral-200">
                          {game.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {requirements && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-neutral-700">
                    <h4 className="text-sm font-black text-slate-800 dark:text-white">
                      Минимальные системные требования
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 dark:text-neutral-200">
                      {requirements.os && <li>ОС: {requirements.os}</li>}
                      {requirements.processor && <li>Процессор: {requirements.processor}</li>}
                      {requirements.memory && <li>Память: {requirements.memory}</li>}
                      {requirements.graphics && <li>Графика: {requirements.graphics}</li>}
                      {requirements.storage && <li>Накопитель: {requirements.storage}</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Game;

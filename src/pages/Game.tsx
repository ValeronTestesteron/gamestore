import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

import type { GameItem, ShortScreenshots } from '../interfaces';

function Game() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [game, setGame] = useState<GameItem>();
  const [imagesList, setImagesList] = useState<ShortScreenshots[]>([]);
  const [gameDlsList, setGameDlsList] = useState<GameItem[]>([]);
  const [gameOtherList, setGameOtherList] = useState<GameItem[]>([]);

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchGame = async () => {
      try {
        const [gameRes, shotsRes, gameDlsRes, gameOtherRes] = await Promise.allSettled([
          axios.get(`${BASE_URL}/games/${slug}?key=${API_KEY}`),
          axios.get(`${BASE_URL}/games/${slug}/screenshots?key=${API_KEY}`),
          axios.get(`${BASE_URL}/games/${slug}/additions?key=${API_KEY}`),
          axios.get(`${BASE_URL}/games/${slug}/game-series?key=${API_KEY}`),
        ]);
        if (gameRes.status === 'fulfilled') setGame(gameRes.value.data.results);
        if (shotsRes.status === 'fulfilled') setImagesList(shotsRes.value.data.results);
        if (gameDlsRes.status === 'fulfilled') setGameDlsList(gameDlsRes.value.data.results);
        if (gameOtherRes.status === 'fulfilled') setGameOtherList(gameOtherRes.value.data.results);
      } catch (e) {
        console.log(`Ошибка загрузки ${e instanceof Error ? e.message : e}`);
      }
    };

    fetchGame();
  }, [slug]);

  return (
    <>
      {game && (
        <>
          <div className="relative flex items-center min-h-[500px] w-full overflow-hidden">
            <div className="container relative w-full mx-auto z-1">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-md">
                {game.name}
              </h1>
              <span className="px-2.5 py-1 text-white">{game.released}</span>
            </div>
            <img
              src={game.background_image || game.background_image_additional}
              alt={game.name}
              className="absolute top-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50"></div>
          </div>

          <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 space-y-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Доступно на:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {game.platforms &&
                    game.platforms.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white text-slate-600 font-medium px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                        {item.platform.name}
                      </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-wide mt-10">О проекте</h3>
                <div className="text-slate-600 leading-relaxed text-base md:text-lg space-y-4">
                  {game.description_raw}
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-wide mt-5">Медиа</h3>
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-4">
                  {imagesList &&
                    imagesList.map((item) => (
                      <div
                        key={item.id}
                        className="aspect-video bg-slate-200 rounded-xl overflow-hidden group border border-slate-200 shadow-sm">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    ))}
                </div>

                <div className="space-y-3 pt-4 border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Теги
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {game.tags &&
                      game.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full shadow-sm hover:bg-slate-50 transition cursor-default">
                          {tag.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="items-start space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-wide border-b border-slate-200 pb-3 mb-4">
                    Детали издания
                  </h3>

                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Дата релиза
                      </span>
                      {game.released && (
                        <span className="text-slate-800 font-medium">{game.released}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Разработчик
                      </span>
                      {game.developers &&
                        game.developers.map((item) => (
                          <span key={item.id} className="text-slate-800 font-medium">
                            {item.name}
                          </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Издатель
                      </span>
                      {game.publishers &&
                        game.publishers.map((item) => (
                          <span key={item.id} className="text-slate-800 font-medium">
                            {item.name}
                          </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Категории
                      </span>
                      {game.genres && (
                        <span className="text-slate-800 font-medium">
                          {game.genres.map((item) => item.name).join(', ')}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Дополнения (DLC)
                      </span>
                      {gameDlsList &&
                        gameDlsList.map((dlc) => (
                          <Link key={dlc.id} to={`/games/${dlc.slug}`}>
                            {dlc.name}
                          </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">
                        Другие игры серии
                      </span>
                      {gameOtherList &&
                        gameOtherList.map((game) => (
                          <span key={game.id} className="text-slate-700">
                            <Link to={`/games/${game.slug}`}>{game.name}</Link>
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center">
                      <span className="text-base font-black text-emerald-700">
                        {game.metacritic}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Metascore</h4>
                      <p className="text-xs text-slate-400">Всеобщее признание</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-amber-50 border-4 border-amber-400 flex items-center justify-center">
                      <span className="text-base font-black text-amber-700">4.7</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">RAWG Rating</h4>
                      <p className="text-xs text-slate-400">На основе отзывов</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Game;

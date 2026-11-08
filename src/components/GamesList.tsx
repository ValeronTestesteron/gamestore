import { Link } from 'react-router-dom';

import EmblaCatousel from './ui/EmblaCarousel';

import type { ShortScreenshots } from '../interfaces';

type GameListProps = {
  id: number;
  slug: string;
  name: string;
  released?: string;
  background_image?: string;
  metacritic?: number;
  short_screenshots?: ShortScreenshots[];
};

function GamesList({
  id,
  slug,
  name,
  background_image,
  metacritic,
  released,
  short_screenshots,
}: GameListProps) {
  return (
    <div key={id} className="bg-white rounded-xl border border-gray-200">
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-500">
        {short_screenshots ? (
          <EmblaCatousel slides={short_screenshots} />
        ) : (
          <img src={background_image} alt={name} className="h-full w-full object-cover" />
        )}

        {metacritic && (
          <div className="metascore absolute flex items-center justify-center top-2 right-3 w-9 h-9 rounded-3xl font-semibold bg-green-500 text-white z-1">
            {metacritic}
          </div>
        )}
      </div>
      <Link to={`/games/${slug}`}>
        <div className="p-5">
          <h3 className="text-slate-700 line-clamp-2 text-xl font-bold">{name}</h3>
          <div className="my-3 h-px bg-slate-700"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <span>
                Релиз: <span className="font-medium text-slate-300">{released}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GamesList;

import { Link } from 'react-router-dom';

type GameListProps = {
  id: number;
  title: string;
  thumbnail: string;
  release_date: string;
  genre: string;
};

function GamesList({ id, title, thumbnail, release_date, genre }: GameListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 dark:bg-[#1e1f21] dark:border-neutral-700">
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-500">
        <img src={thumbnail} alt={title} className="h-full w-full object-cover" />

        <div className="absolute flex items-center justify-center top-2 right-3 px-2 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-white z-1">
          {genre}
        </div>
      </div>
      <Link to={`/games/${id}`}>
        <div className="p-5">
          <h3 className="text-slate-700 line-clamp-2 text-xl font-bold dark:text-white">{title}</h3>
          <div className="my-3 h-px bg-slate-700 dark:bg-neutral-700"></div>

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
                Релиз: <span className="font-medium text-slate-300">{release_date}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GamesList;

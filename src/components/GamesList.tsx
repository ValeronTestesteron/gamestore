import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { addGame } from '../redux/slices/wishSlice';

type GameListProps = {
  id: number;
  title: string;
  thumbnail: string;
  release_date: string;
  genre: string;
  platform: string;
};

function GamesList({ id, title, thumbnail, release_date, genre, platform }: GameListProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl border border-gray-200 dark:bg-[#1e1f21] dark:border-neutral-700">
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-500">
        <Link to={`/game/${id}`}>
          <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
          <div className="absolute flex items-center justify-center top-2 right-3 px-2 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-white z-1">
            {genre}
          </div>
        </Link>
      </div>
      <div className="p-5">
        <h3 className="flex justify-between text-slate-700 line-clamp-2 text-xl font-bold dark:text-white">
          {title}
          <svg
            className="w-6 h-6 text-stone-700 dark:text-white cursor-pointer"
            onClick={() =>
              dispatch(addGame({ id, title, thumbnail, release_date, genre, platform }))
            }
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </g>
          </svg>
        </h3>
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
    </div>
  );
}

export default GamesList;

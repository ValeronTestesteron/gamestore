import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addGame } from '../../redux/slices/wishSlice';
import { useGetGamesQuery } from '../../redux/api/gameApi';

import type { GameItem, Wishlist } from '../../interfaces';

interface IForm {
  title: string;
  genre: string;
  gameUrl: string;
  platform: 'PC (Windows)' | 'Web Browser';
  freeVersion: boolean;
}

function AddGameForm() {
  const { register, handleSubmit, formState, setValue, control, setError, reset } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      genre: '',
    },
  });
  const { data } = useGetGamesQuery({});
  const genres = useAppSelector((state) => state.filterSlice.categories);
  const [selectGame, setSelectGame] = useState<GameItem | null>(null);
  const [openPromtPopup, setOpenPromtPopup] = useState(false);

  const dispatch = useAppDispatch();

  const gameNameError = formState.errors['title']?.message;
  const gameGenresError = formState.errors['genre']?.message;
  const gameUrlError = formState.errors['gameUrl']?.message;
  const gamePlatformError = formState.errors['platform']?.message;
  const title = useWatch({ control, name: 'title' });

  const searchGame = useMemo(() => {
    const query = (title ?? '').trim().toLowerCase();
    if (!query) return [];

    return data && data.filter((it) => it.title.toLowerCase().includes(query)).slice(0, 8);
  }, [data, title]);

  const pickGame = (game: GameItem) => {
    setValue('title', game.title, { shouldValidate: true, shouldDirty: true });
    setSelectGame(game);
    setOpenPromtPopup(false);
  };

  const onSubmit: SubmitHandler<IForm> = () => {
    const matchTitleGame =
      data && data.find((it) => it.title.toLowerCase().includes(title.trim().toLowerCase()));

    if (!selectGame || !matchTitleGame) {
      setError('title', { message: 'Такой игры нет, выбирите из выпадающего списка' });
      return;
    }

    const wishitem: Wishlist = {
      id: selectGame.id,
      title: selectGame.title,
      genre: selectGame.genre,
      platform: selectGame.platform,
      thumbnail: selectGame.thumbnail,
      release_date: selectGame.release_date,
    };

    dispatch(addGame(wishitem));
    setSelectGame(null);
    reset();
  };

  return (
    <div className="max-w-sm w-full rounded-xl border border-stone-200 bg-white p-6 text-stone-700 shadow-xl transition-colors dark:border-stone-800 dark:bg-[#1e1f21] dark:text-white">
      <h2 className="mb-1 text-xl font-bold text-stone-900 dark:text-white">Добавить в лист</h2>
      <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
        Заполните данные, чтобы мы добавили игру
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Название игры
          </label>
          {gameNameError && <p className="mt-1 mb-2 text-[10px] text-red-600">{gameNameError}</p>}
          <input
            type="text"
            placeholder="Например: Dota 2"
            className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-700 placeholder-stone-400 transition outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-stone-700 dark:bg-[#181818] dark:text-white dark:placeholder-stone-500 dark:focus:border-red-500 dark:focus:ring-red-500"
            {...register('title', {
              required: 'Укажите название',
              onChange: (e) => {
                const value = e.target.value.trim().toLowerCase();
                const match = data?.find((g) => g.title.toLowerCase() === value) ?? null;

                setSelectGame(match);
                setOpenPromtPopup(!match);
              },
            })}
          />
          {searchGame && searchGame.length !== 0 && openPromtPopup && (
            <div className="absolute w-full left-0 pl-3 py-1 bg-white dark:bg-[#181818] rounded-xl border border-stone-300 dark:border-stone-700 text-[14px]">
              {searchGame.map((game) => (
                <div
                  key={game.id}
                  className="cursor-pointer mb-0.5 hover:text-[#1e1f21] dark:hover:text-stone-300"
                  onMouseDown={() => pickGame(game)}>
                  {game.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Жанр
          </label>
          {gameGenresError && (
            <p className="mt-1 mb-2 text-[10px] text-red-600">{gameGenresError}</p>
          )}
          <select
            className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-700 transition outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-stone-700 dark:bg-[#181818] dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
            {...register('genre', { required: 'Укажите ктегорию' })}>
            <option value="" disabled>
              Выберите жанр...
            </option>
            {genres &&
              genres.map((categoryItem, idx) => {
                if (idx === 0) return;
                return (
                  <option key={idx} value={categoryItem.slug}>
                    {categoryItem.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Ссылка на официальный сайт
          </label>
          {gameUrlError && <p className="mt-1 mb-2 text-[10px] text-red-600">{gameUrlError}</p>}
          <input
            type="text"
            placeholder="https://..."
            className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-700 placeholder-stone-400 transition outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-stone-700 dark:bg-[#181818] dark:text-white dark:placeholder-stone-500 dark:focus:border-red-500 dark:focus:ring-red-500"
            {...register('gameUrl', {
              pattern: {
                value: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                message: 'Ссылка должна начинаться с https:// и содержать корректный домен',
              },
            })}
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Платформа
          </span>
          {gamePlatformError && (
            <p className="mt-1 mb-2 text-[10px] text-red-600">{gamePlatformError}</p>
          )}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-stone-700 transition dark:text-stone-200">
              <input
                type="radio"
                value="PC (Windows)"
                className="h-4 w-4 accent-red-600"
                {...register('platform', { required: 'Укажите платформу' })}
              />
              PC (Windows)
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-stone-700 transition dark:text-stone-200 ">
              <input
                type="radio"
                value="Web Browser"
                className="h-4 w-4 accent-red-600"
                {...register('platform', { required: 'Укажите платформу' })}
              />
              Web Browser
            </label>
          </div>
        </div>

        <div className="pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-stone-700 transition dark:text-stone-200">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-stone-300 accent-red-600 dark:border-stone-700 dark:bg-[#181818]"
              {...register('freeVersion')}
            />
            Игра полностью бесплатна (Free-to-Play)
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="w-1/3 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50">
            Добавить
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectGame(null);
            }}
            className="w-1/3 cursor-pointer rounded-lg border border-stone-300 bg-transparent px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-[#181818] dark:text-white dark:hover:bg-slate-800">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGameForm;

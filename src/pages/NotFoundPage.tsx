import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-xl text-stone-700 dark:text-white">
        <p className="text-7xl sm:text-9xl font-extrabold text-red-700 tracking-tight">404</p>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">Страница не найдена</h1>

        <p className="mt-6 text-base sm:text-lg leading-5">
          Извините, мы не смогли найти страницу, которую вы ищете. Возможно, она была удалена или вы
          перешли по неверной ссылке.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-3 text-sm font-semibold rounded-xl transition cursor-pointer text-white bg-[#181818] dark:bg-stone-700 hover:bg-slate-800 dark:hover:bg-neutral-800">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

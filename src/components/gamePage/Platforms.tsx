type PlatformsProps = {
  platforms?: string;
};

function Platforms({ platforms }: PlatformsProps) {
  return (
    <>
      {platforms && (
        <>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white mb-3">
            Доступно на:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs bg-white font-bolt text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm dark:bg-neutral-800 dark:text-white dark:border-neutral-700">
              {platforms}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default Platforms;

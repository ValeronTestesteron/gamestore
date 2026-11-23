type GameDescriptionProps = {
  description?: string;
};

function GameDescription({ description }: GameDescriptionProps) {
  return (
    <>
      {description && (
        <>
          <h3 className="text-xl font-bold text-slate-600 tracking-wide mt-10 dark:text-white sm:text-2xl">
            О проекте
          </h3>
          <div className="text-slate-500 leading-relaxed text-base md:text-lg space-y-4 dark:text-neutral-300">
            {description}
          </div>
        </>
      )}
    </>
  );
}

export default GameDescription;

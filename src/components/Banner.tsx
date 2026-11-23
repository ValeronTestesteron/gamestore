type BannerProps = {
  title?: string;
  thumbnail?: string;
  short_description?: string;
  release_date?: string;
};

function Banner({ title, thumbnail, short_description, release_date }: BannerProps) {
  return (
    <div className="relative flex items-center min-h-[360px] sm:min-h-[500px] w-full overflow-hidden">
      <div className="container relative w-full mx-auto z-1 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-md">
          {title}
        </h1>
        <div className="px-0 py-1 text-sm text-white sm:px-2.5 sm:text-base">
          {short_description} <br /> {release_date}
        </div>
      </div>
      <img
        src={thumbnail}
        fetchPriority="high"
        decoding="async"
        alt={title}
        className="absolute top-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50"></div>
    </div>
  );
}

export default Banner;

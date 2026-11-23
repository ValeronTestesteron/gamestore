import EmblaCatousel from '../ui/EmblaCarousel';

import type { ShortScreenshots } from '../../interfaces';

type PhotosProps = {
  screenshots: ShortScreenshots[];
};

function Photos({ screenshots }: PhotosProps) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900 tracking-wide mt-5 dark:text-white sm:text-2xl">
        Медиа
      </h3>
      <EmblaCatousel slides={screenshots} />
    </>
  );
}

export default Photos;

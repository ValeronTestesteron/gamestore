import EmblaCatousel from '../ui/EmblaCarousel';

import type { ShortScreenshots } from '../../interfaces';

type PhotosProps = {
  screenshots: ShortScreenshots[];
};

function Photos({ screenshots }: PhotosProps) {
  return (
    <>
      <h3 className="text-2xl font-bold text-slate-900 tracking-wide mt-5 dark:text-white">
        Медиа
      </h3>
      <EmblaCatousel slides={screenshots} />
    </>
  );
}

export default Photos;

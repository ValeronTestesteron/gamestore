import { lazy, Suspense, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const ImagePopup = lazy(() => import('../../popup/ImagePopup'));

import FullScreenLoader from '../FullScreenLoader';

import type { ShortScreenshots } from '../../../interfaces';

type EmblaCatouselProps = {
  slides: ShortScreenshots[];
};

function EmblaCatousel({ slides }: EmblaCatouselProps) {
  const [emblaRef] = useEmblaCarousel({ slidesToScroll: 2 });
  const [popupImage, setPopupImage] = useState<string | null>(null);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                onClick={() => setPopupImage(slide.image)}
                className="embla__slide flex-[0_0_100%] min-w-0 rounded-xl overflow-hidden cursor-pointer sm:flex-[0_0_49%]">
                <img
                  src={slide.image}
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {popupImage && (
        <Suspense fallback={<FullScreenLoader />}>
          <ImagePopup image={popupImage} onClear={() => setPopupImage(null)} />
        </Suspense>
      )}
    </>
  );
}

export default EmblaCatousel;

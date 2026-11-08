import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';

import type { ShortScreenshots } from '../../../interfaces';

type EmblaCatouselProps = {
  slides: ShortScreenshots[];
};

function EmblaCatousel({ slides }: EmblaCatouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on('init', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, idx) => (
            <div key={idx} className="embla__slide">
              <img src={slide.image} alt="" className="h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots absolute bottom-4 w-full flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`embla__dot cursor-pointer ${index === selectedIndex ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default EmblaCatousel;

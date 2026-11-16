import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ImagePopupProps = {
  image: string;
  onClear: () => void;
};

function ImagePopup({ image, onClear }: ImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') slowCLose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image]);

  const slowCLose = () => {
    setIsOpen(true);
    setTimeout(() => {
      onClear();
      setIsOpen(false);
    }, 200);
  };

  if (!image) return null;

  return createPortal(
    <div
      className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/85 p-13 cursor-zoom-out"
      onClick={() => slowCLose()}>
      <svg
        className="w-5 h-5 absolute top-5 right-7 text-stone-700 cursor-pointer"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#fff"
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
      </svg>
      <div>
        <img
          src={image}
          className={`max-h-full max-w-[1200px] w-full rounded-lg object-cover ${isOpen ? 'animate-zoom-out' : 'animate-zoom-in'}`}
          onClick={(e) => e.stopPropagation()}
          alt=""
        />
      </div>
    </div>,
    document.body,
  );
}

export default ImagePopup;

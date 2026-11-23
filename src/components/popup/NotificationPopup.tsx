import { createPortal } from 'react-dom';

type NotificationPopupProps = {
  notification: string;
};

function NotificationPopup({ notification }: NotificationPopupProps) {
  if (!notification) return;

  return createPortal(
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-[400px] max-h-[150px] h-full rounded-lg animate-zoom-in bg-stone-800 dark:bg-white sm:w-full">
      <div className="flex items-center justify-center h-full text-white dark:text-black text-lg font-bold">
        {notification}
      </div>
    </div>,
    document.body,
  );
}

export default NotificationPopup;

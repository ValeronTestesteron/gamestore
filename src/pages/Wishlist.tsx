import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearMessage } from '../redux/slices/wishSlice';

import WishlistBox from '../components/wishlist/WishlistBox';
import NotificationPopup from '../components/popup/NotificationPopup';
import AddGameForm from '../components/form/AddGameForm';

function Wishlist() {
  const wishlist = useAppSelector((state) => state.wishSlice.items);
  const notification = useAppSelector((state) => state.wishSlice.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessage());
    }, 1400);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-0">
      <h1 className="text-2xl font-bold sm:text-3xl">Игры в котрые вы бы хотели поиграть:</h1>

      <div className="mt-10 flex flex-col gap-6 sm:mt-20 lg:flex-row lg:justify-between">
        <WishlistBox items={wishlist} />

        <div className="w-full max-w-[390px] 2xl:max-w-[600px]">
          <AddGameForm />
        </div>
      </div>

      {notification && <NotificationPopup notification={notification} />}
    </div>
  );
}

export default Wishlist;

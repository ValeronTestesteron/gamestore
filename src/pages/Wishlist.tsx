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
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Игры в котрые вы бы хотели поиграть:</h1>

      <div className="flex justify-between gap-6 mt-20">
        <WishlistBox items={wishlist} />

        <div className="max-w-[600px] w-full">
          <AddGameForm />
        </div>
      </div>

      {notification && <NotificationPopup notification={notification} />}
    </div>
  );
}

export default Wishlist;

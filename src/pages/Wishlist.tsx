import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearMessage } from '../redux/slices/wishSlice';

import WishlistBox from '../components/wishlist/WishlistBox';
import NotificationPopup from '../components/popup/NotificationPopup';

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

      <WishlistBox items={wishlist} />

      {notification && <NotificationPopup notification={notification} />}
    </div>
  );
}

export default Wishlist;

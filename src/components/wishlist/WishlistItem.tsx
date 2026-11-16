import { useAppDispatch } from '../../redux/store';
import { removeGame, setWishStatus } from '../../redux/slices/wishSlice';

import type { Wishlist } from '../../interfaces';

type WishlistItemProps = {
  item: Wishlist;
};

function WishlistItem({ item }: WishlistItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="wish__item w-full flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img className="w-40 h-25" src={item.thumbnail} alt="" />
        <div className="ml-4">
          <div className="text-2xl font-bold">{item.title}</div>
          <div className="text-sm">{item.genre}</div>
          <div className="text-sm">{item.platform}</div>
          <div className="text-sm">{item.release_date}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <svg
          onClick={() => dispatch(setWishStatus(item.id))}
          className={`w-6 h-6 cursor-pointer ${item.wishstatus === 'played' ? 'text-stone-700 dark:text-white' : 'text-red-700'}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </g>
        </svg>

        <svg
          onClick={() => {
            dispatch(removeGame(item.id));
          }}
          className="w-5 h-5 cursor-pointer text-stone-700 dark:text-white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      </div>
    </div>
  );
}

export default WishlistItem;

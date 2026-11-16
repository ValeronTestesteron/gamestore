import type { Wishlist } from '../../interfaces';
import WishlistItem from './WishlistItem';

type WishlistBoxProps = {
  items: Wishlist[];
};

function WishlistBox({ items }: WishlistBoxProps) {
  if (!items.length) return <div className="mt-20 text-lg">Сейчас в вашем листе ничего нет</div>;

  return (
    <div className="wish__box max-w-[600px] mt-20">
      {items.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default WishlistBox;

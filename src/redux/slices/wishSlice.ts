import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Wishlist } from '../../interfaces';

interface WishSliceProps {
  items: Wishlist[];
  message: string | null;
}

const items: Wishlist[] = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

const initialState: WishSliceProps = {
  items,
  message: null,
};

const wishSlice = createSlice({
  name: 'wishSlice',
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<Wishlist>) {
      if (state.items.some((game) => game.id === action.payload.id)) {
        state.message = 'Такая игра уже есть в списке!';
        return;
      }
      const wishItem: Wishlist = { ...action.payload, wishstatus: 'played' };
      state.items = [...state.items, wishItem];
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    setWishStatus(state, action: PayloadAction<number>) {
      state.items = state.items.map((game): Wishlist => {
        if (game.id === action.payload) {
          if (game.wishstatus) {
            const status = game.wishstatus === 'played' ? 'notplayed' : 'played';
            return { ...game, wishstatus: status };
          }

          return { ...game, wishstatus: 'played' };
        }
        return game;
      });
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    removeGame(state, action: PayloadAction<number>) {
      state.items = state.items.filter((game) => game.id !== action.payload);
      state.message = 'Игра удалена из списка';
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const { addGame, removeGame, setWishStatus, clearMessage } = wishSlice.actions;

export default wishSlice.reducer;

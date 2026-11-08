import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Genres, SortItem } from '../../interfaces';

interface filterSliceState {
  categoryId: number;
  genres: Genres[];
  currentSort: SortItem | null;
  sortOptions: SortItem[];
  currentPage: number;
  debounceQuery: string;
}

const initialState: filterSliceState = {
  categoryId: 0,
  genres: [
    { id: 4, name: 'Action', slug: 'action' },
    { id: 51, name: 'Indie', slug: 'indie' },
    { id: 3, name: 'Adventure', slug: 'adventure' },
    { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' },
    { id: 10, name: 'Strategy', slug: 'strategy' },
    { id: 2, name: 'Shooter', slug: 'shooter' },
    { id: 59, name: 'Massively Multiplayer', slug: 'massively-multiplayer' },
    { id: 15, name: 'Sport', slug: 'sport' },
  ],
  currentSort: null,
  sortOptions: [
    { name: 'Названию', sorting: 'name' },
    { name: 'Дате выхода', sorting: 'released' },
    { name: 'Популярности', sorting: 'added' },
    { name: 'Рейтингу', sorting: 'rating' },
  ],
  currentPage: 1,
  debounceQuery: '',
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setCurrentSort(state, action: PayloadAction<SortItem>) {
      state.currentSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setDebounceQuery(state, action: PayloadAction<string>) {
      state.debounceQuery = action.payload;
    },
  },
});

export const { setCategoryId, setCurrentSort, setCurrentPage, setDebounceQuery } =
  filterSlice.actions;

export default filterSlice.reducer;

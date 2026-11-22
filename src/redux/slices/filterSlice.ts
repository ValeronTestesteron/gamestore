import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Category, SortItem } from '../../interfaces';

interface filterSliceState {
  categories: Category[];
  sortOptions: SortItem[];
  currentPage: number;
  gamePerPage: number;
  debounceQuery: string;
}

const initialState: filterSliceState = {
  categories: [
    { name: 'Все', slug: '' },
    { name: 'Action', slug: 'action' },
    { name: 'Shooter', slug: 'shooter' },
    { name: 'MMORPG', slug: 'mmorpg' },
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Racing', slug: 'racing' },
    { name: 'Battle Royale', slug: 'battle-royale' },
    { name: 'Fantasy', slug: 'fantasy' },
    { name: 'Sci-Fi', slug: 'sci-fi' },
    { name: 'Fighting', slug: 'fighting' },
    { name: 'Horror', slug: 'horror' },
  ],
  sortOptions: [
    { name: 'Названию', sorting: 'alphabetical' },
    { name: 'Дате выхода', sorting: 'release-date' },
    { name: 'Популярности', sorting: 'popularity' },
    { name: 'Релевантности', sorting: 'relevance' },
  ],
  currentPage: 1,
  gamePerPage: 12,
  debounceQuery: '',
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setDebounceQuery(state, action: PayloadAction<string>) {
      state.debounceQuery = action.payload;
    },
  },
});

export const { setCurrentPage, setDebounceQuery } = filterSlice.actions;

export default filterSlice.reducer;

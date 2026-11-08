import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import gamesSlice from './slices/gamesSlice';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: { filterSlice, gamesSlice },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

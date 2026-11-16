import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import { gameApi } from './api/gameApi';
import filterSlice from './slices/filterSlice';
import themeSlice from './slices/themeSlice';
import wishSlice from './slices/wishSlice';

export const store = configureStore({
  reducer: { filterSlice, themeSlice, wishSlice, [gameApi.reducerPath]: gameApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
});

setupListeners(store.dispatch);

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

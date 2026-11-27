import type { ReactElement, ReactNode } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';

import { gameApi } from '../redux/api/gameApi';
import filterSlice from '../redux/slices/filterSlice';
import themeSlice from '../redux/slices/themeSlice';
import wishSlice from '../redux/slices/wishSlice';
import type { RootType } from '../redux/store';

const rootReducer = combineReducers({
  filterSlice,
  themeSlice,
  wishSlice,
  [gameApi.reducerPath]: gameApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootType>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
    preloadedState,
  });
}

type Options = {
  preloadedState?: Partial<RootType>;
  route?: string;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
};

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/', renderOptions }: Options = {},
): RenderResult & { store: ReturnType<typeof setupStore> } {
  const store = setupStore(preloadedState);

  return {
    store,
    ...render(ui, {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </Provider>
      ),
      ...renderOptions,
    }),
  };
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GameDetail, GameItem } from '../../interfaces';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getGames: build.query<GameItem[], void | string>({
      query: () => '/games',
    }),
    getGameById: build.query<GameDetail, string>({
      query: (id) => `/game?id=${id}`,
    }),
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gameApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GameDetail, GameItem } from '../../interfaces';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://corsproxy.io';;

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getGames: build.query<GameItem[], { category?: string; sort?: string }, void>({
      query: (params) => ({
        url: '/games',
        params: {
          category: params?.category || undefined,
          'sort-by': params?.sort,
        },
      }),
    }),
    getGameById: build.query<GameDetail, string>({
      query: (id) => ({ url: '/game', params: { id } }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gameApi;

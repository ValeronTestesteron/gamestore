import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import type { GameItem, GameResponse } from '../../interfaces';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FetchGamesArgs {
  category?: string;
  sortUrl?: string;
}

export const fetchGames = createAsyncThunk<GameResponse, FetchGamesArgs>(
  'gamesSlice/fetchGameByParams',
  async (params) => {
    const { category = '', sortUrl = '' } = params;
    const { data } = await axios.get(`${BASE_URL}/api/games`, {
      params: {
        ...(category ? { category } : {}),
        ...(sortUrl ? { 'sort-by': sortUrl } : {}),
      },
    });
    // FreeToGame возвращает массив без пагинации — оборачиваем в привычную форму
    return { count: data.length, results: data as GameItem[] };
  },
);

interface GameSliceState {
  games: GameResponse;
  status: 'loading' | 'success' | 'error';
}

const initialState: GameSliceState = {
  games: { count: 0, results: [] },
  status: 'loading',
};

const gamesSlice = createSlice({
  name: 'gamesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.games.results = [];
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.status = 'success';
      })
      .addCase(fetchGames.rejected, (state) => {
        state.games.results = [];
        state.status = 'error';
      });
  },
});

export default gamesSlice.reducer;

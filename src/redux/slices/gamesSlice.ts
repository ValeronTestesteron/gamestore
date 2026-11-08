import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import type { GameResponse } from '../../interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FetchGamesArgs {
  categoryUrl?: string;
  sortUrl?: string;
  pageUrl?: string;
  queryUrl?: string;
}

export const fetchGames = createAsyncThunk<GameResponse, FetchGamesArgs>(
  'gamesSlice/fetchGameByParams',
  async (params) => {
    const { categoryUrl = '', sortUrl = '', pageUrl = '', queryUrl = '' } = params;
    const { data } = await axios.get(
      `${BASE_URL}/games?${queryUrl}${categoryUrl}${sortUrl}${pageUrl}page_size=12&key=${API_KEY}`,
    );
    return data;
  },
);

interface GameSliceState {
  games: GameResponse;
  status: 'loading' | 'success' | 'error';
}

const initialState: GameSliceState = {
  games: { count: 0, next: null, previous: null, results: [] },
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

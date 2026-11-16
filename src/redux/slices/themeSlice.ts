import { createSlice } from '@reduxjs/toolkit';

interface themeSliceProps {
  theme: 'light' | 'dark';
}

const themeColor = localStorage.getItem('themeColor') === 'dark' ? 'dark' : 'light';

const initialState: themeSliceProps = {
  theme: themeColor,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

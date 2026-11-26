import { describe, expect, it, vi } from 'vitest';

import wishSlice, { addGame } from './wishSlice';

import type { Wishlist } from '../../interfaces';

const testGame: Wishlist = {
  id: 1,
  title: 'Test',
  thumbnail: 'tetsturl/image',
  genre: 'Shooter',
  platform: 'Windows',
  release_date: '2022-01-12.',
  wishstatus: 'played',
};

const testGame1: Wishlist = {
  id: 1,
  title: 'Test1',
  thumbnail: 'tetsturl/image',
  genre: 'Shooter',
  platform: 'Windows',
  release_date: '2022-01-12.',
  wishstatus: 'played',
};
const testGame2: Wishlist = {
  id: 2,
  title: 'Test2',
  thumbnail: 'tetsturl/image',
  genre: 'Shooter',
  platform: 'Windows',
  release_date: '2022-01-12.',
  wishstatus: 'played',
};

describe('wishSlice', () => {
  it('Инициализация Wishlist из localStorage - значения еще небыло', async () => {
    localStorage.removeItem('wishlist');
    vi.resetModules();
    const { default: wishSlice } = await import('./wishSlice');
    const state = wishSlice(undefined, { type: 'unknown' });

    expect(state.items).toEqual([]);
  });

  it('Инициализация Wishlist из localStorage', async () => {
    localStorage.setItem('wishlist', JSON.stringify([testGame]));
    vi.resetModules();
    const { default: wishSlice } = await import('./wishSlice');
    const state = wishSlice(undefined, { type: 'unknown' });

    expect(state.items).toEqual([testGame]);
  });

  it('Добавление игры в пустой Wishlist', () => {
    const initialState = {
      items: [],
      message: null,
    };

    const state = wishSlice(initialState, addGame(testGame));

    expect(state.items).toEqual([testGame]);
  });

  it('Добавление в Wishlist игры к уже существующим', () => {
    const initialState = {
      items: [testGame1],
      message: null,
    };

    const state = wishSlice(initialState, addGame(testGame2));

    expect(state.items).toEqual([testGame1, testGame2]);
  });

  it('Попытка повторно добавить существующую игру в Wishlist', () => {
    const initialState = {
      items: [testGame],
      message: null,
    };

    const state = wishSlice(initialState, addGame(testGame1));

    expect(state.items).toEqual([testGame]);
    expect(state.message).toBe('Такая игра уже есть в списке!');
  });

  it('Сохранение добавленной игры в localStorage при пустом Wishlist', () => {
    const initialState = {
      items: [],
      message: null,
    };

    wishSlice(initialState, addGame(testGame));

    const savedItems = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

    expect(savedItems).toEqual([testGame]);
  });

  it('Сохранение добавленной игры в localStorage к уже существующим', () => {
    const initialState = {
      items: [testGame1],
      message: null,
    };
    wishSlice(initialState, addGame(testGame2));

    const savedItem = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

    expect(savedItem).toEqual([testGame1, testGame2]);
  });

  it('Попытка повторного сохранения добавленной игры в localStorage', () => {
    localStorage.setItem('wishlist', JSON.stringify([testGame]));

    const initialState = {
      items: [testGame],
      message: null,
    };

    wishSlice(initialState, addGame(testGame1));

    const savedItem = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

    expect(savedItem).toEqual([testGame]);
  });
});

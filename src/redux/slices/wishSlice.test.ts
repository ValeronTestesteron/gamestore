import { beforeEach, describe, expect, it, vi } from 'vitest';

import wishSlice, { addGame, clearMessage, removeGame, setWishStatus } from './wishSlice';

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

const notPlayedGame: Wishlist = {
  ...testGame2,
  wishstatus: 'notplayed',
};

describe('wishSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

  it('Добавление игры без статуса сохраняет статус played', () => {
    const initialState = {
      items: [],
      message: null,
    };

    const state = wishSlice(initialState, addGame({ ...testGame, wishstatus: undefined }));

    expect(state.items[0].wishstatus).toBe('played');
  });

  it('Добавление игры со статусом notplayed сохраняет статус played', () => {
    const initialState = {
      items: [],
      message: null,
    };

    const state = wishSlice(initialState, addGame({ ...testGame, wishstatus: 'notplayed' }));

    expect(state.items[0].wishstatus).toBe('played');
  });

  it('При успешном добавлении сообщение не устанавливается', () => {
    const initialState = {
      items: [],
      message: null,
    };

    const state = wishSlice(initialState, addGame(testGame));

    expect(state.message).toBeNull();
  });

  it('Повторное добавление не записывает игру в пустой localStorage', () => {
    const initialState = {
      items: [testGame],
      message: null,
    };

    wishSlice(initialState, addGame(testGame1));

    expect(localStorage.getItem('wishlist')).toBeNull();
  });

  it('Переключение статуса игры с played на notplayed', () => {
    const state = wishSlice({ items: [testGame], message: null }, setWishStatus(testGame.id));

    expect(state.items[0].wishstatus).toBe('notplayed');
  });

  it('Переключение статуса игры с notplayed на played', () => {
    const state = wishSlice({ items: [notPlayedGame], message: null }, setWishStatus(notPlayedGame.id));

    expect(state.items[0].wishstatus).toBe('played');
  });

  it('Установка статуса played, если у игры нет статуса', () => {
    const gameWithoutStatus: Wishlist = { ...testGame, wishstatus: undefined };

    const state = wishSlice({ items: [gameWithoutStatus], message: null }, setWishStatus(testGame.id));

    expect(state.items[0].wishstatus).toBe('played');
  });

  it('Переключение статуса не меняет остальные игры', () => {
    const state = wishSlice(
      { items: [testGame1, testGame2], message: null },
      setWishStatus(testGame2.id),
    );

    expect(state.items[0]).toEqual(testGame1);
    expect(state.items[1].wishstatus).toBe('notplayed');
  });

  it('Попытка переключить статус несуществующей игры', () => {
    const state = wishSlice({ items: [testGame], message: null }, setWishStatus(999));

    expect(state.items).toEqual([testGame]);
  });

  it('Сохранение измененного статуса в localStorage', () => {
    wishSlice({ items: [testGame], message: null }, setWishStatus(testGame.id));

    const savedItems = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

    expect(savedItems).toEqual([{ ...testGame, wishstatus: 'notplayed' }]);
  });

  it('Удаление игры из Wishlist', () => {
    const state = wishSlice(
      { items: [testGame1, testGame2], message: null },
      removeGame(testGame1.id),
    );

    expect(state.items).toEqual([testGame2]);
    expect(state.message).toBe('Игра удалена из списка');
  });

  it('Сохранение Wishlist после удаления игры в localStorage', () => {
    wishSlice({ items: [testGame1, testGame2], message: null }, removeGame(testGame1.id));

    const savedItems = JSON.parse(localStorage.getItem('wishlist') ?? '[]');

    expect(savedItems).toEqual([testGame2]);
  });

  it('Попытка удалить несуществующую игру', () => {
    const state = wishSlice({ items: [testGame], message: null }, removeGame(999));

    expect(state.items).toEqual([testGame]);
    expect(state.message).toBe('Игра удалена из списка');
  });

  it('Очистка сообщения', () => {
    const state = wishSlice({ items: [], message: 'Игра удалена из списка' }, clearMessage());

    expect(state.message).toBeNull();
  });
});

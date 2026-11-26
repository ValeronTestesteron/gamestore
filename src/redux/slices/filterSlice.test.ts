import { describe, it, expect } from 'vitest';

import filterReducer, { setCurrentPage, setDebounceQuery } from './filterSlice';

describe('filterSlice', () => {
  it('Проверка начальный состояний при undefined', () => {
    const state = filterReducer(undefined, { type: 'unknown' });

    expect(state.currentPage).toBe(1);
    expect(state.gamePerPage).toBe(12);
    expect(state.debounceQuery).toBe('');
  });

  it('Изминение текущей страницы', () => {
    const state = filterReducer(undefined, setCurrentPage(3));

    expect(state.currentPage).toBe(3);
  });

  it('Изминение debounce строки запроса в header поиске', () => {
    const state = filterReducer(undefined, setDebounceQuery('Dota 2'));

    expect(state.debounceQuery).toBe('Dota 2');
  });
});

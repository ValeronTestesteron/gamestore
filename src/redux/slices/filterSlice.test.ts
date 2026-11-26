import { describe, it, expect } from 'vitest';

import filterReducer, { setCurrentPage } from './filterSlice';

describe('filterSlice', () => {
  it('Проверка начальный состояний при undefined', () => {
    const state = filterReducer(undefined, { type: 'unknown' });

    expect(state.currentPage).toBe(1);
    expect(state.gamePerPage).toBe(12);
  });

  it('Изминение текущей страницы', () => {
    const state = filterReducer(undefined, setCurrentPage(3));

    expect(state.currentPage).toBe(3);
  });
});

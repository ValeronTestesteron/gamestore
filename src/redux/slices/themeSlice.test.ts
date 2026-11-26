import { describe, expect, it, vi } from 'vitest';
import themeSlice, { toggleTheme } from './themeSlice';

describe('themeSlice', () => {
  it('Проверка цветовой темы из localStorage - установлена темная', async () => {
    localStorage.setItem('themeColor', 'dark');
    vi.resetModules();
    const { default: themeSlice } = await import('./themeSlice');
    const state = themeSlice(undefined, { type: 'unknown' });

    expect(state.theme).toBe('dark');
  });

  it('Проверка цветовой темы из localStorage - установлена светлая', async () => {
    localStorage.setItem('themeColor', 'light');
    vi.resetModules();
    const { default: themeSlice } = await import('./themeSlice');
    const state = themeSlice(undefined, { type: 'unknown' });

    expect(state.theme).toBe('light');
  });

  it('Проверка цветовой темы из localStorage - значения еще небыло', async () => {
    localStorage.removeItem('themeColor');
    vi.resetModules();
    const { default: themeSlice } = await import('./themeSlice');
    const state = themeSlice(undefined, { type: 'unknown' });

    expect(state.theme).toBe('light');
  });

  it('Переключение цветовой темы со светлой на темную', () => {
    const state = themeSlice({ theme: 'light' }, toggleTheme());

    expect(state.theme).toBe('dark');
  });

  it('Переключение цветовой темы с темной на светлую', () => {
    const state = themeSlice({ theme: 'dark' }, toggleTheme());

    expect(state.theme).toBe('light');
  });
});

import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Search from './index';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { useGetGamesQuery } from '../../../redux/api/gameApi';

import type { GameItem } from '../../../interfaces';

vi.mock('../../../redux/api/gameApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../redux/api/gameApi')>();

  return {
    ...actual,
    useGetGamesQuery: vi.fn(),
  };
});

const mockedUseGetGamesQuery = vi.mocked(useGetGamesQuery);

const games: GameItem[] = [
  {
    id: 1,
    title: 'Dota 2',
    thumbnail: 'dota.jpg',
    short_description: 'MOBA',
    game_url: 'https://www.freetogame.com/dota-2',
    genre: 'MOBA',
    platform: 'PC (Windows)',
    release_date: '2013-07-09',
    freetogame_profile_url: 'https://www.freetogame.com/game/1',
  },
  {
    id: 2,
    title: 'Counter-Strike 2',
    thumbnail: 'cs2.jpg',
    short_description: 'Shooter',
    game_url: 'https://www.freetogame.com/counter-strike-2',
    genre: 'Shooter',
    platform: 'PC (Windows)',
    release_date: '2023-09-27',
    freetogame_profile_url: 'https://www.freetogame.com/game/2',
  },
  {
    id: 3,
    title: 'Portal',
    thumbnail: 'portal.jpg',
    short_description: 'Puzzle',
    game_url: 'https://www.freetogame.com/portal',
    genre: 'Puzzle',
    platform: 'Web Browser',
    release_date: '2007-10-10',
    freetogame_profile_url: 'https://www.freetogame.com/game/3',
  },
];

const renderSearch = () =>
  renderWithProviders(<Search className="w-full" placeholder="Найти игру" />);

const typeQuery = (value: string) => {
  fireEvent.change(screen.getByPlaceholderText('Найти игру'), { target: { value } });
};

const runDebounce = (ms = 400) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

describe('Search в хедере', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedUseGetGamesQuery.mockReturnValue({
      data: games,
    } as unknown as ReturnType<typeof useGetGamesQuery>);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('рендерит поле поиска и не показывает список без запроса', () => {
    renderSearch();

    expect(screen.getByPlaceholderText('Найти игру')).toBeInTheDocument();
    expect(screen.queryByText(/Результаты поиска/)).not.toBeInTheDocument();
  });

  it('показывает результаты только после задержки дебаунса', () => {
    renderSearch();

    typeQuery('dota');

    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();
    expect(screen.queryByText('Dota 2')).not.toBeInTheDocument();

    runDebounce(399);
    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();

    runDebounce(1);
    expect(screen.getByText(/Результаты поиска: 1/)).toBeInTheDocument();
    expect(screen.getByText('Dota 2')).toBeInTheDocument();
  });

  it('фильтрует игры по названию без учёта регистра', () => {
    renderSearch();

    typeQuery('DOTA');
    runDebounce();

    expect(screen.getByText(/Результаты поиска: 1/)).toBeInTheDocument();
    expect(screen.getByText('Dota 2')).toBeInTheDocument();
    expect(screen.queryByText('Counter-Strike 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Portal')).not.toBeInTheDocument();
  });

  it('ведёт на страницу игры из результата поиска', () => {
    renderSearch();

    typeQuery('dota');
    runDebounce();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/game/1');
  });

  it('показывает 0 результатов, если совпадений нет', () => {
    renderSearch();

    typeQuery('zzz');
    runDebounce();

    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('сбрасывает таймер дебаунса при новом вводе', () => {
    renderSearch();

    typeQuery('do');
    runDebounce(300);
    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();

    typeQuery('dota');
    runDebounce(300);
    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();

    runDebounce(100);
    expect(screen.getByText(/Результаты поиска: 1/)).toBeInTheDocument();
  });

  it('очищает запрос по кнопке сброса', () => {
    const { container } = renderSearch();

    typeQuery('dota');
    runDebounce();
    expect(screen.getByText('Dota 2')).toBeInTheDocument();

    const clearButton = container.querySelectorAll('svg')[1];
    fireEvent.click(clearButton);

    expect(screen.getByPlaceholderText('Найти игру')).toHaveValue('');
    expect(screen.queryByText(/Результаты поиска/)).not.toBeInTheDocument();
  });

  it('очищает поиск при выборе результата', () => {
    renderSearch();

    typeQuery('dota');
    runDebounce();

    fireEvent.click(screen.getByText('Dota 2'));

    expect(screen.getByPlaceholderText('Найти игру')).toHaveValue('');
    expect(screen.queryByText(/Результаты поиска/)).not.toBeInTheDocument();
  });

  it('не падает, если API не вернул данные', () => {
    mockedUseGetGamesQuery.mockReturnValue({} as unknown as ReturnType<typeof useGetGamesQuery>);

    renderSearch();

    typeQuery('dota');
    runDebounce();

    expect(screen.getByText(/Результаты поиска: 0/)).toBeInTheDocument();
  });
});

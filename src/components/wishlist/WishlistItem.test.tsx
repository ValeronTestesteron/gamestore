import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/renderWithProviders';
import WishlistItem from './WishlistItem';
import type { Wishlist } from '../../interfaces';

const mockGame: Wishlist = {
  id: 42,
  title: 'Cyberpunk 2077',
  genre: 'RPG',
  thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
  platform: 'PC',
  release_date: '2020-12-10',
  wishstatus: 'played',
};

describe('WishlistItem', () => {
  it('Изминения цвета иконки сердца по статус wishstatus:played -> notplayed', () => {
    const { rerender } = renderWithProviders(<WishlistItem key={mockGame.id} item={mockGame} />);

    const svgHearticon = screen.getByLabelText(/Изменить статус/i);
    expect(svgHearticon).toHaveClass('text-stone-700');

    rerender(<WishlistItem key={mockGame.id} item={{ ...mockGame, wishstatus: 'notplayed' }} />);
    expect(svgHearticon).toHaveClass('text-red-700');
  });

  it('Изминения цвета иконки сердца по статус wishstatus:notplayed -> played', () => {
    const { rerender } = renderWithProviders(
      <WishlistItem key={mockGame.id} item={{ ...mockGame, wishstatus: 'notplayed' }} />,
    );

    const svgHearticon = screen.getByLabelText(/Изменить статус/i);
    expect(svgHearticon).toHaveClass('text-red-700');

    rerender(<WishlistItem key={mockGame.id} item={{ ...mockGame, wishstatus: 'played' }} />);
    expect(svgHearticon).toHaveClass('text-stone-700');
  });
});

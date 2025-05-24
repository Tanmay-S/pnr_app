import FavoriteTrains from '../../../app/components/FavoriteTrains';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('FavoriteTrains', () => {
  const mockOnCheckPNR = jest.fn();

  beforeEach(() => {
    mockOnCheckPNR.mockClear();
  });

  it('renders the default favorite trains list', () => {
    const { getByText, getAllByText } = render(<FavoriteTrains onCheckPNR={mockOnCheckPNR} />);

    expect(getByText('Your Favorite Trains')).toBeTruthy();
    expect(getByText('12301')).toBeTruthy();
    expect(getByText('Howrah Rajdhani Express')).toBeTruthy();
    expect(getByText('Howrah (HWH)')).toBeTruthy();
    expect(getAllByText('New Delhi (NDLS)').length).toBeGreaterThan(0);
    expect(getByText('Departs at: 16:55')).toBeTruthy();
    expect(getByText('12951')).toBeTruthy();
    expect(getByText('Mumbai Rajdhani Express')).toBeTruthy();
  });

  it('displays heart icons for removing favorites', () => {
    const { getAllByText } = render(<FavoriteTrains onCheckPNR={mockOnCheckPNR} />);

    const heartIcons = getAllByText('heart');
    expect(heartIcons.length).toBe(2); // Should have 2 heart icons for 2 trains
  });

  it('can interact with heart icons', () => {
    const { getAllByText } = render(<FavoriteTrains onCheckPNR={mockOnCheckPNR} />);

    const heartIcons = getAllByText('heart');

    // Test that we can press the heart icons (this tests the basic UI interaction)
    expect(() => {
      fireEvent.press(heartIcons[0]);
    }).not.toThrow();
  });
});

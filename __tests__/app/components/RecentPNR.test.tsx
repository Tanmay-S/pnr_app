import RecentPNR from '../../../app/components/RecentPNR';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

// Mock NativeAdCard
jest.mock('../../../app/components/NativeAdCard', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    NativeAdCard: () => React.createElement(Text, {}, 'Native Ad Card Mock'),
  };
});

describe('RecentPNR', () => {
  const mockOnSelect = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders "No recent PNR searches" when the recentSearches list is empty', () => {
    const { getByText } = render(
      <RecentPNR recentSearches={[]} onSelect={mockOnSelect} onDelete={mockOnDelete} />
    );
    expect(getByText('No recent PNR searches')).toBeTruthy();
  });

  it('renders the list of recent PNRs when the recentSearches list is not empty', () => {
    const recentSearches = ['111', '222', '333'];
    const { getByText } = render(
      <RecentPNR recentSearches={recentSearches} onSelect={mockOnSelect} onDelete={mockOnDelete} />
    );

    expect(getByText('Recent Searches')).toBeTruthy();
    expect(getByText('111')).toBeTruthy();
    expect(getByText('222')).toBeTruthy();
    expect(getByText('333')).toBeTruthy();
  });

  it('inserts NativeAdCard after every 3rd PNR item', () => {
    const recentSearches = ['111', '222', '333', '444', '555', '666', '777'];
    const { getAllByText } = render(
      <RecentPNR recentSearches={recentSearches} onSelect={mockOnSelect} onDelete={mockOnDelete} />
    );

    // Expect PNRs and Native Ad Card mocks to be rendered
    expect(getAllByText('111')).toBeTruthy();
    expect(getAllByText('222')).toBeTruthy();
    expect(getAllByText('333')).toBeTruthy();
    expect(getAllByText('Native Ad Card Mock')).toHaveLength(2); // Ads after 333 and 666
    expect(getAllByText('444')).toBeTruthy();
    expect(getAllByText('555')).toBeTruthy();
    expect(getAllByText('666')).toBeTruthy();
    expect(getAllByText('777')).toBeTruthy();
  });

  it('calls onSelect when a PNR item is pressed', () => {
    const recentSearches = ['111', '222'];
    const { getByText } = render(
      <RecentPNR recentSearches={recentSearches} onSelect={mockOnSelect} onDelete={mockOnDelete} />
    );

    fireEvent.press(getByText('111'));

    expect(mockOnSelect).toHaveBeenCalledWith('111');
  });

  it('calls onDelete when the delete icon button is pressed for a PNR item', () => {
    const recentSearches = ['111', '222'];
    const { getAllByText } = render(
      <RecentPNR recentSearches={recentSearches} onSelect={mockOnSelect} onDelete={mockOnDelete} />
    );

    fireEvent.press(getAllByText('delete')[0]); // Press the delete icon for the first PNR

    expect(mockOnDelete).toHaveBeenCalledWith('111');
  });
});

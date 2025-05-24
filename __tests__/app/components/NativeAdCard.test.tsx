import { NativeAdCard } from '@/app/components/NativeAdCard';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock react-native-paper Text component
jest.mock('react-native-paper', () => {
  const reactNativePaper = jest.requireActual('react-native-paper');
  const { Text } = require('react-native');
  return {
    ...reactNativePaper,
    Text: ({ children }: any) => <Text>{children}</Text>,
  };
});

describe('NativeAdCard', () => {
  it('renders the native ad card with all elements', () => {
    const { getByText } = render(<NativeAdCard />);

    expect(getByText('Advertisement')).toBeTruthy();
    expect(getByText('Sample Ad Headline')).toBeTruthy();
    expect(getByText('This is a sample tagline')).toBeTruthy();
    expect(getByText('Sample Advertiser')).toBeTruthy();
    expect(getByText('App Store')).toBeTruthy();
    expect(getByText('Free')).toBeTruthy();
    expect(getByText('Install')).toBeTruthy();
  });
});

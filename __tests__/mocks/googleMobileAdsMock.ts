import React from 'react';
import { View } from 'react-native';

export const BannerAd = jest.fn().mockImplementation(({ children, ...props }) => {
  return React.createElement(View, { testID: 'mock-banner-ad', ...props }, children);
});

export const BannerAdSize = {
  BANNER: 'BANNER',
  LARGE_BANNER: 'LARGE_BANNER',
  MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
  FULL_BANNER: 'FULL_BANNER',
  LEADERBOARD: 'LEADERBOARD',
};

export const TestIds = {
  BANNER: 'ca-app-pub-3940256099942544/2934735716',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/4411468910',
  NATIVE: 'ca-app-pub-3940256099942544/3986624511',
};

export const InterstitialAd = {
  createForAdRequest: jest.fn().mockImplementation(() => ({
    addAdEventListener: jest.fn(),
    load: jest.fn(),
    show: jest.fn(),
  })),
};

export const AdEventType = {
  LOADED: 'loaded',
  ERROR: 'error',
  CLOSED: 'closed',
};

export const NativeAd = jest.fn().mockImplementation(() => ({
  render: jest.fn(() => null),
}));

export const NativeAdView = jest.fn().mockImplementation(() => ({
  render: jest.fn(() => null),
}));

const mobileAds = jest.fn().mockReturnValue({
  initialize: jest.fn().mockResolvedValue({}),
});

export default mobileAds;

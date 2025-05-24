import React from 'react';
import { View } from 'react-native';

export const BannerAd = ({ children, ...props }: any) => {
  return React.createElement(View, { testID: 'mock-banner-ad', ...props }, children);
};

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
  createForAdRequest: () => ({
    addAdEventListener: () => {},
    load: () => {},
    show: () => {},
  }),
};

export const AdEventType = {
  LOADED: 'loaded',
  ERROR: 'error',
  CLOSED: 'closed',
};

export const NativeAd = {
  render: () => null,
};

export const NativeAdView = {
  render: () => null,
};

const mobileAds = () => ({
  initialize: () => Promise.resolve({}),
});

export default mobileAds;

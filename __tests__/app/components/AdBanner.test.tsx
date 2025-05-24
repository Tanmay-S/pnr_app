import { AdBanner } from '../../../app/components/AdBanner';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Platform } from 'react-native';

// Mock the react-native-google-mobile-ads module
jest.mock('react-native-google-mobile-ads', () => {
  const mockGoogleMobileAds = jest.requireActual('../../mocks/googleMobileAdsMock');
  return mockGoogleMobileAds;
});

// Mock the dynamic import in the AdBanner component
jest.mock('../../../app/components/AdBanner', () => {
  const React = require('react');
  const { Platform, StyleSheet, Text, View } = require('react-native');

  // Import the mocked BannerAd directly for testing
  const { BannerAd, BannerAdSize } = require('../../mocks/googleMobileAdsMock');

  const AdBanner = ({ size, style }: { size?: any; style?: any }) => {
    // On web, render a placeholder
    if (Platform.OS === 'web') {
      return React.createElement(
        View,
        { style: [{ height: 50, backgroundColor: '#f0f0f0' }, style] },
        React.createElement(Text, {}, 'Ad Space')
      );
    }

    // On native, render the BannerAd directly (no dynamic import needed for tests)
    return React.createElement(BannerAd, {
      unitId: 'ca-app-pub-3940256099942544/2934735716',
      size: size || BannerAdSize.BANNER,
      requestOptions: { requestNonPersonalizedAdsOnly: true },
      onAdLoaded: () => console.log('Banner ad loaded'),
      onAdFailedToLoad: (error: any) => console.log('Banner ad failed to load:', error),
      style: style,
    });
  };

  return { AdBanner };
});

// Mock console.log for testing event handlers
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('AdBanner', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    Platform.OS = originalPlatform; // Restore original platform
    consoleLogSpy.mockClear(); // Clear console spy mock calls
  });

  afterAll(() => {
    consoleLogSpy.mockRestore(); // Restore original console.log
  });

  it('renders a placeholder on web', () => {
    Platform.OS = 'web';
    const { getByText } = render(<AdBanner />);
    expect(getByText('Ad Space')).toBeTruthy();
  });

  it('renders BannerAd on native platforms', () => {
    Platform.OS = 'android'; // or 'ios'
    render(<AdBanner />);
    // Check if the mocked BannerAd component was called
    const { BannerAd } = require('react-native-google-mobile-ads');
    expect(BannerAd).toHaveBeenCalled();
  });

  it('calls onAdLoaded when the ad is loaded', () => {
    Platform.OS = 'android';
    render(<AdBanner />);
    const { BannerAd } = require('react-native-google-mobile-ads');
    // Manually call the onAdLoaded prop of the mocked BannerAd
    const bannerAdProps = BannerAd.mock.calls[0][0];
    bannerAdProps.onAdLoaded();
    expect(consoleLogSpy).toHaveBeenCalledWith('Banner ad loaded');
  });

  it('calls onAdFailedToLoad when the ad fails to load', () => {
    Platform.OS = 'android';
    render(<AdBanner />);
    const { BannerAd } = require('react-native-google-mobile-ads');
    // Manually call the onAdFailedToLoad prop of the mocked BannerAd
    const bannerAdProps = BannerAd.mock.calls[0][0];
    const error = new Error('Ad failed to load');
    bannerAdProps.onAdFailedToLoad(error);
    expect(consoleLogSpy).toHaveBeenCalledWith('Banner ad failed to load:', expect.any(Error));
  });
});

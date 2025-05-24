import { AdConfig } from '@/app/services/adService';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

// Conditionally import BannerAd only on native platforms
let BannerAd: any = null;
let BannerAdSize: any = null;

if (Platform.OS !== 'web') {
  import('react-native-google-mobile-ads')
    .then(googleMobileAds => {
      BannerAd = googleMobileAds.BannerAd;
      BannerAdSize = googleMobileAds.BannerAdSize;
    })
    .catch(_error => {
      console.log('Google Mobile Ads not available');
    });
}

interface AdBannerProps {
  size?: any;
  style?: any;
}

export const AdBanner: React.FC<AdBannerProps> = ({ size, style }) => {
  // On web, render a placeholder or nothing
  if (Platform.OS === 'web' || !BannerAd) {
    return (
      <View style={[styles.container, styles.webPlaceholder, style]}>
        <Text style={styles.placeholderText}>Ad Space</Text>
      </View>
    );
  }

  // On native platforms, render the actual ad
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={AdConfig.banner.unitId}
        size={size || BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(_error: any) => {
          console.log('Banner ad failed to load:', _error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  webPlaceholder: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AdConfig } from '@/app/services/adService';

interface AdBannerProps {
  size?: BannerAdSize;
  style?: any;
}

export const AdBanner: React.FC<AdBannerProps> = ({ size = BannerAdSize.BANNER, style }) => {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={AdConfig.banner.unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={error => {
          console.log('Banner ad failed to load:', error);
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
});

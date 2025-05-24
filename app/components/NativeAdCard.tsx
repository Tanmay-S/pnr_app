import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const NativeAdCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.adLabel}>Advertisement</Text>
      <View style={styles.nativeAdView}>
        <View style={styles.nativeAdContainer}>
          <View style={styles.headerRow}>
            <View style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.headline}>Sample Ad Headline</Text>
              <Text style={styles.tagline}>This is a sample tagline</Text>
              <Text style={styles.advertiser}>Sample Advertiser</Text>
            </View>
          </View>

          <View style={styles.image} />

          <View style={styles.footerRow}>
            <View style={styles.ratingContainer}>
              <View style={styles.starRating} />
              <Text style={styles.store}>App Store</Text>
              <Text style={styles.price}>Free</Text>
            </View>
            <View style={styles.callToAction}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Install</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  nativeAdView: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  nativeAdContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  advertiser: {
    fontSize: 12,
    color: '#999',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  starRating: {
    width: 80,
    height: 16,
    marginRight: 8,
  },
  store: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  callToAction: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
});

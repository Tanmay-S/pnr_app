import { Platform } from 'react-native';

// Conditionally import Google Mobile Ads only on native platforms
let mobileAds: any = null;
let BannerAdSize: any = null;
let TestIds: any = null;
let InterstitialAd: any = null;
let AdEventType: any = null;

if (Platform.OS !== 'web') {
  import('react-native-google-mobile-ads')
    .then(googleMobileAds => {
      mobileAds = googleMobileAds.default;
      BannerAdSize = googleMobileAds.BannerAdSize;
      TestIds = googleMobileAds.TestIds;
      InterstitialAd = googleMobileAds.InterstitialAd;
      AdEventType = googleMobileAds.AdEventType;

      // Initialize Google Mobile Ads only on native platforms
      mobileAds()
        .initialize()
        .then((adapterStatuses: any) => {
          console.log('Google Mobile Ads initialized', adapterStatuses);
        });
    })
    .catch(_error => {
      console.log('Google Mobile Ads not available');
    });
}

// Ad Unit IDs - Use test IDs in development, real IDs in production
export const AD_UNIT_IDS = {
  banner:
    Platform.OS !== 'web' && TestIds
      ? __DEV__
        ? TestIds.BANNER
        : 'ca-app-pub-YOUR_PUBLISHER_ID/BANNER_AD_UNIT_ID'
      : 'web-banner-placeholder',
  interstitial:
    Platform.OS !== 'web' && TestIds
      ? __DEV__
        ? TestIds.INTERSTITIAL
        : 'ca-app-pub-YOUR_PUBLISHER_ID/INTERSTITIAL_AD_UNIT_ID'
      : 'web-interstitial-placeholder',
  native:
    Platform.OS !== 'web' && TestIds
      ? __DEV__
        ? TestIds.NATIVE
        : 'ca-app-pub-YOUR_PUBLISHER_ID/NATIVE_AD_UNIT_ID'
      : 'web-native-placeholder',
};

// Interstitial Ad Management
class InterstitialAdManager {
  private interstitialAd: any = null;
  private isLoaded = false;
  private pnrSearchCount = 0;
  private tabSwitchCount = 0;

  constructor() {
    if (Platform.OS !== 'web' && InterstitialAd) {
      this.loadInterstitialAd();
    }
  }

  private loadInterstitialAd() {
    if (Platform.OS === 'web' || !InterstitialAd) {
      return;
    }

    this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial, {
      requestNonPersonalizedAdsOnly: false,
    });

    if (!this.interstitialAd) {
      console.error('Failed to create interstitial ad');
      return;
    }

    const unsubscribeLoaded = this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      this.isLoaded = true;
      console.log('Interstitial ad loaded');
    });

    const unsubscribeError = this.interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (_error: any) => {
        // Changed 'error' to '_error'
        console.log('Interstitial ad error:', _error);
        this.isLoaded = false;
      }
    );

    const unsubscribeClosed = this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.isLoaded = false;
      // Cleanup listeners
      unsubscribeLoaded();
      unsubscribeError();
      unsubscribeClosed();
      // Preload next ad
      setTimeout(() => this.loadInterstitialAd(), 1000);
    });

    this.interstitialAd.load();
  }

  // Show ad after 3rd PNR search
  onPNRSearch() {
    this.pnrSearchCount++;
    console.log(`PNR search count: ${this.pnrSearchCount}`);

    if (this.pnrSearchCount >= 3 && this.isLoaded && Platform.OS !== 'web') {
      this.showAd();
      this.pnrSearchCount = 0; // Reset counter
    }
  }

  // Show ad occasionally on tab switch (every 5th switch)
  onTabSwitch() {
    this.tabSwitchCount++;
    console.log(`Tab switch count: ${this.tabSwitchCount}`);

    if (this.tabSwitchCount >= 5 && this.isLoaded && Platform.OS !== 'web') {
      this.showAd();
      this.tabSwitchCount = 0; // Reset counter
    }
  }

  private showAd() {
    if (this.interstitialAd && this.isLoaded && Platform.OS !== 'web') {
      console.log('Showing interstitial ad');
      this.interstitialAd.show();
    }
  }
}

// Export singleton instance
export const interstitialAdManager = new InterstitialAdManager();

// Ad configuration for different placements
export const AdConfig = {
  banner: {
    size: BannerAdSize ? BannerAdSize.BANNER : 'BANNER',
    unitId: AD_UNIT_IDS.banner,
  },
  largeBanner: {
    size: BannerAdSize ? BannerAdSize.LARGE_BANNER : 'LARGE_BANNER',
    unitId: AD_UNIT_IDS.banner,
  },
  native: {
    unitId: AD_UNIT_IDS.native,
  },
};

// Native Ad Template Configuration (for future real implementation)
export const nativeAdViewOptions = {
  adChoicesPlacement: 'topRight' as const,
  mediaAspectRatio: 'landscape' as const,
};

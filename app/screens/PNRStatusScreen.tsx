import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

import { AdBanner } from '@/app/components/AdBanner';
import { FavoriteTrains } from '@/app/components/FavoriteTrains';
import PNRInput from '@/app/components/PNRInput';
import PNRStatusCard from '@/app/components/PNRStatusCard';
import RecentPNR from '@/app/components/RecentPNR';
import { useRecentPNRSearches } from '@/app/hooks/useRecentPNRSearches';
import { interstitialAdManager } from '@/app/services/adService';
import { fetchPNRStatus, PNRData } from '@/app/services/pnrService'; // Import fetchPNRStatus

export default function PNRStatusScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pnrData, setPnrData] = useState<PNRData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { recentSearches, addRecentSearch, removeRecentSearch } = useRecentPNRSearches();

  const handleCheckPNR = async (pnrNumber: string) => {
    setLoading(true);
    setErrorMessage('');
    setSnackbarVisible(false);

    try {
      const data = await fetchPNRStatus(pnrNumber);
      setPnrData(data);
      addRecentSearch(pnrNumber); // Add to recent searches on successful fetch
      router.push({
        pathname: '/screens/IRCTCWebViewScreen' as any,
        params: { pnr: pnrNumber },
      });
    } catch (error) {
      console.error('Failed to fetch PNR:', error);
      setErrorMessage('Failed to fetch PNR details. Please try again.');
      setSnackbarVisible(true);
      setPnrData(null);
    } finally {
      setLoading(false);
      interstitialAdManager.onPNRSearch(); // Trigger ad regardless of success/failure
    }
  };

  const handleSelectRecent = (pnr: string) => {
    handleCheckPNR(pnr);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Indian Railways PNR Status</Text>
        <Text style={styles.subtitle}>Track your journey with ease</Text>
      </View>

      <PNRInput onSubmit={handleCheckPNR} isLoading={loading} />

      {pnrData ? (
        <>
          <PNRStatusCard data={pnrData} />
          <AdBanner style={styles.adContainer} />
        </>
      ) : (
        <FavoriteTrains onCheckPNR={() => {}} /> // Revert to original empty function
      )}

      <RecentPNR
        recentSearches={recentSearches}
        onSelect={handleSelectRecent}
        onDelete={removeRecentSearch}
      />

      <AdBanner style={styles.bottomAd} />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {errorMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  adContainer: {
    marginTop: 16,
  },
  bottomAd: {
    marginTop: 24,
    marginBottom: 16,
  },
});

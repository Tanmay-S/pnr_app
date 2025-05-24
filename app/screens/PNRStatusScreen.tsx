import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

import { FavoriteTrains } from '@/app/components/FavoriteTrains';
import PNRInput from '@/app/components/PNRInput';
import PNRStatusCard from '@/app/components/PNRStatusCard';
import RecentPNR from '@/app/components/RecentPNR';
import { useRecentPNRSearches } from '@/app/hooks/useRecentPNRSearches';
import { fetchPNRStatus, PNRData } from '@/app/services/pnrService';

export default function PNRStatusScreen() {
  const [loading, setLoading] = useState(false);
  const [pnrData, setPnrData] = useState<PNRData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  
  const { 
    recentSearches, 
    addRecentSearch, 
    removeRecentSearch,
  } = useRecentPNRSearches();

  const handleCheckPNR = async (pnrNumber: string) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const data = await fetchPNRStatus(pnrNumber);
      setPnrData(data);
      addRecentSearch(pnrNumber);
    } catch (error) {
      console.error('Error checking PNR:', error);
      setErrorMessage('Failed to fetch PNR details. Please try again.');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
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
        <PNRStatusCard data={pnrData} />
      ) : (
        <FavoriteTrains onCheckPNR={() => {}} />
      )}

      <RecentPNR 
        recentSearches={recentSearches} 
        onSelect={handleSelectRecent}
        onDelete={removeRecentSearch} 
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}>
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
});

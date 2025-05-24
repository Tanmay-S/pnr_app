import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>PNR Status Tracker</Text>
      <ActivityIndicator size="large" color="#1A237E" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 30,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

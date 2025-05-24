import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, List, Text } from 'react-native-paper';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>PNR Status Tracker</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Divider style={styles.divider} />
          <Text style={styles.description}>
            PNR Status Tracker is a mobile application that allows you to check the status of your PNR (Passenger Name Record) for Indian Railways bookings. 
            Stay updated about your journey details, seat allocation, and train timings with ease.
          </Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Features" />
        <Card.Content>
          <List.Item
            title="PNR Status Check"
            description="Check status of your railway booking using PNR number"
            left={props => <List.Icon {...props} icon="ticket" />}
          />
          <List.Item
            title="Train Information"
            description="View details about various trains including timings and routes"
            left={props => <List.Icon {...props} icon="train" />}
          />
          <List.Item
            title="Recent Searches"
            description="Quick access to your recently checked PNR numbers"
            left={props => <List.Icon {...props} icon="history" />}
          />
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Disclaimer" />
        <Card.Content>
          <Text style={styles.disclaimer}>
            This app is built for demonstration purposes. The PNR status data shown in this app is simulated and does not reflect actual Indian Railways bookings. In a production app, real API integration with Indian Railways would be implemented.
          </Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Contact" />
        <Card.Content>
          <Button 
            mode="contained" 
            style={styles.button}
            onPress={() => Linking.openURL('mailto:support@pnrtracker.example.com')}
          >
            Contact Support
          </Button>
          <Button 
            mode="outlined" 
            style={styles.button}
            onPress={() => Linking.openURL('https://pnrtracker.example.com')}
          >
            Visit Website
          </Button>
        </Card.Content>
      </Card>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 PNR Status Tracker</Text>
        <Text style={styles.footerText}>Built with React Native & Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1A237E',
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  divider: {
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  disclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    lineHeight: 20,
  },
  button: {
    marginVertical: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginVertical: 2,
  },
});

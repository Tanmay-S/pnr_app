import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

// Sample data for favorite trains
const FAVORITE_TRAINS = [
  {
    id: '12301',
    name: 'Howrah Rajdhani Express',
    from: 'Howrah (HWH)',
    to: 'New Delhi (NDLS)',
    departureTime: '16:55',
  },
  {
    id: '12951',
    name: 'Mumbai Rajdhani Express',
    from: 'Mumbai Central (MMCT)',
    to: 'New Delhi (NDLS)',
    departureTime: '16:35',
  },
];

interface FavoriteTrainsProps {
  onCheckPNR: () => void;
}

const FavoriteTrains: React.FC<FavoriteTrainsProps> = ({ onCheckPNR }) => {
  const [favorites, setFavorites] = useState(FAVORITE_TRAINS);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(train => train.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <Card style={styles.emptyCard}>
        <Card.Content>
          <Text style={styles.emptyText}>No favorite trains added yet</Text>
          <Button mode="contained" onPress={onCheckPNR} style={styles.checkPNRButton}>
            Check PNR Status
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Trains</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.trainNumber}>{item.id}</Text>
                  <Text style={styles.trainName}>{item.name}</Text>
                </View>
                <IconButton
                  icon="heart"
                  iconColor="#F44336"
                  size={24}
                  onPress={() => removeFavorite(item.id)}
                />
              </View>
              <View style={styles.routeContainer}>
                <Text style={styles.routeText}>{item.from}</Text>
                <Text style={styles.routeArrow}>→</Text>
                <Text style={styles.routeText}>{item.to}</Text>
              </View>
              <Text style={styles.departureTime}>Departs at: {item.departureTime}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainNumber: {
    fontSize: 14,
    color: '#666',
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  routeText: {
    flex: 1,
    fontSize: 14,
  },
  routeArrow: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  departureTime: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A237E',
  },
  emptyCard: {
    margin: 16,
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  checkPNRButton: {
    marginTop: 8,
  },
});

export { FavoriteTrains };
export default FavoriteTrains;

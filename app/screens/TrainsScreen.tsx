import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Searchbar, Text } from 'react-native-paper';

import { AdBanner } from '@/app/components/AdBanner';
import { NativeAdCard } from '@/app/components/NativeAdCard';

// Mock train data for demonstration
const TRAINS_DATA = [
  {
    id: '12301',
    name: 'Howrah Rajdhani Express',
    from: 'Howrah (HWH)',
    to: 'New Delhi (NDLS)',
    departureTime: '16:55',
    arrivalTime: '10:00',
    duration: '17h 05m',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: ['1A', '2A', '3A', 'EC'],
  },
  {
    id: '12302',
    name: 'New Delhi Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Howrah (HWH)',
    departureTime: '16:10',
    arrivalTime: '09:55',
    duration: '17h 45m',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: ['1A', '2A', '3A', 'EC'],
  },
  {
    id: '12951',
    name: 'Mumbai Rajdhani Express',
    from: 'Mumbai Central (MMCT)',
    to: 'New Delhi (NDLS)',
    departureTime: '16:35',
    arrivalTime: '08:35',
    duration: '16h 00m',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: ['1A', '2A', '3A'],
  },
  {
    id: '12952',
    name: 'New Delhi Mumbai Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Mumbai Central (MMCT)',
    departureTime: '16:15',
    arrivalTime: '08:10',
    duration: '15h 55m',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: ['1A', '2A', '3A'],
  },
  {
    id: '12259',
    name: 'Sealdah Duronto Express',
    from: 'Sealdah (SDAH)',
    to: 'New Delhi (NDLS)',
    departureTime: '20:05',
    arrivalTime: '11:35',
    duration: '15h 30m',
    days: ['Mon', 'Wed', 'Fri'],
    classes: ['1A', '2A', '3A', 'SL'],
  },
];

export default function TrainsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState(TRAINS_DATA);

  // Create enhanced data with native ads inserted
  const enhancedTrainData = React.useMemo(() => {
    const data: { type: 'train' | 'ad'; item: (typeof TRAINS_DATA)[0] | null; id: string }[] = [];

    trains.forEach((train, index) => {
      data.push({ type: 'train', item: train, id: train.id });

      // Insert native ad after every 4th train
      if ((index + 1) % 4 === 0 && index < trains.length - 1) {
        data.push({ type: 'ad', item: null, id: `ad-${index}` });
      }
    });

    return data;
  }, [trains]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setTrains(TRAINS_DATA);
      return;
    }

    // Simulate search with a small delay
    setLoading(true);
    setTimeout(() => {
      const filteredTrains = TRAINS_DATA.filter(
        train =>
          train.name.toLowerCase().includes(query.toLowerCase()) ||
          train.id.includes(query) ||
          train.from.toLowerCase().includes(query.toLowerCase()) ||
          train.to.toLowerCase().includes(query.toLowerCase())
      );
      setTrains(filteredTrains);
      setLoading(false);
    }, 500);
  };

  const renderItem = ({
    item,
  }: {
    item: { type: 'train' | 'ad'; item: (typeof TRAINS_DATA)[0] | null; id: string };
  }) => {
    if (item.type === 'ad') {
      return <NativeAdCard />;
    }

    return renderTrainCard({ item: item.item! });
  };

  const renderTrainCard = ({ item }: { item: (typeof TRAINS_DATA)[0] }) => (
    <Card style={styles.trainCard}>
      <Card.Content>
        <View style={styles.trainHeader}>
          <Text style={styles.trainNumber}>{item.id}</Text>
          <Text style={styles.trainName}>{item.name}</Text>
        </View>

        <View style={styles.journeyContainer}>
          <View style={styles.stationTimeContainer}>
            <Text style={styles.time}>{item.departureTime}</Text>
            <Text style={styles.station}>{item.from}</Text>
          </View>

          <View style={styles.durationContainer}>
            <View style={styles.durationLine} />
            <Text style={styles.duration}>{item.duration}</Text>
          </View>

          <View style={styles.stationTimeContainer}>
            <Text style={styles.time}>{item.arrivalTime}</Text>
            <Text style={styles.station}>{item.to}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.runningDays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <View
                key={index}
                style={[
                  styles.dayCircle,
                  item.days.includes(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index])
                    ? styles.activeDay
                    : styles.inactiveDay,
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.classesContainer}>
            {item.classes.map((cls, index) => (
              <View key={index} style={styles.classChip}>
                <Text style={styles.classText}>{cls}</Text>
              </View>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Train Information</Text>
        <Text style={styles.subtitle}>Find trains and their schedules</Text>
      </View>

      <Searchbar
        placeholder="Search trains, stations, or train numbers"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <AdBanner style={styles.topAd} />

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={enhancedTrainData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No trains found</Text>
            </View>
          }
        />
      )}

      <AdBanner style={styles.bottomAd} />
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
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  loader: {
    marginTop: 40,
  },
  trainCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  trainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainNumber: {
    backgroundColor: '#1A237E',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  journeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stationTimeContainer: {
    alignItems: 'flex-start',
    width: '30%',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  station: {
    fontSize: 14,
    color: '#666',
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  durationLine: {
    height: 2,
    backgroundColor: '#1A237E',
    width: '100%',
  },
  duration: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    fontSize: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  runningDays: {
    flexDirection: 'row',
  },
  dayCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  activeDay: {
    backgroundColor: '#4CAF50',
  },
  inactiveDay: {
    backgroundColor: '#E0E0E0',
  },
  dayText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  classesContainer: {
    flexDirection: 'row',
  },
  classChip: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  classText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  topAd: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  bottomAd: {
    marginTop: 16,
    marginBottom: 16,
  },
});

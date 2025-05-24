import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

import { NativeAdCard } from '@/app/components/NativeAdCard';

interface RecentPNRProps {
  recentSearches: string[];
  onSelect: (pnr: string) => void;
  onDelete: (pnr: string) => void;
}

const RecentPNR: React.FC<RecentPNRProps> = ({ recentSearches, onSelect, onDelete }) => {
  // Create enhanced data with native ads inserted
  const enhancedData = React.useMemo(() => {
    if (!recentSearches.length) {
      return []; // Return empty array if no recent searches
    }
    const data: { type: 'pnr' | 'ad'; item: string | null; id: string }[] = [];

    recentSearches.forEach((pnr, index) => {
      data.push({ type: 'pnr', item: pnr, id: pnr });

      // Insert native ad after every 3rd item
      if ((index + 1) % 3 === 0 && index < recentSearches.length - 1) {
        data.push({ type: 'ad', item: null, id: `ad-${index}` });
      }
    });

    return data;
  }, [recentSearches]);

  if (!enhancedData.length) {
    // Check based on enhancedData after useMemo
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recent PNR searches</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      <FlatList
        data={enhancedData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (item.type === 'ad') {
            return <NativeAdCard />;
          }

          return (
            <Card style={styles.card}>
              <TouchableOpacity style={styles.cardContent} onPress={() => onSelect(item.item!)}>
                <Text style={styles.pnrText}>{item.item}</Text>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={e => {
                    e.stopPropagation();
                    onDelete(item.item!);
                  }}
                />
              </TouchableOpacity>
            </Card>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 8,
    marginHorizontal: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  pnrText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default RecentPNR;

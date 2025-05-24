import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

interface RecentPNRProps {
  recentSearches: string[];
  onSelect: (pnr: string) => void;
  onDelete: (pnr: string) => void;
}

const RecentPNR: React.FC<RecentPNRProps> = ({ 
  recentSearches, 
  onSelect, 
  onDelete 
}) => {
  if (!recentSearches.length) {
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
        data={recentSearches}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.pnrText}>{item}</Text>
              <IconButton
                icon="delete"
                size={20}
                onPress={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
              />
            </TouchableOpacity>
          </Card>
        )}
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

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Divider, List, Text } from 'react-native-paper';
import { PNRData } from '../services/pnrService';

interface PNRStatusCardProps {
  data: PNRData;
}

// Helper function to get color based on status
export const getStatusColor = (status: string) => {
  if (status.includes('CNF') || status.includes('Confirmed')) {
    return '#4CAF50'; // Green for confirmed
  } else if (status.includes('WL') || status.includes('Waitlist')) {
    return '#FF9800'; // Orange for waitlist
  } else if (status.includes('RAC')) {
    return '#2196F3'; // Blue for RAC
  } else {
    return '#F44336'; // Red for others (cancelled, etc)
  }
};

const PNRStatusCard: React.FC<PNRStatusCardProps> = ({ data }) => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={`PNR: ${data.pnrNumber}`}
          subtitle={`Train: ${data.trainNumber} - ${data.trainName}`}
        />
        <Card.Content>
          <View style={styles.journeyInfoContainer}>
            <View style={styles.stationContainer}>
              <Text style={styles.station}>{data.from.station}</Text>
              <Text style={styles.code}>{data.from.code}</Text>
              <Text style={styles.time}>{data.from.departureTime}</Text>
            </View>

            <View style={styles.journeyLine}>
              <View style={styles.line} />
              <Text style={styles.dateText}>{data.dateOfJourney}</Text>
            </View>

            <View style={styles.stationContainer}>
              <Text style={styles.station}>{data.to.station}</Text>
              <Text style={styles.code}>{data.to.code}</Text>
              <Text style={styles.time}>{data.to.arrivalTime}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Class:</Text>
              <Text style={styles.detailValue}>{data.class}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Chart Status:</Text>
              <Text style={styles.detailValue}>{data.chartStatus}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.passengersTitle}>Passenger Status</Text>
          {data.passengerStatus.map((passenger, index) => (
            <List.Item
              key={index}
              title={`Passenger ${passenger.number}`}
              description={
                <View style={styles.statusContainer}>
                  <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Booking Status:</Text>
                    <Text>{passenger.bookingStatus}</Text>
                  </View>
                  <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Current Status:</Text>
                    <Chip
                      textStyle={{ color: 'white' }}
                      style={{ backgroundColor: getStatusColor(passenger.currentStatus) }}
                    >
                      {passenger.currentStatus}
                    </Chip>
                  </View>
                  <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Coach/Berth:</Text>
                    <Text>
                      {passenger.coach}, {passenger.berth}
                    </Text>
                  </View>
                </View>
              }
              left={props => <List.Icon {...props} icon="account" />}
              style={styles.passengerItem}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  journeyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  stationContainer: {
    alignItems: 'center',
    width: '30%',
  },
  station: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  code: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  journeyLine: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  line: {
    height: 2,
    backgroundColor: '#2196F3',
    width: '100%',
  },
  dateText: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    fontSize: 12,
  },
  divider: {
    marginVertical: 12,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  detailValue: {
    flex: 1,
  },
  passengersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  passengerItem: {
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
    borderRadius: 8,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  statusLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default PNRStatusCard;

import PNRStatusCard, { getStatusColor } from '@/app/components/PNRStatusCard';
import { PNRData } from '@/app/services/pnrService';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Mock react-native-paper components
jest.mock('react-native-paper', () => {
  const mock = jest.requireActual('../../mocks/reactNativePaperMock');
  return mock.default || mock; // Handle ESM/CJS interop
});

describe('PNRStatusCard', () => {
  const samplePNRData: PNRData = {
    pnrNumber: '1234567890',
    trainNumber: '12345',
    trainName: 'Sample Express',
    from: { station: 'START', code: 'ST', departureTime: '10:00' },
    to: { station: 'END', code: 'EN', arrivalTime: '20:00' },
    dateOfJourney: '01-01-2023',
    class: '2A',
    chartStatus: 'Prepared', // Changed to match interface
    passengerStatus: [
      { number: 1, bookingStatus: 'CNF/A1/1', currentStatus: 'CNF', coach: 'A1', berth: '1' }, // Added coach and berth
      { number: 2, bookingStatus: 'WL 5', currentStatus: 'WL 3', coach: '', berth: '' }, // Added coach and berth
      { number: 3, bookingStatus: 'RAC 10', currentStatus: 'RAC 5', coach: 'B1', berth: '5' }, // Added coach and berth
      { number: 4, bookingStatus: 'CNF/B1/5', currentStatus: 'Cancelled', coach: '', berth: '' }, // Added coach and berth
    ],
  };

  it('renders PNR status card with correct information', async () => {
    const { getByText, getAllByText } = render(<PNRStatusCard data={samplePNRData} />);

    await waitFor(() => {
      expect(getByText('PNR: 1234567890')).toBeTruthy();
      expect(getByText('Train: 12345 - Sample Express')).toBeTruthy();
      expect(getByText('START')).toBeTruthy();
      expect(getByText('ST')).toBeTruthy();
      expect(getByText('10:00')).toBeTruthy();
      expect(getByText('END')).toBeTruthy();
      expect(getByText('EN')).toBeTruthy();
      expect(getByText('20:00')).toBeTruthy();
      expect(getByText('01-01-2023')).toBeTruthy();
      expect(getByText('Class:')).toBeTruthy();
      expect(getByText('2A')).toBeTruthy();
      expect(getByText('Chart Status:')).toBeTruthy();
      expect(getByText('Prepared')).toBeTruthy();
      expect(getByText('Passenger Status')).toBeTruthy();

      // Check passenger status (using getAllByText for repeated elements)
      expect(getByText('Passenger 1')).toBeTruthy();
      expect(getAllByText('Booking Status:').length).toBe(4); // 4 passengers
      expect(getByText('CNF/A1/1')).toBeTruthy();
      expect(getAllByText('Current Status:').length).toBe(4); // 4 passengers
      expect(getByText('CNF')).toBeTruthy(); // Chip content
      expect(getAllByText('Coach/Berth:').length).toBe(4); // 4 passengers

      expect(getByText('Passenger 2')).toBeTruthy();
      expect(getByText('WL 5')).toBeTruthy();
      expect(getByText('WL 3')).toBeTruthy();

      expect(getByText('Passenger 3')).toBeTruthy();
      expect(getByText('RAC 10')).toBeTruthy();
      expect(getByText('RAC 5')).toBeTruthy();

      expect(getByText('Passenger 4')).toBeTruthy();
      expect(getByText('CNF/B1/5')).toBeTruthy();
      expect(getByText('Cancelled')).toBeTruthy();
    });
  });

  it('verifies chip colors based on status', async () => {
    const { getAllByText } = render(<PNRStatusCard data={samplePNRData} />);

    await waitFor(() => {
      // Find the Chip components by their text content and check their styles
      const cnfChip = getAllByText('CNF')[0].parent; // Assuming the first 'CNF' is the chip
      expect(cnfChip.props.style.backgroundColor).toBe('#4CAF50');

      const wlChip = getAllByText('WL 3')[0].parent; // Assuming the first 'WL 3' is the chip
      expect(wlChip.props.style.backgroundColor).toBe('#FF9800');

      const racChip = getAllByText('RAC 5')[0].parent; // Assuming the first 'RAC 5' is the chip
      expect(racChip.props.style.backgroundColor).toBe('#2196F3');

      const cancelledChip = getAllByText('Cancelled')[0].parent; // Assuming the first 'Cancelled' is the chip
      expect(cancelledChip.props.style.backgroundColor).toBe('#F44336');
    });
  });
}); // Import the exported function

describe('getStatusColor', () => {
  it('returns the correct color for CNF status', () => {
    expect(getStatusColor('CNF')).toBe('#4CAF50');
    expect(getStatusColor('Confirmed')).toBe('#4CAF50');
    expect(getStatusColor('PARTIALLY CNF')).toBe('#4CAF50');
  });

  it('returns the correct color for WL status', () => {
    expect(getStatusColor('WL 10')).toBe('#FF9800');
    expect(getStatusColor('Waitlist')).toBe('#FF9800');
  });

  it('returns the correct color for RAC status', () => {
    expect(getStatusColor('RAC 5')).toBe('#2196F3');
  });

  it('returns the default color for other statuses', () => {
    expect(getStatusColor('Cancelled')).toBe('#F44336');
    expect(getStatusColor(' कुछ और ')).toBe('#F44336'); // Test with some other string
  });
});

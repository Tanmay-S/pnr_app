import * as useRecentPNRSearchesHook from '@/app/hooks/useRecentPNRSearches';
import PNRStatusScreen from '@/app/screens/PNRStatusScreen';
import * as pnrService from '@/app/services/pnrService';
import { act, render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';

// Mock the PNR service
jest.mock('@/app/services/pnrService', () => ({
  fetchPNRStatus: jest.fn(),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock the custom hook
jest.mock('@/app/hooks/useRecentPNRSearches', () => ({
  useRecentPNRSearches: jest.fn(),
}));

// Mock the components
jest.mock('@/app/components/PNRInput', () => {
  const React = jest.requireActual('react');
  const { TextInput } = jest.requireActual('react-native');
  const PNRInput = ({ onSubmit }: { onSubmit: (pnr: string) => void }) => (
    <TextInput
      testID="PNRInput"
      onSubmitEditing={(e: { nativeEvent: { text: string } }) => onSubmit(e.nativeEvent.text)}
    />
  );
  PNRInput.displayName = 'PNRInput';
  return PNRInput;
});
jest.mock('@/app/components/PNRStatusCard', () => 'PNRStatusCard');
jest.mock('@/app/components/RecentPNR', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native'); // Use View for simplicity
  const RecentPNR = ({
    onSelect,
    recentSearches,
  }: {
    onSelect: (pnr: string) => void;
    recentSearches: string[];
  }) => (
    // Expose onSelect directly for testing
    <View testID="RecentPNR" onSelect={onSelect} recentSearches={recentSearches} />
  );
  RecentPNR.displayName = 'RecentPNR';
  return RecentPNR;
});
jest.mock('@/app/components/AdBanner', () => ({ AdBanner: 'AdBanner' }));
jest.mock('@/app/components/FavoriteTrains', () => ({ FavoriteTrains: 'FavoriteTrains' }));

// Mock react-native-paper's Snackbar
jest.mock('react-native-paper', () => {
  const React = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');
  return {
    ...jest.requireActual('react-native-paper'),
    Snackbar: ({
      visible,
      onDismiss,
      children,
    }: {
      visible: boolean;
      onDismiss: () => void;
      children: React.ReactNode;
    }) => (visible ? <View testID="Snackbar">{children}</View> : null),
  };
});

describe('PNRStatusScreen', () => {
  const mockPNRData = {
    pnrNumber: '1234567890',
    trainNumber: '12345',
    trainName: 'Test Express',
    dateOfJourney: '25-05-2025',
    from: {
      station: 'Test Station A',
      code: 'TSA',
      departureTime: '12:00',
    },
    to: {
      station: 'Test Station B',
      code: 'TSB',
      arrivalTime: '18:00',
    },
    passengerStatus: [
      {
        number: 1,
        bookingStatus: 'S1, 10',
        currentStatus: 'CNF S1, 10',
        coach: 'S1',
        berth: '10 (Lower)',
      },
    ],
    chartStatus: 'Prepared',
    class: 'SL',
  };

  const mockRecentSearches = ['1234567890', '0987654321'];
  const mockAddRecentSearch = jest.fn();
  const mockRemoveRecentSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the service
    (pnrService.fetchPNRStatus as jest.Mock).mockResolvedValue(mockPNRData);

    // Mock the hook
    (useRecentPNRSearchesHook.useRecentPNRSearches as jest.Mock).mockReturnValue({
      recentSearches: mockRecentSearches,
      addRecentSearch: mockAddRecentSearch,
      removeRecentSearch: mockRemoveRecentSearch,
      isLoading: false,
    });

    // Mock useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('should render the screen with correct title', () => {
    const { getByText } = render(<PNRStatusScreen />);
    expect(getByText('Indian Railways PNR Status')).toBeTruthy();
    expect(getByText('Track your journey with ease')).toBeTruthy();
  });

  it('should handle PNR submission and display results', async () => {
    const { getByTestId } = render(<PNRStatusScreen />);
    const router = useRouter();

    const pnrInput = getByTestId('PNRInput');

    await act(async () => {
      pnrInput.props.onSubmitEditing({ nativeEvent: { text: '1234567890' } });
    });

    expect(pnrService.fetchPNRStatus).toHaveBeenCalledWith('1234567890');
    expect(mockAddRecentSearch).toHaveBeenCalledWith('1234567890');
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/screens/IRCTCWebViewScreen',
      params: { pnr: '1234567890' },
    });
  });

  it('should handle errors when fetching PNR status', async () => {
    // Mock console.error to prevent it from polluting test output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (pnrService.fetchPNRStatus as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { getByTestId, findByText } = render(<PNRStatusScreen />);

    const pnrInput = getByTestId('PNRInput');

    await act(async () => {
      pnrInput.props.onSubmitEditing({ nativeEvent: { text: '1234567890' } });
    });

    await waitFor(() => {
      expect(findByText('Failed to fetch PNR details. Please try again.')).toBeTruthy();
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('should handle selection from recent searches', async () => {
    const { getByTestId } = render(<PNRStatusScreen />);
    const router = useRouter();

    const recentPNR = getByTestId('RecentPNR');

    await act(async () => {
      // Simulate calling the onSelect prop directly, as the mock exposes it
      recentPNR.props.onSelect('0987654321');
    });

    expect(pnrService.fetchPNRStatus).toHaveBeenCalledWith('0987654321');
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/screens/IRCTCWebViewScreen',
      params: { pnr: '0987654321' },
    });
  });
});

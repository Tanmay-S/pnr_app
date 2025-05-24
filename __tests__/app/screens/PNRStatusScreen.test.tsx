import * as useRecentPNRSearchesHook from '@/app/hooks/useRecentPNRSearches';
import PNRStatusScreen from '@/app/screens/PNRStatusScreen';
import * as pnrService from '@/app/services/pnrService';
import { act, render } from '@testing-library/react-native';
import React from 'react';

// Mock the PNR service
jest.mock('@/app/services/pnrService', () => ({
  fetchPNRStatus: jest.fn(),
}));

// Mock the custom hook
jest.mock('@/app/hooks/useRecentPNRSearches', () => ({
  useRecentPNRSearches: jest.fn(),
}));

// Mock the components
jest.mock('@/app/components/PNRInput', () => 'PNRInput');
jest.mock('@/app/components/PNRStatusCard', () => 'PNRStatusCard');
jest.mock('@/app/components/RecentPNR', () => 'RecentPNR');
jest.mock('@/app/components/AdBanner', () => ({ AdBanner: 'AdBanner' }));
jest.mock('@/app/components/FavoriteTrains', () => ({ FavoriteTrains: 'FavoriteTrains' }));

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
  });

  it('should render the screen with correct title', () => {
    const { getByText } = render(<PNRStatusScreen />);
    expect(getByText('Indian Railways PNR Status')).toBeTruthy();
    expect(getByText('Track your journey with ease')).toBeTruthy();
  });

  it('should handle PNR submission and display results', async () => {
    const { UNSAFE_getByType } = render(<PNRStatusScreen />); // Removed getByText, getByTestId, queryByTestId

    // Find PNRInput component and simulate submission
    const pnrInput = UNSAFE_getByType('PNRInput' as any);

    // Call the onSubmit prop
    await act(async () => {
      pnrInput.props.onSubmit('1234567890');
    });

    // Verify service was called
    expect(pnrService.fetchPNRStatus).toHaveBeenCalledWith('1234567890');

    // Verify recent search was added
    expect(mockAddRecentSearch).toHaveBeenCalledWith('1234567890');
  });

  it('should handle errors when fetching PNR status', async () => {
    // Mock service to throw an error
    (pnrService.fetchPNRStatus as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { UNSAFE_getByType, findByText } = render(<PNRStatusScreen />);

    // Find PNRInput component and simulate submission
    const pnrInput = UNSAFE_getByType('PNRInput' as any);

    // Call the onSubmit prop
    await act(async () => {
      pnrInput.props.onSubmit('1234567890');
    });

    // Verify error handling
    expect(await findByText('Failed to fetch PNR details. Please try again.')).toBeTruthy();
  });

  it('should handle selection from recent searches', async () => {
    const { UNSAFE_getByType } = render(<PNRStatusScreen />);

    // Find RecentPNR component and simulate selection
    const recentPNR = UNSAFE_getByType('RecentPNR' as any);

    // Call the onSelect prop
    await act(async () => {
      recentPNR.props.onSelect('0987654321');
    });

    // Verify service was called with the selected PNR
    expect(pnrService.fetchPNRStatus).toHaveBeenCalledWith('0987654321');
  });
});

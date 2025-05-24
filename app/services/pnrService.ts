
// In a real app, you would use the actual Indian Railways API endpoint
// This is a placeholder for demonstration purposes
const API_BASE_URL = 'https://api.example.com/indianrailways';

export interface PNRData {
  pnrNumber: string;
  trainNumber: string;
  trainName: string;
  dateOfJourney: string;
  from: {
    station: string;
    code: string;
    departureTime: string;
  };
  to: {
    station: string;
    code: string;
    arrivalTime: string;
  };
  passengerStatus: Array<{
    number: number;
    bookingStatus: string;
    currentStatus: string;
    coach: string;
    berth: string;
  }>;
  chartStatus: 'Prepared' | 'Not Prepared';
  class: string;
}

// Mock data for demonstration
const mockPNRData = (pnrNumber: string): PNRData => {
  return {
    pnrNumber,
    trainNumber: '12345',
    trainName: 'Rajdhani Express',
    dateOfJourney: '25-05-2025',
    from: {
      station: 'New Delhi',
      code: 'NDLS',
      departureTime: '16:55',
    },
    to: {
      station: 'Mumbai Central',
      code: 'MMCT',
      arrivalTime: '08:25',
    },
    passengerStatus: [
      {
        number: 1,
        bookingStatus: 'S4, 24',
        currentStatus: 'CNF S4, 24',
        coach: 'S4',
        berth: '24 (Side Lower)',
      },
      {
        number: 2,
        bookingStatus: 'S4, 25',
        currentStatus: 'CNF S4, 25',
        coach: 'S4',
        berth: '25 (Side Upper)',
      },
    ],
    chartStatus: 'Prepared',
    class: 'SL',
  };
};

/**
 * Fetch PNR status information
 * In a real app, this would make an actual API call to the Indian Railways API
 * For demonstration, we're using mock data
 */
export const fetchPNRStatus = async (pnrNumber: string): Promise<PNRData> => {
  try {
    // Simulate API call
    // In a real app, you would make an actual API call like:
    // const response = await axios.get(`${API_BASE_URL}/pnr/${pnrNumber}`);
    // return response.data;

    // Adding a small delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockPNRData(pnrNumber);
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    throw error;
  }
};

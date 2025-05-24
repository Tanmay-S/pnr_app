// Production API endpoint - configure with actual service
const API_BASE_URL = 'https://api.railwayapi.site/api/v1/pnr-status';

// Alternative APIs (configure as needed):
// - RailwayAPI: https://api.railwayapi.com/v2/pnr-status/
// - IRCTC API: requires official approval
// - RapidAPI Railways: https://indian-railway-pnr-status.p.rapidapi.com/

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
  passengerStatus: {
    number: number;
    bookingStatus: string;
    currentStatus: string;
    coach: string;
    berth: string;
  }[];
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
 * Fetch PNR status from real API (production mode)
 */
const fetchRealPNRStatus = async (pnrNumber: string): Promise<PNRData> => {
  try {
    // TODO: Configure API key and headers for chosen service
    const response = await fetch(`${API_BASE_URL}/${pnrNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add API key when configured:
        // 'X-API-KEY': process.env.RAILWAY_API_KEY || '',
        // 'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API response to match our PNRData interface
    // Note: Each API has different response format - adjust mapping accordingly
    return transformApiResponse(data, pnrNumber);
  } catch (error) {
    console.error('Error fetching real PNR status:', error);
    throw new Error('Failed to fetch PNR status. Please try again.');
  }
};

/**
 * Transform API response to our PNRData format
 * TODO: Adjust this function based on chosen API's response structure
 */
const transformApiResponse = (apiData: any, pnrNumber: string): PNRData => {
  // This is a placeholder transformation - update based on actual API response
  return {
    pnrNumber,
    trainNumber: apiData.train_number || 'N/A',
    trainName: apiData.train_name || 'N/A',
    dateOfJourney: apiData.date_of_journey || 'N/A',
    from: {
      station: apiData.from_station?.name || 'N/A',
      code: apiData.from_station?.code || 'N/A',
      departureTime: apiData.departure_time || 'N/A',
    },
    to: {
      station: apiData.to_station?.name || 'N/A',
      code: apiData.to_station?.code || 'N/A',
      arrivalTime: apiData.arrival_time || 'N/A',
    },
    passengerStatus:
      apiData.passengers?.map((p: any, index: number) => ({
        number: index + 1,
        bookingStatus: p.booking_status || 'N/A',
        currentStatus: p.current_status || 'N/A',
        coach: p.coach || 'N/A',
        berth: p.berth || 'N/A',
      })) || [],
    chartStatus: apiData.chart_status === 'PREPARED' ? 'Prepared' : 'Not Prepared',
    class: apiData.class || 'N/A',
  };
};

/**
 * Fetch PNR status information
 * Uses mock data in development, real API in production
 */
export const fetchPNRStatus = async (pnrNumber: string): Promise<PNRData> => {
  try {
    if (__DEV__) {
      // Development mode - use mock data
      console.log('🔧 Development mode: Using mock PNR data');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPNRData(pnrNumber);
    } else {
      // Production mode - use real API
      console.log('🚀 Production mode: Fetching real PNR data');
      return await fetchRealPNRStatus(pnrNumber);
    }
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    throw error;
  }
};

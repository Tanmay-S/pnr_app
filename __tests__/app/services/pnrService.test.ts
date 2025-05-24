import { fetchPNRStatus } from '@/app/services/pnrService';

describe('PNR Service', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch PNR status with a valid PNR number', async () => {
    const pnrNumber = '1234567890';
    
    // Start the async operation
    const promise = fetchPNRStatus(pnrNumber);
    
    // Fast-forward time to resolve the promise
    jest.advanceTimersByTime(1000);
    
    // Wait for the promise to resolve
    const result = await promise;

    // Check that the result contains the expected properties
    expect(result).toEqual(expect.objectContaining({
      pnrNumber,
      trainNumber: expect.any(String),
      trainName: expect.any(String),
      dateOfJourney: expect.any(String),
      from: expect.objectContaining({
        station: expect.any(String),
        code: expect.any(String),
        departureTime: expect.any(String),
      }),
      to: expect.objectContaining({
        station: expect.any(String),
        code: expect.any(String),
        arrivalTime: expect.any(String),
      }),
      passengerStatus: expect.arrayContaining([
        expect.objectContaining({
          number: expect.any(Number),
          bookingStatus: expect.any(String),
          currentStatus: expect.any(String),
          coach: expect.any(String),
          berth: expect.any(String),
        }),
      ]),
      chartStatus: expect.any(String),
      class: expect.any(String),
    }));
  });
});

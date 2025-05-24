import { useRecentPNRSearches } from '@/app/hooks/useRecentPNRSearches';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';

// Use the existing mock from jest.setup.js
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('useRecentPNRSearches hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.getItem.mockResolvedValue(null);
  });

  it('should initialize with empty array when no stored searches exist', async () => {
    const { result, rerender } = renderHook(() => useRecentPNRSearches());
    
    // Initial state before the effect runs
    expect(result.current.recentSearches).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    
    // Wait for the effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    rerender({});
    
    // After the effect completes
    expect(result.current.isLoading).toBe(false);
    expect(result.current.recentSearches).toEqual([]);
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('recent_pnr_searches');
  });

  it('should load stored searches from AsyncStorage', async () => {
    const mockStoredSearches = ['1234567890', '0987654321'];
    mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockStoredSearches));
    
    const { result, rerender } = renderHook(() => useRecentPNRSearches());
    
    // Wait for the effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    rerender({});
    
    // After the effect completes
    expect(result.current.recentSearches).toEqual(mockStoredSearches);
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('recent_pnr_searches');
  });

  it('should add a new PNR to recent searches', async () => {
    const { result } = renderHook(() => useRecentPNRSearches());
    
    // Wait for the initial effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    // Add a new PNR
    await act(async () => {
      await result.current.addRecentSearch('1234567890');
    });
    
    expect(result.current.recentSearches).toEqual(['1234567890']);
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      'recent_pnr_searches',
      JSON.stringify(['1234567890'])
    );
  });

  it('should move existing PNR to the top when added again', async () => {
    mockAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify(['1111111111', '2222222222', '3333333333'])
    );
    
    const { result } = renderHook(() => useRecentPNRSearches());
    
    // Wait for the initial effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    // Add a PNR that already exists
    await act(async () => {
      await result.current.addRecentSearch('2222222222');
    });
    
    expect(result.current.recentSearches).toEqual([
      '2222222222', '1111111111', '3333333333'
    ]);
  });

  it('should remove a PNR from recent searches', async () => {
    mockAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify(['1111111111', '2222222222', '3333333333'])
    );
    
    const { result } = renderHook(() => useRecentPNRSearches());
    
    // Wait for the initial effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    // Remove a PNR
    await act(async () => {
      await result.current.removeRecentSearch('2222222222');
    });
    
    expect(result.current.recentSearches).toEqual(['1111111111', '3333333333']);
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      'recent_pnr_searches',
      JSON.stringify(['1111111111', '3333333333'])
    );
  });

  it('should clear all recent searches', async () => {
    mockAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify(['1111111111', '2222222222', '3333333333'])
    );
    
    const { result } = renderHook(() => useRecentPNRSearches());
    
    // Wait for the initial effect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    // Clear all searches
    await act(async () => {
      await result.current.clearRecentSearches();
    });
    
    expect(result.current.recentSearches).toEqual([]);
    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('recent_pnr_searches');
  });
});

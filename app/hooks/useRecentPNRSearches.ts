import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recent_pnr_searches';
const MAX_RECENT_SEARCHES = 5;

export const useRecentPNRSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load recent searches from storage
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const storedSearches = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentSearches();
  }, []);

  // Add a PNR to recent searches
  const addRecentSearch = async (pnr: string) => {
    try {
      // Remove if already exists (to move to top)
      const updatedSearches = recentSearches.filter(item => item !== pnr);
      
      // Add to beginning of array
      const newSearches = [pnr, ...updatedSearches];
      
      // Limit to max number of searches
      const limitedSearches = newSearches.slice(0, MAX_RECENT_SEARCHES);
      
      // Update state and storage
      setRecentSearches(limitedSearches);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(limitedSearches));
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  };

  // Remove a PNR from recent searches
  const removeRecentSearch = async (pnr: string) => {
    try {
      const updatedSearches = recentSearches.filter(item => item !== pnr);
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error removing recent search:', error);
    }
  };

  // Clear all recent searches
  const clearRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    isLoading,
  };
};

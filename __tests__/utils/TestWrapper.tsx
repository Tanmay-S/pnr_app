import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render } from '@testing-library/react-native';

// Create a custom wrapper for tests that require providers
export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <View>{children}</View>
    </SafeAreaProvider>
  );
};

// Wrap a component with all necessary providers for testing
export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  return render(<TestWrapper>{ui}</TestWrapper>, options);
};

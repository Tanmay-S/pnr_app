import LoadingScreen from '../../../app/components/LoadingScreen';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('LoadingScreen', () => {
  it('renders the loading screen with all elements', () => {
    const { getByText, getByTestId } = render(<LoadingScreen />);

    expect(getByText('PNR Status Tracker')).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy(); // Uses the testID from our global mock
    expect(getByText('Loading...')).toBeTruthy();
  });
});

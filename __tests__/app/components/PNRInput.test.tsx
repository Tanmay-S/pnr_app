import PNRInput from '@/app/components/PNRInput';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('PNRInput Component', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={false} />
    );
    
    expect(getByPlaceholderText('Enter PNR Number')).toBeTruthy();
    expect(getByText('Check PNR Status')).toBeTruthy();
  });
  
  it('shows error for empty PNR number', () => {
    const { getByText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={false} />
    );
    
    fireEvent.press(getByText('Check PNR Status'));
    
    expect(getByText('PNR number is required')).toBeTruthy();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  
  it('shows error for invalid PNR number length', () => {
    const { getByText, getByPlaceholderText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={false} />
    );
    
    const input = getByPlaceholderText('Enter PNR Number');
    fireEvent.changeText(input, '12345');
    fireEvent.press(getByText('Check PNR Status'));
    
    expect(getByText('Please enter a valid 10-digit PNR number')).toBeTruthy();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  
  it('submits valid PNR number', () => {
    const { getByText, getByPlaceholderText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={false} />
    );
    
    const input = getByPlaceholderText('Enter PNR Number');
    fireEvent.changeText(input, '1234567890');
    fireEvent.press(getByText('Check PNR Status'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith('1234567890');
  });
  
  it('shows loader when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={true} />
    );
    
    expect(queryByText('Check PNR Status')).toBeNull();
  });
  
  it('trims whitespace from PNR number before submission', () => {
    const { getByText, getByPlaceholderText } = render(
      <PNRInput onSubmit={mockOnSubmit} isLoading={false} />
    );
    
    const input = getByPlaceholderText('Enter PNR Number');
    fireEvent.changeText(input, ' 1234567890 ');
    fireEvent.press(getByText('Check PNR Status'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith('1234567890');
  });
});

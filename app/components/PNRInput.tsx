import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';

interface PNRInputProps {
  onSubmit: (pnrNumber: string) => void;
  isLoading: boolean;
}

const PNRInput: React.FC<PNRInputProps> = ({ onSubmit, isLoading }) => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Validate PNR number
    if (!pnrNumber.trim()) {
      setError('PNR number is required');
      return;
    }

    // Indian Railways PNR numbers are 10 digits
    if (!/^\d{10}$/.test(pnrNumber.trim())) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }

    setError('');
    onSubmit(pnrNumber.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter PNR Number"
          value={pnrNumber}
          onChangeText={setPnrNumber}
          keyboardType="number-pad"
          maxLength={10}
          style={styles.input}
          mode="outlined"
          error={!!error}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color="#fff" size="small" />
          ) : (
            'Check PNR Status'
          )}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default PNRInput;

import React from 'react';
import { View, Text as RNText, Pressable, TextInput as RNTextInput } from 'react-native';

// Mock for react-native-paper
const mockReactNativePaper = {
  ActivityIndicator: (props: any) => React.createElement(View, { testID: 'activity-indicator', ...props }),
  Button: ({ children, onPress, disabled, mode, ...props }: any) => 
    React.createElement(Pressable, { onPress, disabled, ...props }, 
      React.createElement(RNText, {}, children)
    ),
  Text: ({ children, ...props }: any) => React.createElement(RNText, props, children),
  TextInput: ({ label, value, onChangeText, ...props }: any) => 
    React.createElement(RNTextInput, {
      accessibilityLabel: label,
      value,
      onChangeText,
      placeholder: label,
      ...props
    }),
  Snackbar: ({ children, visible, ...props }: any) => 
    visible ? React.createElement(RNText, props, children) : null,
  Avatar: {
    Icon: 'Icon',
  },
  Card: {
    Content: 'CardContent',
    Actions: 'CardActions',
    Title: 'CardTitle',
  },
  Divider: 'Divider',
  List: {
    Item: 'ListItem',
    Icon: 'ListIcon',
  },
  IconButton: 'IconButton',
  Headline: 'Headline',
  Paragraph: 'Paragraph',
  Caption: 'Caption',
  Portal: 'Portal',
  Provider: ({ children }: { children: React.ReactNode }) => children,
  Surface: 'Surface',
  Modal: {
    Portal: 'ModalPortal',
  },
};

jest.mock('react-native-paper', () => mockReactNativePaper);

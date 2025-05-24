import React from 'react';
import { Pressable, Text as RNText, TextInput as RNTextInput, View } from 'react-native';

// Mock for react-native-paper
const mockReactNativePaper = {
  ActivityIndicator: (props: any) =>
    React.createElement(View, { testID: 'activity-indicator', ...props }),
  Button: ({ children, onPress, disabled, mode, ...props }: any) =>
    React.createElement(
      Pressable,
      { onPress, disabled, ...props },
      React.createElement(RNText, {}, children)
    ),
  Text: ({ children, ...props }: any) => React.createElement(RNText, props, children),
  TextInput: ({ label, value, onChangeText, ...props }: any) =>
    React.createElement(RNTextInput, {
      accessibilityLabel: label,
      value,
      onChangeText,
      placeholder: label,
      ...props,
    }),
  Snackbar: ({ children, visible, ...props }: any) =>
    visible ? React.createElement(RNText, props, children) : null,
  Avatar: {
    Icon: ({ name, ...props }: any) => React.createElement(RNText, props, name), // Mock Avatar.Icon
  },
  Card: Object.assign(
    ({ children, ...props }: any) => React.createElement(View, props, children), // Mock Card as a basic View
    {
      Content: ({ children, ...props }: any) => React.createElement(View, props, children), // Mock Card.Content
      Actions: ({ children, ...props }: any) => React.createElement(View, props, children), // Mock Card.Actions
      Title: (
        { title, subtitle, ...props }: any // Mock Card.Title
      ) =>
        React.createElement(
          View,
          props,
          React.createElement(RNText, {}, title),
          React.createElement(RNText, {}, subtitle)
        ),
    }
  ),
  Divider: ({ ...props }: any) =>
    React.createElement(View, { style: { height: 1, backgroundColor: '#ccc' }, ...props }), // Mock Divider
  List: {
    Item: (
      { title, description, left, ...props }: any // Mock List.Item
    ) =>
      React.createElement(
        View,
        props,
        React.createElement(RNText, {}, title),
        description,
        left && left({})
      ),
    Icon: ({ icon, ...props }: any) => React.createElement(RNText, props, icon), // Mock List.Icon
  },
  IconButton: (
    { icon, onPress, ...props }: any // Mock IconButton
  ) =>
    React.createElement(
      Pressable,
      {
        onPress: e => onPress && onPress({ stopPropagation: () => {} }),
        ...props,
      },
      React.createElement(RNText, {}, icon)
    ),
  Headline: ({ children, ...props }: any) => React.createElement(RNText, props, children), // Mock Headline
  Paragraph: ({ children, ...props }: any) => React.createElement(RNText, props, children), // Mock Paragraph
  Caption: ({ children, ...props }: any) => React.createElement(RNText, props, children), // Mock Caption
  Chip: ({ children, ...props }: any) => React.createElement(RNText, props, children), // Mock Chip
  Portal: ({ children }: any) => children, // Mock Portal
  Provider: ({ children }: { children: React.ReactNode }) => children,
  Surface: ({ children, ...props }: any) => React.createElement(View, props, children), // Mock Surface
  Modal: ({ children, visible, ...props }: any) =>
    visible ? React.createElement(View, props, children) : null, // Mock Modal
};

export default mockReactNativePaper;

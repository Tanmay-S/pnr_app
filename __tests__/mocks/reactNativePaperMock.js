const React = require('react');
const { Pressable, Text: RNText, TextInput: RNTextInput, View } = require('react-native');

// Mock for react-native-paper
const mockReactNativePaper = {
  ActivityIndicator: props => React.createElement(View, { testID: 'activity-indicator', ...props }),
  Button: ({ children, onPress, disabled, mode, ...props }) =>
    React.createElement(
      Pressable,
      { onPress, disabled, ...props },
      React.createElement(RNText, {}, children)
    ),
  Text: ({ children, ...props }) => React.createElement(RNText, props, children),
  TextInput: ({ label, value, onChangeText, ...props }) =>
    React.createElement(RNTextInput, {
      accessibilityLabel: label,
      value,
      onChangeText,
      placeholder: label,
      ...props,
    }),
  Snackbar: ({ children, visible, ...props }) =>
    visible ? React.createElement(RNText, props, children) : null,
  Avatar: {
    Icon: ({ name, ...props }) => React.createElement(RNText, props, name),
  },
  Card: Object.assign(({ children, ...props }) => React.createElement(View, props, children), {
    Content: ({ children, ...props }) => React.createElement(View, props, children),
    Actions: ({ children, ...props }) => React.createElement(View, props, children),
    Title: ({ title, subtitle, ...props }) =>
      React.createElement(
        View,
        props,
        React.createElement(RNText, {}, title),
        React.createElement(RNText, {}, subtitle)
      ),
  }),
  Divider: ({ ...props }) =>
    React.createElement(View, { style: { height: 1, backgroundColor: '#ccc' }, ...props }),
  List: {
    Item: ({ title, description, left, ...props }) =>
      React.createElement(
        View,
        props,
        React.createElement(RNText, {}, title),
        description,
        left && left({})
      ),
    Icon: ({ icon, ...props }) => React.createElement(RNText, props, icon),
  },
  IconButton: ({ icon, onPress, ...props }) =>
    React.createElement(
      Pressable,
      {
        onPress: e => onPress && onPress({ stopPropagation: () => {} }),
        ...props,
      },
      React.createElement(RNText, {}, icon)
    ),
  Headline: ({ children, ...props }) => React.createElement(RNText, props, children),
  Paragraph: ({ children, ...props }) => React.createElement(RNText, props, children),
  Caption: ({ children, ...props }) => React.createElement(RNText, props, children),
  Chip: ({ children, ...props }) => React.createElement(RNText, props, children),
  Portal: ({ children }) => children,
  Provider: ({ children }) => children,
  Surface: ({ children, ...props }) => React.createElement(View, props, children),
  Modal: ({ children, visible, ...props }) =>
    visible ? React.createElement(View, props, children) : null,
};

module.exports = mockReactNativePaper;

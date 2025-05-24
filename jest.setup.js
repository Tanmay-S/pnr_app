// Import React Native Paper mock
require('./__tests__/mocks/reactNativePaperMock');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(key => Promise.resolve(null)),
  setItem: jest.fn((key, value) => Promise.resolve()),
  removeItem: jest.fn(key => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock Expo modules
jest.mock('expo-constants', () => ({
  Constants: { manifest: { extra: {} } }
}));

// Mock react-native's Dimensions
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  reactNative.Dimensions = {
    get: jest.fn().mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1,
    }),
  };
  return reactNative;
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Create a simple fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
  })
);

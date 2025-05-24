// Mock react-native-paper
jest.mock('react-native-paper', () => require('./__tests__/mocks/reactNativePaperMock').default);

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
  Constants: { manifest: { extra: {} } },
}));

// Mock react-native's Dimensions
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return reactNative;
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-google-mobile-ads
jest.mock('react-native-google-mobile-ads', () => require('./__tests__/mocks/googleMobileAdsMock'));

// Create a simple fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
  })
);

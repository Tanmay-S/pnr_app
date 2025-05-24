const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for web platform
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add platform-specific module resolution
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Platform-specific resolver
const originalResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect react-native-google-mobile-ads to mock on web
  if (platform === 'web' && moduleName === 'react-native-google-mobile-ads') {
    return {
      filePath: path.resolve(__dirname, 'mocks/googleMobileAdsMock.web.ts'),
      type: 'sourceFile',
    };
  }

  // Use default resolver for other cases
  if (originalResolver) {
    return originalResolver(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

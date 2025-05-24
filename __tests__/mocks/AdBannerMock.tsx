// __tests__/mocks/AdBannerMock.tsx
import React from 'react';
import { Text, View } from 'react-native';

export const AdBanner = ({ style }: { style?: any }) => (
  <View style={style}>
    <Text>AdBanner Mock</Text>
  </View>
);

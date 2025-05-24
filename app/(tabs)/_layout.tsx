import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AppTutorial, useTutorial } from '@/app/components/AppTutorial';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { interstitialAdManager } from '@/app/services/adService';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { shouldShowTutorial, loading } = useTutorial();

  const handleTabPress = () => {
    // Trigger interstitial ad on tab switch
    interstitialAdManager.onTabSwitch();
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'PNR Status',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="ticket.fill" color={color} />,
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Trains',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="train.side.front.car" color={color} />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="info.circle.fill" color={color} />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
      </Tabs>

      {!loading && shouldShowTutorial && <AppTutorial />}
    </>
  );
}

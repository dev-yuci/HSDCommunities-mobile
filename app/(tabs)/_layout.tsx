import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EF4444',
        tabBarInactiveTintColor: '#6B7280',
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#FFFFFF',
          borderTopWidth: 0,
          position: Platform.OS === 'ios' ? 'absolute' : 'relative',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 10,
        },
        tabBarBackground: () => 
          Platform.OS === 'ios' ? (
            <BlurView
              tint="light"
              intensity={95}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -3,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="home" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof HapticTab>) => <HapticTab {...props} />,
          headerTitle: 'HSD Türkiye',
          headerStyle: {
            backgroundColor: '#F0F8FF',
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#111827',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Etkinlikler',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="calendar" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof HapticTab>) => <HapticTab {...props} />,
          headerTitle: 'Etkinlikler',
          headerStyle: {
            backgroundColor: '#F0F8FF',
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#111827',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: 'Kulüpler',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="university" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof HapticTab>) => <HapticTab {...props} />,
          headerTitle: 'Kulüpler',
          headerStyle: {
            backgroundColor: '#F0F8FF',
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#111827',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="user" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof HapticTab>) => <HapticTab {...props} />,
          headerTitle: 'Profilim',
          headerStyle: {
            backgroundColor: '#F0F8FF',
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#111827',
          },
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}

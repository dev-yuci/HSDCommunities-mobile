import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View, Pressable } from 'react-native';

// Dokunsal geri bildirim için özel Tab bileşeni
function HapticTab(props: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      {...props}
      android_ripple={{
        color: 'rgba(239, 68, 68, 0.2)',
        borderless: false,
        radius: 20,
      }}
    />
  );
}

// Tab için kullanılacak ikonlar
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Renk şeması için basit bir değer kullanıyoruz
  const colorScheme = 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EF4444',
        tabBarInactiveTintColor: '#6B7280',
        tabBarShowLabel: true,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 11,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="home" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof Pressable>) => <HapticTab {...props} />,
          headerTitle: 'HSD Türkiye',
          headerTitleStyle: {
            color: '#EF4444',
            fontWeight: '700',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Etkinlikler',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="calendar" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof Pressable>) => <HapticTab {...props} />,
          headerTitle: 'Etkinlikler',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: 'Kulüpler',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="university" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof Pressable>) => <HapticTab {...props} />,
          headerTitle: 'Kulüpler',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: 'Blog',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="newspaper-o" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof Pressable>) => <HapticTab {...props} />,
          headerTitle: 'Blog',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="user" color={color} />,
          tabBarButton: (props: React.ComponentProps<typeof Pressable>) => <HapticTab {...props} />,
          headerTitle: 'Profilim',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoginForm from '@/components/auth/LoginForm';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Stack, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

function LoginScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EF4444" />
      <Stack.Screen 
        options={{
          title: 'Giriş Yap',
          headerShown: false
        }} 
      />
      
      <View style={styles.header}>
        <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Giriş Yap</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <AnimatedThemedView 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <LoginForm />
      </AnimatedThemedView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#EF4444',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
}); 
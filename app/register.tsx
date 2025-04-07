import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import HSDLogo from '@/components/HSDLogo';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedView = Animated.createAnimatedComponent(View);

function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    // Basit validasyon
    if (!formData.name || !formData.email || !formData.university || !formData.password || !formData.confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    setIsSubmitting(true);

    // Burada normalde API'ye istek göndereceğiz
    // Şimdilik simüle ediyoruz
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Kayıt Başarılı',
        'HSD Topluluklarına hoş geldiniz! Hesabınız başarıyla oluşturuldu.',
        [
          {
            text: 'Giriş Yap',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <Stack.Screen 
        options={{
          title: 'Kayıt Ol',
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
        <ThemedText style={styles.headerTitle}>Yeni Hesap Oluştur</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AnimatedView entering={FadeIn.duration(600)} style={styles.logoContainer}>
            <HSDLogo size={60} color="#3B82F6" />
            <ThemedText style={styles.welcomeText}>HSD Topluluklarına Katılın</ThemedText>
            <ThemedText style={styles.subText}>Etkinliklere katılmak ve diğer topluluk üyeleriyle bağlantı kurmak için bir hesap oluşturun</ThemedText>
          </AnimatedView>

          <AnimatedThemedView entering={FadeIn.duration(600).delay(150)} style={styles.formContainer}>
            <ThemedView style={styles.inputContainer}>
              <FontAwesome name="user" size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Adınız ve Soyadınız"
                placeholderTextColor="#9CA3AF"
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
                autoCapitalize="words"
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <FontAwesome name="envelope" size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="E-posta adresiniz"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <FontAwesome name="university" size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Üniversiteniz"
                placeholderTextColor="#9CA3AF"
                value={formData.university}
                onChangeText={(value) => handleChange('university', value)}
                autoCapitalize="words"
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <FontAwesome name="lock" size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Şifreniz"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome 
                  name={showPassword ? 'eye-slash' : 'eye'} 
                  size={18} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <FontAwesome name="lock" size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi Onaylayın"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome 
                  name={showConfirmPassword ? 'eye-slash' : 'eye'} 
                  size={18} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </ThemedView>

            <View style={styles.termsContainer}>
              <ThemedText style={styles.termsText}>
                Kayıt olarak, <ThemedText style={styles.termsLink}>Kullanım Koşulları</ThemedText> ve <ThemedText style={styles.termsLink}>Gizlilik Politikasını</ThemedText> kabul etmiş olursunuz.
              </ThemedText>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, isSubmitting && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ThemedText style={styles.registerButtonText}>Kaydediliyor...</ThemedText>
              ) : (
                <View style={styles.buttonContent}>
                  <ThemedText style={styles.registerButtonText}>Kayıt Ol</ThemedText>
                  <FontAwesome name="arrow-right" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </AnimatedThemedView>

          <AnimatedView entering={FadeIn.duration(600).delay(300)} style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Zaten bir hesabınız var mı?{' '}
              <ThemedText 
                style={styles.loginLink}
                onPress={() => router.replace('/login')}
              >
                Giriş Yap
              </ThemedText>
            </ThemedText>
          </AnimatedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

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
    backgroundColor: '#3B82F6',
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
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  termsContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  termsLink: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: '500',
  },
}); 
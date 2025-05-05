import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HSDLogo from '@/components/HSDLogo';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta ve şifre alanları boş bırakılamaz');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Giriş işlemi başlatılıyor...');
      const result = await login(email, password);
      console.log('Giriş başarılı:', result);
      
      // Giriş başarılı - kullanıcı ana sayfaya yönlendirilecek
      router.replace('/(tabs)');
    } catch (error: any) {
      // Hata detaylarını konsola yazdır
      console.error('Giriş hatası:', error);
      console.error('Hata kodu:', error.code);
      console.error('Hata mesajı:', error.message);
      
      // Firebase hata kodlarına göre uygun mesajlar gösterme
      let errorMessage = 'Giriş yapılırken bir hata oluştu.';
      
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Bu kullanıcı hesabı devre dışı bırakılmış.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresine ait bir hesap bulunamadı.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Hatalı şifre.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.';
      } else if (error.code) {
        // Diğer hata kodları için daha detaylı mesaj
        errorMessage = `Hata kodu: ${error.code}\nDetay: ${error.message}`;
      }
      
      Alert.alert('Giriş Başarısız', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AnimatedView entering={FadeInDown.duration(600)} style={styles.logoContainer}>
        <HSDLogo size={80} />
        <ThemedText style={styles.welcomeText}>HSD Topluluklarına Hoş Geldiniz</ThemedText>
        <ThemedText style={styles.subText}>Hesabınızı kullanarak giriş yapın</ThemedText>
      </AnimatedView>

      <AnimatedView entering={FadeInDown.duration(600).delay(150)} style={styles.formContainer}>
        <ThemedView style={styles.inputContainer}>
          <FontAwesome name="envelope" size={18} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-posta adresiniz"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <FontAwesome name="lock" size={18} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifreniz"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
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

        <TouchableOpacity style={styles.forgotPassword}>
          <ThemedText style={styles.forgotPasswordText}>Şifremi Unuttum</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <ThemedText style={[styles.loginButtonText, {marginLeft: 8}]}>Giriş Yapılıyor...</ThemedText>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <ThemedText style={styles.loginButtonText}>Giriş Yap</ThemedText>
              <FontAwesome name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      </AnimatedView>

      <AnimatedView entering={FadeInDown.duration(600).delay(300)} style={styles.divider}>
        <View style={styles.dividerLine} />
        <ThemedText style={styles.dividerText}>VEYA</ThemedText>
        <View style={styles.dividerLine} />
      </AnimatedView>

      <AnimatedView entering={FadeInDown.duration(600).delay(450)} style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <FontAwesome name="google" size={18} color="#EA4335" style={styles.socialIcon} />
          <ThemedText style={styles.socialButtonText}>Google ile Giriş Yap</ThemedText>
        </TouchableOpacity>
      </AnimatedView>

      <AnimatedView entering={FadeInDown.duration(600).delay(600)} style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Hesabınız yok mu?{' '}
          <ThemedText 
            style={styles.registerLink}
            onPress={() => router.push('/register')}
          >
            Kayıt Ol
          </ThemedText>
        </ThemedText>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#FDA4AF',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '500',
  },
  socialButtons: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#EF4444',
    fontWeight: '500',
  },
}); 
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HSDLogo from '@/components/HSDLogo';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function RegisterForm() {
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
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Basit validasyon
    if (!formData.name || !formData.email || !formData.university || !formData.password || !formData.confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    // Şifre gücü kontrolü
    if (formData.password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    setIsSubmitting(true);

    try {
      // Firebase ile kayıt işlemi
      console.log('Kayıt işlemi başlatılıyor...');
      const userCredential = await register(formData.email, formData.password);
      
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        console.log('Kullanıcı oluşturuldu, veritabanına ek bilgiler kaydediliyor...');
        
        // Ek kullanıcı bilgilerini Firestore'a kaydet
        try {
          await db.collection('users').doc(uid).set({
            name: formData.name,
            email: formData.email,
            university: formData.university,
            createdAt: new Date(),
          });
          
          console.log('Kullanıcı profili başarıyla oluşturuldu');
          
          // Kayıt başarılı mesajı ve yönlendirme
          Alert.alert(
            'Kayıt Başarılı',
            'HSD Topluluklarına hoş geldiniz! Hesabınız başarıyla oluşturuldu.',
            [
              {
                text: 'Devam Et',
                onPress: () => router.replace('/(tabs)'),
              },
            ]
          );
        } catch (firestoreError: any) {
          console.error('Firestore hatası:', firestoreError);
          
          // Kullanıcı oluşturuldu ancak profil verileri kaydedilemedi
          Alert.alert(
            'Kısmi Başarı',
            'Hesabınız oluşturuldu, ancak profil bilgileriniz kaydedilemedi. Lütfen daha sonra profilinizi güncelleyin.',
            [
              {
                text: 'Devam Et',
                onPress: () => router.replace('/(tabs)'),
              },
            ]
          );
        }
      } else {
        throw new Error('Kullanıcı oluşturuldu ancak kullanıcı verileri alınamadı');
      }
    } catch (error: any) {
      // Hata detaylarını konsola yazdır
      console.error('Kayıt hatası:', error);
      console.error('Hata kodu:', error.code);
      console.error('Hata mesajı:', error.message);
      
      // Firebase hata kodlarına göre uygun mesajlar gösterme
      let errorMessage = 'Kayıt işlemi sırasında bir hata oluştu.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'E-posta/şifre girişi devre dışı bırakılmış.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.';
      } else if (error.code) {
        // Diğer hata kodları için daha detaylı mesaj
        errorMessage = `Hata kodu: ${error.code}\nDetay: ${error.message}`;
      }
      
      Alert.alert('Kayıt Başarısız', errorMessage);
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
        <HSDLogo size={60} color="#EF4444" />
        <ThemedText style={styles.welcomeText}>HSD Topluluklarına Katılın</ThemedText>
        <ThemedText style={styles.subText}>Etkinliklere katılmak ve diğer topluluk üyeleriyle bağlantı kurmak için bir hesap oluşturun</ThemedText>
      </AnimatedView>

      <View style={styles.formContainer}>
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
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <ThemedText style={[styles.registerButtonText, {marginLeft: 8}]}>Kaydediliyor...</ThemedText>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <ThemedText style={styles.registerButtonText}>Kayıt Ol</ThemedText>
              <FontAwesome name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <AnimatedView entering={FadeInDown.duration(600).delay(300)} style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Zaten bir hesabınız var mı?{' '}
          <ThemedText 
            style={styles.loginLink}
            onPress={() => router.push('/login')}
          >
            Giriş Yap
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
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
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
    color: '#EF4444',
    fontWeight: '500',
  },
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: '#FDA4AF',
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
    color: '#EF4444',
    fontWeight: '500',
  },
}); 
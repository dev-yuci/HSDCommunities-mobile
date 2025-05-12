import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Örnek etkinlik verileri - Gerçek uygulamada API'den gelecektir
const events = [
  {
    id: '1',
    title: 'HMS Core Workshop',
    type: 'Workshop',
  },
  {
    id: '2',
    title: 'HarmonyOS Hackathon 2024',
    type: 'Hackathon',
  },
  {
    id: '3',
    title: 'HSD Türkiye Zirvesi 2024',
    type: 'Konferans',
  }
];

export default function RegisterScreen() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();
  const event = events.find(e => e.id === eventId) || events[0];
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  });

  const validateForm = () => {
    const errors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      email: !email.trim() || !email.includes('@'),
      phone: !phone.trim() || phone.length < 10
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Gerçek uygulamada bir API'ye gönderilecek
      Alert.alert(
        "Kayıt Başarılı",
        `${event.title} etkinliğine kaydınız alınmıştır. Katılım bilgileriniz e-posta adresinize gönderilecektir.`,
        [
          { 
            text: "Tamam", 
            onPress: () => router.push('/(tabs)/events') 
          }
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Etkinlik Kaydı",
          headerBackTitle: "Geri"
        }} 
      />
      
      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.title}>
          {event.title} Etkinliği için Kayıt Formu
        </ThemedText>
        
        <ThemedText style={styles.subtitle}>
          Etkinliğe katılım için aşağıdaki bilgileri doldurunuz.
        </ThemedText>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>İsim *</ThemedText>
          <TextInput
            style={[styles.input, formErrors.firstName && styles.inputError]}
            placeholder="Adınız"
            value={firstName}
            onChangeText={setFirstName}
          />
          {formErrors.firstName && (
            <ThemedText style={styles.errorText}>İsim alanı zorunludur</ThemedText>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Soyisim *</ThemedText>
          <TextInput
            style={[styles.input, formErrors.lastName && styles.inputError]}
            placeholder="Soyadınız"
            value={lastName}
            onChangeText={setLastName}
          />
          {formErrors.lastName && (
            <ThemedText style={styles.errorText}>Soyisim alanı zorunludur</ThemedText>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>E-posta *</ThemedText>
          <TextInput
            style={[styles.input, formErrors.email && styles.inputError]}
            placeholder="ornek@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {formErrors.email && (
            <ThemedText style={styles.errorText}>Geçerli bir e-posta adresi giriniz</ThemedText>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Telefon Numarası *</ThemedText>
          <TextInput
            style={[styles.input, formErrors.phone && styles.inputError]}
            placeholder="05XX XXX XX XX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          {formErrors.phone && (
            <ThemedText style={styles.errorText}>Geçerli bir telefon numarası giriniz</ThemedText>
          )}
        </View>
        
        <View style={styles.formInfo}>
          <FontAwesome name="info-circle" size={16} color="#3B82F6" style={{marginRight: 8}} />
          <ThemedText style={styles.infoText}>
            Kişisel bilgileriniz sadece etkinlik kaydı için kullanılacak ve üçüncü kişilerle paylaşılmayacaktır.
          </ThemedText>
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Kaydı Tamamla</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => router.push(`/events/${eventId}`)}
        >
          <ThemedText style={styles.cancelButtonText}>İptal</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  formInfo: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#3B82F6',
  },
  submitButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 16,
  },
}); 
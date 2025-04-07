import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HSDLogo from '@/components/HSDLogo';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedView = Animated.createAnimatedComponent(View);

function ProfileScreen() {
  // Normalde kullanıcı durumunu state management ile kontrol edeceğiz
  // Şimdilik basit bir state kullanıyoruz
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  if (!isLoggedIn) {
    return (
      <ThemedView style={styles.container}>
        <AnimatedView 
          style={styles.notLoggedInContainer}
          entering={FadeIn.duration(800)}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <HSDLogo size={100} color="#EF4444" />
            </View>
          </View>
          
          <AnimatedThemedView 
            entering={FadeInDown.duration(1000).delay(300).springify()}
          >
            <ThemedText style={styles.title}>HSD Topluluklarına Katılın</ThemedText>
            <ThemedText style={styles.description}>
              Giriş yaparak etkinliklere katılabilir, topluluk içeriklerini görüntüleyebilir ve diğer öğrencilerle iletişim kurabilirsiniz.
            </ThemedText>
          </AnimatedThemedView>
          
          <AnimatedView 
            style={styles.buttonContainer}
            entering={FadeInDown.duration(1000).delay(600)}
          >
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <ThemedText style={styles.loginButtonText}>Giriş Yap</ThemedText>
                <FontAwesome name="sign-in" size={18} color="#FFFFFF" style={styles.buttonIcon} />
              </TouchableOpacity>
            </Link>
            
            <TouchableOpacity style={styles.registerButton}>
              <ThemedText style={styles.registerButtonText}>Hesap Oluştur</ThemedText>
              <FontAwesome name="user-plus" size={16} color="#4B5563" style={styles.buttonIcon} />
            </TouchableOpacity>
          </AnimatedView>
          
          <AnimatedView 
            style={styles.featuresContainer}
            entering={FadeInDown.duration(1000).delay(900)}
          >
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="calendar-check-o" size={20} color="#3B82F6" />
              </View>
              <ThemedText style={styles.featureText}>
                Etkinliklere katılın
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="users" size={20} color="#3B82F6" />
              </View>
              <ThemedText style={styles.featureText}>
                Diğer üyelerle bağlantı kurun
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="certificate" size={20} color="#3B82F6" />
              </View>
              <ThemedText style={styles.featureText}>
                Sertifika ve ödüller kazanın
              </ThemedText>
            </View>
          </AnimatedView>
        </AnimatedView>
      </ThemedView>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder}>
            <FontAwesome name="user" size={40} color="#FFFFFF" />
          </View>
        </View>
        <ThemedText style={styles.profileName}>Ali Yılmaz</ThemedText>
        <ThemedText style={styles.profileInfo}>İstanbul Teknik Üniversitesi</ThemedText>
        <ThemedText style={styles.profileInfo}>Bilgisayar Mühendisliği</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>Üyelikler</ThemedText>
        
        <ThemedView style={styles.membershipCard}>
          <View style={styles.membershipIcon}>
            <FontAwesome name="university" size={24} color="#EF4444" />
          </View>
          <View style={styles.membershipInfo}>
            <ThemedText style={styles.membershipTitle}>HSD İTÜ Kulübü</ThemedText>
            <ThemedText style={styles.membershipDetails}>Aktif Üye • 2023'den beri</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>Katıldığım Etkinlikler</ThemedText>
        
        <ThemedView style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <FontAwesome name="calendar-check-o" size={24} color="#3B82F6" />
          </View>
          <View style={styles.eventInfo}>
            <ThemedText style={styles.eventTitle}>Flutter ile Mobil Uygulama Geliştirme</ThemedText>
            <ThemedText style={styles.eventDetails}>10 Mart 2024 • İTÜ Teknokent</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </ThemedView>
        
        <ThemedView style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <FontAwesome name="calendar-check-o" size={24} color="#3B82F6" />
          </View>
          <View style={styles.eventInfo}>
            <ThemedText style={styles.eventTitle}>Huawei Mobile Services Workshop</ThemedText>
            <ThemedText style={styles.eventDetails}>15 Şubat 2024 • Online</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>Ayarlar</ThemedText>
        
        <TouchableOpacity style={styles.settingsItem}>
          <View style={styles.settingsItemContent}>
            <FontAwesome name="user-circle" size={20} color="#6B7280" style={styles.settingsIcon} />
            <ThemedText style={styles.settingsItemText}>Profil Bilgilerim</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsItem}>
          <View style={styles.settingsItemContent}>
            <FontAwesome name="bell" size={20} color="#6B7280" style={styles.settingsIcon} />
            <ThemedText style={styles.settingsItemText}>Bildirim Ayarları</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsItem}>
          <View style={styles.settingsItemContent}>
            <FontAwesome name="lock" size={20} color="#6B7280" style={styles.settingsIcon} />
            <ThemedText style={styles.settingsItemText}>Gizlilik ve Güvenlik</ThemedText>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingsItem, styles.logoutButton]}
          onPress={() => setIsLoggedIn(false)}
        >
          <View style={styles.settingsItemContent}>
            <FontAwesome name="sign-out" size={20} color="#EF4444" style={styles.settingsIcon} />
            <ThemedText style={[styles.settingsItemText, styles.logoutText]}>Çıkış Yap</ThemedText>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notLoggedInContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoBackground: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 60,
    padding: 20,
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    color: '#6B7280',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  registerButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  featuresContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileInfo: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  membershipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  membershipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  membershipInfo: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  membershipDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutText: {
    color: '#EF4444',
  },
}); 
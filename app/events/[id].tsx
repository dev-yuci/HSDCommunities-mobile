import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Ekranın genişliğini al
const { width } = Dimensions.get('window');

// Örnek etkinlik verileri - Gerçek uygulamada API'den gelecektir
const events = [
  {
    id: '1',
    title: 'HMS Core Workshop',
    type: 'Workshop',
    typeColor: '#EF4444',
    date: '15 Haziran 2024',
    time: '10:00 - 16:00',
    location: 'İstanbul Teknik Üniversitesi',
    locationDetail: 'Ayazağa Kampüsü, Bilgisayar Mühendisliği Fakültesi, Lab A-401',
    image: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?q=80&w=1000&auto=format&fit=crop',
    participants: 45,
    maxParticipants: 50,
    description: 'Huawei Mobile Services Core API\'larını kullanarak akıllı uygulamalar geliştirmeyi öğrenin. Bu workshop\'ta HMS Core API\'larını kullanarak uygulama geliştirme yeteneklerinizi geliştireceksiniz.\n\nWorkshop\'ta şu konuları ele alacağız:\n• HMS Core servis mimarisi ve yapısı\n• Harita ve konum servisleri entegrasyonu\n• Push notification implementasyonu\n• Account Kit ile kullanıcı yönetimi\n• Analytics Kit ile kullanım verilerinin toplanması\n• ML Kit ile yapay zeka servislerinin kullanımı\n\nEtkinliğe katılım için temel Android geliştirme bilgisi gerekmektedir. Katılımcıların kendi bilgisayarlarında Android Studio kurulu olmalıdır.',
    organizer: 'HSD İstanbul Teknik Üniversitesi',
    speakers: [
      {
        name: 'Ahmet Yılmaz',
        title: 'HMS Core Geliştirici Elçisi',
        company: 'Huawei Türkiye'
      },
      {
        name: 'Zeynep Kaya',
        title: 'Mobil Uygulama Geliştirici',
        company: 'ITÜ HSD'
      }
    ],
    requirements: [
      'Temel Android bilgisi',
      'Android Studio kurulu bilgisayar',
      'Gmail hesabı',
      'Huawei Developer hesabı (ücretsiz oluşturulabilir)'
    ]
  },
  {
    id: '2',
    title: 'HarmonyOS Hackathon 2024',
    type: 'Hackathon',
    typeColor: '#3B82F6', 
    date: '22-24 Temmuz 2024',
    time: 'Tam gün etkinlik',
    location: 'Ankara ODTÜ Teknokent',
    locationDetail: 'ODTÜ Teknokent, Silikon Blok, Etkinlik Salonu',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    participants: 120,
    maxParticipants: 150,
    description: '48 saat boyunca HarmonyOS için yenilikçi uygulamalar geliştirin ve ödüller kazanın. Takım olarak çalışarak yeni fikirler geliştirebilir ve Huawei ekosisteminde yer alabilirsiniz.\n\nHackathon\'da geliştireceğiniz uygulamalar için önerilen temalar:\n• Akıllı ev ve IoT çözümleri\n• Sağlık ve fitness uygulamaları\n• Eğitim teknolojileri\n• Sürdürülebilirlik ve çevre\n• Yapay zeka destekli çözümler\n\nKatılımcılar 2-5 kişilik takımlar halinde yarışacaktır. Kayıt olurken takım üyelerinizi belirtmeyi unutmayın. Bireysel katılımcılar etkinlik günü takımlara yerleştirilecektir.\n\nÖdüller:\n• Birinci: 30.000 TL + Huawei cihazları\n• İkinci: 20.000 TL + Huawei cihazları\n• Üçüncü: 10.000 TL + Huawei cihazları\n\nAyrıca tüm katılımcılara sertifika verilecek ve başarılı projelere Huawei AppGallery\'de yer alma fırsatı sunulacaktır.',
    organizer: 'HSD Ankara ve Huawei Türkiye',
    speakers: [
      {
        name: 'Dr. Murat Demir',
        title: 'HarmonyOS Ekosistem Müdürü',
        company: 'Huawei Global'
      },
      {
        name: 'Emre Şahin',
        title: 'Yazılım Mühendisi',
        company: 'Huawei Türkiye'
      }
    ],
    requirements: [
      'Yazılım geliştirme deneyimi',
      'Kendi bilgisayarınız',
      'Takım ruhu ve yaratıcılık'
    ]
  },
  {
    id: '3',
    title: 'HSD Türkiye Zirvesi 2024',
    type: 'Konferans',
    typeColor: '#8B5CF6',
    date: '10 Ağustos 2024',
    time: '09:00 - 18:00',
    location: 'İzmir Ekonomi Üniversitesi',
    locationDetail: 'Konferans Merkezi, Ana Salon',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    participants: 250,
    maxParticipants: 300,
    description: 'Türkiye\'nin dört bir yanından HSD üyelerinin buluşacağı yıllık zirvede yerinizi alın. Teknoloji liderleri, uzmanlar ve öğrenci geliştiriciler bir araya gelerek geleceğin teknolojilerini konuşacak.\n\nZirve Programı:\n• 09:00-10:00: Kayıt ve Tanışma\n• 10:00-10:30: Açılış Konuşmaları\n• 10:30-11:30: Ana Konuşma: "Teknolojinin Geleceği ve HarmonyOS Ekosistemin Rolü"\n• 11:30-12:30: Panel: "Öğrenci Toplulukları ve Sektör İş Birlikleri"\n• 12:30-13:30: Öğle Yemeği\n• 13:30-15:00: Paralel Oturumlar (Mobil Geliştirme / Yapay Zeka / IoT)\n• 15:00-15:30: Kahve Molası\n• 15:30-16:30: HSD Başarı Hikayeleri\n• 16:30-17:30: Networking Etkinliği\n• 17:30-18:00: Kapanış ve Değerlendirme\n\nKonferans boyunca Huawei\'in son teknolojilerini deneyimleme fırsatı bulacak, farklı üniversitelerden gelen HSD üyeleriyle tanışma imkanı yakalayacaksınız.',
    organizer: 'HSD Türkiye',
    speakers: [
      {
        name: 'Li Wei',
        title: 'Tüketici İş Grubu Başkanı',
        company: 'Huawei Türkiye'
      },
      {
        name: 'Prof. Dr. Ahmet Durmuş',
        title: 'Bilgisayar Mühendisliği Bölüm Başkanı',
        company: 'İzmir Ekonomi Üniversitesi'
      },
      {
        name: 'Ayşe Kartal',
        title: 'Başkan',
        company: 'HSD Türkiye Koordinasyon Kurulu'
      }
    ],
    requirements: []
  }
];

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // id'ye göre etkinlik verilerini bul
  const event = events.find(event => event.id === id) || events[0];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{
          title: event.title,
          headerBackTitle: 'Etkinlikler'
        }} 
      />
      
      {/* Banner Görsel */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.bannerGradient}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/events')}
        >
          <FontAwesome name="arrow-left" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={[styles.eventTypeBadge, {backgroundColor: event.typeColor}]}>
          <ThemedText style={styles.eventTypeText}>{event.type}</ThemedText>
        </View>
      </View>
      
      {/* İçerik */}
      <ThemedView style={styles.contentContainer}>
        {/* Başlık ve Temel Bilgiler */}
        <ThemedText style={styles.title}>{event.title}</ThemedText>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar" size={18} color="#4B5563" style={styles.infoIcon} />
            <ThemedText style={styles.infoText}>{event.date}</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="clock-o" size={18} color="#4B5563" style={styles.infoIcon} />
            <ThemedText style={styles.infoText}>{event.time}</ThemedText>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={18} color="#4B5563" style={styles.infoIcon} />
          <View>
            <ThemedText style={styles.locationText}>{event.location}</ThemedText>
            <ThemedText style={styles.locationDetailText}>{event.locationDetail}</ThemedText>
          </View>
        </View>
        
        {/* Katılımcı Durumu */}
        <View style={styles.participantsContainer}>
          <View style={styles.participantsHeader}>
            <ThemedText style={styles.participantsTitle}>Katılımcılar</ThemedText>
            <ThemedText style={styles.participantsCount}>
              {event.participants}/{event.maxParticipants}
            </ThemedText>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                {width: `${(event.participants / event.maxParticipants) * 100}%`}
              ]} 
            />
          </View>
          {event.participants >= event.maxParticipants ? (
            <ThemedText style={styles.fullParticipantsText}>
              Bu etkinlik için kontenjan dolmuştur
            </ThemedText>
          ) : (
            <ThemedText style={styles.availableSeatsText}>
              {event.maxParticipants - event.participants} kişilik kontenjan kalmıştır
            </ThemedText>
          )}
        </View>
        
        {/* Açıklama */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Etkinlik Açıklaması</ThemedText>
          <ThemedText style={styles.description}>{event.description}</ThemedText>
        </View>
        
        {/* Konuşmacılar */}
        {event.speakers && event.speakers.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Konuşmacılar</ThemedText>
            {event.speakers.map((speaker, index) => (
              <View key={index} style={styles.speakerItem}>
                <View style={styles.speakerAvatar}>
                  <FontAwesome name="user" size={24} color="#6B7280" />
                </View>
                <View style={styles.speakerInfo}>
                  <ThemedText style={styles.speakerName}>{speaker.name}</ThemedText>
                  <ThemedText style={styles.speakerTitle}>{speaker.title}</ThemedText>
                  <ThemedText style={styles.speakerCompany}>{speaker.company}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Gereksinimler */}
        {event.requirements && event.requirements.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Katılım Gereksinimleri</ThemedText>
            {event.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <FontAwesome name="check-circle" size={16} color="#059669" style={styles.requirementIcon} />
                <ThemedText style={styles.requirementText}>{requirement}</ThemedText>
              </View>
            ))}
          </View>
        )}
        
        {/* Düzenleyen */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Düzenleyen</ThemedText>
          <ThemedText style={styles.organizerText}>{event.organizer}</ThemedText>
        </View>
        
        {/* Butonlar */}
        <View style={styles.buttonsContainer}>
          {event.participants < event.maxParticipants && (
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push(`/events/register?eventId=${id}`)}
            >
              <FontAwesome name="ticket" size={16} color="#FFFFFF" style={{marginRight: 8}} />
              <ThemedText style={styles.primaryButtonText}>Kaydol</ThemedText>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.secondaryButton}>
            <FontAwesome name="share-alt" size={16} color="#4B5563" style={{marginRight: 8}} />
            <ThemedText style={styles.secondaryButtonText}>Paylaş</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <FontAwesome name="calendar-plus-o" size={16} color="#4B5563" style={{marginRight: 8}} />
            <ThemedText style={styles.secondaryButtonText}>Takvime Ekle</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  bannerContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTypeBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  eventTypeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#4B5563',
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  locationText: {
    fontSize: 15,
    color: '#4B5563',
  },
  locationDetailText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  participantsContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  participantsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 5,
  },
  fullParticipantsText: {
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'right',
  },
  availableSeatsText: {
    fontSize: 13,
    color: '#059669',
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
  },
  speakerItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  speakerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  speakerInfo: {
    flex: 1,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  speakerTitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  speakerCompany: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementIcon: {
    marginRight: 8,
  },
  requirementText: {
    fontSize: 15,
    color: '#4B5563',
  },
  organizerText: {
    fontSize: 15,
    color: '#4B5563',
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 15,
  },
}); 
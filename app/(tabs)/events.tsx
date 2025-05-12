import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function EventsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();

  // Etkinlik detay sayfasına gitme fonksiyonu
  const goToEventDetail = (id: string) => {
    router.push(`/events/${id}`);
  };

  // Etkinlik kayıt sayfasına gitme fonksiyonu
  const goToEventRegister = (id: string) => {
    router.push(`/events/register?eventId=${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Etkinlikler</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          HSD topluluklarının düzenlediği etkinlikler ve workshoplar
        </ThemedText>
      </ThemedView>

      {/* Tab Seçenekleri */}
      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTabButton]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Yaklaşan Etkinlikler</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'past' && styles.activeTabButton]} 
          onPress={() => setActiveTab('past')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Geçmiş Etkinlikler</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
          <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
            <ThemedText style={[styles.filterText, styles.filterTextActive]}>Tümü</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Workshop</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Konferans</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Hackathon</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Networking</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
      
      {activeTab === 'upcoming' ? (
        <ThemedView style={styles.eventsList}>
          {/* Yaklaşan Etkinlik 1 */}
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={() => goToEventDetail('1')}
            activeOpacity={0.9}
          >
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?q=80&w=1000&auto=format&fit=crop' }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              />
              <View style={styles.eventType}>
                <ThemedText style={styles.eventTypeText}>Workshop</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                HMS Core Workshop
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 15 Haziran 2024
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> İstanbul Teknik Üniversitesi
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                Huawei Mobile Services Core API'larını kullanarak akıllı uygulamalar geliştirmeyi öğrenin. Bu workshop'ta geliştiricilerin HMS Core API'larını kullanarak uygulama geliştirme yeteneklerini geliştirmeleri hedeflenmektedir.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity 
                  style={styles.registerButton}
                  onPress={() => goToEventRegister('1')}
                >
                  <ThemedText style={styles.registerButtonText}>Kaydol</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => goToEventDetail('1')}
                >
                  <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
          
          {/* Yaklaşan Etkinlik 2 */}
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={() => goToEventDetail('2')}
            activeOpacity={0.9}
          >
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop' }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              />
              <View style={[styles.eventType, {backgroundColor: '#3B82F6'}]}>
                <ThemedText style={styles.eventTypeText}>Hackathon</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                HarmonyOS Hackathon 2024
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 22-24 Temmuz 2024
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> Ankara ODTÜ Teknokent
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                48 saat boyunca HarmonyOS için yenilikçi uygulamalar geliştirin ve ödüller kazanın. Takım olarak çalışarak yeni fikirler geliştirebilir ve Huawei ekosisteminde yer alabilirsiniz.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity 
                  style={styles.registerButton}
                  onPress={() => goToEventRegister('2')}
                >
                  <ThemedText style={styles.registerButtonText}>Kaydol</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => goToEventDetail('2')}
                >
                  <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>

          {/* Yaklaşan Etkinlik 3 */}
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={() => goToEventDetail('3')}
            activeOpacity={0.9}
          >
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop' }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              />
              <View style={[styles.eventType, {backgroundColor: '#8B5CF6'}]}>
                <ThemedText style={styles.eventTypeText}>Konferans</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                HSD Türkiye Zirvesi 2024
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 10 Ağustos 2024
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> İzmir Ekonomi Üniversitesi
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                Türkiye'nin dört bir yanından HSD üyelerinin buluşacağı yıllık zirvede yerinizi alın. Teknoloji liderleri, uzmanlar ve öğrenci geliştiriciler bir araya gelerek geleceğin teknolojilerini konuşacak.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity 
                  style={styles.registerButton}
                  onPress={() => goToEventRegister('3')}
                >
                  <ThemedText style={styles.registerButtonText}>Kaydol</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => goToEventDetail('3')}
                >
                  <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.eventsList}>
          {/* Geçmiş Etkinlik 1 */}
          <ThemedView style={[styles.eventCard, styles.pastEventCard]}>
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop' }} 
                style={[styles.eventImage, styles.pastEventImage]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageGradient}
              />
              <View style={[styles.eventType, {backgroundColor: '#6B7280'}]}>
                <ThemedText style={styles.eventTypeText}>Workshop</ThemedText>
              </View>
              <View style={styles.pastEventBadge}>
                <ThemedText style={styles.pastEventBadgeText}>Tamamlandı</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                Flutter ile Mobil Uygulama Geliştirme
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 10 Mart 2024
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> İTÜ Teknokent
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                Flutter framework'ü kullanarak hem Android hem de iOS platformları için uygulama geliştirme eğitimi verildi. Katılımcılar temel widget'ları öğrenerek basit bir uygulama geliştirdiler.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity style={styles.galleryButton}>
                  <FontAwesome name="image" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.galleryButtonText}>Fotoğraflar</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialsButton}>
                  <FontAwesome name="download" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.materialsButtonText}>Materyaller</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </ThemedView>

          {/* Geçmiş Etkinlik 2 */}
          <ThemedView style={[styles.eventCard, styles.pastEventCard]}>
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop' }} 
                style={[styles.eventImage, styles.pastEventImage]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageGradient}
              />
              <View style={[styles.eventType, {backgroundColor: '#6B7280'}]}>
                <ThemedText style={styles.eventTypeText}>Konferans</ThemedText>
              </View>
              <View style={styles.pastEventBadge}>
                <ThemedText style={styles.pastEventBadgeText}>Tamamlandı</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                HSD Türkiye Zirvesi 2023
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 12 Temmuz 2023
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> Ankara Bilkent Üniversitesi
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                Türkiye genelindeki tüm HSD kulüplerinin bir araya geldiği bu zirvede, yeni teknolojiler konuşuldu ve yıllık değerlendirmeler yapıldı. Huawei'den konuk konuşmacılar son teknolojik gelişmeleri paylaştı.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity style={styles.galleryButton}>
                  <FontAwesome name="image" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.galleryButtonText}>Fotoğraflar</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialsButton}>
                  <FontAwesome name="download" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.materialsButtonText}>Materyaller</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </ThemedView>

          {/* Geçmiş Etkinlik 3 */}
          <ThemedView style={[styles.eventCard, styles.pastEventCard]}>
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop' }} 
                style={[styles.eventImage, styles.pastEventImage]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageGradient}
              />
              <View style={[styles.eventType, {backgroundColor: '#6B7280'}]}>
                <ThemedText style={styles.eventTypeText}>Networking</ThemedText>
              </View>
              <View style={styles.pastEventBadge}>
                <ThemedText style={styles.pastEventBadgeText}>Tamamlandı</ThemedText>
              </View>
            </View>
            
            <ThemedView style={styles.eventContent}>
              <ThemedText style={styles.eventTitle}>
                Huawei Geliştirici Buluşması
              </ThemedText>
              
              <View style={styles.eventMeta}>
                <ThemedText style={styles.eventDate}>
                  <FontAwesome name="calendar" size={14} color="#4B5563" /> 15 Şubat 2024
                </ThemedText>
                <ThemedText style={styles.eventLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> Online
                </ThemedText>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.eventDescription}>
                Huawei'in düzenlediği bu online etkinlikte, geliştiriciler bir araya gelerek ağlarını genişletti ve yeni iş fırsatlarını değerlendirdi. Huawei yetkililerinden kariyer tavsiyeleri alındı.
              </ThemedText>
              
              <View style={styles.eventFooter}>
                <TouchableOpacity style={styles.galleryButton}>
                  <FontAwesome name="image" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.galleryButtonText}>Fotoğraflar</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialsButton}>
                  <FontAwesome name="download" size={14} color="#4B5563" style={{marginRight: 6}} />
                  <ThemedText style={styles.materialsButtonText}>Materyaller</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#EF4444',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#EF4444',
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  filterButtonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pastEventCard: {
    opacity: 0.9,
  },
  eventImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  pastEventImage: {
    opacity: 0.8,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  eventType: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pastEventBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(107, 114, 128, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  pastEventBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  eventContent: {
    padding: 16,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  eventLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  eventFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  galleryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  galleryButtonText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  materialsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  materialsButtonText: {
    color: '#4B5563',
    fontWeight: '500',
  },
}); 
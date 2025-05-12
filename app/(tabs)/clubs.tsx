import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

// Sahte veriler
const CLUBS_DATA = [
  {
    id: '1',
    name: 'İstanbul Teknik Üniversitesi',
    location: 'İstanbul',
    memberCount: 125,
    eventsCount: 12,
    awards: 3,
    description: 'İTÜ HSD, 2020 yılında kurulmuş olup Huawei teknolojileri konusunda etkinlikler ve eğitimler düzenlemektedir. ML Kit, HMS Core ve AppGallery konularında uzmanlaşmış bir ekibe sahiptir.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
    president: 'Ahmet Yılmaz',
    foundedYear: 2020,
    socialMedia: {
      instagram: '@itu_hsd',
      twitter: '@itu_hsd',
      linkedin: '/itu-hsd'
    }
  },
  {
    id: '2',
    name: 'ODTÜ',
    location: 'Ankara',
    memberCount: 98,
    eventsCount: 8,
    awards: 2,
    description: 'ODTÜ HSD, Huawei teknolojileri konusunda öğrenciler arasında farkındalık yaratmak ve pratik deneyim sağlamak amacıyla çalışmaktadır.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop',
    president: 'Zeynep Kaya',
    foundedYear: 2021,
    socialMedia: {
      instagram: '@metu_hsd',
      twitter: '@metu_hsd',
      linkedin: '/metu-hsd'
    }
  },
  {
    id: '3',
    name: 'Ankara Üniversitesi',
    location: 'Ankara',
    memberCount: 76,
    eventsCount: 6,
    awards: 1,
    description: 'Ankara Üniversitesi HSD kulübü, öğrencilere Huawei mobil teknolojileri konusunda eğitimler ve atölye çalışmaları sunmaktadır.',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1000&auto=format&fit=crop',
    president: 'Burak Demir',
    foundedYear: 2021,
    socialMedia: {
      instagram: '@ankara_hsd',
      twitter: '@ankara_hsd',
      linkedin: '/ankara-hsd'
    }
  },
  {
    id: '4',
    name: 'Boğaziçi Üniversitesi',
    location: 'İstanbul',
    memberCount: 112,
    eventsCount: 10,
    awards: 3,
    description: 'Boğaziçi Üniversitesi HSD, sürdürülebilir teknolojiler ve IoT alanlarında çalışmalarıyla öne çıkan, öğrencilere Huawei ekosistemine giriş için fırsatlar sunan bir topluluğumuz.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
    president: 'Emir Aksoy',
    foundedYear: 2020,
    socialMedia: {
      instagram: '@boun_hsd',
      twitter: '@boun_hsd', 
      linkedin: '/boun-hsd'
    }
  },
  {
    id: '5',
    name: 'Yıldız Teknik Üniversitesi',
    location: 'İstanbul',
    memberCount: 87,
    eventsCount: 7,
    awards: 2,
    description: 'YTÜ HSD, Huawei uygulama geliştirme ve yazılım mühendisliği alanında etkinlikler düzenleyen aktif bir öğrenci kulübüdür.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop',
    president: 'Selin Arslan',
    foundedYear: 2021,
    socialMedia: {
      instagram: '@ytu_hsd',
      twitter: '@ytu_hsd',
      linkedin: '/ytu-hsd'
    }
  }
];

const FEATURED_CLUBS = CLUBS_DATA.filter(club => club.awards >= 2);

export default function ClubsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  const clubsListRef = useRef<ScrollView>(null);

  // Kulüp detay sayfasına gitme fonksiyonu (burayı sahte olarak bırakıyoruz)
  const goToClubDetail = (id: string) => {
    // İleride bu kulüplere özel bir sayfa yapılabilir
    console.log(`Kulüp detayı: ${id}`);
  };
  
  // Kulüpler listesine scroll yapma fonksiyonu
  const scrollToClubsList = () => {
    if (clubsListRef.current) {
      clubsListRef.current.scrollTo({ y: 800, animated: true });
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      ref={clubsListRef}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>HSD Kulüpleri</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Türkiye'nin dört bir yanındaki üniversitelerde bulunan HSD kulüplerimiz
        </ThemedText>
      </ThemedView>
      
      {/* Öne Çıkan Kulüpler */}
      <ThemedView style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Öne Çıkan Kulüpler</ThemedText>
          <TouchableOpacity onPress={scrollToClubsList}>
            <ThemedText style={styles.seeAllText}>Tümünü Gör</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.featuredScrollContainer}
        >
          {FEATURED_CLUBS.map((club) => (
            <TouchableOpacity 
              key={club.id}
              style={styles.featuredClubCard}
              onPress={() => goToClubDetail(club.id)}
              activeOpacity={0.9}
            >
              <View style={styles.featuredImageContainer}>
                <Image 
                  source={{ uri: club.image }} 
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.imageGradient}
                />
                <View style={styles.awardsContainer}>
                  <FontAwesome name="trophy" size={14} color="#FFD700" />
                  <ThemedText style={styles.awardsText}>{club.awards} Ödül</ThemedText>
                </View>
              </View>
              
              <View style={styles.featuredInfoContainer}>
                <ThemedText style={styles.featuredClubName}>{club.name}</ThemedText>
                <View style={styles.featuredMetaRow}>
                  <View style={styles.featuredMetaItem}>
                    <FontAwesome name="map-marker" size={14} color="#EF4444" />
                    <ThemedText style={styles.featuredMetaText}>{club.location}</ThemedText>
                  </View>
                  <View style={styles.featuredMetaItem}>
                    <FontAwesome name="users" size={14} color="#3B82F6" />
                    <ThemedText style={styles.featuredMetaText}>{club.memberCount} Üye</ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
      
      {/* Türkiye Haritası */}
      <ThemedView style={styles.mapPreviewContainer}>
        <View style={styles.mapPlaceholder}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop' }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.mapGradient}
          />
          <ThemedText style={styles.mapText}>Türkiye'deki 50+ HSD Kulübü</ThemedText>
        </View>
        
        <TouchableOpacity style={styles.viewMapButton}>
          <ThemedText style={styles.viewMapButtonText}>Haritada Görüntüle</ThemedText>
          <FontAwesome name="map-marker" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </ThemedView>
      
      {/* Tab Seçenekleri */}
      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'all' && styles.activeTabButton]} 
          onPress={() => setActiveTab('all')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>Tüm Kulüpler</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && styles.activeTabButton]} 
          onPress={() => setActiveTab('active')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>En Aktif</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      {/* Filtreler */}
      <ThemedView style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
          <ThemedText style={styles.searchPlaceholder}>Kulüp ara...</ThemedText>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
          <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
            <ThemedText style={[styles.filterText, styles.filterTextActive]}>Tümü</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>İstanbul</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Ankara</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>İzmir</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Diğer</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
      
      {/* Kulüpler Listesi */}
      <ThemedView style={styles.clubsList}>
        {CLUBS_DATA.map((club) => (
          <TouchableOpacity 
            key={club.id}
            style={styles.clubCard}
            onPress={() => goToClubDetail(club.id)}
            activeOpacity={0.9}
          >
            <View style={styles.clubImageContainer}>
              <Image 
                source={{ uri: club.image }} 
                style={styles.clubImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              />
            </View>
            
            <ThemedView style={styles.clubContent}>
              <ThemedText style={styles.clubName}>
                {club.name}
              </ThemedText>
              
              <View style={styles.clubMeta}>
                <ThemedText style={styles.clubLocation}>
                  <FontAwesome name="map-marker" size={14} color="#4B5563" /> {club.location}
                </ThemedText>
                <ThemedText style={styles.clubMemberCount}>
                  <FontAwesome name="users" size={14} color="#4B5563" /> {club.memberCount} Üye
                </ThemedText>
              </View>
              
              <View style={styles.clubInfoContainer}>
                <View style={styles.clubInfoItem}>
                  <FontAwesome name="calendar" size={16} color="#EF4444" />
                  <ThemedText style={styles.clubInfoText}>{club.eventsCount} Etkinlik</ThemedText>
                </View>
                
                <View style={styles.clubInfoItem}>
                  <FontAwesome name="trophy" size={16} color="#EF4444" />
                  <ThemedText style={styles.clubInfoText}>{club.awards} Ödül</ThemedText>
                </View>
                
                <View style={styles.clubInfoItem}>
                  <FontAwesome name="clock-o" size={16} color="#EF4444" />
                  <ThemedText style={styles.clubInfoText}>{club.foundedYear}</ThemedText>
                </View>
              </View>
              
              <ThemedText numberOfLines={3} style={styles.clubDescription}>
                {club.description}
              </ThemedText>
              
              <View style={styles.clubFooter}>
                <TouchableOpacity 
                  style={styles.joinButton}
                >
                  <ThemedText style={styles.joinButtonText}>Katıl</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => goToClubDetail(club.id)}
                >
                  <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
      
      {/* İstatistikler */}
      <ThemedView style={styles.statsContainer}>
        <ThemedText style={styles.statsTitle}>HSD Topluluğu İstatistikleri</ThemedText>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <FontAwesome name="users" size={24} color="#EF4444" />
            <ThemedText style={styles.statValue}>1200+</ThemedText>
            <ThemedText style={styles.statLabel}>Toplam Üye</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <FontAwesome name="university" size={24} color="#EF4444" />
            <ThemedText style={styles.statValue}>25+</ThemedText>
            <ThemedText style={styles.statLabel}>Üniversite</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <FontAwesome name="calendar-check-o" size={24} color="#EF4444" />
            <ThemedText style={styles.statValue}>120+</ThemedText>
            <ThemedText style={styles.statLabel}>Etkinlik</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <FontAwesome name="trophy" size={24} color="#EF4444" />
            <ThemedText style={styles.statValue}>35+</ThemedText>
            <ThemedText style={styles.statLabel}>Ödül</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  featuredSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#EF4444',
    fontWeight: '500',
    fontSize: 14,
  },
  featuredScrollContainer: {
    paddingBottom: 8,
    gap: 12,
  },
  featuredClubCard: {
    width: 220,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featuredImageContainer: {
    height: 120,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  awardsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  awardsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredInfoContainer: {
    padding: 12,
  },
  featuredClubName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featuredMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  mapPreviewContainer: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  mapPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  mapText: {
    position: 'absolute',
    bottom: 20,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewMapButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMapButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 8,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  filtersScrollContent: {
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
  clubsList: {
    padding: 16,
  },
  clubCard: {
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
  clubImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  clubImage: {
    width: '100%',
    height: '100%',
  },
  clubContent: {
    padding: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clubMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  clubLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  clubMemberCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  clubInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
  },
  clubInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clubInfoText: {
    fontSize: 14,
    color: '#4B5563',
  },
  clubDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 16,
  },
  clubFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
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
  statsContainer: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
}); 
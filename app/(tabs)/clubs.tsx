import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HSDLogo from '@/components/HSDLogo';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

export default function ClubsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>HSD Kulüpleri</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Türkiye'nin dört bir yanındaki üniversitelerde bulunan HSD kulüplerimiz
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.mapPreviewContainer}>
        <View style={styles.mapPlaceholder}>
          <FontAwesome name="map" size={60} color="#CBD5E1" />
          <ThemedText style={styles.mapText}>Türkiye Haritası</ThemedText>
        </View>
        
        <TouchableOpacity style={styles.viewMapButton}>
          <ThemedText style={styles.viewMapButtonText}>Haritada Görüntüle</ThemedText>
          <FontAwesome name="map-marker" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.clubsListHeader}>
        <ThemedText style={styles.clubsListTitle}>Kulüpler</ThemedText>
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
          <ThemedText style={styles.searchPlaceholder}>Kulüp ara...</ThemedText>
        </View>
      </ThemedView>
      
      <ScrollView 
        horizontal 
        pagingEnabled
        snapToInterval={cardWidth + 15}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.clubsScrollContainer}
      >
        {/* Kulüp Kartı 1 */}
        <ThemedView style={styles.clubCard}>
          <View style={styles.clubHeader}>
            <HSDLogo size={40} color="#EF4444" />
            <ThemedText style={styles.clubName}>İstanbul Teknik Üniversitesi</ThemedText>
            <ThemedText style={styles.clubMemberCount}>125 Üye</ThemedText>
          </View>
          
          <View style={styles.clubInfoContainer}>
            <View style={styles.clubInfoItem}>
              <FontAwesome name="map-marker" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>İstanbul</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="calendar" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>12 Etkinlik</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="trophy" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>3 Ödül</ThemedText>
            </View>
          </View>
          
          <ThemedText numberOfLines={3} style={styles.clubDescription}>
            İTÜ HSD, 2020 yılında kurulmuş olup Huawei teknolojileri konusunda etkinlikler ve eğitimler düzenlemektedir.
          </ThemedText>
          
          <TouchableOpacity style={styles.clubDetailsButton}>
            <ThemedText style={styles.clubDetailsButtonText}>Detayları Görüntüle</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {/* Kulüp Kartı 2 */}
        <ThemedView style={styles.clubCard}>
          <View style={styles.clubHeader}>
            <HSDLogo size={40} color="#EF4444" />
            <ThemedText style={styles.clubName}>ODTÜ</ThemedText>
            <ThemedText style={styles.clubMemberCount}>98 Üye</ThemedText>
          </View>
          
          <View style={styles.clubInfoContainer}>
            <View style={styles.clubInfoItem}>
              <FontAwesome name="map-marker" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>Ankara</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="calendar" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>8 Etkinlik</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="trophy" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>2 Ödül</ThemedText>
            </View>
          </View>
          
          <ThemedText numberOfLines={3} style={styles.clubDescription}>
            ODTÜ HSD, Huawei teknolojileri konusunda öğrenciler arasında farkındalık yaratmak ve pratik deneyim sağlamak amacıyla çalışmaktadır.
          </ThemedText>
          
          <TouchableOpacity style={styles.clubDetailsButton}>
            <ThemedText style={styles.clubDetailsButtonText}>Detayları Görüntüle</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {/* Kulüp Kartı 3 */}
        <ThemedView style={styles.clubCard}>
          <View style={styles.clubHeader}>
            <HSDLogo size={40} color="#EF4444" />
            <ThemedText style={styles.clubName}>Ankara Üniversitesi</ThemedText>
            <ThemedText style={styles.clubMemberCount}>76 Üye</ThemedText>
          </View>
          
          <View style={styles.clubInfoContainer}>
            <View style={styles.clubInfoItem}>
              <FontAwesome name="map-marker" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>Ankara</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="calendar" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>6 Etkinlik</ThemedText>
            </View>
            
            <View style={styles.clubInfoItem}>
              <FontAwesome name="trophy" size={16} color="#EF4444" />
              <ThemedText style={styles.clubInfoText}>1 Ödül</ThemedText>
            </View>
          </View>
          
          <ThemedText numberOfLines={3} style={styles.clubDescription}>
            Ankara Üniversitesi HSD kulübü, öğrencilere Huawei mobil teknolojileri konusunda eğitimler ve atölye çalışmaları sunmaktadır.
          </ThemedText>
          
          <TouchableOpacity style={styles.clubDetailsButton}>
            <ThemedText style={styles.clubDetailsButtonText}>Detayları Görüntüle</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
      
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
  },
  mapText: {
    marginTop: 8,
    color: '#9CA3AF',
    fontSize: 16,
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
  clubsListHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clubsListTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  clubsScrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  clubCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  clubHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  clubMemberCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  clubInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clubInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubInfoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4B5563',
  },
  clubDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 16,
  },
  clubDetailsButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clubDetailsButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 14,
  },
  statsContainer: {
    padding: 16,
    marginTop: 8,
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
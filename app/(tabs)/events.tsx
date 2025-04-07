import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Yaklaşan Etkinlikler</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          HSD topluluklarının düzenlediği etkinlikler ve workshoplar
        </ThemedText>
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
      
      <ThemedView style={styles.eventsList}>
        {/* Etkinlik Kartı 1 */}
        <ThemedView style={styles.eventCard}>
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome name="calendar-check-o" size={48} color="#CBD5E1" />
          </View>
          
          <ThemedView style={styles.eventContent}>
            <View style={styles.eventHeader}>
              <View style={styles.eventType}>
                <ThemedText style={styles.eventTypeText}>Workshop</ThemedText>
              </View>
              <ThemedText style={styles.eventDate}>12 Nisan 2024</ThemedText>
            </View>
            
            <ThemedText style={styles.eventTitle}>
              HSD İstanbul Workshop Etkinliği
            </ThemedText>
            
            <ThemedText style={styles.eventLocation}>
              <FontAwesome name="map-marker" size={14} color="#9CA3AF" /> İstanbul Teknik Üniversitesi
            </ThemedText>
            
            <ThemedText numberOfLines={2} style={styles.eventDescription}>
              Huawei teknolojileri ile uygulama geliştirme konusunda pratik deneyim kazanın.
            </ThemedText>
            
            <View style={styles.eventFooter}>
              <TouchableOpacity style={styles.registerButton}>
                <ThemedText style={styles.registerButtonText}>Kaydol</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.detailsButton}>
                <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
        
        {/* Etkinlik Kartı 2 */}
        <ThemedView style={styles.eventCard}>
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome name="laptop" size={48} color="#CBD5E1" />
          </View>
          
          <ThemedView style={styles.eventContent}>
            <View style={styles.eventHeader}>
              <View style={[styles.eventType, styles.eventTypeHackathon]}>
                <ThemedText style={styles.eventTypeText}>Hackathon</ThemedText>
              </View>
              <ThemedText style={styles.eventDate}>20-22 Mayıs 2024</ThemedText>
            </View>
            
            <ThemedText style={styles.eventTitle}>
              HSD Mobil Uygulama Geliştirme Hackathon
            </ThemedText>
            
            <ThemedText style={styles.eventLocation}>
              <FontAwesome name="map-marker" size={14} color="#9CA3AF" /> Ankara ODTÜ
            </ThemedText>
            
            <ThemedText numberOfLines={2} style={styles.eventDescription}>
              48 saat sürecek yoğun bir geliştirme maratonunda Huawei teknolojileri ile yenilikçi mobil uygulamalar geliştirin.
            </ThemedText>
            
            <View style={styles.eventFooter}>
              <TouchableOpacity style={styles.registerButton}>
                <ThemedText style={styles.registerButtonText}>Kaydol</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.detailsButton}>
                <ThemedText style={styles.detailsButtonText}>Detaylar</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
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
    gap: 16,
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
  eventImagePlaceholder: {
    height: 150,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeHackathon: {
    backgroundColor: '#EFF6FF',
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EF4444',
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
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
    color: '#6B7280',
  },
}); 
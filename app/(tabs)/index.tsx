import { StyleSheet, Platform, TouchableOpacity, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HSDLogo from '@/components/HSDLogo';
import { useEffect } from 'react';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get('window');

function HomeScreen() {
  // Logo için animasyon değerleri
  const logoScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Nefes alma efekti
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // sonsuz tekrar
      true
    );
    
    // Parlama efekti
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // sonsuz tekrar
      true
    );
  }, []);
  
  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }]
    };
  });
  
  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F8FF', dark: '#1E293B' }}
      headerImage={
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#E91E3A', '#EF4444', '#FF6666']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Svg
              height="60"
              width={width}
              viewBox={`0 0 ${width} 60`}
              style={styles.waveSvg}
            >
              <Path
                d={`M0 30 
                   C ${width * 0.1} 10, ${width * 0.3} 45, ${width * 0.5} 30 
                   C ${width * 0.7} 15, ${width * 0.9} 40, ${width} 30 
                   V 60 H 0 Z`}
                fill="#F8FAFC"
                opacity={0.95}
              />
            </Svg>
          </LinearGradient>
          
          <View style={styles.logoOuterContainer}>
            <View style={styles.logoBackgroundShadow}>
              <AnimatedView style={[styles.logoGlow, animatedGlowStyle]} />
              <AnimatedView style={[styles.logoContainer, animatedLogoStyle]}>
                <HSDLogo size={100} color="#EF4444" />
              </AnimatedView>
            </View>
            
            <View style={styles.taglineContainer}>
              <ThemedText style={styles.tagline}>
                Huawei Student Developers
              </ThemedText>
            </View>
          </View>
        </View>
      }>
      {/* Hero Section */}
      <AnimatedThemedView 
        style={styles.titleContainer}
        entering={FadeInDown.duration(800).springify()}
      >
        <ThemedText type="title" style={styles.titleText}>İnovasyon ve</ThemedText>
        <ThemedText type="title" style={styles.redText}>Gelecek Burada</ThemedText>
        
        <View style={styles.decorationContainer}>
          <View style={styles.decorationLine} />
          <View style={styles.decorationDot} />
          <View style={styles.decorationLine} />
        </View>
      </AnimatedThemedView>
      
      <AnimatedThemedView 
        style={styles.descriptionContainer}
        entering={FadeInDown.duration(1000).delay(300).springify()}
      >
        <ThemedText style={styles.descriptionText}>
          Huawei teknolojilerini öğrenmek, geliştirmek ve paylaşmak isteyen öğrenciler için Türkiye'nin en büyük öğrenci geliştirici topluluğuna katılın.
        </ThemedText>
      </AnimatedThemedView>
      
      <AnimatedThemedView 
        style={styles.buttonContainer}
        entering={FadeInDown.duration(1000).delay(600).springify()}
      >
        <TouchableOpacity style={styles.primaryButton}>
          <ThemedText style={styles.buttonText}>Kulübe Katıl</ThemedText>
          <FontAwesome name="arrow-right" size={14} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outlineButton}>
          <ThemedText style={styles.outlineButtonText}>Etkinlikleri Keşfet</ThemedText>
        </TouchableOpacity>
      </AnimatedThemedView>
      
      {/* Events Section */}
      <AnimatedThemedView 
        style={styles.sectionContainer}
        entering={FadeInDown.duration(1000).delay(900).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <ThemedText type="subtitle">Yaklaşan Etkinlikler</ThemedText>
          <View style={styles.sectionTitleLine} />
        </View>
        
        <AnimatedThemedView 
          style={styles.eventCard}
          entering={FadeInDown.duration(800).delay(1200)}
        >
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome name="calendar" size={48} color="#CBD5E1" />
          </View>
          <ThemedView style={styles.eventContent}>
            <View style={styles.eventBadge}>
              <ThemedText style={styles.eventBadgeText}>Workshop</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.eventTitle}>HSD İstanbul Workshop Etkinliği</ThemedText>
            <ThemedText style={styles.eventDate}>
              <FontAwesome name="calendar" size={12} color="#9CA3AF" /> 12 Nisan 2024
            </ThemedText>
            <ThemedText style={styles.eventLocation}>
              <FontAwesome name="map-marker" size={12} color="#9CA3AF" /> İstanbul Teknik Üniversitesi
            </ThemedText>
            <ThemedText numberOfLines={2} style={styles.eventDescription}>
              Huawei teknolojileri ile uygulama geliştirme konusunda pratik deneyim kazanın.
            </ThemedText>
            <TouchableOpacity style={styles.eventButton}>
              <ThemedText style={styles.eventButtonText}>Detaylar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </AnimatedThemedView>
        
        <TouchableOpacity style={styles.viewAllButton}>
          <ThemedText style={styles.viewAllText}>Tüm Etkinlikleri Gör</ThemedText>
          <FontAwesome name="angle-right" size={16} color="#EF4444" />
        </TouchableOpacity>
      </AnimatedThemedView>
      
      {/* Communities Section */}
      <AnimatedThemedView 
        style={styles.sectionContainer}
        entering={FadeInDown.duration(1000).delay(1500).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <ThemedText type="subtitle">HSD Toplulukları</ThemedText>
          <View style={styles.sectionTitleLine} />
        </View>
        
        <ThemedView style={styles.communitiesCard}>
          <ThemedText style={styles.communitiesText}>
            Türkiye genelinde 20+ üniversitede aktif öğrenci kulüpleri ile büyüyen bir ağın parçası olun.
          </ThemedText>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>20+</ThemedText>
              <ThemedText style={styles.statLabel}>Üniversite</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>1200+</ThemedText>
              <ThemedText style={styles.statLabel}>Üye</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>80+</ThemedText>
              <ThemedText style={styles.statLabel}>Etkinlik</ThemedText>
            </View>
          </View>
        </ThemedView>
        
        <TouchableOpacity style={styles.mapButton}>
          <ThemedText style={styles.mapButtonText}>Kulüp Haritasını Görüntüle</ThemedText>
          <FontAwesome name="map" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </AnimatedThemedView>
    </ParallaxScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    zIndex: 1,
  },
  waveSvg: {
    position: 'absolute',
    bottom: -1,
    zIndex: 5,
  },
  logoOuterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    zIndex: 10,
  },
  logoBackgroundShadow: {
    borderRadius: 75,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 85,
    backgroundColor: '#FFD0D5',
    zIndex: -1,
  },
  logoContainer: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  taglineContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    textAlign: 'center',
  },
  headerImageContainer: {
    height: 180,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
  },
  redText: {
    color: '#EF4444',
    fontSize: 36,
    fontWeight: '800',
    marginTop: -5,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(239, 68, 68, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  decorationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  decorationLine: {
    width: 32,
    height: 2,
    backgroundColor: '#EF4444',
    borderRadius: 1,
    marginHorizontal: 6,
  },
  decorationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginHorizontal: 2,
  },
  descriptionContainer: {
    padding: 24,
    marginBottom: 20,
    backgroundColor: 'rgba(249, 250, 251, 0.7)',
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#4B5563',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 35,
    gap: 14,
  },
  primaryButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  outlineButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#4B5563',
    letterSpacing: 0.5,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  sectionTitleContainer: {
    marginBottom: 16,
  },
  sectionTitleLine: {
    width: 40,
    height: 3,
    backgroundColor: '#EF4444',
    borderRadius: 1.5,
    marginTop: 6,
  },
  eventCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  eventImagePlaceholder: {
    height: 160,
    width: '100%',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 16,
    gap: 6,
  },
  eventBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  eventBadgeText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    marginBottom: 2,
  },
  eventDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  eventLocation: {
    fontSize: 13,
    color: '#6B7280',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 20,
  },
  eventButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  eventButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 14,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 4,
  },
  viewAllText: {
    color: '#EF4444',
    marginRight: 8,
    fontWeight: '600',
  },
  communitiesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  communitiesText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  mapButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
});

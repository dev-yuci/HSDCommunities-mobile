import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  RefreshControl,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import HSDLogo from '@/components/HSDLogo';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as rssParser from 'react-native-rss-parser';

const { width } = Dimensions.get('window');

// Blog post tipi tanımı
type BlogPost = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  author: string;
  thumbnail: string;
  readTime: string;
  tags: string[];
};

// RSS parser için tip tanımları
interface RSSItem {
  title: string;
  links: Array<{url: string}>;
  description: string;
  published: string;
  content: string;
  authors: Array<{name: string}>;
  categories: string[];
}

// Öne çıkan yazı için sabit veri
const featuredPostData = {
  id: "featured-1",
  title: "Huawei Cloud ile Yapay Zeka Modellerini Optimize Etme Rehberi",
  author: "Mehmet Koçak",
  date: "15 Mart 2024",
  image: "https://cdn-images-1.medium.com/max/1024/1*_ARpBrkmLp6wS7X9fi1wJw.jpeg",
  readTime: "12 dakika",
  snippet: "Yapay zeka modellerini eğitirken karşılaşacağınız performans sorunları ve Huawei Cloud'un sunduğu çözümlerle bu sorunların nasıl aşılabileceğini detaylı olarak inceliyoruz.",
  link: "https://medium.com/@hsdfiratuniversity/huawei-cloud-ile-yapay-zeka-projelerinizi-hızlandırın-b7e421f7d7cc",
  tags: ["Yapay Zeka", "Cloud Computing", "Model Optimizasyonu"]
};

export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fetchMediumPosts();
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchMediumPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://medium.com/feed/@hsdfiratuniversity');
      const responseText = await response.text();
      const parsedData = await rssParser.parse(responseText);

      const formattedPosts: BlogPost[] = parsedData.items.map((item: RSSItem, index: number) => {
        // Thumbnail resmi çıkarma denemesi
        let thumbnail = "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png";
        
        // İçerikten resim çıkarmaya çalış
        if (item.content) {
          const match = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (match && match[1]) {
            thumbnail = match[1];
          }
        }

        // Okuma süresini hesapla (her 1000 karakter için yaklaşık 1 dakika)
        const contentLength = item.content ? item.content.length : 0;
        const readingTimeMinutes = Math.max(1, Math.floor(contentLength / 5000));

        // Etiketler (kategoriler varsa kullan, yoksa varsayılan etiketler)
        const tags = item.categories && item.categories.length > 0 
          ? item.categories.slice(0, 2)
          : ["Teknoloji", "Yazılım"];
          
        // Yazarı doğru şekilde çıkar - authors bir nesne dizisi olduğu için
        let authorName = 'HSD Yazarı';
        if (item.authors && item.authors.length > 0 && typeof item.authors[0] === 'object') {
          authorName = item.authors[0].name || 'HSD Yazarı';
        }

        return {
          id: `post-${index}`,
          title: item.title || 'Başlıksız Yazı',
          link: item.links[0]?.url || "#",
          pubDate: new Date(item.published || Date.now()).toLocaleDateString('tr-TR', {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
          }),
          contentSnippet: item.description ? 
            item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 
            'İçerik bulunamadı',
          author: authorName,
          thumbnail: thumbnail,
          readTime: `${readingTimeMinutes} dakika`,
          tags: tags
        };
      });

      setPosts(formattedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Medium yazıları alınamadı:', error);
      setLoading(false);
      
      // Hata durumunda örnek veri göster
      setPosts([
        {
          id: "1",
          title: 'Yapay Zeka ve Bulut Teknolojilerinin Geleceği',
          author: 'Ahmet Yılmaz',
          pubDate: '15 Nisan 2023',
          thumbnail: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
          readTime: '5 dakika',
          contentSnippet: 'Bulut bilişim ve yapay zeka teknolojilerinin gelecekte nasıl şekilleneceğine dair öngörüler ve analizler.',
          tags: ['Yapay Zeka', 'Bulut Bilişim'],
          link: "#"
        },
        {
          id: "2",
          title: 'Web Geliştirme Trendleri 2023',
          author: 'Zeynep Kaya',
          pubDate: '3 Mart 2023',
          thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
          readTime: '4 dakika',
          contentSnippet: 'Web geliştirme alanında 2023 yılında öne çıkan teknolojiler, framework\'ler ve metodolojiler.',
          tags: ['Web Geliştirme', 'Frontend'],
          link: "#"
        },
        {
          id: "3",
          title: 'Mobil Uygulama Geliştiricileri için Öneriler',
          author: 'Mert Demir',
          pubDate: '27 Şubat 2023',
          thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          readTime: '6 dakika',
          contentSnippet: 'Mobil uygulama geliştirirken performans ve kullanıcı deneyimini iyileştirmek için ipuçları.',
          tags: ['Mobil Geliştirme', 'UX'],
          link: "#"
        }
      ]);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMediumPosts().then(() => {
      setRefreshing(false);
    });
  }, []);

  const renderBlogCard = (post: BlogPost, index: number) => {
    return (
      <TouchableOpacity
        key={`blog-post-${post.id}-${index}`}
        style={styles.blogCard}
        activeOpacity={0.9}
        onPress={() => Linking.openURL(post.link)}
      >
        <Image source={{ uri: post.thumbnail }} style={styles.blogImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.blogGradient}
        />
        <View style={styles.blogContent}>
          <View style={styles.tagContainer}>
            {post.tags.map((tag: string, tagIndex: number) => (
              <View key={`${post.id}-tag-${tagIndex}`} style={styles.tag}>
                <ThemedText style={styles.tagText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
          <ThemedText style={styles.blogTitle}>{post.title}</ThemedText>
          <View style={styles.blogMeta}>
            <ThemedText style={styles.blogAuthor}>{post.author}</ThemedText>
            <View style={styles.blogStats}>
              <ThemedText style={styles.blogDate}>{post.pubDate}</ThemedText>
              <View style={styles.readTimeContainer}>
                <FontAwesome name="clock-o" size={12} color="#FFF" />
                <ThemedText style={styles.readTime}>{post.readTime}</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeaturedPost = () => {
    return (
      <TouchableOpacity
        style={styles.featuredPost}
        activeOpacity={0.95}
        onPress={() => Linking.openURL(featuredPostData.link)}
      >
        <Image source={{ uri: featuredPostData.image }} style={styles.featuredImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        />
        <View style={styles.featuredContent}>
          <View style={styles.featuredTagContainer}>
            <View style={[styles.tag, styles.featuredTag]}>
              <ThemedText style={styles.featuredTagText}>Öne Çıkan</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.featuredTitle}>{featuredPostData.title}</ThemedText>
          <ThemedText style={styles.featuredSnippet}>{featuredPostData.snippet}</ThemedText>
          <View style={styles.featuredMeta}>
            <View style={styles.authorContainer}>
              <FontAwesome name="user-circle" size={16} color="#FFF" />
              <ThemedText style={styles.featuredAuthor}>{featuredPostData.author}</ThemedText>
            </View>
            <View style={styles.readTimeContainer}>
              <FontAwesome name="clock-o" size={14} color="#FFF" />
              <ThemedText style={styles.featuredReadTime}>{featuredPostData.readTime}</ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Bölümü */}
        <LinearGradient
          colors={['#3b82f6', '#6366f1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
          >
            <ThemedText style={styles.headerTitle}>HSD Blog</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Yazılım, Teknoloji ve Topluluk Yazıları
            </ThemedText>
            <View style={styles.dateLabel}>
              <ThemedText style={styles.dateLabelText}>Son güncelleme:</ThemedText>
              <View style={styles.dateBadge}>
                <ThemedText style={styles.dateBadgeText}>
                  {new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'})}
                </ThemedText>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Öne Çıkan Yazı */}
        <View style={styles.featuredSection}>
          <Animated.View
            style={[
              styles.sectionTitle,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
          >
            <ThemedText style={styles.sectionTitleText}>Öne Çıkan Yazı</ThemedText>
            <View style={styles.sectionTitleAccent} />
          </Animated.View>
          {renderFeaturedPost()}
        </View>

        {/* Blog Listesi */}
        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitle}>
              <ThemedText style={styles.sectionTitleText}>Medium Yazıları</ThemedText>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.blogCountBadge}>
              <FontAwesome name="bookmark" size={14} color="#3b82f6" />
              <ThemedText style={styles.blogCountText}>{posts.length} yazı</ThemedText>
            </View>
          </View>
          
          {loading ? (
            // Yükleme durumu gösterimi - 3 adet iskelet kart
            Array.from({ length: 3 }).map((_, index) => (
              <View key={`skeleton-${index}`} style={[styles.blogCard, { backgroundColor: '#f0f0f0' }]}>
                <View style={styles.skeletonImage} />
                <View style={styles.blogContent}>
                  <View style={styles.skeletonTitle} />
                  <View style={styles.skeletonText} />
                  <View style={styles.skeletonText} />
                </View>
              </View>
            ))
          ) : posts.length > 0 ? (
            posts.map((post, index) => renderBlogCard(post, index))
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome name="exclamation-circle" size={40} color="#CBD5E0" />
              <ThemedText style={styles.emptyStateText}>
                Şu anda blog yazıları bulunamadı.
              </ThemedText>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchMediumPosts}
              >
                <ThemedText style={styles.retryButtonText}>Tekrar Dene</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
  },
  dateLabelText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 6,
  },
  dateBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dateBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  featuredSection: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    marginBottom: 15,
    position: 'relative',
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionTitleAccent: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: '#EF4444',
    borderRadius: 1.5,
  },
  featuredPost: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 280,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredTagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  featuredTag: {
    backgroundColor: '#EF4444',
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredSnippet: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredAuthor: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  featuredReadTime: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  blogSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  blogCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  blogCountText: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 6,
    fontWeight: '600',
  },
  blogCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    height: 200,
  },
  blogImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  blogGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  blogContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  blogMeta: {
    justifyContent: 'space-between',
  },
  blogAuthor: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  blogStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  // Yükleme durumu stilleri
  skeletonImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#E2E8F0',
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#E2E8F0',
    width: '80%',
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonText: {
    height: 12,
    backgroundColor: '#E2E8F0',
    width: '100%',
    borderRadius: 4,
    marginBottom: 6,
  },
  // Boş durum stilleri
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  }
}); 
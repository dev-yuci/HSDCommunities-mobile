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
  title: "Huawei Mobile Services ile Modern Mobil Uygulamalar Geliştirme",
  author: "Ahmet Yılmaz",
  date: "2 Haziran 2024",
  image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=1000&auto=format&fit=crop",
  readTime: "8 dakika",
  snippet: "HMS Core ile Android uygulamalarınızı nasıl geliştirebileceğinizi, en yeni API'ları ve bu teknolojilerin sunduğu olanakları bu yazımızda detaylı olarak inceledik.",
  link: "https://medium.com/@hsdcommunities",
  tags: ["Mobil Geliştirme", "HMS Core", "Android"]
};

// Örnek blog yazıları - Medium API çalışmadığında kullanılabilir
const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: 'Yapay Zeka ve HMS ML Kit ile Görüntü Tanıma',
    author: 'Zeynep Kaya',
    pubDate: '12 Mayıs 2024',
    thumbnail: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=1000&auto=format&fit=crop',
    readTime: '7 dakika',
    contentSnippet: 'HMS ML Kit kütüphanesi kullanarak akıllı görüntü tanıma sistemleri geliştirmeyi ve uygulamalarınıza yapay zeka yetenekleri eklemeyi öğrenin.',
    tags: ['Yapay Zeka', 'HMS ML Kit'],
    link: "https://medium.com/@hsdcommunities/yapay-zeka"
  },
  {
    id: "2",
    title: 'HarmonyOS Uygulama Geliştirme: Başlangıç Rehberi',
    author: 'Burak Demir',
    pubDate: '28 Nisan 2024',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    readTime: '10 dakika',
    contentSnippet: 'HarmonyOS için uygulama geliştirmeye başlamak isteyenler için adım adım rehber ve en iyi uygulama örnekleri.',
    tags: ['HarmonyOS', 'Uygulama Geliştirme'],
    link: "https://medium.com/@hsdcommunities/harmonyos"
  },
  {
    id: "3",
    title: 'Huawei Cloud Hizmetleri İle Ölçeklenebilir Uygulamalar',
    author: 'Selin Yılmaz',
    pubDate: '15 Mart 2024',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop',
    readTime: '6 dakika',
    contentSnippet: 'Büyük ölçekli projelerde Huawei Cloud servislerinin nasıl kullanılacağı ve performans optimizasyonu ipuçları.',
    tags: ['Cloud Computing', 'Ölçeklenebilirlik'],
    link: "https://medium.com/@hsdcommunities/huawei-cloud"
  },
  {
    id: "4",
    title: 'HMS Push Kit ile Bildirim Sistemi Oluşturma',
    author: 'Emre Kaya',
    pubDate: '24 Şubat 2024',
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1000&auto=format&fit=crop',
    readTime: '5 dakika',
    contentSnippet: 'HMS Push Kit kullanarak uygulamanıza etkili bir bildirim sistemi nasıl entegre edilir ve kullanıcı deneyimini nasıl iyileştirebilirsiniz?',
    tags: ['HMS Push Kit', 'Mobil Bildirimler'],
    link: "https://medium.com/@hsdcommunities/push-kit"
  }
];

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

      // Önce parsedData.items'in geçerli bir dizi olduğunu kontrol et
      if (!parsedData || !parsedData.items || !Array.isArray(parsedData.items)) {
        console.error('Geçersiz RSS yanıtı. İçerik:', parsedData);
        throw new Error('Geçersiz RSS yanıtı');
      }

      // Her bir öğeyi güvenli bir şekilde işle
      const formattedPosts: BlogPost[] = parsedData.items
        .map((item: RSSItem, index: number) => {
          try {
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
            const tags = item.categories && Array.isArray(item.categories) && item.categories.length > 0 
              ? item.categories.slice(0, 2).map(tag => typeof tag === 'string' ? tag : String(tag))
              : ["Teknoloji", "Yazılım"];
              
            // Yazarı doğru şekilde çıkar - authors bir nesne dizisi olduğu için
            let authorName = 'HSD Yazarı';
            try {
              if (item.authors && Array.isArray(item.authors) && item.authors.length > 0) {
                const author = item.authors[0];
                if (typeof author === 'string') {
                  authorName = author;
                } else if (typeof author === 'object' && author !== null) {
                  if (typeof author.name === 'string') {
                    authorName = author.name;
                  } else if (author.name) {
                    // Eğer name varsa ama string değilse, string'e çevir
                    authorName = String(author.name);
                  }
                }
              }
            } catch (e) {
              console.error('Author bilgisi işlenirken hata:', e);
              authorName = 'HSD Yazarı';
            }

            // Link kontrolü
            let link = "#";
            if (item.links && Array.isArray(item.links) && item.links.length > 0) {
              const firstLink = item.links[0];
              if (typeof firstLink === 'object' && firstLink !== null && typeof firstLink.url === 'string') {
                link = firstLink.url;
              }
            }

            // Tüm alanların güvenli bir şekilde oluşturulduğundan emin ol
            return {
              id: `post-${index}`,
              title: item.title && typeof item.title === 'string' ? item.title : 'Başlıksız Yazı',
              link: link,
              pubDate: item.published && typeof item.published === 'string' ? 
                new Date(item.published).toLocaleDateString('tr-TR', {
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric'
                }) : 
                new Date().toLocaleDateString('tr-TR'),
              contentSnippet: item.description && typeof item.description === 'string' ? 
                item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 
                'İçerik bulunamadı',
              author: authorName,
              thumbnail: thumbnail,
              readTime: `${readingTimeMinutes} dakika`,
              tags: tags
            };
          } catch (itemError) {
            console.error('Blog post öğesi işlenirken hata:', itemError, 'Ham veri:', item);
            // Hataya rağmen bir şeyler göster - varsayılan değerlerle
            return {
              id: `error-post-${index}`,
              title: 'İçerik Yüklenemedi',
              link: "#",
              pubDate: new Date().toLocaleDateString('tr-TR'),
              contentSnippet: 'Bu içerik yüklenirken bir hata oluştu.',
              author: 'HSD Yazarı',
              thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
              readTime: '1 dakika',
              tags: ["Hata", "İçerik"]
            };
          }
        })
        .filter(Boolean); // null veya undefined değerleri filtrele

      setPosts(formattedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Medium yazıları alınamadı:', error);
      setLoading(false);
      
      // Hata durumunda örnek veri göster
      setPosts(SAMPLE_BLOG_POSTS);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMediumPosts().then(() => {
      setRefreshing(false);
    });
  }, []);

  const renderBlogCard = (post: BlogPost, index: number) => {
    if (!post || typeof post !== 'object') {
      console.error('Geçersiz post verisi:', post);
      return null;
    }

    // Tüm değerlerin string olmasını sağla
    const safeTitle = typeof post.title === 'string' ? post.title : 'Başlıksız Yazı';
    const safeAuthor = typeof post.author === 'string' ? post.author : 'HSD Yazarı';
    const safePubDate = typeof post.pubDate === 'string' ? post.pubDate : '';
    const safeReadTime = typeof post.readTime === 'string' ? post.readTime : '';
    
    // Tags dizisinin güvenli olmasını sağla
    const safeTags = Array.isArray(post.tags) 
      ? post.tags.map(tag => typeof tag === 'string' ? tag : String(tag))
      : [];

    return (
      <TouchableOpacity
        key={`blog-post-${post.id || index}-${index}`}
        style={styles.blogCard}
        activeOpacity={0.9}
        onPress={() => post.link && Linking.openURL(post.link)}
      >
        <Image source={{ uri: post.thumbnail || 'https://via.placeholder.com/400' }} style={styles.blogImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.blogGradient}
        />
        <View style={styles.blogContent}>
          <View style={styles.tagContainer}>
            {safeTags.map((tag, tagIndex) => (
              <View key={`tag-${index}-${tagIndex}`} style={styles.tag}>
                <ThemedText style={styles.tagText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
          <ThemedText style={styles.blogTitle}>{safeTitle}</ThemedText>
          <View style={styles.blogMeta}>
            <ThemedText style={styles.blogAuthor}>{safeAuthor}</ThemedText>
            <View style={styles.blogStats}>
              <ThemedText style={styles.blogDate}>{safePubDate}</ThemedText>
              <View style={styles.readTimeContainer}>
                <FontAwesome name="clock-o" size={12} color="#FFF" />
                <ThemedText style={styles.readTime}>{safeReadTime}</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeaturedPost = () => {
    // Featured post verilerini güvenli hale getirelim
    const safeTitle = typeof featuredPostData.title === 'string' ? featuredPostData.title : '';
    const safeAuthor = typeof featuredPostData.author === 'string' ? featuredPostData.author : '';
    const safeSnippet = typeof featuredPostData.snippet === 'string' ? featuredPostData.snippet : '';
    const safeReadTime = typeof featuredPostData.readTime === 'string' ? featuredPostData.readTime : '';
    const safeLink = typeof featuredPostData.link === 'string' ? featuredPostData.link : '#';
    
    return (
      <TouchableOpacity
        style={styles.featuredPost}
        activeOpacity={0.95}
        onPress={() => Linking.openURL(safeLink)}
      >
        <Image source={{ uri: featuredPostData.image || 'https://via.placeholder.com/800' }} style={styles.featuredImage} />
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
          <ThemedText style={styles.featuredTitle}>{safeTitle}</ThemedText>
          <ThemedText style={styles.featuredSnippet}>{safeSnippet}</ThemedText>
          <View style={styles.featuredMeta}>
            <View style={styles.authorContainer}>
              <FontAwesome name="user-circle" size={16} color="#FFF" />
              <ThemedText style={styles.featuredAuthor}>{safeAuthor}</ThemedText>
            </View>
            <View style={styles.readTimeContainer}>
              <FontAwesome name="clock-o" size={14} color="#FFF" />
              <ThemedText style={styles.featuredReadTime}>{safeReadTime}</ThemedText>
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
          colors={['#EF4444', '#F97316']}
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
              Huawei Student Developers Yazıları
            </ThemedText>
            <View style={styles.dateLabel}>
              <ThemedText style={styles.dateLabelText}>Son güncelleme:</ThemedText>
              <View style={styles.dateBadge}>
                <ThemedText style={styles.dateBadgeText}>
                  {(() => {
                    try {
                      return new Date().toLocaleDateString('tr-TR', {
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric'
                      });
                    } catch (e) {
                      return new Date().toDateString();
                    }
                  })()}
                </ThemedText>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Öne Çıkan Yazı */}
        <View style={styles.featuredSection}>
          <Animated.View
            style={[
              styles.sectionHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
          >
            <View style={styles.sectionTitle}>
              <ThemedText style={styles.sectionTitleText}>Öne Çıkan Yazı</ThemedText>
              <View style={styles.sectionTitleAccent} />
            </View>
          </Animated.View>
          {renderFeaturedPost()}
        </View>

        {/* Blog Listesi */}
        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitle}>
              <ThemedText style={styles.sectionTitleText}>Blog Yazıları</ThemedText>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.blogCountBadge}>
              <FontAwesome name="bookmark" size={14} color="#EF4444" />
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
            // Her bir postu renderBlogCard fonksiyonu ile render et
            // Ancak önce her birinin geçerli bir nesne olduğundan emin ol
            posts.map((post, index) => {
              if (!post || typeof post !== 'object') {
                console.error('Geçersiz post nesnesi:', post);
                return null;
              }
              return renderBlogCard(post, index);
            }).filter(Boolean) // null veya undefined değerleri filtrele
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
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
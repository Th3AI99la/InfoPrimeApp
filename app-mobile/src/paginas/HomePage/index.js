import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getThemedStyles from './style';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';
import { FontAwesome } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomePage = () => {
  const { themeMode } = useTheme();
  const styles = getThemedStyles(themeMode === 'dark');
  const navigation = useNavigation();

  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [carouselError, setCarouselError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselOpacity = useRef(new Animated.Value(0)).current;

  const buscarProdutosDestaque = useCallback(async () => {
    setIsLoadingCarousel(true);
    setCarouselError(null);
    Animated.timing(carouselOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    try {
      const response = await api.get('/produtos');
      const produtosComImagem = response.data
        .filter(p => p.imagemUrl?.trim() !== '')
        .slice(0, 5);

      setProdutosDestaque(produtosComImagem);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(carouselOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setCarouselError("Não foi possível carregar os destaques.");
    } finally {
      setIsLoadingCarousel(false);
    }
  }, [carouselOpacity]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarProdutosDestaque);
    buscarProdutosDestaque();
    return unsubscribe;
  }, [navigation, buscarProdutosDestaque]);

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveIndex(viewableItems.viewableItems[0].index ?? 0);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const CarouselItem = ({ item }) => {
    const itemScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(itemScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(itemScale, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: itemScale }] }}>
        <TouchableOpacity
          style={styles.carouselItem}
          activeOpacity={0.9}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => {
            onPressOut();
            navigation.navigate('InformacoesProduto', { produto: item });
          }}
        >
          <Image
            source={{ uri: item.imagemUrl }}
            style={styles.carouselImage}
            resizeMode="cover"
            onError={(e) => console.warn(`Erro ao carregar imagem do carrossel: ${item.imagemUrl}`, e.nativeEvent.error)}
          />
          <View style={styles.carouselTitleOverlay}>
            <Text style={styles.carouselItemTitle} numberOfLines={2}>{item.nome}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.welcomeText}>Bem-vindo à InfoPrimeApp!</Text>

      <Text style={styles.sectionTitle}>Destaques</Text>

      {isLoadingCarousel ? (
        <View style={styles.carouselLoadingContainer}>
          <ActivityIndicator
            size="large"
            color={styles.loadingIndicatorCarousel?.color}
          />
        </View>
      ) : carouselError ? (
        <View style={styles.carouselErrorContainer}>
          <Text style={styles.errorTextCarousel}>{carouselError}</Text>
          <TouchableOpacity style={styles.retryButtonCarousel} onPress={buscarProdutosDestaque}>
            <Text style={styles.retryButtonTextCarousel}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : produtosDestaque.length > 0 ? (
        <Animated.View style={{ opacity: carouselOpacity }}>
          <FlatList
            data={produtosDestaque}
            renderItem={({ item }) => <CarouselItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToInterval={
              styles.carouselItem.width + (styles.carouselItem.marginRight || 0)
            }
            snapToAlignment="start"
            contentContainerStyle={styles.carouselContainer}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            getItemLayout={(data, index) => ({
              length: styles.carouselItem.width + (styles.carouselItem.marginRight || 0),
              offset: (styles.carouselItem.width + (styles.carouselItem.marginRight || 0)) * index,
              index
            })}
          />
          <View style={styles.paginationContainer}>
            {produtosDestaque.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeIndex === index
                    ? styles.paginationDotActive
                    : styles.paginationDotInactive,
                ]}
              />
            ))}
          </View>
        </Animated.View>
      ) : (
        <View style={styles.carouselPlaceholder}>
          <Text style={styles.emptyCarouselText}>
            Nenhum produto em destaque no momento.
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Categorias</Text>

      <View style={styles.placeholderContainer}>
        <FontAwesome
          name="cubes"
          size={30}
          color={styles.placeholderIcon?.color || themeMode.iconColor}
        />
        <Text style={[styles.placeholderText, { marginTop: 8 }]}>
          Navegue por nossas categorias em breve!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ListarProduto')}
        accessibilityRole="button"
        accessibilityLabel="Ver todos os produtos"
      >
        <Text style={styles.actionButtonText}>Ver Todos os Produtos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomePage;

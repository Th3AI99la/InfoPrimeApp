import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getThemedStyles from './style';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

const { width: screenWidth } = Dimensions.get('window');

const HomePage = () => {
  const { themeMode } = useTheme();
  const styles = getThemedStyles(themeMode === 'dark');
  const navigation = useNavigation();

  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [carouselError, setCarouselError] = useState(null);

  const buscarProdutosDestaque = useCallback(async () => {
    setIsLoadingCarousel(true);
    setCarouselError(null);
    try {
      const response = await api.get('/produtos');
      const produtosComImagem = response.data
        .filter(p => p.imagemUrl?.trim() !== '')
        .slice(0, 5); // Limita a 5 produtos
      setProdutosDestaque(produtosComImagem);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setCarouselError("Não foi possível carregar os destaques.");
    } finally {
      setIsLoadingCarousel(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarProdutosDestaque);
    buscarProdutosDestaque(); // Executa ao montar
    return unsubscribe;
  }, [navigation, buscarProdutosDestaque]);

    const renderCarouselItem = ({ item }) => (
        <TouchableOpacity
            style={styles.carouselItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('InformacoesProduto', { produto: item })} 
        >
            <Image
                source={{ uri: item.imagemUrl }}
                style={styles.carouselImage}
                resizeMode="cover"
                onError={(e) => console.warn(`Erro ao carregar imagem do carrossel: ${item.imagemUrl}`, e.nativeEvent.error)}
            />
       
            <Text style={styles.carouselItemTitle}>{item.nome}</Text>
        </TouchableOpacity>
    );

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
        <ActivityIndicator
          size="large"
          color={styles.loadingIndicatorCarousel?.color || styles.loadingIndicator?.color}
          style={styles.carouselLoading}
        />
      ) : carouselError ? (
        <View style={styles.carouselErrorContainer}>
          <Text style={styles.errorTextCarousel}>{carouselError}</Text>
          <TouchableOpacity style={styles.retryButtonCarousel} onPress={buscarProdutosDestaque}>
            <Text style={styles.retryButtonTextCarousel}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : produtosDestaque.length > 0 ? (
        <FlatList
          data={produtosDestaque}
          renderItem={renderCarouselItem}
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
        />
      ) : (
        <View style={styles.carouselPlaceholder}>
          <Text style={styles.emptyCarouselText}>Nenhum produto em destaque no momento.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.placeholderContainer}>
        <Text style={[styles.placeholderText, { color: styles.welcomeText.color }]}>
          (Em breve: Lista de categorias)
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

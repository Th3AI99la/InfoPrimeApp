import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const getThemedStyles = (isDarkMode) => {
  const theme = isDarkMode
    ? {
        background: '#121212',
        text: '#E0E0E0',
        primaryGreen: '#2ECC71',
        card: '#1E1E1E',
        borderColor: '#333333',
        carouselPlaceholderBg: '#1E1E1E',
        errorText: 'red',
        retryButtonCarouselBg: '#2ECC71',
        retryButtonCarouselText: '#FFFFFF',
        secondaryText: '#BBBBBB',
        iconColor: '#E0E0E0',
      }
    : {
        background: '#F0F2F5',
        text: '#1C1C1E',
        primaryGreen: '#28A745',
        card: '#FFFFFF',
        borderColor: '#DDDDDD',
        carouselPlaceholderBg: '#F5F5F5',
        errorText: 'red',
        retryButtonCarouselBg: '#28A745',
        retryButtonCarouselText: '#FFFFFF',
        secondaryText: '#666666',
        iconColor: '#1C1C1E',
      };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollViewContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primaryGreen,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      marginTop: 24,
      marginBottom: 12,
    },

    // Carrossel
    carouselContainer: {
      paddingVertical: 10,
    },
    carouselItem: {
      width: screenWidth * 0.4,
      height: screenWidth * 0.45,
      marginRight: 12,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.borderColor,
    },
    carouselImage: {
      width: '100%',
      height: '100%',
    },
    carouselLoading: {
      height: screenWidth * 0.45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingIndicatorCarousel: {
      color: theme.primaryGreen,
    },
    carouselErrorContainer: {
      height: screenWidth * 0.45,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme.card,
      borderRadius: 10,
    },
    errorTextCarousel: {
      color: theme.errorText,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    retryButtonCarousel: {
      backgroundColor: theme.retryButtonCarouselBg,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    retryButtonTextCarousel: {
      color: theme.retryButtonCarouselText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    carouselPlaceholder: {
      height: screenWidth * 0.45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.carouselPlaceholderBg,
      borderRadius: 10,
      padding: 10,
    },
    emptyCarouselText: {
      color: theme.secondaryText,
      fontSize: 14,
      textAlign: 'center',
    },

    // Placeholder para futuras seções
    placeholderContainer: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#E5E5E5',
      borderRadius: 8,
      paddingVertical: 40,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
      color: theme.text,
      opacity: 0.7,
      paddingHorizontal: 10,
    },

    // Botão principal
    actionButton: {
      backgroundColor: theme.primaryGreen,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    actionButtonText: {
      color: isDarkMode ? theme.background : theme.card,
      fontSize: 16,
      fontWeight: 'bold',
    },

    // Header (bem-vindo + botão de tema)
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    themeToggleButton: {
      padding: 8,
      borderRadius: 20,
    },
    themeToggleButtonIcon: {
      color: theme.iconColor,
    },
  });
};

export default getThemedStyles;

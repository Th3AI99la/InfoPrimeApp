// Em: IncluirProduto/style.js
// (Este é o mesmo conteúdo que foi sugerido para AlterarProduto/style.js)

import { StyleSheet } from 'react-native';

// Paletas de Cores (Verde e Preto como foco)
const lightColors = {
  background: '#F0F2F5',
  text: '#1C1C1E',
  primaryGreen: '#28A745',
  primaryGreenDark: '#1E7E34',
  secondaryBlack: '#343A40',
  border: '#CED4DA',
  inputBackground: '#FFFFFF',
  inputText: '#495057',
  placeholderText: '#6C757D', // Cor para o placeholder
  buttonText: '#FFFFFF',
  errorText: '#DC3545',
  loadingOverlayBackground: 'rgba(0, 0, 0, 0.6)',
  loadingIndicator: '#FFFFFF',
  loadingText: '#FFFFFF',
  titleText: '#28A745',
};

const darkColors = {
  background: '#121212',
  text: '#E0E0E0',
  primaryGreen: '#2ECC71',
  primaryGreenDark: '#27AE60',
  secondaryBlack: '#1C1C1E',
  border: '#3A3A3C',
  inputBackground: '#1E1E1E',
  inputText: '#E0E0E0',
  placeholderText: '#757575', // Cor para o placeholder no modo escuro
  buttonText: '#FFFFFF',
  errorText: '#FF8A80',
  loadingOverlayBackground: 'rgba(0, 0, 0, 0.7)',
  loadingIndicator: '#2ECC71',
  loadingText: '#E0E0E0',
  titleText: '#2ECC71',
};

const getThemedStyles = (isDarkMode) => {
  const theme = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    keyboardAvoidingContainer: { // Adicionado para o KeyboardAvoidingView
        flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
      paddingVertical: 20,
      justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.titleText,
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
      marginLeft: 4,
    },
    input: {
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      height: 52,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 20,
      fontSize: 16,
      shadowColor: theme.secondaryBlack,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    placeholderText: { // Adicionado para poder referenciar a cor do placeholder
        color: theme.placeholderText,
    },
    button: {
      backgroundColor: theme.primaryGreen,
      height: 52,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      shadowColor: theme.primaryGreen,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    buttonDisabled: {
      backgroundColor: theme.border,
      elevation: 0,
      shadowOpacity: 0,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
      fontWeight: "bold",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.loadingOverlayBackground,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    loadingIndicator: {
        color: theme.loadingIndicator,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: theme.loadingText,
        fontWeight: '500',
    },
    errorText: {
      color: theme.errorText,
      textAlign: 'center',
      marginBottom: 15,
      fontSize: 14,
      fontWeight: '500',
    }
  });
};

export default getThemedStyles;
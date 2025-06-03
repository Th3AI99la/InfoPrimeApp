import { StyleSheet, Dimensions } from 'react-native';

// Paletas de Cores (Verde e Preto como foco)
const lightColors = {
  background: '#F0F2F5', // Um cinza bem claro para o fundo
  text: '#1C1C1E',       // Preto suave para texto principal
  primaryGreen: '#28A745', // Verde principal (Bootstrap success green)
  primaryGreenDark: '#1E7E34', // Verde mais escuro para hover/press
  secondaryBlack: '#343A40', // Um preto/cinza escuro para elementos secundários
  border: '#CED4DA',      // Cor de borda sutil
  inputBackground: '#FFFFFF',
  inputText: '#495057',
  placeholderText: '#6C757D',
  buttonText: '#FFFFFF',
  errorText: '#DC3545',    // Vermelho para erros
  loadingOverlayBackground: 'rgba(0, 0, 0, 0.6)',
  loadingIndicator: '#FFFFFF',
  loadingText: '#FFFFFF',
  titleText: '#28A745', // Verde para títulos
};

const darkColors = {
  background: '#121212', // Fundo escuro padrão
  text: '#E0E0E0',       // Texto claro para contraste
  primaryGreen: '#2ECC71', // Verde vibrante para modo escuro (Emerald)
  primaryGreenDark: '#27AE60',// Verde mais escuro
  secondaryBlack: '#1C1C1E', // Quase preto para superfícies levemente elevadas
  border: '#3A3A3C',      // Borda sutil no modo escuro
  inputBackground: '#1E1E1E', // Fundo do input escuro
  inputText: '#E0E0E0',
  placeholderText: '#757575',
  buttonText: '#FFFFFF', // Texto do botão pode continuar branco ou preto dependendo do verde
  errorText: '#FF8A80',    // Vermelho claro para erros
  loadingOverlayBackground: 'rgba(0, 0, 0, 0.7)',
  loadingIndicator: '#2ECC71', // Indicador verde
  loadingText: '#E0E0E0',
  titleText: '#2ECC71', // Verde para títulos
};



const getThemedStyles = (isDarkMode) => {
  const theme = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
      paddingVertical: 20,
      justifyContent: 'center', // Centraliza o conteúdo do formulário
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
      marginLeft: 4, // Pequeno recuo para alinhar com o input
    },
    input: {
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      height: 52,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12, // Bordas mais arredondadas
      paddingHorizontal: 16,
      marginBottom: 20,
      fontSize: 16,
      shadowColor: theme.secondaryBlack, // Sombra sutil
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    placeholderText: { // Adicionado para poder estilizar o placeholderTextColor dinamicamente
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
    buttonDisabled: { // Estilo para botão desabilitado
      backgroundColor: theme.border, // Cor mais apagada
      elevation: 0,
      shadowOpacity: 0,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
      fontWeight: "bold",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject, // Cobre a tela inteira
      backgroundColor: theme.loadingOverlayBackground,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10, // Para ficar sobre os outros elementos
    },
    loadingIndicator: { // Apenas para passar a cor para o ActivityIndicator
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
    },

    switchContainer: { // Novo
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 4, // Ajuste conforme necessário
    },
    // Cores opcionais para o Switch, para maior controle do tema
    // Se não definidas, o Switch usará cores padrão ou as que você já tem na paleta
    switchEnabledTrack: { color: theme.primaryGreen }, // Exemplo: Usa o verde primário quando ligado
    switchDisabledTrack: { color: theme.border },     // Exemplo: Usa a cor de borda quando desligado
    switchEnabledThumb: { color: theme.fabIconColor }, // Exemplo: Usa a cor de ícone do FAB para o "polegar"
    switchDisabledThumb: { color: theme.cardBackground },
    switchIosBackground: { color: theme.border }
  });
};

export default getThemedStyles;
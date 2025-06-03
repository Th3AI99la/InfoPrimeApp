import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const lightColors = {
  background: '#F0F2F5',
  text: '#1C1C1E',
  label: '#555',
  primaryGreen: '#28A745',
  cardBackground: '#FFF',
  borderColor: '#DDE1E5',
  onlineDotColor: '#28A745',
  offlineDotColor: '#DC3545',
  placeholderIconColor: '#a0a0a0',
  imagemPlaceholderBg: '#E9E9E9',
  errorText: '#DC3545',
};

const darkColors = {
  background: '#121212',
  text: '#E0E0E0',
  label: '#A0A0A0',
  primaryGreen: '#2ECC71',
  cardBackground: '#1E1E1E',
  borderColor: '#2A2A2F',
  onlineDotColor: '#2ECC71',
  offlineDotColor: '#FF8A80',
  placeholderIconColor: '#707070',
  imagemPlaceholderBg: '#2A2A2A',
  errorText: '#FF8A80',
};

const getThemedStyles = (isDark) => {
  const theme = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    contentContainer: { padding: 20, paddingBottom: 30 },
    centeredMessageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    errorText: { color: theme.errorText, fontSize: 16, textAlign: 'center' },

    imagemProduto: {
      width: width - 40,
      height: height * 0.35,
      borderRadius: 12,
      marginBottom: 24,
      alignSelf: 'center',
      backgroundColor: theme.borderColor,
    },
    imagemPlaceholder: {
      width: width - 40,
      height: height * 0.35,
      borderRadius: 12,
      marginBottom: 24,
      backgroundColor: theme.imagemPlaceholderBg,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    placeholderIcon: { color: theme.placeholderIconColor },
    placeholderText: { marginTop: 8, color: theme.placeholderIconColor, fontSize: 14 },

    nomeProduto: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
      textAlign: 'left',
    },

    infoBloco: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.15 : 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    infoLinha: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    infoLinhaUltima: { borderBottomWidth: 0 },

    label: { fontSize: 16, color: theme.label, fontWeight: '500' },
    valor: { fontSize: 16, color: theme.text, fontWeight: '500' },
    valorPreco: { fontSize: 20, fontWeight: 'bold', color: theme.primaryGreen },

    disponibilidadeContainer: { flexDirection: 'row', alignItems: 'center' },
    disponibilidadeDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    onlineDot: { color: theme.onlineDotColor },
    offlineDot: { color: theme.offlineDotColor },
    disponibilidadeValor: { fontSize: 16, color: theme.text, fontWeight: '500' },

    descricaoContainer: { marginTop: 10 },
    labelDescricao: { fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 10 },
    descricaoProduto: { fontSize: 15, color: theme.text, lineHeight: 23, textAlign: 'left' },

    dataCadastro: { fontSize: 13, color: theme.label, textAlign: 'center', marginTop: 30, fontStyle: 'italic' },

    loadingIndicator: { color: theme.primaryGreen },
  });
};

export default getThemedStyles;

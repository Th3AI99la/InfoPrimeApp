
import { StyleSheet } from 'react-native'; 


const lightColors = {
  background: '#F0F2F5',
  text: '#1C1C1E',
  primaryGreen: '#28A745',
  secondaryText: '#555555', 
  cardBackground: '#FFFFFF',
  borderColor: '#E0E0E0',
  deleteIconColor: '#DC3545',
  fabBackground: '#28A745',
  fabIconColor: '#FFFFFF',
  emptyText: '#777777', 
  errorText: '#DC3545',
  retryButtonBackground: '#28A745',
  retryButtonText: '#FFFFFF',
  refreshControl: '#28A745',
  loadingIndicator: '#28A745',
  loadingText: '#1C1C1E',
  produtoQuantidadeText: '#6C757D',
  onlineDotColor: '#28A745',
  offlineDotColor: '#DC3545',
  placeholderIconColor: '#a0a0a0',
  darkShadowColor: 'rgba(0,0,0,0.5)', 
};

const darkColors = {
  background: '#121212',
  text: '#E0E0E0',
  primaryGreen: '#2ECC71',
  secondaryText: '#A0A0A0',
  cardBackground: '#1E1E1E',
  borderColor: '#2C2C2C',
  deleteIconColor: '#FF8A80',
  fabBackground: '#2ECC71',
  fabIconColor: '#121212',
  emptyText: '#999999', 
  errorText: '#FF8A80',
  retryButtonBackground: '#2ECC71',
  retryButtonText: '#121212',
  refreshControl: '#2ECC71',
  loadingIndicator: '#2ECC71',
  loadingText: '#E0E0E0',
  produtoQuantidadeText: '#888888', 
  onlineDotColor: '#2ECC71',
  offlineDotColor: '#FF8A80',
  placeholderIconColor: '#707070',
  darkShadowColor: 'rgba(0,0,0,0.7)', 
};


const getThemedStyles = (isDarkMode) => {
  const theme = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 80, 
    },
    produtoItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.cardBackground,
        paddingVertical: 16,
        paddingHorizontal: 20, 
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: isDarkMode ? theme.darkShadowColor : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkMode ? 0.35 : 0.1, 
        shadowRadius: 4,
        elevation: 3,
        borderWidth: isDarkMode ? 1 : 0,
        borderColor: theme.borderColor,
    },

    produtoImagem: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: theme.borderColor, 
    },
    produtoImagemPlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: theme.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderIcon: { color: theme.placeholderIconColor },
    produtoInfoContainer: {
        flex: 1, 
        justifyContent: 'center',
    },
    produtoNomeContainer: { 
        flex: 1,
        marginRight: 15, 
    },
    produtoNome: {
        fontSize: 17,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 4,
    },
    produtoPreco: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.primaryGreen,
        marginBottom: 4,
    },
    produtoQuantidade: {
        fontSize: 14,
        color: theme.produtoQuantidadeText,
        marginBottom: 6,
    },
    disponibilidadeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disponibilidadeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    onlineDot: { color: theme.onlineDotColor },
    offlineDot: { color: theme.offlineDotColor }, 
    disponibilidadeText: {
        fontSize: 13,
        color: theme.secondaryText, 
    },
    produtoAcoesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    acaoButton: {
        padding: 8,
        marginLeft: 8, 
    },
    deleteProdutoButton: { 
        padding: 8,
        borderRadius: 20,
    },
    deleteIcon: {
        color: theme.deleteIconColor,
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
    },
    addButtonAnimatedView: {
        width: 60,
        height: 60,
        backgroundColor: theme.fabBackground,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: isDarkMode ? theme.primaryGreen : '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    addButtonIcon: {
        color: theme.fabIconColor,
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 32,
    },
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyListText: {
        fontSize: 18,
        color: theme.emptyText,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyListSubText: {
        fontSize: 14,
        color: theme.emptyText,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: theme.errorText,
        textAlign: 'center',
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 16,
        color: theme.loadingText,
        marginTop: 10,
    },
    retryButton: {
        backgroundColor: theme.retryButtonBackground,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    retryButtonText: {
        color: theme.retryButtonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    refreshControlBase: {
        color: theme.refreshControl,
    },
    loadingIndicator: {
        color: theme.loadingIndicator,
    }
  });
};

export default getThemedStyles;
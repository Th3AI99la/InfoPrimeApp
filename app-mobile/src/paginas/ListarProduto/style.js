// Em: ListarProduto/style.js
// (Adapte as cores e estilos conforme a paleta de verde/preto já definida
// nas outras telas para consistência)

import { StyleSheet, Dimensions } from 'react-native';

// Reutilize as paletas lightColors e darkColors definidas anteriormente
const lightColors = {
  background: '#F0F2F5',
  text: '#1C1C1E',
  primaryGreen: '#28A745', // Verde principal
  secondaryText: '#555',
  cardBackground: '#FFFFFF',
  borderColor: '#E0E0E0',
  deleteIconColor: '#DC3545', // Vermelho para exclusão
  fabBackground: '#28A745',
  fabIconColor: '#FFFFFF',
  emptyText: '#777',
  errorText: '#DC3545',
  retryButtonBackground: '#28A745',
  retryButtonText: '#FFFFFF',
  refreshControl: '#28A745',
  loadingIndicator: '#28A745',
  loadingText: '#1C1C1E',
  produtoQuantidadeText: '#6C757D'
};

const darkColors = {
  background: '#121212',
  text: '#E0E0E0',
  primaryGreen: '#2ECC71', // Verde vibrante
  secondaryText: '#A0A0A0',
  cardBackground: '#1E1E1E',
  borderColor: '#2C2C2C',
  deleteIconColor: '#FF8A80', // Vermelho claro
  fabBackground: '#2ECC71',
  fabIconColor: '#121212', // Ícone escuro no FAB verde claro
  emptyText: '#999',
  errorText: '#FF8A80',
  retryButtonBackground: '#2ECC71',
  retryButtonText: '#121212',
  refreshControl: '#2ECC71',
  loadingIndicator: '#2ECC71',
  loadingText: '#E0E0E0',
  produtoQuantidadeText: '#888'
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
        paddingBottom: 80, // Espaço para o FAB não cobrir o último item
    },
    produtoItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.cardBackground,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12, // Bordas mais arredondadas
        marginBottom: 12,
        shadowColor: isDarkMode ? theme.primaryGreen : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkMode ? 0.25 : 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: isDarkMode ? 1 : 0,
        borderColor: theme.borderColor,
    },
    produtoNomeContainer: {
        flex: 1, // Para ocupar o espaço disponível
        marginRight: 15,
    },
    produtoNome: {
        fontSize: 17,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 4, // Espaço entre nome e quantidade
    },
    produtoQuantidade: {
        fontSize: 14,
        color: theme.produtoQuantidadeText,
    },
    deleteProdutoButton: {
        padding: 8, // Área de toque maior
        borderRadius: 20, // Para feedback visual do Pressable
    },
    deleteIcon: { // Usado para passar a cor para o FontAwesome
        color: theme.deleteIconColor,
    },
    addButton: { // Estilo para o Pressable do FAB
        position: "absolute",
        bottom: 30,
        right: 20, // Alinhado à direita
        // O Animated.View dentro dele terá o estilo visual
    },
    addButtonAnimatedView: { // Estilo visual do FAB
        width: 60,
        height: 60,
        backgroundColor: theme.fabBackground,
        borderRadius: 30, // Perfeitamente redondo
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    addButtonIcon: {
        color: theme.fabIconColor,
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 32, // Ajuste para centralizar o "+"
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
    refreshControlBase: { // Apenas para passar a cor
        color: theme.refreshControl,
    },
    loadingIndicator: { // Apenas para passar a cor
        color: theme.loadingIndicator,
    }
  });
};

export default getThemedStyles;
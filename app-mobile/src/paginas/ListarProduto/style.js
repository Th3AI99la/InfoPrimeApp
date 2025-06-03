// Em: ListarProduto/style.js

import { StyleSheet } from 'react-native'; // Removido Dimensions não utilizado

// Paletas de Cores (Verifique se estão centralizadas ou defina-as aqui consistentemente)
const lightColors = {
  background: '#F0F2F5',
  text: '#1C1C1E',
  primaryGreen: '#28A745',
  secondaryText: '#555555', // Corrigido de '#555' para consistência de 6 dígitos se preferir
  cardBackground: '#FFFFFF',
  borderColor: '#E0E0E0',
  deleteIconColor: '#DC3545',
  fabBackground: '#28A745',
  fabIconColor: '#FFFFFF',
  emptyText: '#777777', // Corrigido de '#777'
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
  // Adicionando uma cor para sombra no modo escuro, se diferente do primaryGreen
  darkShadowColor: 'rgba(0,0,0,0.5)', // Exemplo de sombra escura mais neutra
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
  emptyText: '#999999', // Corrigido de '#999'
  errorText: '#FF8A80',
  retryButtonBackground: '#2ECC71',
  retryButtonText: '#121212',
  refreshControl: '#2ECC71',
  loadingIndicator: '#2ECC71',
  loadingText: '#E0E0E0',
  produtoQuantidadeText: '#888888', // Corrigido de '#888'
  onlineDotColor: '#2ECC71',
  offlineDotColor: '#FF8A80',
  placeholderIconColor: '#707070',
  // Cor para sombra no modo escuro
  darkShadowColor: 'rgba(0,0,0,0.7)', // Exemplo, pode ser a mesma primaryGreen ou mais sutil
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
        // justifyContent: "space-between", // Removido na sugestão anterior para mais controle
        alignItems: "center",
        backgroundColor: theme.cardBackground,
        paddingVertical: 16,
        paddingHorizontal: 20, // Ajustado para paddingHorizontal consistente
        borderRadius: 12,
        marginBottom: 12,
        // Sugestão para shadowColor:
        shadowColor: isDarkMode ? theme.darkShadowColor : '#000', // Usar uma cor de sombra dedicada para modo escuro ou manter preto
        // shadowColor: isDarkMode ? theme.primaryGreen : '#000', // Sua opção anterior
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkMode ? 0.35 : 0.1, // Aumentei um pouco a opacidade da sombra no modo escuro
        shadowRadius: 4,
        elevation: 3,
        borderWidth: isDarkMode ? 1 : 0,
        borderColor: theme.borderColor,
    },
    // Adicionando estilos da sugestão anterior que podem ter sido omitidos na sua colagem:
    produtoImagem: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: theme.borderColor, // Fundo enquanto carrega
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
        flex: 1, // Para ocupar o espaço restante
        justifyContent: 'center',
    },
    produtoNomeContainer: { // Este pode não ser mais necessário se produtoInfoContainer já faz o papel
        flex: 1,
        marginRight: 15, // Se produtoAcoesContainer estiver à direita
    },
    produtoNome: {
        fontSize: 17,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 4,
    },
    // Estilo para o Preço (garantindo que use theme.primaryGreen)
    produtoPreco: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.primaryGreen,
        marginBottom: 4,
    },
    produtoQuantidade: {
        fontSize: 14,
        color: theme.produtoQuantidadeText,
        marginBottom: 6, // Adicionado para espaçamento antes da disponibilidade
    },
    // Estilos para Disponibilidade
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
    onlineDot: { color: theme.onlineDotColor }, // Usado para pegar a cor para o backgroundColor no componente
    offlineDot: { color: theme.offlineDotColor }, // Usado para pegar a cor para o backgroundColor no componente
    disponibilidadeText: {
        fontSize: 13,
        color: theme.secondaryText, // Garante que use a cor secundária do tema
    },
    // Container para os botões de ação (se houver, como o de deletar)
    produtoAcoesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: 'auto', // Se quiser empurrar para a direita
    },
    acaoButton: { // Estilo comum para botões de ação no item
        padding: 8,
        marginLeft: 8, // Espaço se houver múltiplos botões de ação
    },
    deleteProdutoButton: { // Este estilo parece não estar sendo usado no renderItem mais recente (usamos acaoButton)
        padding: 8,
        borderRadius: 20,
    },
    deleteIcon: {
        color: theme.deleteIconColor,
    },
    // editIcon: { // Adicione se tiver um botão de editar
    //     color: theme.primaryGreen,
    // },
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
        // Sugestão para shadowColor do FAB:
        shadowColor: isDarkMode ? theme.primaryGreen : '#000', // Sombra verde no modo escuro para destaque, ou preto
        // shadowColor: '#000', // Sua opção anterior
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
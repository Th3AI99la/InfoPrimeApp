import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    useColorScheme,
    Pressable,
    Animated,
    Image,
    TouchableOpacity
} from "react-native";
import api from "../../services/api";
import getThemedStyles from "./style";
import { FontAwesome } from "@expo/vector-icons";

export default function ListarProduto({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [listError, setListError] = useState(null);

    const colorScheme = useColorScheme();
    const styles = getThemedStyles(colorScheme === "dark");

    const addButtonScale = useRef(new Animated.Value(1)).current;

    const handleAddButtonPressIn = () => {
        Animated.spring(addButtonScale, { toValue: 0.96, useNativeDriver: true }).start();
    };
    const handleAddButtonPressOut = () => {
        Animated.spring(addButtonScale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
    };

    const atualizarLista = useCallback(async (isRefreshingRequest = false) => {
        if (!isRefreshingRequest) setIsLoadingList(true);
        setListError(null);
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            if (__DEV__) console.log("Erro ao buscar produtos: ", error.message);
            setListError("Não foi possível carregar os produtos. Tente novamente.");
            setProdutos([]);
        } finally {
            if (!isRefreshingRequest) setIsLoadingList(false);
            if (isRefreshingRequest) setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", atualizarLista);
        atualizarLista();
        return unsubscribe;
    }, [navigation, atualizarLista]);

    const confirmarExclusaoProduto = (item) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja excluir o produto "${item.nome}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => executarExclusaoProduto(item.id) }
            ]
        );
    };

    const executarExclusaoProduto = async (id) => {
        try {
            await api.delete(`/produtos/${id}`);
            Alert.alert("Sucesso", "Produto excluído com sucesso!");
            setProdutos(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            if (__DEV__) console.log("Erro ao excluir produto: ", error.message);
            Alert.alert("Erro", "Não foi possível excluir o produto.");
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        atualizarLista(true);
    }, [atualizarLista]);

    const formatarPreco = (valor) => {
        if (typeof valor !== 'number' && typeof valor !== 'string') return 'N/A';
        const numValor = parseFloat(String(valor).replace(',', '.'));
        if (isNaN(numValor)) return 'N/A';
        return `R$ ${numValor.toFixed(2).replace('.', ',')}`;
    };

    const renderItem = ({ item }) => {
        if (!item || item.id === undefined) {
            if (__DEV__) console.warn("Item inválido ou sem ID:", item);
            return null;
        }

        return (
            <Pressable
                style={({ pressed }) => [styles.produtoItemContainer, { opacity: pressed ? 0.8 : 1 }]}
                onPress={() => navigation.navigate("AlterarProduto", {
                    id: item.id,
                    nome: item.nome,
                    qtde: item.quantidadeEstoque ?? item.quantidade,
                    descricao: item.descricao,
                    preco: item.preco,
                    imagemUrl: item.imagemUrl,
                    disponivelOnline: item.disponivelOnline
                })}
            >
                {item.imagemUrl ? (
                    <Image
                        source={{ uri: item.imagemUrl }}
                        style={styles.produtoImagem}
                        onError={(e) => __DEV__ && console.log("Erro ao carregar imagem:", e.nativeEvent.error)}
                    />
                ) : (
                    <View style={styles.produtoImagemPlaceholder}>
                        <FontAwesome name="camera" size={24} color={styles.placeholderIcon?.color} />
                    </View>
                )}

                <View style={styles.produtoInfoContainer}>
                    <Text style={styles.produtoNome} numberOfLines={2}>{item.nome || "Nome Indisponível"}</Text>
                    <Text style={styles.produtoPreco}>{formatarPreco(item.preco)}</Text>
                    <Text style={styles.produtoQuantidade}>
                        Estoque: {item.quantidadeEstoque ?? item.quantidade ?? 'N/A'}
                    </Text>
                    <View style={styles.disponibilidadeContainer}>
                        <View style={[
                            styles.disponibilidadeDot,
                            { backgroundColor: item.disponivelOnline ? styles.onlineDot?.color : styles.offlineDot?.color }
                        ]} />
                        <Text style={styles.disponibilidadeText}>
                            {item.disponivelOnline ? "Produto Disponível" : "Produto Indisponível"}
                        </Text>
                    </View>
                </View>

                <View style={styles.produtoAcoesContainer}>
                    <Pressable
                        style={({ pressed }) => [styles.acaoButton, { opacity: pressed ? 0.6 : 1 }]}
                        onPress={(e) => {
                            e.stopPropagation();
                            confirmarExclusaoProduto(item);
                        }}
                    >
                        <FontAwesome name="trash" size={24} color={styles.deleteIcon.color} />
                    </Pressable>
                </View>
            </Pressable>
        );
    };

    if (isLoadingList && produtos.length === 0) {
        return (
            <View style={[styles.container, styles.centeredMessageContainer]}>
                <ActivityIndicator size="large" color={styles.loadingIndicator.color} />
                <Text style={styles.loadingText}>Carregando produtos...</Text>
            </View>
        );
    }

    if (listError) {
        return (
            <View style={[styles.container, styles.centeredMessageContainer]}>
                <Text style={styles.errorText}>{listError}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => atualizarLista()}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {produtos.length === 0 && !isLoadingList ? (
                    <View style={styles.centeredMessageContainer}>
                        <Text style={styles.emptyListText}>Nenhum produto cadastrado.</Text>
                        <Text style={styles.emptyListSubText}>Clique no botão "+" para adicionar.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={produtos}
                        keyExtractor={(item, index) => item?.id?.toString() ?? `key-${index}`}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContentContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[styles.refreshControlBase.color]}
                                tintColor={styles.refreshControlBase.color}
                            />
                        }
                        ListFooterComponent={isLoadingList && produtos.length > 0 ? (
                            <ActivityIndicator style={{ marginVertical: 20 }} size="small" color={styles.loadingIndicator.color} />
                        ) : null}
                    />
                )}

                <Pressable
                    onPress={() => navigation.navigate("IncluirProduto")}
                    onPressIn={handleAddButtonPressIn}
                    onPressOut={handleAddButtonPressOut}
                    style={styles.addButton}
                >
                    <Animated.View style={[styles.addButtonAnimatedView, { transform: [{ scale: addButtonScale }] }]}>
                        <Text style={styles.addButtonIcon}>+</Text>
                    </Animated.View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

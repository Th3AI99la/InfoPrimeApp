import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ScrollView
} from "react-native";
import getThemedStyles from "./style";
import api from "../../services/api";
import { useTheme } from '../../context/ThemeContext';

export default function AlterarProduto({ navigation, route }) {
  const {
    id: idProduto,
    nome: nomeInicial,
    qtde: quantidadeInicial,
    descricao: descricaoInicial,
    preco: precoInicial,
    imagemUrl: imagemUrlInicial,
    disponivelOnline: disponivelOnlineInicial
  } = route.params;

  const [nome, setNome] = useState(nomeInicial || "");
  const [quantidade, setQuantidade] = useState(
    quantidadeInicial !== undefined && quantidadeInicial !== null
      ? String(quantidadeInicial)
      : ""
  );
  const [descricao, setDescricao] = useState(descricaoInicial || "");

  const formatPriceForInput = (price) => {
    if (price === undefined || price === null) return "";
    const num = parseFloat(String(price).replace(',', '.'));
    return isNaN(num) ? "" : num.toFixed(2).replace(".", ",");
  };
  const [preco, setPreco] = useState(formatPriceForInput(precoInicial));
  const [imagemUrl, setImagemUrl] = useState(imagemUrlInicial || "");
  const [disponivelOnline, setDisponivelOnline] = useState(
    disponivelOnlineInicial !== undefined ? disponivelOnlineInicial : false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const { themeMode } = useTheme();
  const styles = getThemedStyles(themeMode === "dark");

  const animatedScale = useRef(new Animated.Value(1)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.96,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  async function handleAlterarProduto() {
    setFormError(null);

    if (!nome.trim()) {
      setFormError("O nome do produto não pode ser vazio.");
      return;
    }

    const quantidadeNum = parseInt(quantidade, 10);
    if (isNaN(quantidadeNum) || quantidadeNum < 0) {
      setFormError("A quantidade deve ser um número válido e não negativo.");
      return;
    }

    const precoNum = parseFloat(preco.replace(",", "."));
    if (isNaN(precoNum) || precoNum < 0) {
      setFormError("O preço deve ser um número válido e não negativo.");
      return;
    }

    const produtoAtualizado = {
      nome: nome.trim(),
      quantidade: quantidadeNum,
      descricao: descricao.trim(),
      preco: precoNum,
      imagemUrl: imagemUrl.trim(),
      disponivelOnline
    };

    setIsLoading(true);
    try {
      await api.put(`/produtos/${idProduto}`, produtoAtualizado);
      if (isMounted.current) {
        Alert.alert("Sucesso!", "Produto alterado com sucesso.");
        navigation.navigate("ListarProduto");
      }
    } catch (error) {
      console.error("Erro ao alterar produto: ", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Não foi possível alterar o produto.";
      if (isMounted.current) {
        Alert.alert("Erro", errorMessage);
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Alterar Produto</Text> 

        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={setNome}
          value={nome}
          editable={!isLoading}
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric"
          onChangeText={(text) => setQuantidade(text.replace(/[^0-9]/g, ""))}
          value={quantidade}
          editable={!isLoading}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Descrição detalhada do produto"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={setDescricao}
          value={descricao}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          editable={!isLoading}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 299,90"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric"
          onChangeText={setPreco}
          value={preco}
          editable={!isLoading}
        />

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          style={styles.input}
          placeholder="https://exemplo.com/imagem.jpg"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={setImagemUrl}
          value={imagemUrl}
          editable={!isLoading}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Disponível Online?</Text>
          <Switch
            trackColor={{
              false: styles.switchDisabledTrack?.color,
              true: styles.switchEnabledTrack?.color 
            }}
            thumbColor={
              disponivelOnline
                ? styles.switchEnabledThumb?.color 
                : styles.switchDisabledThumb?.color 
            }
            ios_backgroundColor={styles.switchIosBackground?.color}
            onValueChange={setDisponivelOnline}
            value={disponivelOnline}
            disabled={isLoading}
          />
        </View>

        {formError && <Text style={styles.errorText}>{formError}</Text>}

        <Pressable
          onPress={handleAlterarProduto}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.button,
            isLoading && styles.buttonDisabled
          ]}
        >
          <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </Animated.View>
        </Pressable>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={styles.loadingIndicator.color} />
            <Text style={styles.loadingText}>Salvando...</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

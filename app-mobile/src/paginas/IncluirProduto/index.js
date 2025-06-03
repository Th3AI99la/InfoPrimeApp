import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useColorScheme,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import getThemedStyles from "./style";
import api from "../../services/api";

export default function IncluirProduto({ navigation }) {
  const [nome, setNome] = useState("");
  const [qtde, setQtde] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [disponivelOnline, setDisponivelOnline] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const colorScheme = useColorScheme();
  const styles = getThemedStyles(colorScheme === "dark");

  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  async function handleIncluirProduto() {
    setFormError(null);

    if (!nome.trim()) {
      setFormError("O nome do produto não pode ser vazio.");
      return;
    }

    const quantidadeNum = parseInt(qtde, 10);
    if (isNaN(quantidadeNum) || quantidadeNum < 0) {
      setFormError("A quantidade deve ser um número válido e não negativa.");
      setQtde("");
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum < 0) {
      setFormError("O preço deve ser um número válido.");
      return;
    }

    const novoProduto = {
      nome: nome.trim(),
      quantidade: quantidadeNum,
      descricao: descricao.trim(),
      preco: precoNum,
      imagemUrl: imagemUrl.trim(),
      disponivelOnline,
    };

    setIsLoading(true);
    try {
      await api.post("/produtos", novoProduto);
      Alert.alert("Sucesso!", "Produto incluído com sucesso.");
      navigation.navigate("ListarProduto");
    } catch (error) {
      console.error("Erro ao incluir produto: ", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Não foi possível incluir o produto. Tente novamente.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Incluir Novo Produto</Text>

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
          placeholder="Informe a quantidade"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric"
          onChangeText={(text) => setQtde(text.replace(/[^0-9]/g, ""))}
          value={qtde}
          editable={!isLoading}
        />

        {formError && <Text style={styles.errorText}>{formError}</Text>}

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição detalhada do produto"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={setDescricao}
          value={descricao}
          multiline
          numberOfLines={3}
          editable={!isLoading}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 299.90"
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
              false: "#767577",
              true: styles.switchEnabledTrack?.color || "#81b0ff",
            }}
            thumbColor={
              disponivelOnline
                ? styles.switchEnabledThumb?.color || "#f5dd4b"
                : styles.switchDisabledThumb?.color || "#f4f3f4"
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={setDisponivelOnline}
            value={disponivelOnline}
            disabled={isLoading}
          />
        </View>

        <Pressable
          onPress={handleIncluirProduto}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.button,
            isLoading && styles.buttonDisabled,
          ]}
        >
          <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
            <Text style={styles.buttonText}>Salvar Produto</Text>
          </Animated.View>
        </Pressable>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              size="large"
              color={styles.loadingIndicator.color}
            />
            <Text style={styles.loadingText}>Salvando...</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

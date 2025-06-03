import React, { useState, useRef } from "react"; // Adicionado useRef para animatedScale
import {
  View,
  Text,
  TextInput,
  // StyleSheet, // Removido se getThemedStyles já lida com tudo
  Alert,
  ActivityIndicator,
  // useColorScheme, // 👈 REMOVER
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ScrollView // Adicionado para conteúdos longos
} from "react-native";
import getThemedStyles from "./style";
import api from "../../services/api";
import { useTheme } from '../../context/ThemeContext'; // 👈 IMPORTAR useTheme

export default function IncluirProduto({ navigation }) {
  const [nome, setNome] = useState("");
  const [qtde, setQtde] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [disponivelOnline, setDisponivelOnline] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const { themeMode } = useTheme(); // 👈 USAR themeMode do CONTEXTO
  const styles = getThemedStyles(themeMode === "dark"); // 👈 USAR themeMode do CONTEXTO

  const animatedScale = useRef(new Animated.Value(1)).current; // Usar useRef para Animated.Value

  // ... (resto do seu componente IncluirProduto, como handlePressIn, handlePressOut, handleIncluirProduto)
  // A lógica interna do componente não precisa mudar.

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

    // Ajuste para tratar vírgula ou ponto no preço
    const precoLimpo = preco.replace(',', '.');
    const precoNum = parseFloat(precoLimpo);
    if (isNaN(precoNum) || precoNum < 0) {
      setFormError("O preço deve ser um número válido.");
      return;
    }

    const novoProduto = {
      nome: nome.trim(),
      quantidade: quantidadeNum, // No backend, este campo é 'quantidade'
      descricao: descricao.trim(),
      preco: precoNum,
      imagemUrl: imagemUrl.trim(),
      disponivelOnline,
      // dataCadastro: new Date().toISOString(), // O backend deve cuidar disso com @CreationTimestamp
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
      {/* Adicionado ScrollView para formulários que podem ficar longos */}
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]} // Estilo para multiline
          placeholder="Descrição detalhada do produto"
          placeholderTextColor={styles.placeholderText.color}
          onChangeText={setDescricao}
          value={descricao}
          multiline
          numberOfLines={3}
          textAlignVertical="top" // Para alinhar texto no topo em multiline no Android
          editable={!isLoading}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 299.90"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric" // Permite ponto e vírgula dependendo do OS e config do teclado
          onChangeText={setPreco} // Simples, sem máscara complexa por enquanto
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
              false: styles.switchDisabledTrack?.color || "#767577",
              true: styles.switchEnabledTrack?.color || "#81b0ff",
            }}
            thumbColor={
              disponivelOnline
                ? styles.switchEnabledThumb?.color || "#f5dd4b"
                : styles.switchDisabledThumb?.color || "#f4f3f4"
            }
            ios_backgroundColor={styles.switchIosBackground?.color || "#3e3e3e"}
            onValueChange={setDisponivelOnline}
            value={disponivelOnline}
            disabled={isLoading}
          />
        </View>
        
        {formError && <Text style={styles.errorText}>{formError}</Text>}

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
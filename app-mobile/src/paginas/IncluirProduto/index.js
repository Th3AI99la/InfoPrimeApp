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

export default function IncluirProduto({ navigation }) {
  const [nome, setNome] = useState("");
  const [qtde, setQtde] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [disponivelOnline, setDisponivelOnline] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const { themeMode } = useTheme();
  const styles = getThemedStyles(themeMode === "dark");

  const animatedScale = useRef(new Animated.Value(1)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(formTranslateY, {
        toValue: 0,
        speed: 12,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [formOpacity, formTranslateY]);

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

    const precoLimpo = preco.replace(',', '.');
    const precoNum = parseFloat(precoLimpo);
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
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: formOpacity, transform: [{ translateY: formTranslateY }] }}>
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
                false: styles.switchDisabledTrack?.color || "#767577",
                true: styles.switchEnabledTrack?.color
              }}
              thumbColor={
                disponivelOnline
                  ? styles.switchEnabledThumb?.color
                  : (styles.switchDisabledThumb?.color || "#f4f3f4")
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
        </Animated.View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="large"
            color={styles.loadingIndicator.color}
          />
          <Text style={styles.loadingText}>Salvando...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import getThemedStyles from './style';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesome } from "@expo/vector-icons";

const InformacoesProduto = ({ route }) => {
  const { produto } = route.params;
  const { themeMode } = useTheme();
  const styles = getThemedStyles(themeMode === 'dark');

  const formatarPreco = (valor) => {
    const num = parseFloat(String(valor).replace(',', '.'));
    return isNaN(num) ? 'N/A' : `R$ ${num.toFixed(2).replace('.', ',')}`;
  };

  if (!produto) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Informações do produto não encontradas.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {produto.imagemUrl ? (
        <Image
          source={{ uri: produto.imagemUrl }}
          style={styles.imagemProduto}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.imagemPlaceholder}>
          <FontAwesome name="camera" size={60} color={styles.placeholderText.color} />
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.nomeProduto}>{produto.nome || "Nome do Produto Indisponível"}</Text>

      <View style={styles.infoBloco}>
        <View style={styles.infoLinha}>
          <Text style={styles.label}>Preço:</Text>
          <Text style={styles.valorPreco}>{formatarPreco(produto.preco)}</Text>
        </View>

        <View style={styles.infoLinha}>
          <Text style={styles.label}>Estoque:</Text>
          <Text style={styles.valor}>
            {produto.quantidadeEstoque ?? produto.quantidade ?? 'N/A'} unidades
          </Text>
        </View>

        <View style={styles.infoLinha}>
          <Text style={styles.label}>Disponibilidade:</Text>
          <View style={styles.disponibilidadeContainer}>
            <View
              style={[
                styles.disponibilidadeDot,
                { backgroundColor: produto.disponivelOnline ? styles.onlineDot.color : styles.offlineDot.color }
              ]}
            />
            <Text style={styles.disponibilidadeValor}>
              {produto.disponivelOnline ? "Disponível Online" : "Indisponível Online"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.descricaoContainer}>
        <Text style={styles.labelDescricao}>Descrição Detalhada:</Text>
        <Text style={styles.descricaoProduto}>
          {produto.descricao || "Este produto não possui uma descrição detalhada."}
        </Text>
      </View>

      {produto.dataCadastro && (
        <Text style={styles.dataCadastro}>
          Cadastrado em: {new Date(produto.dataCadastro).toLocaleDateString('pt-BR')}
        </Text>
      )}
    </ScrollView>
  );
};

export default InformacoesProduto;

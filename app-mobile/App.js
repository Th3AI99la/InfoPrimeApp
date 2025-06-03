import React from 'react'; // Import React
import { useColorScheme } from 'react-native'; // Hook para detectar o tema
import { StatusBar } from 'expo-status-bar'; // StatusBar da Expo

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListarProduto from './src/paginas/ListarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import AlterarProduto from './src/paginas/AlterarProduto';


const lightAppColors = {
  primaryGreen: '#28A745', // Verde principal para modo claro
  background: '#F0F2F5',    // Fundo das telas
  card: '#FFFFFF',          // Fundo do header e outros elementos tipo card
  text: '#1C1C1E',          // Cor principal do texto
  border: '#D0D0D0',        // Cor para bordas

};

const darkAppColors = {
  primaryGreen: '#2ECC71', // Verde vibrante para modo escuro
  background: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  border: '#272727',
  // Outras cores se necessário...
};

// Crie os temas para o React Navigation
const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: lightAppColors.primaryGreen,
    background: lightAppColors.background,
    card: lightAppColors.card, // Usado pelo fundo do header
    text: lightAppColors.text,    // Usado pela cor do título do header
    border: lightAppColors.border,
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: darkAppColors.primaryGreen,
    background: darkAppColors.background,
    card: darkAppColors.card,
    text: darkAppColors.text,
    border: darkAppColors.border,
  },
};

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme(); // Detecta 'light' ou 'dark'
  const currentTheme = colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;
  const currentAppColors = colorScheme === 'dark' ? darkAppColors : lightAppColors;

  return (
    <NavigationContainer theme={currentTheme}>
      {/* A StatusBar da Expo adapta o estilo automaticamente ou pode ser explícito */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="ListarProduto"
        screenOptions={{ // Opções padrão para todas as telas do Stack
          headerStyle: {
            backgroundColor: currentAppColors.card, // Cor de fundo do header
            // shadowColor: 'transparent', // Para remover a sombra da borda no iOS se desejar
            // elevation: 0, // Para remover a sombra da borda no Android se desejar
          },
          headerTintColor: currentAppColors.primaryGreen, // Cor do botão de voltar e do título (se não sobrescrito)
          headerTitleStyle: {
            color: currentAppColors.text, // Cor específica para o texto do título
            fontWeight: 'bold',
          },
          // headerBackTitleVisible: false, // Opcional: para ocultar o texto ao lado do botão de voltar no iOS
        }}
      >
        <Stack.Screen
          name="ListarProduto"
          component={ListarProduto}
          options={{
            title: "Seus Produtos", // Título personalizado
          }}
        />
        <Stack.Screen
          name="IncluirProduto"
          component={IncluirProduto}
          options={{
            title: "Novo Produto",
          }}
        />
        <Stack.Screen // Removidas as chaves extras daqui
          name="AlterarProduto"
          component={AlterarProduto}
          options={{
            title: "Editar Produto",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


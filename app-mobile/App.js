import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native'; // 👈 Importar TouchableOpacity
import { FontAwesome } from "@expo/vector-icons"; // 👈 Importar FontAwesome para os ícones

// Context
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // Ajuste o caminho se necessário

// Screens
import HomePage from './src/paginas/HomePage';
import ListarProduto from './src/paginas/ListarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import AlterarProduto from './src/paginas/AlterarProduto';

// Suas paletas de cores (mantenha como estão ou importe de um arquivo central)
const lightAppColors = {
  primaryGreen: '#28A745',
  background: '#F0F2F5',
  card: '#FFFFFF',
  text: '#1C1C1E',
  border: '#D0D0D0',
  iconColor: '#1C1C1E', // Cor para ícones gerais
  headerIconColor: '#28A745', // Cor específica para ícones no header (pode ser o primaryGreen)
};

const darkAppColors = {
  primaryGreen: '#2ECC71',
  background: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  border: '#272727',
  iconColor: '#E0E0E0',
  headerIconColor: '#2ECC71', // Cor específica para ícones no header
};

// Seus temas de navegação (como antes)
const MyLightTheme = {
  // ... (definição como antes, usando lightAppColors)
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: lightAppColors.primaryGreen,
    background: lightAppColors.background,
    card: lightAppColors.card,
    text: lightAppColors.text,
    border: lightAppColors.border,
  },
};

const MyDarkTheme = {
  // ... (definição como antes, usando darkAppColors)
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

function AppNavigator() {
  const { themeMode, toggleTheme } = useTheme(); // Obter themeMode e toggleTheme do contexto
  const currentNavigationTheme = themeMode === 'dark' ? MyDarkTheme : MyLightTheme;
  const currentAppColorsForOptions = themeMode === 'dark' ? darkAppColors : lightAppColors;

  // Componente para o botão de toggle no header
  const HeaderThemeToggleButton = () => (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ marginRight: 15, padding: 5 }} // Estilo para posicionamento e área de toque
    >
      <FontAwesome
        name={themeMode === 'light' ? 'moon-o' : 'sun-o'}
        size={24}
        color={currentAppColorsForOptions.headerIconColor} // Cor do ícone baseada no tema
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer theme={currentNavigationTheme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerStyle: { backgroundColor: currentAppColorsForOptions.card },
          headerTintColor: currentAppColorsForOptions.primaryGreen, // Cor do botão de voltar e título padrão
          headerTitleStyle: { color: currentAppColorsForOptions.text, fontWeight: 'bold' },
          headerRight: () => <HeaderThemeToggleButton />, // 👈 Adicionar o botão aqui
        }}
      >
        <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ title: "InfoPrimeApp" }}
        />
        <Stack.Screen
            name="ListarProduto"
            component={ListarProduto}
            options={{ title: "Nossos Produtos" }}
        />
        <Stack.Screen
            name="IncluirProduto"
            component={IncluirProduto}
            options={{ title: "Novo Produto" }}
        />
        <Stack.Screen
            name="AlterarProduto"
            component={AlterarProduto}
            options={{ title: "Editar Produto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
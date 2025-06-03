import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';

import HomePage from './src/paginas/HomePage';
import ListarProduto from './src/paginas/ListarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import AlterarProduto from './src/paginas/AlterarProduto';
import InformacoesProduto from './src/paginas/InformacoesProduto';

const lightColors = {
  primaryGreen: '#28A745',
  background: '#F0F2F5',
  card: '#FFF',
  text: '#1C1C1E',
  border: '#D0D0D0',
  headerIconColor: '#28A745',
};

const darkColors = {
  primaryGreen: '#2ECC71',
  background: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  border: '#272727',
  headerIconColor: '#2ECC71',
};

const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.primaryGreen,
    background: lightColors.background,
    card: lightColors.card,
    text: lightColors.text,
    border: lightColors.border,
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.primaryGreen,
    background: darkColors.background,
    card: darkColors.card,
    text: darkColors.text,
    border: darkColors.border,
  },
};

const Stack = createStackNavigator();

function AppNavigator() {
  const { themeMode, toggleTheme } = useTheme();
  const colors = themeMode === 'dark' ? darkColors : lightColors;
  const navTheme = themeMode === 'dark' ? MyDarkTheme : MyLightTheme;

  const HeaderToggle = () => (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15, padding: 5 }}>
      <FontAwesome
        name={themeMode === 'light' ? 'moon-o' : 'sun-o'}
        size={24}
        color={colors.headerIconColor}
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primaryGreen,
          headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
          headerRight: () => <HeaderToggle />,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: "" }} />
        <Stack.Screen name="ListarProduto" component={ListarProduto} options={{ title: "Nossos Produtos" }} />
        <Stack.Screen name="IncluirProduto" component={IncluirProduto} options={{ title: " " }} />
        <Stack.Screen name="AlterarProduto" component={AlterarProduto} options={{ title: " " }} />
        <Stack.Screen
          name="InformacoesProduto"
          component={InformacoesProduto}
          options={({ route }) => ({ title: route.params?.produto?.nome || "Detalhes do Produto" })}
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

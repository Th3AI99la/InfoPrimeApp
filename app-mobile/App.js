import React from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListarProduto from './src/paginas/ListarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import AlterarProduto from './src/paginas/AlterarProduto';

const lightAppColors = {
  primaryGreen: '#28A745',
  background: '#F0F2F5',
  card: '#FFFFFF',
  text: '#1C1C1E',
  border: '#D0D0D0',
};

const darkAppColors = {
  primaryGreen: '#2ECC71',
  background: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  border: '#272727',
};

const MyLightTheme = {
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
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;
  const currentAppColors = colorScheme === 'dark' ? darkAppColors : lightAppColors;

  return (
    <NavigationContainer theme={currentTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="ListarProduto"
        screenOptions={{
          headerStyle: {
            backgroundColor: currentAppColors.card,
          },
          headerTintColor: currentAppColors.primaryGreen,
          headerTitleStyle: {
            color: currentAppColors.text,
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ListarProduto"
          component={ListarProduto}
          options={{ title: 'Seus Produtos' }}
        />
        <Stack.Screen
          name="IncluirProduto"
          component={IncluirProduto}
          options={{ title: 'Novo Produto' }}
        />
        <Stack.Screen
          name="AlterarProduto"
          component={AlterarProduto}
          options={{ title: 'Editar Produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

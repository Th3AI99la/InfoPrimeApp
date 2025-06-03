import React, { createContext, useState, useContext } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

// Cria o contexto do tema com valores padrão
export const ThemeContext = createContext({
  themeMode: 'light',
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Detecta o esquema de cores do dispositivo
  const deviceScheme = useDeviceColorScheme();
  const [currentTheme, setCurrentTheme] = useState(deviceScheme || 'light');

  // Alterna entre os temas 'light' e 'dark'
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  
  };

  // Define explicitamente o tema, se válido
  const setThemeMode = (mode) => {
    if (['light', 'dark'].includes(mode)) {
      setCurrentTheme(mode);
  
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode: currentTheme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para acessar o tema
export const useTheme = () => useContext(ThemeContext);

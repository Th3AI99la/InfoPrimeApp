import axios from 'axios';
import Constants from 'expo-constants';

// Tenta obter o host da máquina de desenvolvimento (onde o Metro Bundler está rodando)
// Isso é útil quando rodando o app via Expo Go em um dispositivo físico na mesma rede.
// A ordem de preferência pode variar um pouco entre SDKs do Expo.
const getDevelopmentHost = () => {
  try {
    // Para SDKs mais recentes do Expo (>= 49) e Expo Go
    if (Constants.expoConfig?.hostUri) {
      return Constants.expoConfig.hostUri.split(':')[0];
    }
    // Para SDKs mais antigos ou outros cenários de manifesto
    if (Constants.manifest?.debuggerHost) {
      return Constants.manifest.debuggerHost.split(':')[0];
    }
    if (Constants.manifest2?.extra?.expoGo?.debuggerHost) {
      return Constants.manifest2.extra.expoGo.debuggerHost.split(':')[0];
    }
  } catch (e) {
    console.warn("Não foi possível obter o debuggerHost do Expo automaticamente:", e);
  }
  return null; // Retorna null se não conseguir detectar
};

// Configuração do Host do Backend
const MANUAL_BACKEND_IP = null; // Defina seu IP manualmente aqui se a detecção falhar, ex: '192.168.1.5'
const SPRING_BOOT_PORT = 8080; // Porta do seu backend Spring Boot (ajuste se for diferente)

let backendHost = MANUAL_BACKEND_IP || getDevelopmentHost() || 'localhost';
// Se 'localhost' for detectado e for uma build de desenvolvimento (não emulador),
// pode ser necessário um aviso ou uma configuração manual, pois 'localhost' não funcionará
// de um dispositivo físico para a máquina de desenvolvimento sem truques adicionais.
// A detecção de getDevelopmentHost() é a preferida para dispositivos físicos com Expo Go.

// Se estiver usando emulador/simulador, 'localhost' (ou 10.0.2.2 para emulador Android padrão)
// apontando para a máquina host pode funcionar. A detecção do Expo geralmente lida bem com isso.
// Se backendHost ainda for 'localhost' e você estiver em um dispositivo físico, você precisará do IP manual.
if (backendHost === 'localhost' && Constants.isDevice && !MANUAL_BACKEND_IP) {
    console.warn(
        "API host está como 'localhost', mas o app está rodando em um dispositivo físico. " +
        "A conexão com o backend pode falhar. " +
        "Considere definir o IP manual da sua máquina de desenvolvimento ou verifique a configuração de rede."
    );
}


// Base URL para a API
// Com @RequestMapping("/api") no Controller e @GetMapping("/produtos"), etc. nos métodos
const baseURL = `http://${backendHost}:${SPRING_BOOT_PORT}/api`;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Timeout de 10 segundos (opcional, mas bom ter)
});

// Interceptor para logar a URL completa (útil para debug)
api.interceptors.request.use(request => {
  console.log(`Iniciando requisição para: ${request.baseURL}${request.url}`);
  return request;
}, error => {
  console.error("Erro na configuração da requisição:", error);
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    console.error("Erro na resposta da API:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("Erro na requisição da API (sem resposta):", error.request);
    Alert.alert("Erro de Rede", `Não foi possível conectar ao servidor em ${baseURL}. Verifique sua conexão e o endereço do servidor.`);
  } else {
    console.error("Erro ao configurar a requisição da API:", error.message);
  }
  return Promise.reject(error);
});


export default api;
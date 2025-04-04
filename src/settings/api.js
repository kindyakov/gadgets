import axios from "axios";
import Cookies from 'js-cookie'
import { useLoadingStore } from "../store/useLoadingStore";

// Основная URL для всех запросов к серверу
export const baseURL = 'http://localhost:8888';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

const loadingStore = useLoadingStore.getState();

// Обработчик просьб (requests) для добавления токена и отслеживания загрузки
api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = token;
  }

  loadingStore.incrementLoading();
  return config;
}, error => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Обработчик ответов (responses) для отслеживания загрузки и обработки ошибок
api.interceptors.response.use(response => {
  loadingStore.decrementLoading();
  return response;
}, error => {
  console.error('Response interceptor error:', error);
  // Проверяем статус ошибки и редиректим если не найден индицированный ресурс
  if (error.response.status === 404) {
    // Используем redirect из react-router-dom для переадресации на 404 страницу
    console.error('Error status 404', error);
  }
  return Promise.reject(error);
});

// Дефолтные преобразователи для запросов и ответов
api.defaults.transformRequest = [
  function (data, headers) {
    // Если данные не являются строкой, пытаемся их преобразовать в JSON
    if (typeof data !== 'string') {
      try {
        return JSON.stringify(data);
      } catch (err) {
        console.error('Error', err);
        return data;
      }
    }
    // Возвращаем данные как есть если они строка
    return data;
  },
];

api.defaults.transformResponse = [
  function (response, headers) {
    try {
      return JSON.parse(response);
    } catch (e) {
      console.error('Error parsing response data', e);
      return response;
    }
  },
];

export default api;
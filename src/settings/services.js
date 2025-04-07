import qs from 'qs'
import api from "./api"

function searchParamsString(params) {
  const queryString = qs.stringify(params, { arrayFormat: 'comma' });
  return queryString ? `?${queryString}` : ''
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const services = {
  // get Категории
  getCategories: async (params = {}) => {
    const response = await api.get(`/categories/${searchParamsString(params)}`)
    return response.data
  },
  // get Подкатегории
  getSubCategory: async (params = {}) => {
    const response = await api.get(`/subcategories/${searchParamsString(params)}`)
    return response.data
  },
  // get Продукты
  getProducts: async (params = {}) => {
    const response = await api.get(`/products/${searchParamsString(params)}`)
    return response.data
  },
  // get Обзоры
  getReviews: async (params = {}) => {
    const response = await api.get(`/reviews/${searchParamsString(params)}`)
    return response.data
  },
  // get Отфильтрованные продукты
  getFilteredProducts: async (slug, params = {}) => {
    const response = await api.get(`/filters/${slug}${searchParamsString(params)}`)
    await delay(1500)
    return response.data
  },
  // get Бренды
  getBrands: async (params = {}) => {
    const response = await api.get(`/brands/${searchParamsString(params)}`)
    return response.data
  },
  // get Отзывы
  getFeedbacks: async (params = {}) => {
    const response = await api.get(`/feedbacks/${searchParamsString(params)}`)
    await delay(1500)
    return response.data
  },
  // post Авторизация
  auth: async (data) => {
    const response = await api.post('/auth/local', data)
    await delay(2000)
    return response.data
  },
  // post Регистрация
  register: async (data) => {
    const response = await api.post('/register', data)
    await delay(2000)
    return response.data
  },
  getBasket: async () => {
    const response = await api.get('/basket')
    await delay(1500)
    return response.data
  },
  // post Добавление в корзину
  addInBasket: async (productId, data = {}) => {
    const response = await api.post(`/basket/${productId}`, data)
    await delay(1500)
    return response.data
  },
  // delete из корзины
  deleteFromBasket: async (productId) => {
    const response = await api.delete(`/basket/${productId}`)
    await delay(1500)
    return response.data
  },
  getFavorites: async () => {
    const response = await api.get('/favorites')
    await delay(1500)
    return response.data
  },
  toggleFavorite: async (productId) => {
    const response = await api.put(`/favorites/${productId}`,)
    await delay(1500)
    return response.data
  },
  getProfile: async () => {
    const response = await api.get('/profile')
    await delay(1500)
    return response.data
  }
}

export default services
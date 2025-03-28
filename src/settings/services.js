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
  getCategories: async (params = {}) => {
    const response = await api.get(`/categories/${searchParamsString(params)}`)
    return response.data
  },
  getSubCategory: async (params = {}) => {
    const response = await api.get(`/subcategories/${searchParamsString(params)}`)
    return response.data
  },
  getProducts: async (params = {}) => {
    const response = await api.get(`/products/${searchParamsString(params)}`)
    return response.data
  },
  getReviews: async (params = {}) => {
    const response = await api.get(`/reviews/${searchParamsString(params)}`)
    return response.data
  },
  addFavorites: async (data = {}) => {
    const response = await api.post('/favorites', data)
  },
  getFavorites: async (params = {}) => {
    const response = await api.get(`/favorites/${searchParamsString(params)}`)
    return response.data
  },
  deleteFavorites: async (id) => {
    const response = await api.delete(`/favorites/${id}`)
    return response.data
  },
  getFilteredProducts: async (slug, params = {}) => {
    const response = await api.get(`/filters/${slug}${searchParamsString(params)}`)
    await delay(1500)
    return response.data
  },
  getBrands: async (params = {}) => {
    const response = await api.get(`/brands/${searchParamsString(params)}`)
    return response.data
  },
  getFeedbacks: async (params = {}) => {
    const response = await api.get(`/feedbacks/${searchParamsString(params)}`)
    await delay(3000)
    return response.data
  }
}

export default services
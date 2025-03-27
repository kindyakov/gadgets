import { create } from 'zustand'

// Создание магазина для загрузки
export const useLoadingStore = create(set => ({
  loading: 0,
  incrementLoading: () => set(state => ({ loading: state.loading + 1 })),
  decrementLoading: () => set(state => {
    const newLoading = state.loading - 1
    if (newLoading < 0) {
      console.error('Счётчик загрузки не может быть отрицательным.')
    }
    return { loading: newLoading >= 0 ? newLoading : state.loading }
  }),
}));
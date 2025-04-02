import { create } from 'zustand'

export const useBreadcrumbStore = create((set) => ({
  breadcrumbNames: {
    catalog: 'Каталог',
    about: 'О нас',
    contact: 'Контакты',
    reviews: 'Обзоры',
    favorites: 'Избранные',
    comparison: 'Сравнить',
    account: 'Аккаунт',
  },
  // Функция для обновления или добавления одного значения
  setBreadcrumbName: (key, value) =>
    set((state) => ({
      breadcrumbNames: { ...state.breadcrumbNames, [key]: value },
    })),
  // Функция для обновления сразу нескольких значений
  updateBreadcrumbs: (newEntries) =>
    set((state) => ({
      breadcrumbNames: { ...state.breadcrumbNames, ...newEntries },
    })),
}))


import { create } from "zustand"

export const useFeaturesTranslateStore = create(set => ({
  featuresTranslate: {
    display: 'Дисплей',
    colors: 'Цвет',
    color: 'Цвет',
    processor: 'Процессор',
    ram: 'Оперативная память',
    storage: 'Память',
    display_type: 'Тип дисплея',
    screen_size: 'Размер экрана',
    refresh_rate: 'Частота обновления',
    battery: 'Батарея',
    camera: 'Камера',
    memory: 'Память',
    os: 'Операционная система',
    waterProof: 'Влагозащита',
    waterproof_type: 'Тип влагозащиты',
  },
  // Функция для обновления или добавления одного значения
  setFeaturesTranslate: (key, value) =>
    set((state) => ({
      featuresTranslate: { ...state.featuresTranslate, [key]: value },
    })),
}))

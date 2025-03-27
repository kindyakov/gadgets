import { create } from 'zustand'

const initialSelectedFilters = {
  colors: [],
  price: {},
  tags: [],
  features: {},
};

const initialAvailableFilters = {
  colors: [],
  price: {},
  tags: [],
  features: {},
};

export const useFilterStore = create((set) => ({
  selectedFilters: initialSelectedFilters,
  availableFilters: initialAvailableFilters,
  setSelectedPrice: (min = 0, max = 199999) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        price: { min, max },
      },
    })),
  setSelectedColors: (colors) => set(state => ({
    selectedFilters: {
      ...state.selectedFilters,
      colors
    },
  })),
  toggleTag: (tag) =>
    set((state) => {
      const { tags } = state.selectedFilters;
      return {
        selectedFilters: {
          ...state.selectedFilters,
          tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
        },
      };
    }),
  setSelectedFeatures: (name, values) => set(state => {
    const updatedFeatures = { ...state.selectedFilters.features };

    if (values.length === 0) {
      delete updatedFeatures[name];
    } else {
      updatedFeatures[name] = values;
    }

    return {
      selectedFilters: {
        ...state.selectedFilters,
        features: updatedFeatures
      },
    }
  }),
  updateSelectedFilters: (filters) => set(state => ({
    selectedFilters: {
      ...state.selectedFilters,
      ...filters
    }
  })),
  setAvailableFilters: (filters) =>
    set(() => ({
      availableFilters: filters,
    })),
  setSelectedFilters: (filters) =>
    set(() => ({
      selectedFilters: filters,
    })),
  resetFilters: () => set({
    selectedFilters: initialSelectedFilters
  }),
}));
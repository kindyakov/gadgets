import { create } from 'zustand'

export const useHeaderStore = create((set, get) => ({
  isCatalogOpen: false,
  isSearchOpen: false,
  headerHeight: 0,
  searchResult: null,
  setIsCatalogOpen: (isCatalogOpen) => set({ isCatalogOpen }),
  setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setHeaderHeight: (headerHeight) => set({ headerHeight }),
  setSearchResult: (searchResult) => set({ searchResult })
}))
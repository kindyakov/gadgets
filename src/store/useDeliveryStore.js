import { create } from "zustand";

export const useDeliveryStore = create((set, get) => ({
  data: {
    door: {},
    cdek: {},
    boxberry: {}
  },
  type: 'door',
  client: {},
  updateData: (type, data) => set((state) => ({
    data: {
      ...state.data,
      [type]: { ...state.data[type], ...data }
    }
  })),
  setType: (type) => set({ type }),
  setClient: (client) => set({ client }),
  getCurrentData: () => {
    const state = get();
    return state.data[state.type];
  },
  clearData: (type) => set((state) => ({
    data: {
      ...state.data,
      [type]: {}
    }
  })),
  clearAllData: () => set({
    data: {
      door: {},
      cdek: {},
      boxberry: {}
    }
  })
}))

export const useDeliveryType = () => useDeliveryStore(state => state.type);
export const useSetDeliveryType = () => useDeliveryStore(state => state.setType);
export const useSetDeliveryClient = () => useDeliveryStore(state => state.setClient);
export const useUpdateDeliveryData = () => useDeliveryStore(state => state.updateData);
export const useDeliveryClient = () => useDeliveryStore(state => state.client);
export const useDoorData = () => useDeliveryStore(state => state.data.door);
export const useCdekData = () => useDeliveryStore(state => state.data.cdek);
export const useBoxberryData = () => useDeliveryStore(state => state.data.boxberry);
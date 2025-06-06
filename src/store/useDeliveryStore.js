import { create } from "zustand";

export const useDeliveryStore = create((set, get) => ({
  paymentType: 'bank_card',
  deliveryType: 'door',
  data: {
    door: {},
    cdek: {},
    boxberry: {}
  },
  client: {
    name: '',
    surname: '',
    phone: '',
  },
  updateData: (deliveryType, data) => set((state) => ({
    data: {
      ...state.data,
      [deliveryType]: { ...state.data[deliveryType], ...data }
    }
  })),
  setDeliveryType: (deliveryType) => set({ deliveryType }),
  setPaymentType: (paymentType) => set({ paymentType }),
  setClient: (client) => set({ client }),
  getCurrentData: () => {
    const state = get();
    return state.data[state.deliveryType];
  },
  getAddress: () => {
    const data = get().getCurrentData();

    if (data.address) {
      return data.address
    }

    const fieldsOrder = {
      city: { idx: 0, format: v => v },
      street: { idx: 1, format: v => `ул. ${v}` },
      house: { idx: 2, format: v => `д. ${v}` },
      entrance: { idx: 3, format: v => `подъезд ${v}` },
      floor: { idx: 4, format: v => `этаж ${v}` },
      apartment: { idx: 5, format: v => `кв. ${v}` },
    };

    const parts = Object.entries(data)
      .filter(([key, val]) => val !== undefined && val !== null && val !== '')
      .map(([key, val]) => {
        const field = fieldsOrder[key];
        return field
          ? [field.idx, field.format(val)]
          : null;
      })
      .filter(Boolean);

    return parts
      .sort((a, b) => a[0] - b[0])
      .map(p => p[1])
      .join(', ');
  },
  clearData: (deliveryType) => set((state) => ({
    data: {
      ...state.data,
      [deliveryType]: {}
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
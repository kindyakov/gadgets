import { create } from "zustand";

export const useModalStore = create((set, get) => ({
  modals: {},
  addModal: (modalId, modalProps) => set(state => ({
    modals: {
      ...state.modals,
      [modalId]: modalProps
    }
  })),
  removeModal: (modalId) => set(state => {
    const newModals = { ...state.modals };
    delete newModals[modalId];
    return { modals: newModals };
  }),
  getModal: (modalId) => get().modals[modalId],
  openModal: (modalId, options = {}) => set(state => ({
    modals: {
      ...state.modals,
      [modalId]: { isOpen: true, options }
    }
  })),
  closeModal: (modalId) => set(state => ({
    modals: {
      ...state.modals,
      [modalId]: { isOpen: false }
    }
  }))
}));


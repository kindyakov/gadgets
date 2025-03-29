import { create } from "zustand";

export const useModalStore = create((set, get) => ({
  modals: {},
  addModal: (modalId, modalProps) => set(state => ({
    modals: { ...state.modals, [modalId]: modalProps }
  })),
  removeModal: (modalId) => set(state => {
    const newModals = { ...state.modals };
    delete newModals[modalId];
    return { modals: newModals };
  }),
  getModal: (modalId) => get().modals[modalId],
  openModal: (modalId) => set(state => {
    const modals = { ...state.modals };
    if (modals[modalId]) {
      modals[modalId].isOpen = true;
    } else {
      modals[modalId] = { isOpen: true };
    }
    return { modals };
  }),
  closeModal: (modalId) => set(state => {
    const modals = { ...state.modals };

    if (modals[modalId]) {
      modals[modalId] = { isOpen: false };
    } else {
      modals[modalId] = { isOpen: false };
    }

    return { modals };
  })
}));


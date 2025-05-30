import { create } from "zustand";

export const useOrderFlowStore = create((set, get) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set(state => ({ step: state.step + 1 })),
  prevStep: () => set(state => ({ step: state.step - 1 })),
}))

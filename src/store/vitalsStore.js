import { create } from 'zustand'

export const useVitalsStore = create((set) => ({
  vitals: [],          // array of { timestamp, heartRate, spo2, temperature, ecg }
  latestVitals: null,
  setVitals: (vitals) => set({ vitals, latestVitals: vitals.at(-1) ?? null }),
  appendVital: (entry) =>
    set((s) => ({
      vitals: [...s.vitals, entry],
      latestVitals: entry,
    })),
  clearVitals: () => set({ vitals: [], latestVitals: null }),
}))

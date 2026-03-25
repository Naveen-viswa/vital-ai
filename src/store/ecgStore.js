// import { create } from 'zustand'

// export const useECGStore = create((set) => ({
//   ecgImage: null,        // base64 or object URL of uploaded image
//   ecgFileName: null,
//   ecgAnalysis: null,     // { rhythm, conditions: [], confidence, summary } — filled by backend
//   isAnalyzing: false,
//   setECGImage: (image, fileName) => set({ ecgImage: image, ecgFileName: fileName }),
//   setECGAnalysis: (analysis) => set({ ecgAnalysis: analysis }),
//   setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
//   clearECG: () => set({ ecgImage: null, ecgFileName: null, ecgAnalysis: null }),
// }))

import { create } from 'zustand'

export const useECGStore = create((set) => ({
  ecgImage:         null,
  ecgFileName:      null,
  ecgAnalysis:      null,
  isAnalyzing:      false,

  setECGImage:    (image, fileName) => set({ ecgImage: image, ecgFileName: fileName, ecgAnalysis: null }),
  setECGAnalysis: (analysis)        => set({ ecgAnalysis: analysis }),
  setAnalyzing:   (isAnalyzing)     => set({ isAnalyzing }),
  clearECG:       ()                => set({ ecgImage: null, ecgFileName: null, ecgAnalysis: null }),
}))

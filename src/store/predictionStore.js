// import { create } from 'zustand'

// export const usePredictionStore = create((set) => ({
//   predictions: [],
//   isLoading: false,
//   setPredictions: (predictions) => set({ predictions }),
//   setLoading: (isLoading) => set({ isLoading }),
// }))


//


// import { create } from 'zustand'

// export const usePredictionStore = create((set) => ({
//   predictions:    [],
//   summary:        null,
//   recommendation: null,
//   overallRisk:    null,
//   riskScore:      null,
//   isLoading:      false,
//   error:          null,

//   setPredictionResult: (result) => set({
//     predictions:    result.conditions    ?? [],
//     summary:        result.summary       ?? null,
//     recommendation: result.recommendation ?? null,
//     overallRisk:    result.overall_risk  ?? null,
//     riskScore:      result.risk_score    ?? null,
//     error:          null,
//   }),
//   setLoading: (isLoading) => set({ isLoading }),
//   setError:   (error)     => set({ error, isLoading: false }),
//   clearPredictions: ()    => set({
//     predictions: [], summary: null, recommendation: null,
//     overallRisk: null, riskScore: null, error: null,
//   }),
// }))

//

import { create } from 'zustand'

export const usePredictionStore = create((set) => ({
  predictions:    [],
  summary:        null,
  recommendation: null,
  overallRisk:    null,
  riskScore:      null,
  riskBreakdown:  null,
  isLoading:      false,
  error:          null,

  setPredictionResult: (result) => set({
    predictions:    result.conditions     ?? [],
    summary:        result.summary        ?? null,
    recommendation: result.recommendation ?? null,
    overallRisk:    result.overall_risk   ?? null,
    riskScore:      result.risk_score     ?? null,
    riskBreakdown:  result.risk_breakdown ?? null,
    error:          null,
  }),
  setLoading:       (isLoading) => set({ isLoading }),
  setError:         (error)     => set({ error, isLoading: false }),
  clearPredictions: ()          => set({
    predictions: [], summary: null, recommendation: null,
    overallRisk: null, riskScore: null, riskBreakdown: null, error: null,
  }),
}))



import { create } from 'zustand'
// 🔥 REMOVED: import { groq } from '../../lib/groq'
// 🔥 REMOVED: import { analyzePDFReport } from '../../utils/pdfAnalysis'

export const useReportStore = create((set, get) => ({
  uploadedPDF: null,
  medicalFindings: [],
  aiFindings: [],
  concordance: 0,
  
  // Basic setters
  setUploadedPDF: (pdf) => set({ uploadedPDF: pdf }),
  setMedicalFindings: (findings) => set({ medicalFindings: findings }),
  setAiFindings: (findings) => set({ aiFindings: findings }),
  setConcordance: (score) => set({ concordance: score }),
  
  clearReport: () => set({
    uploadedPDF: null,
    medicalFindings: [],
    aiFindings: [],
    concordance: 0
  }),
  
  // 🔥 SIMPLIFIED ANALYSIS - uses prediction store directly
  analyzeUploadedPDF: async () => {
    const { uploadedPDF } = get()
    if (!uploadedPDF?.text) {
      console.warn('No PDF text to analyze')
      return []
    }
    
    try {
      // 🔥 Simulate analysis (replace with real Groq later)
      // For now: extract keywords heuristically
      const textLower = uploadedPDF.text.toLowerCase()
      const commonFindings = [
        'bradycardia', 'tachycardia', 'hypoxemia', 'hypotension',
        'hypertension', 'arrhythmia', 'st elevation', 'chest pain',
        'shortness of breath', 'fever', 'hypothermia'
      ]
      
      const findings = commonFindings.filter(term => textLower.includes(term))
      set({ medicalFindings: findings })
      
      // 🔥 Compare with predictions
      await get().compareWithAIPredictions()
      
      console.log('✅ PDF analyzed (demo):', findings)
      return findings
      
    } catch (error) {
      console.error('Analysis failed:', error)
      return []
    }
  },
  
  // 🔥 Compare with prediction store
  compareWithAIPredictions: () => {
    const { medicalFindings } = get()
    const { predictions } = usePredictionStore.getState()
    
    if (!predictions?.length || !medicalFindings.length) {
      set({ concordance: 0 })
      return 0
    }
    
    let matches = 0
    predictions.forEach(pred => {
      const matched = medicalFindings.find(finding => 
        finding.includes(pred.condition.toLowerCase()) ||
        pred.condition.toLowerCase().includes(finding)
      )
      if (matched) matches++
    })
    
    const score = (matches / predictions.length)
    set({ 
      aiFindings: predictions.map(p => p.condition),
      concordance: score 
    })
    
    console.log(`✅ Concordance: ${(score * 100).toFixed(0)}%`)
    return score
  },
  
  runFullReportAnalysis: async () => {
    await get().analyzeUploadedPDF()
  }
}))

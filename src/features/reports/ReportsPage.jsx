

// import { useState, useRef } from 'react'
// import { Upload, FileText, Brain, CheckCircle, AlertCircle, Loader2, Activity, Heart } from 'lucide-react'
// import * as pdfjsLib from 'pdfjs-dist'
// import { useVitalsStore } from '../../store/vitalsStore'
// import { usePredictionStore } from '../../store/predictionStore'
// import { analyzePDFReport } from '../../services/groqService'

// // Set worker path (can also live in main.jsx / App.jsx)
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js'

// export default function ReportsPage() {
//   const [uploading, setUploading] = useState(false)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [comparing, setComparing] = useState(false)
//   const [pdfText, setPdfText] = useState('')
//   const [pdfFileName, setPdfFileName] = useState('')
//   const [report, setReport] = useState(null)
//   const [vitalsAnalysis, setVitalsAnalysis] = useState(null)
//   const [error, setError] = useState('')

//   const fileRef = useRef()
//   const { vitals, latestVitals } = useVitalsStore()
//   const { predictions } = usePredictionStore()

//   // --- 1. PDF → Text using pdfjs‑dist ---
//   const extractTextFromPDF = async (file) => {
//     if (!file || file.type !== 'application/pdf') {
//       throw new Error('File must be a PDF.')
//     }

//     const reader = new FileReader()
//     return new Promise((resolve, reject) => {
//       reader.onload = async (e) => {
//         try {
//           const typedArray = new Uint8Array(e.target.result)
//           const pdf = await pdfjsLib.getDocument(typedArray).promise

//           let fullText = ''
//           for (let i = 1; i <= pdf.numPages; i++) {
//             const page = await pdf.getPage(i)
//             const textContent = await page.getTextContent()
//             const pageText = textContent.items.map((item) => item.str).join(' ')
//             fullText += pageText + '\n\n'
//           }

//           resolve(fullText.trim())
//         } catch (err) {
//           console.error('PDF text extraction failed:', err)
//           reject(new Error('Could not extract text from PDF.'))
//         }
//       }

//       reader.onerror = () => reject(new Error('File read error'))
//       reader.readAsArrayBuffer(file)
//     })
//   }

//   // --- 2. Main Logic: Handle Upload & Analysis ---
//   const handleFile = async (file) => {
//     if (!file || file.type !== 'application/pdf') {
//       alert('Please upload a valid PDF file')
//       return
//     }

//     setError('')
//     setReport(null)
//     setVitalsAnalysis(null)
//     setPdfFileName(file.name)

//     setUploading(true)
//     let text = ''

//     try {
//       // ✅ Use pdfjs text extraction (no Tesseract)
//       text = await extractTextFromPDF(file)

//       // Clean text, keep printable chars
//       text = text
//         .replace(/[^\x20-\x7E\n\r\t\-()./,]/g, ' ')
//         .replace(/\s+/g, ' ')
//         .trim()

//       if (text.length < 50) {
//         throw new Error('Extracted text too short; may be unreadable or encrypted.')
//       }

//       setPdfText(text)
//     } catch (e) {
//       setError('PDF extraction failed: ' + e.message)
//       setUploading(false)
//       return
//     }

//     setUploading(false)

//     // ✅ STILL call the SAME Groq function (no changes to groqService)
//     setAnalyzing(true)
//     try {
//       const reportData = await analyzePDFReport(text.slice(0, 8000))
//       setReport(reportData)
//     } catch (e) {
//       setError('AI Analysis failed: ' + e.message)
//     }
//     setAnalyzing(false)

//     // ✅ Comparison Logic (no change)
//     setComparing(true)
//     try {
//       const vitalsStr = vitals.length > 0
//         ? `${vitals.length} logs (Latest HR: ${latestVitals?.heartRate || '--'} bpm)`
//         : 'No vitals logged'

//       const predStr = predictions.length > 0
//         ? predictions.map(p => p.condition).join(', ')
//         : 'No AI predictions generated'

//       setVitalsAnalysis({
//         vitalsSummary: vitalsStr,
//         predictionsSummary: predStr,
//         interpretation: 'The uploaded report and live vitals show good correlation.',
//         severity: 'Stable',
//         urgency: 'Routine',
//       })
//     } catch (e) {
//       console.error('Comparison failed', e)
//     }
//     setComparing(false)
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     const file = e.dataTransfer.files[0]
//     if (file) handleFile(file)
//   }

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '24px',
//         padding: '24px',
//         maxWidth: '1200px',
//         margin: '0 auto',
//       }}
//     >
//       {/* Header */}
//       <header>
//         <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>📋 Medical Report Analysis</h1>
//         <p style={{ fontSize: '15px', color: '#64748b' }}>AI‑driven correlation between clinical reports and real‑time vitals.</p>
//       </header>

//       {/* Upload Box */}
//       <div
//         style={{
//           border: pdfText ? '2px solid #bbf7d0' : '2px dashed #cbd5e1',
//           background: pdfText ? '#f0fdf4' : '#f8fafc',
//           borderRadius: '16px',
//           padding: '48px 24px',
//           textAlign: 'center',
//           cursor: 'pointer',
//           transition: '0.3s',
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//         onClick={() => fileRef.current?.click()}
//       >
//         {uploading ? (
//           <div>
//             <Loader2 size={40} className="animate-spin mx-auto mb-3" color="#0ea5e9" />
//             <p style={{ fontWeight: 600 }}>Reading PDF Content (pdfjs)...</p>
//           </div>
//         ) : pdfText ? (
//           <div>
//             <CheckCircle size={40} color="#22c55e" style={{ margin: '0 auto 12px' }} />
//             <p style={{ fontWeight: 600, color: '#15803d' }}>{pdfFileName}</p>
//             <p style={{ fontSize: '12px', color: '#64748b' }}>Ready for Analysis • Click to Change</p>
//           </div>
//         ) : (
//           <div>
//             <Upload size={32} color="#0ea5e9" style={{ margin: '0 auto 16px' }} />
//             <h3 style={{ fontWeight: 600 }}>Drop Medical PDF or Click to Upload</h3>
//             <p style={{ fontSize: '13px', color: '#64748b' }}>Lab Results, Discharge Summaries, or Clinical Notes</p>
//           </div>
//         )}
//       </div>

//       <input
//         ref={fileRef}
//         type="file"
//         accept=".pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
//       />

//       {error && (
//         <div
//           style={{
//             padding: '12px',
//             background: '#fee2e2',
//             color: '#b91c1c',
//             borderRadius: '10px',
//             display: 'flex',
//             gap: '8px',
//             alignItems: 'center',
//           }}
//         >
//           <AlertCircle size={16} /> {error}
//         </div>
//       )}

//       {/* Box 1: PDF Analysis */}
//       <div
//         style={{
//           background: '#fff',
//           borderRadius: '16px',
//           border: '1px solid #e2e8f0',
//           overflow: 'hidden',
//         }}
//       >
//         <div
//           style={{
//             padding: '16px 24px',
//             background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
//             borderBottom: '1px solid #bfdbfe',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//           }}
//         >
//           <FileText size={18} color="#0ea5e9" />
//           <h2 style={{ fontSize: '16px', fontWeight: 700 }}>📄 Clinical Report Summary</h2>
//         </div>
//         <div style={{ padding: '24px' }}>
//           {analyzing ? (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
//               <Loader2 size={18} className="animate-spin" />
//               <span>Analyzing report...</span>
//             </div>
//           ) : report ? (
//             <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
//               <p style={{ margin: '0 0 8px 0' }}>
//                 <strong>Context:</strong> {report.clinicalContext}
//               </p>
//               <p style={{ margin: '0 0 8px 0' }}>
//                 <strong>Findings:</strong> {report.vitalsAndLabs}
//               </p>
//               <p style={{ margin: '0 0 8px 0' }}>
//                 <strong>Diagnosis:</strong> {report.keyDiagnoses}
//               </p>
//               <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
//                 <span
//                   style={{
//                     padding: '4px 12px',
//                     borderRadius: '20px',
//                     background: report.severity === 'critical' ? '#fee2e2' : '#f0fdf4',
//                     color:
//                       report.severity === 'critical' ? '#ef4444' : report.severity === 'warning' ? '#ea580c' : '#16a34a',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {report.severity}
//                 </span>
//                 <span
//                   style={{
//                     padding: '4px 12px',
//                     borderRadius: '20px',
//                     background:
//                       report.urgency === 'emergency' ? '#fee2e2' : report.urgency === 'urgent' ? '#fef3c7' : '#dcfce7',
//                     color:
//                       report.urgency === 'emergency' ? '#ef4444' : report.urgency === 'urgent' ? '#ea580c' : '#16a34a',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {report.urgency}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <p style={{ color: '#94a3b8', textAlign: 'center' }}>Upload a report to see clinical insights.</p>
//           )}
//         </div>
//       </div>

//       {/* Box 2: Comparison Dashboard */}
//       <div
//         style={{
//           background: '#fff',
//           borderRadius: '16px',
//           border: '1px solid #e2e8f0',
//           overflow: 'hidden',
//         }}
//       >
//         <div
//           style={{
//             padding: '16px 24px',
//             background: 'linear-gradient(135deg, #faf5ff, #ede9fe)',
//             borderBottom: '1px solid #ddd6fe',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//           }}
//         >
//           <Brain size={18} color="#8b5cf6" />
//           <h2 style={{ fontSize: '16px', fontWeight: 700 }}>🧠 AI vs Vitals Comparison</h2>
//         </div>
//         <div style={{ padding: '24px' }}>
//           {comparing ? (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
//               <Loader2 size={18} className="animate-spin" />
//               <span>Running comparison...</span>
//             </div>
//           ) : vitalsAnalysis ? (
//             <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
//               <p style={{ margin: '0 0 8px 0' }}>
//                 <strong>Vitals Status:</strong> {vitalsAnalysis.vitalsSummary}
//               </p>
//               <p style={{ margin: '0 0 8px 0' }}>
//                 <strong>AI Predictions:</strong> {vitalsAnalysis.predictionsSummary}
//               </p>
//               <div
//                 style={{
//                   padding: '12px',
//                   background: '#f0fdf4',
//                   borderRadius: '8px',
//                   marginTop: '10px',
//                   border: '1px solid #bbf7d0',
//                 }}
//               >
//                 <strong>Interpretation:</strong> {vitalsAnalysis.interpretation}
//               </div>
//             </div>
//           ) : (
//             <p style={{ color: '#94a3b8', textAlign: 'center' }}>Awaiting data for comparison study.</p>
//           )}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//           gap: '16px',
//         }}
//       >
//         {[
//           {
//             label: 'Vitals logs',
//             value: vitals.length,
//             icon: <Activity size={20} />,
//             color: '#0ea5e9',
//           },
//           {
//             label: 'AI Conditions',
//             value: predictions.length,
//             icon: <Brain size={20} />,
//             color: '#8b5cf6',
//           },
//           {
//             label: 'PDF Analysis',
//             value: report ? 'Active' : 'None',
//             icon: <FileText size={20} />,
//             color: '#f59e0b',
//           },
//           {
//             label: 'Pulse Rate',
//             value: latestVitals?.heartRate || '--',
//             icon: <Heart size={20} />,
//             color: '#ef4444',
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             style={{
//               padding: '20px',
//               background: '#fff',
//               border: '1px solid #e2e8f0',
//               borderRadius: '12px',
//               textAlign: 'center',
//             }}
//           >
//             <div style={{ color: item.color, display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>{item.icon}</div>
//             <div style={{ fontSize: '20px', fontWeight: 700 }}>{item.value}</div>
//             <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>{item.label}</div>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         .animate-spin { animation: spin 1s linear infinite; }
//       `}</style>
//     </div>
//   )
// }

import { useState, useRef, useEffect } from 'react'
import { 
  Upload, FileText, Brain, CheckCircle, AlertCircle, 
  Loader2, Activity, Heart, ShieldCheck, Scale 
} from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import { useVitalsStore } from '../../store/vitalsStore'
import { usePredictionStore } from '../../store/predictionStore'
import { analyzePDFReport, compareReportWithVitals } from '../../services/groqService'

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export default function ReportsPage() {
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [comparing, setComparing] = useState(false)
  const [pdfText, setPdfText] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [report, setReport] = useState(null)
  const [vitalsAnalysis, setVitalsAnalysis] = useState(null)
  const [error, setError] = useState('')

  const fileRef = useRef()
  const { vitals, latestVitals } = useVitalsStore()
  const { predictions } = usePredictionStore()

  // Helper for PDF Extraction
  const extractTextFromPDF = async (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result)
          const pdf = await pdfjsLib.getDocument(typedArray).promise
          let fullText = ''
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            fullText += textContent.items.map((item) => item.str).join(' ') + '\n'
          }
          resolve(fullText.trim())
        } catch (err) {
          reject(new Error('PDF extraction failed.'))
        }
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const handleFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file')
      return
    }

    setError('')
    setReport(null)
    setVitalsAnalysis(null)
    setPdfFileName(file.name)
    setUploading(true)

    try {
      const text = await extractTextFromPDF(file)
      const cleanedText = text.replace(/\s+/g, ' ').trim()
      
      if (cleanedText.length < 50) throw new Error('PDF content is too short or unreadable.')
      setPdfText(cleanedText)
      setUploading(false)

      // 1. Analyze PDF via Groq
      setAnalyzing(true)
      const reportData = await analyzePDFReport(cleanedText.slice(0, 8000))
      setReport(reportData)
      setAnalyzing(false)

      // 2. Perform Cross-Comparison if Vitals exist
      if (latestVitals) {
        setComparing(true)
        const comparison = await compareReportWithVitals(
          `Diagnosis: ${reportData.keyDiagnoses}. Vitals: ${reportData.vitalsAndLabs}. Impression: ${reportData.impression}`,
          latestVitals,
          predictions
        )
        setVitalsAnalysis(comparison)
        setComparing(false)
      }
    } catch (e) {
      setError(e.message)
      setUploading(false)
      setAnalyzing(false)
      setComparing(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>📋 Medical Report Analysis</h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>AI correlation between clinical documents and live sensor data.</p>
      </header>

      {/* Upload Section */}
      <div
        style={{
          border: pdfText ? '2px solid #bbf7d0' : '2px dashed #cbd5e1',
          background: pdfText ? '#f0fdf4' : '#f8fafc',
          borderRadius: '16px', padding: '40px 24px', textAlign: 'center', cursor: 'pointer',
        }}
        onClick={() => fileRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="animate-spin" color="#0ea5e9" style={{ margin: '0 auto' }} />
            <p style={{ fontWeight: 600 }}>Reading PDF...</p>
          </div>
        ) : pdfText ? (
          <div>
            <CheckCircle size={32} color="#22c55e" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontWeight: 600, color: '#15803d' }}>{pdfFileName}</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Click to replace report</p>
          </div>
        ) : (
          <div>
            <Upload size={32} color="#0ea5e9" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontWeight: 600 }}>Upload Clinical PDF</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Lab results or discharge summaries</p>
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />

      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Box 1: PDF Insights */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} color="#0ea5e9" />
            <h2 style={{ fontSize: '15px', fontWeight: 700 }}>Clinical Report Summary</h2>
          </div>
          <div style={{ padding: '20px' }}>
            {analyzing ? (
              <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px' }}><Loader2 size={16} className="animate-spin" /> Analyzing text...</div>
            ) : report ? (
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                <p><strong>Context:</strong> {report.clinicalContext}</p>
                <p><strong>History:</strong> {report.medicalHistory}</p>
                <p><strong>Diagnosis:</strong> {report.keyDiagnoses}</p>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: 700 }}>{report.severity.toUpperCase()}</span>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', background: '#fff7ed', color: '#c2410c', fontSize: '11px', fontWeight: 700 }}>{report.urgency.toUpperCase()}</span>
                </div>
              </div>
            ) : <p style={{ color: '#94a3b8', fontSize: '13px' }}>Upload a file to extract clinical data.</p>}
          </div>
        </div>

        {/* Box 2: Comparison Analysis */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: '#f5f3ff', borderBottom: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain size={18} color="#8b5cf6" />
            <h2 style={{ fontSize: '15px', fontWeight: 700 }}>AI vs Vitals Correlation</h2>
          </div>
          <div style={{ padding: '20px' }}>
            {comparing ? (
              <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px' }}><Loader2 size={16} className="animate-spin" /> Running cross-check...</div>
            ) : vitalsAnalysis ? (
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                  <strong>Concordance Score:</strong>
                  <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '18px' }}>{(vitalsAnalysis.concordanceScore * 100).toFixed(0)}%</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', marginBottom: '15px', overflow: 'hidden' }}>
                  <div style={{ width: `${vitalsAnalysis.concordanceScore * 100}%`, height: '100%', background: '#8b5cf6', transition: 'width 1s' }} />
                </div>
                <p style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong>Interpretation:</strong> {vitalsAnalysis.interpretation}
                </p>
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <span style={{ color: vitalsAnalysis.urgency === 'Emergency' ? '#ef4444' : '#64748b' }}>
                    Status: <strong>{vitalsAnalysis.severity}</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '10px' }}>
                {!latestVitals ? "⚠️ Add live vitals first to enable comparison." : "Awaiting clinical report for correlation study."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard icon={<Activity size={18}/>} label="Vitals Logs" value={vitals.length} color="#0ea5e9" />
        <StatCard icon={<ShieldCheck size={18}/>} label="AI Alerts" value={predictions.length} color="#8b5cf6" />
        <StatCard icon={<Heart size={18}/>} label="Current HR" value={latestVitals?.heartRate || '--'} color="#ef4444" />
        <StatCard icon={<Scale size={18}/>} label="Match" value={vitalsAnalysis ? `${(vitalsAnalysis.concordanceScore * 100).toFixed(0)}%` : '--'} color="#10b981" />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ color }}>{icon}</div>
      <div style={{ fontSize: '18px', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
    </div>
  )
}


// import { useReportStore } from '../../store/reportStore'
// import { usePredictionStore } from '../../store/predictionStore'  // 🔥 Add this
// import { Brain, FileText, AlertCircle } from 'lucide-react'

// export default function ReportViewer() {
//   const { medicalFindings, concordance } = useReportStore()
//   const { predictions } = usePredictionStore()  // 🔥 AI findings from predictions
  
//   const aiFindings = predictions.map(p => p.condition)

//   if (!medicalFindings.length && !aiFindings.length) {
//     return (
//       <div style={{
//         background: '#f8fafc', borderRadius: '12px',
//         padding: '40px', textAlign: 'center',
//         border: '1px dashed #e2e8f0'
//       }}>
//         <FileText size={48} color="#cbd5e1" />
//         <p style={{ fontSize: '14px', color: '#64748b', marginTop: '12px' }}>
//           Upload a medical report to view extracted findings
//         </p>
//       </div>
//     )
//   }

//   // Your existing JSX stays PERFECT - no changes needed!
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//       {/* Medical Report Findings */}
//       <div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
//           <FileText size={18} color="#0ea5e9" />
//           <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
//             Medical Report ({medicalFindings.length} findings)
//           </h3>
//         </div>
//         {/* ... rest unchanged */}
//       </div>

//       {/* AI Findings */}
//       <div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
//           <Brain size={18} color="#8b5cf6" />
//           <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
//             AI Predictions ({aiFindings.length} conditions)
//           </h3>
//         </div>
//         {/* ... rest unchanged */}
//       </div>

//       {/* Concordance Score */}
//       {medicalFindings.length && aiFindings.length && (
//         <div style={{
//           background: concordance > 60 ? '#dcfce7' : concordance > 30 ? '#fef3c7' : '#fee2e2',
//           border: `1px solid ${concordance > 60 ? '#bbf7d0' : concordance > 30 ? '#fef08a' : '#fecaca'}`,
//           borderRadius: '12px', padding: '20px', textAlign: 'center'
//         }}>
//           <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
//             {(concordance * 100).toFixed(0)}% Agreement
//           </h3>
//           <p style={{ fontSize: '13px', color: '#64748b' }}>
//             {concordance > 0.6 ? 'Excellent match' : concordance > 0.3 ? 'Moderate match' : 'Review needed'}
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }

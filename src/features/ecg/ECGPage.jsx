// import { useRef, useState } from 'react'
// import { useECGStore } from '../../store/ecgStore'
// import {
//   Upload, Waves, AlertTriangle,
//   CheckCircle, Clock, Info, X, Loader2
// } from 'lucide-react'

// export default function ECGPage() {
//   const fileRef = useRef()
//   const { ecgImage, ecgFileName, ecgAnalysis, isAnalyzing, setECGImage, clearECG } = useECGStore()
//   const [dragOver, setDragOver] = useState(false)

//   function handleFile(file) {
//     if (!file) return
//     if (!file.type.startsWith('image/')) return
//     const url = URL.createObjectURL(file)
//     setECGImage(url, file.name)
//   }

//   function handleFileInput(e) {
//     handleFile(e.target.files[0])
//   }

//   function handleDrop(e) {
//     e.preventDefault()
//     setDragOver(false)
//     handleFile(e.dataTransfer.files[0])
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

//       {/* Header */}
//       <div>
//         <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
//           ECG Analysis
//         </h2>
//         <p style={{ fontSize: '13px', color: '#64748b' }}>
//           Upload an ECG waveform image for AI-powered rhythm and abnormality detection
//         </p>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

//         {/* Upload Panel */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//             <Waves size={16} color="#0ea5e9" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Upload ECG Image</p>
//           </div>

//           {!ecgImage ? (
//             <div
//               onClick={() => fileRef.current.click()}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={handleDrop}
//               style={{
//                 border: `2px dashed ${dragOver ? '#0ea5e9' : '#bfdbfe'}`,
//                 borderRadius: '12px',
//                 padding: '40px 20px',
//                 backgroundColor: dragOver ? '#e0f2fe' : '#f0f9ff',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '12px',
//                 transition: 'all 0.15s',
//               }}
//             >
//               <div style={{
//                 width: '52px', height: '52px',
//                 backgroundColor: '#dbeafe', borderRadius: '14px',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Upload size={22} color="#0ea5e9" />
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Click or drag & drop ECG image
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>
//                   Supports JPG, PNG, WEBP
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div>
//               {/* Image Preview */}
//               <div style={{
//                 position: 'relative',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 border: '1px solid #e2e8f0',
//                 backgroundColor: '#000',
//               }}>
//                 <img
//                   src={ecgImage}
//                   alt="ECG waveform"
//                   style={{ width: '100%', display: 'block', maxHeight: '220px', objectFit: 'contain' }}
//                 />
//                 <button
//                   onClick={clearECG}
//                   style={{
//                     position: 'absolute', top: '8px', right: '8px',
//                     backgroundColor: 'rgba(0,0,0,0.6)',
//                     border: 'none', borderRadius: '6px',
//                     padding: '4px', cursor: 'pointer',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}
//                 >
//                   <X size={14} color="white" />
//                 </button>
//               </div>

//               <div style={{
//                 marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
//                 backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
//                 borderRadius: '8px', padding: '8px 12px',
//               }}>
//                 <CheckCircle size={13} color="#22c55e" />
//                 <p style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>{ecgFileName}</p>
//               </div>
//             </div>
//           )}

//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={handleFileInput}
//           />

//           {/* Info note */}
//           <div style={{
//             marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px',
//             backgroundColor: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
//           }}>
//             <Info size={13} color="#94a3b8" style={{ marginTop: '1px', flexShrink: 0 }} />
//             <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
//               Upload a standard 12-lead or single-lead ECG strip image.
//               AI analysis via Groq Vision will be available after backend integration.
//             </p>
//           </div>
//         </div>

//         {/* Analysis Result Panel */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '16px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <Waves size={16} color="#8b5cf6" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Analysis Result</p>
//           </div>

//           {!ecgImage && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '10px', padding: '40px',
//               textAlign: 'center', gap: '8px',
//             }}>
//               <Waves size={28} color="#e2e8f0" />
//               <p style={{ fontSize: '13px', color: '#94a3b8' }}>No ECG image uploaded yet</p>
//               <p style={{ fontSize: '11px', color: '#cbd5e1' }}>Upload an image to begin analysis</p>
//             </div>
//           )}

//           {ecgImage && !ecgAnalysis && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

//               {/* Awaiting Backend */}
//               <div style={{
//                 backgroundColor: '#fffbeb', border: '1px solid #fef08a',
//                 borderRadius: '10px', padding: '14px 16px',
//                 display: 'flex', alignItems: 'flex-start', gap: '10px',
//               }}>
//                 <Clock size={15} color="#eab308" style={{ marginTop: '1px', flexShrink: 0 }} />
//                 <div>
//                   <p style={{ fontSize: '13px', fontWeight: 600, color: '#854d0e', marginBottom: '4px' }}>
//                     Analysis Pending
//                   </p>
//                   <p style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.6 }}>
//                     ECG image has been uploaded. Groq Vision API analysis
//                     will run automatically once the backend is connected.
//                   </p>
//                 </div>
//               </div>

//               {/* What will be shown */}
//               <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>
//                 After backend integration, this panel will show:
//               </p>
//               {[
//                 { label: 'Rhythm Type',       eg: 'e.g. Sinus Rhythm, Atrial Fibrillation' },
//                 { label: 'Rate Estimate',      eg: 'e.g. 72 bpm estimated from waveform'    },
//                 { label: 'Detected Anomalies', eg: 'e.g. ST elevation, Wide QRS complex'    },
//                 { label: 'Confidence Score',   eg: 'e.g. 91% confidence'                    },
//                 { label: 'Clinical Summary',   eg: 'e.g. Findings suggest...'               },
//               ].map(({ label, eg }) => (
//                 <div key={label} style={{
//                   display: 'flex', justifyContent: 'space-between',
//                   alignItems: 'center', padding: '8px 12px',
//                   backgroundColor: '#f8fafc', borderRadius: '8px',
//                   border: '1px dashed #e2e8f0',
//                 }}>
//                   <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{label}</span>
//                   <span style={{ fontSize: '11px', color: '#94a3b8' }}>{eg}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* When ecgAnalysis is populated by backend later */}
//           {ecgAnalysis && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//               <div style={{
//                 backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
//                 borderRadius: '10px', padding: '14px 16px',
//               }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#15803d', marginBottom: '4px' }}>
//                   Analysis Complete
//                 </p>
//                 <p style={{ fontSize: '12px', color: '#166534' }}>{ecgAnalysis.summary}</p>
//               </div>

//               {[
//                 { label: 'Rhythm',      value: ecgAnalysis.rhythm     },
//                 { label: 'Confidence',  value: `${ecgAnalysis.confidence}%` },
//               ].map(({ label, value }) => (
//                 <div key={label} style={{
//                   display: 'flex', justifyContent: 'space-between',
//                   padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px',
//                 }}>
//                   <span style={{ fontSize: '12px', color: '#64748b' }}>{label}</span>
//                   <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{value}</span>
//                 </div>
//               ))}

//               {ecgAnalysis.conditions?.map((c, i) => (
//                 <div key={i} style={{
//                   display: 'flex', alignItems: 'center', gap: '8px',
//                   backgroundColor: '#fff1f2', border: '1px solid #fecaca',
//                   borderRadius: '8px', padding: '8px 12px',
//                 }}>
//                   <AlertTriangle size={13} color="#ef4444" />
//                   <span style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 500 }}>{c}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* How it integrates */}
//       <div style={{
//         backgroundColor: '#ffffff', borderRadius: '16px',
//         padding: '20px 24px', border: '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//       }}>
//         <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' }}>
//           How ECG Analysis Flows into Reports
//         </p>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' }}>
//           {[
//             { step: '1', label: 'Vitals Input',     desc: 'HR, SpO₂, Temp',         color: '#0ea5e9', bg: '#eff6ff' },
//             { step: '2', label: 'AI Prediction',    desc: 'Numerical ML analysis',   color: '#8b5cf6', bg: '#f5f3ff' },
//             { step: '3', label: 'ECG Analysis',     desc: 'Waveform image + Groq',   color: '#10b981', bg: '#f0fdf4' },
//             { step: '4', label: 'Medical Report',   desc: 'Uploaded PDF',            color: '#f59e0b', bg: '#fffbeb' },
//             { step: '5', label: 'Final Comparison', desc: 'All 3 vs uploaded report',color: '#ef4444', bg: '#fff1f2' },
//           ].map(({ step, label, desc, color, bg }, i, arr) => (
//             <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
//               <div style={{
//                 backgroundColor: bg, border: `1px solid ${color}33`,
//                 borderRadius: '12px', padding: '12px 16px', textAlign: 'center', minWidth: '130px',
//               }}>
//                 <div style={{
//                   width: '24px', height: '24px', borderRadius: '50%',
//                   backgroundColor: color, color: 'white',
//                   fontSize: '11px', fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   margin: '0 auto 6px',
//                 }}>
//                   {step}
//                 </div>
//                 <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{label}</p>
//                 <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{desc}</p>
//               </div>
//               {i < arr.length - 1 && (
//                 <div style={{ width: '24px', height: '2px', backgroundColor: '#e2e8f0', flexShrink: 0 }} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }


//


// import { useRef, useState } from 'react'
// import { useECGStore } from '../../store/ecgStore'
// import { analyzeECGWithHF } from '../../services/groqService'
// import {
//   Upload, Waves, AlertTriangle, CheckCircle,
//   Clock, Info, X, Loader2, Brain,
//   Stethoscope, Lightbulb, FileText, Activity,
// } from 'lucide-react'

// const urgencyConfig = {
//   routine:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: 'Routine'   },
//   urgent:    { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a', label: 'Urgent'    },
//   emergency: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca', label: 'Emergency' },
// }

// const severityConfig = {
//   normal:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
//   warning:  { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a' },
//   critical: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca' },
// }

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload  = () => {
//       // result is "data:image/jpeg;base64,xxxx" — extract only base64 part
//       const base64 = reader.result.split(',')[1]
//       resolve(base64)
//     }
//     reader.onerror = reject
//     reader.readAsDataURL(file)
//   })
// }

// export default function ECGPage() {
//   const fileRef             = useRef()
//   const [dragOver, setDragOver] = useState(false)
//   const [rawFile, setRawFile]   = useState(null)
//   const [error, setError]       = useState(null)

//   const {
//     ecgImage, ecgFileName, ecgAnalysis,
//     isAnalyzing, setECGImage, setECGAnalysis,
//     setAnalyzing, clearECG,
//   } = useECGStore()

//   function handleFile(file) {
//     if (!file || !file.type.startsWith('image/')) return
//     setRawFile(file)
//     setError(null)
//     setECGImage(URL.createObjectURL(file), file.name)
//   }

//   function handleFileInput(e) { handleFile(e.target.files[0]) }

//   function handleDrop(e) {
//     e.preventDefault()
//     setDragOver(false)
//     handleFile(e.dataTransfer.files[0])
//   }

//   async function handleAnalyze() {
//     if (!rawFile) return
//     setAnalyzing(true)
//     setError(null)
//     try {
//       const base64 = await fileToBase64(rawFile)
//       const result = await analyzeECGWithHF(base64, rawFile.type)

//     //   const result = await analyzeECGImage(base64, rawFile.type)

//       setECGAnalysis(result)
//     } catch (err) {
//       setError(err.message || 'ECG analysis failed. Check your Groq API key.')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const urgency  = ecgAnalysis?.urgency  ? urgencyConfig[ecgAnalysis.urgency]   || urgencyConfig.routine   : null
//   const severity = ecgAnalysis?.severity ? severityConfig[ecgAnalysis.severity] || severityConfig.normal   : null

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

//       {/* Header */}
//       <div>
//         <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
//           ECG Analysis
//         </h2>
//         <p style={{ fontSize: '13px', color: '#64748b' }}>
//           Upload an ECG waveform image for AI-powered cardiologist-level analysis
//         </p>
//       </div>

//       {/* Upload + Result row */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>

//         {/* ── Upload Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <Waves size={16} color="#0ea5e9" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Upload ECG Image</p>
//           </div>

//           {/* Drop zone */}
//           {!ecgImage ? (
//             <div
//               onClick={() => fileRef.current.click()}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true)  }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={handleDrop}
//               style={{
//                 border: `2px dashed ${dragOver ? '#0ea5e9' : '#bfdbfe'}`,
//                 borderRadius: '12px', padding: '40px 20px',
//                 backgroundColor: dragOver ? '#e0f2fe' : '#f0f9ff',
//                 cursor: 'pointer', display: 'flex',
//                 flexDirection: 'column', alignItems: 'center',
//                 gap: '12px', transition: 'all 0.15s',
//               }}
//             >
//               <div style={{
//                 width: '52px', height: '52px', backgroundColor: '#dbeafe',
//                 borderRadius: '14px', display: 'flex',
//                 alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Upload size={22} color="#0ea5e9" />
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Click or drag & drop
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>JPG, PNG, WEBP supported</p>
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//               {/* Image preview */}
//               <div style={{
//                 position: 'relative', borderRadius: '12px',
//                 overflow: 'hidden', border: '1px solid #e2e8f0',
//                 backgroundColor: '#000',
//               }}>
//                 <img
//                   src={ecgImage}
//                   alt="ECG waveform"
//                   style={{ width: '100%', display: 'block', maxHeight: '200px', objectFit: 'contain' }}
//                 />
//                 <button
//                   onClick={() => { clearECG(); setRawFile(null); setError(null) }}
//                   style={{
//                     position: 'absolute', top: '8px', right: '8px',
//                     backgroundColor: 'rgba(0,0,0,0.6)', border: 'none',
//                     borderRadius: '6px', padding: '4px', cursor: 'pointer',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}
//                 >
//                   <X size={14} color="white" />
//                 </button>
//               </div>

//               {/* Filename */}
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: '8px',
//                 backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
//                 borderRadius: '8px', padding: '8px 12px',
//               }}>
//                 <CheckCircle size={13} color="#22c55e" />
//                 <p style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>{ecgFileName}</p>
//               </div>

//               {/* Analyze button */}
//               <button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing}
//                 style={{
//                   width: '100%',
//                   background: isAnalyzing
//                     ? '#e2e8f0'
//                     : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//                   color: isAnalyzing ? '#94a3b8' : 'white',
//                   border: 'none', borderRadius: '10px',
//                   padding: '12px', fontSize: '13px', fontWeight: 600,
//                   cursor: isAnalyzing ? 'not-allowed' : 'pointer',
//                   display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', gap: '8px',
//                   transition: 'all 0.2s',
//                 }}
//               >
//                 {isAnalyzing
//                   ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing ECG...</>
//                   : <><Brain size={14} /> Analyze ECG</>
//                 }
//               </button>
//             </div>
//           )}

//           <input
//             ref={fileRef} type="file" accept="image/*"
//             style={{ display: 'none' }} onChange={handleFileInput}
//           />

//           {/* Info */}
//           <div style={{
//             display: 'flex', alignItems: 'flex-start', gap: '8px',
//             backgroundColor: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
//           }}>
//             <Info size={13} color="#94a3b8" style={{ marginTop: '1px', flexShrink: 0 }} />
//             <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
//               Powered by Groq Vision (Llama 4 Scout). Upload any standard ECG strip
//               image — 12-lead or single-lead. Analysis takes 2–4 seconds.
//             </p>
//           </div>
//         </div>

//         {/* ── Result Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>

//           {/* Result header */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <FileText size={16} color="#8b5cf6" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
//               Cardiologist Report
//             </p>
//             {urgency && (
//               <span style={{
//                 marginLeft: 'auto',
//                 backgroundColor: urgency.bg, color: urgency.color,
//                 border: `1px solid ${urgency.border}`,
//                 borderRadius: '999px', padding: '3px 12px',
//                 fontSize: '11px', fontWeight: 700,
//               }}>
//                 ● {urgency.label}
//               </span>
//             )}
//           </div>

//           {/* Empty state */}
//           {!ecgImage && !isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', textAlign: 'center', gap: '10px',
//             }}>
//               <Activity size={32} color="#e2e8f0" />
//               <p style={{ fontSize: '13px', color: '#94a3b8' }}>No ECG uploaded yet</p>
//               <p style={{ fontSize: '11px', color: '#cbd5e1' }}>
//                 Upload an image and click Analyze to get a full cardiologist report
//               </p>
//             </div>
//           )}

//           {/* Uploaded, not analyzed */}
//           {ecgImage && !ecgAnalysis && !isAnalyzing && !error && (
//             <div style={{
//               backgroundColor: '#fffbeb', border: '1px solid #fef08a',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'flex-start', gap: '10px',
//             }}>
//               <Clock size={15} color="#eab308" style={{ marginTop: '1px', flexShrink: 0 }} />
//               <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
//                 ECG image ready. Click <strong>Analyze ECG</strong> to generate
//                 a full cardiologist-level report.
//               </p>
//             </div>
//           )}

//           {/* Analyzing loader */}
//           {isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', gap: '14px',
//             }}>
//               <Loader2 size={28} color="#0ea5e9" style={{ animation: 'spin 1s linear infinite' }} />
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Analyzing ECG waveform...
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>
//                   Groq Vision is reviewing the image
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div style={{
//               backgroundColor: '#fff1f2', border: '1px solid #fecaca',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'center', gap: '10px',
//             }}>
//               <AlertTriangle size={15} color="#ef4444" />
//               <p style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</p>
//             </div>
//           )}

//           {/* ── Report Sections ── */}
//           {ecgAnalysis && !error && (

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>

//               {/* Rhythm pill */}
//               {ecgAnalysis.rhythm && (
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: '10px',
//                   backgroundColor: severity?.bg || '#f8fafc',
//                   border: `1px solid ${severity?.border || '#e2e8f0'}`,
//                   borderRadius: '10px', padding: '12px 16px',
//                 }}>
//                   <Activity size={16} color={severity?.color || '#64748b'} />
//                   <div>
//                     <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600,
//                       textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
//                       Rhythm
//                     </p>
//                     <p style={{ fontSize: '14px', fontWeight: 700, color: severity?.color || '#0f172a' }}>
//                       {ecgAnalysis.rhythm}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Findings */}
//               {ecgAnalysis.findings && (
//                 <ReportSection
//                   icon={<Waves size={14} color="#0ea5e9" />}
//                   title="Findings"
//                   text={ecgAnalysis.findings}
//                   bg="#f0f9ff"
//                   border="#bae6fd"
//                   titleColor="#0c4a6e"
//                   textColor="#0369a1"
//                 />
//               )}

//               {/* Interpretation */}
//               {ecgAnalysis.interpretation && (
//                 <ReportSection
//                   icon={<Stethoscope size={14} color="#8b5cf6" />}
//                   title="Interpretation"
//                   text={ecgAnalysis.interpretation}
//                   bg="#f5f3ff"
//                   border="#ddd6fe"
//                   titleColor="#3b0764"
//                   textColor="#6d28d9"
//                 />
//               )}

//               {/* Recommendation */}
//               {ecgAnalysis.recommendation && (
//                 <ReportSection
//                   icon={<Lightbulb size={14} color="#22c55e" />}
//                   title="Recommendation"
//                   text={ecgAnalysis.recommendation}
//                   bg="#f0fdf4"
//                   border="#bbf7d0"
//                   titleColor="#14532d"
//                   textColor="#15803d"
//                 />
//               )}

//             </div>
//           )}
//         </div>
//       </div>

//       {/* Flow diagram */}
//       <div style={{
//         backgroundColor: '#ffffff', borderRadius: '16px',
//         padding: '20px 24px', border: '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//       }}>
//         <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' }}>
//           How ECG Analysis Flows into Reports
//         </p>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' }}>
//           {[
//             { step: '1', label: 'Vitals Input',     desc: 'HR, SpO₂, Temp',           color: '#0ea5e9', bg: '#eff6ff' },
//             { step: '2', label: 'AI Prediction',    desc: 'Groq LLM analysis',         color: '#8b5cf6', bg: '#f5f3ff' },
//             { step: '3', label: 'ECG Analysis',     desc: 'Groq Vision report',        color: '#10b981', bg: '#f0fdf4' },
//             { step: '4', label: 'Medical Report',   desc: 'Uploaded PDF',              color: '#f59e0b', bg: '#fffbeb' },
//             { step: '5', label: 'Final Comparison', desc: 'All 3 vs uploaded report',  color: '#ef4444', bg: '#fff1f2' },
//           ].map(({ step, label, desc, color, bg }, i, arr) => (
//             <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
//               <div style={{
//                 backgroundColor: bg, border: `1px solid ${color}33`,
//                 borderRadius: '12px', padding: '12px 16px',
//                 textAlign: 'center', minWidth: '120px',
//               }}>
//                 <div style={{
//                   width: '24px', height: '24px', borderRadius: '50%',
//                   backgroundColor: color, color: 'white',
//                   fontSize: '11px', fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   margin: '0 auto 6px',
//                 }}>
//                   {step}
//                 </div>
//                 <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{label}</p>
//                 <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{desc}</p>
//               </div>
//               {i < arr.length - 1 && (
//                 <div style={{ width: '24px', height: '2px', backgroundColor: '#e2e8f0', flexShrink: 0 }} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// // ── Reusable report section card ─────────────────────────
// function ReportSection({ icon, title, text, bg, border, titleColor, textColor }) {
//   return (
//     <div style={{
//       backgroundColor: bg, border: `1px solid ${border}`,
//       borderRadius: '10px', padding: '14px 16px',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
//         {icon}
//         <p style={{
//           fontSize: '11px', fontWeight: 700, color: titleColor,
//           textTransform: 'uppercase', letterSpacing: '0.06em',
//         }}>
//           {title}
//         </p>
//       </div>
//       <p style={{ fontSize: '13px', color: textColor, lineHeight: 1.75 }}>{text}</p>
//     </div>
//   )
// }

//


// import { useRef, useState } from 'react'
// import { useECGStore } from '../../store/ecgStore'
// import { analyzeECGWithHF } from '../../services/groqService'
// import {
//   Upload, Waves, AlertTriangle, CheckCircle,
//   Clock, Info, X, Loader2, Brain,
//   Stethoscope, Lightbulb, FileText, Activity,
// } from 'lucide-react'

// const urgencyConfig = {
//   routine:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: 'Routine'   },
//   urgent:    { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a', label: 'Urgent'    },
//   emergency: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca', label: 'Emergency' },
// }

// const severityConfig = {
//   normal:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
//   warning:  { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a' },
//   critical: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca' },
// }

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader    = new FileReader()
//     reader.onload   = () => resolve(reader.result.split(',')[1])
//     reader.onerror  = reject
//     reader.readAsDataURL(file)
//   })
// }

// function ReportSection({ icon, title, text, bg, border, titleColor, textColor }) {
//   return (
//     <div style={{
//       backgroundColor: bg,
//       border: `1px solid ${border}`,
//       borderRadius: '10px',
//       padding: '14px 16px',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
//         {icon}
//         <p style={{
//           fontSize: '11px', fontWeight: 700, color: titleColor,
//           textTransform: 'uppercase', letterSpacing: '0.06em',
//         }}>
//           {title}
//         </p>
//       </div>
//       <p style={{ fontSize: '13px', color: textColor, lineHeight: 1.75 }}>{text}</p>
//     </div>
//   )
// }

// export default function ECGPage() {
//   const fileRef                     = useRef()
//   const [dragOver, setDragOver]     = useState(false)
//   const [rawFile,  setRawFile]      = useState(null)
//   const [error,    setError]        = useState(null)

//   const {
//     ecgImage, ecgFileName, ecgAnalysis,
//     isAnalyzing, setECGImage, setECGAnalysis,
//     setAnalyzing, clearECG,
//   } = useECGStore()

//   function handleFile(file) {
//     if (!file || !file.type.startsWith('image/')) return
//     setRawFile(file)
//     setError(null)
//     setECGImage(URL.createObjectURL(file), file.name)
//   }

//   function handleFileInput(e) { handleFile(e.target.files[0]) }

//   function handleDrop(e) {
//     e.preventDefault()
//     setDragOver(false)
//     handleFile(e.dataTransfer.files[0])
//   }

//   async function handleAnalyze() {
//     if (!rawFile) return
//     setAnalyzing(true)
//     setError(null)
//     try {
//       const base64 = await fileToBase64(rawFile)
//       const result = await analyzeECGWithHF(base64, rawFile.type)
//       setECGAnalysis(result)
//     } catch (err) {
//       setError(err.message || 'ECG analysis failed. Check your API keys.')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const urgency  = ecgAnalysis?.urgency  ? (urgencyConfig[ecgAnalysis.urgency]   || urgencyConfig.routine)  : null
//   const severity = ecgAnalysis?.severity ? (severityConfig[ecgAnalysis.severity] || severityConfig.normal)  : null

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

//       {/* ── Header ── */}
//       <div>
//         <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
//           ECG Analysis
//         </h2>
//         <p style={{ fontSize: '13px', color: '#64748b' }}>
//           Upload an ECG waveform image — specialized ML classification + Groq clinical report
//         </p>
//       </div>

//       {/* ── Main Row ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>

//         {/* ── Left: Upload Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <Waves size={16} color="#0ea5e9" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Upload ECG Image</p>
//           </div>

//           {/* Drop zone */}
//           {!ecgImage ? (
//             <div
//               onClick={() => fileRef.current.click()}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true)  }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={handleDrop}
//               style={{
//                 border: `2px dashed ${dragOver ? '#0ea5e9' : '#bfdbfe'}`,
//                 borderRadius: '12px', padding: '40px 20px',
//                 backgroundColor: dragOver ? '#e0f2fe' : '#f0f9ff',
//                 cursor: 'pointer', display: 'flex',
//                 flexDirection: 'column', alignItems: 'center',
//                 gap: '12px', transition: 'all 0.15s',
//               }}
//             >
//               <div style={{
//                 width: '52px', height: '52px', backgroundColor: '#dbeafe',
//                 borderRadius: '14px', display: 'flex',
//                 alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Upload size={22} color="#0ea5e9" />
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Click or drag & drop
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>JPG, PNG, WEBP supported</p>
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//               {/* Image preview */}
//               <div style={{
//                 position: 'relative', borderRadius: '12px',
//                 overflow: 'hidden', border: '1px solid #e2e8f0',
//                 backgroundColor: '#000',
//               }}>
//                 <img
//                   src={ecgImage}
//                   alt="ECG waveform"
//                   style={{
//                     width: '100%', display: 'block',
//                     maxHeight: '200px', objectFit: 'contain',
//                   }}
//                 />
//                 <button
//                   onClick={() => { clearECG(); setRawFile(null); setError(null) }}
//                   style={{
//                     position: 'absolute', top: '8px', right: '8px',
//                     backgroundColor: 'rgba(0,0,0,0.6)', border: 'none',
//                     borderRadius: '6px', padding: '4px', cursor: 'pointer',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}
//                 >
//                   <X size={14} color="white" />
//                 </button>
//               </div>

//               {/* Filename */}
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: '8px',
//                 backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
//                 borderRadius: '8px', padding: '8px 12px',
//               }}>
//                 <CheckCircle size={13} color="#22c55e" />
//                 <p style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>
//                   {ecgFileName}
//                 </p>
//               </div>

//               {/* Analyze button */}
//               <button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing}
//                 style={{
//                   width: '100%',
//                   background: isAnalyzing
//                     ? '#e2e8f0'
//                     : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//                   color: isAnalyzing ? '#94a3b8' : 'white',
//                   border: 'none', borderRadius: '10px',
//                   padding: '12px', fontSize: '13px', fontWeight: 600,
//                   cursor: isAnalyzing ? 'not-allowed' : 'pointer',
//                   display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', gap: '8px',
//                   transition: 'all 0.2s',
//                 }}
//               >
//                 {isAnalyzing
//                   ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing ECG...</>
//                   : <><Brain size={14} /> Analyze ECG</>
//                 }
//               </button>
//             </div>
//           )}

//           <input
//             ref={fileRef} type="file" accept="image/*"
//             style={{ display: 'none' }} onChange={handleFileInput}
//           />

//           {/* Info note */}
//           <div style={{
//             display: 'flex', alignItems: 'flex-start', gap: '8px',
//             backgroundColor: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
//           }}>
//             <Info size={13} color="#94a3b8" style={{ marginTop: '1px', flexShrink: 0 }} />
//             <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
//               Uses HuggingFace ECG-specialized ML model for classification,
//               then Groq LLM for clinical report generation.
//               Falls back to Groq Vision if ML model is unavailable.
//             </p>
//           </div>
//         </div>

//         {/* ── Right: Result Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>

//           {/* Result header */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <FileText size={16} color="#8b5cf6" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
//               Cardiologist Report
//             </p>
//             {urgency && (
//               <span style={{
//                 marginLeft: 'auto',
//                 backgroundColor: urgency.bg, color: urgency.color,
//                 border: `1px solid ${urgency.border}`,
//                 borderRadius: '999px', padding: '3px 12px',
//                 fontSize: '11px', fontWeight: 700,
//               }}>
//                 ● {urgency.label}
//               </span>
//             )}
//           </div>

//           {/* Empty state */}
//           {!ecgImage && !isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', textAlign: 'center', gap: '10px',
//             }}>
//               <Activity size={32} color="#e2e8f0" />
//               <p style={{ fontSize: '13px', color: '#94a3b8' }}>No ECG uploaded yet</p>
//               <p style={{ fontSize: '11px', color: '#cbd5e1' }}>
//                 Upload an image and click Analyze to get a full cardiologist report
//               </p>
//             </div>
//           )}

//           {/* Uploaded, not yet analyzed */}
//           {ecgImage && !ecgAnalysis && !isAnalyzing && !error && (
//             <div style={{
//               backgroundColor: '#fffbeb', border: '1px solid #fef08a',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'flex-start', gap: '10px',
//             }}>
//               <Clock size={15} color="#eab308" style={{ marginTop: '1px', flexShrink: 0 }} />
//               <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
//                 ECG image ready. Click <strong>Analyze ECG</strong> to run
//                 ML classification and generate a clinical report.
//               </p>
//             </div>
//           )}

//           {/* Analyzing loader */}
//           {isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', gap: '14px',
//             }}>
//               <Loader2
//                 size={28} color="#0ea5e9"
//                 style={{ animation: 'spin 1s linear infinite' }}
//               />
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Analyzing ECG waveform...
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>
//                   ML classification → Groq clinical report
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div style={{
//               backgroundColor: '#fff1f2', border: '1px solid #fecaca',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'center', gap: '10px',
//             }}>
//               <AlertTriangle size={15} color="#ef4444" />
//               <p style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</p>
//             </div>
//           )}

//           {/* ── Full Report ── */}
//           {ecgAnalysis && !error && (
//             <div style={{
//               display: 'flex', flexDirection: 'column', gap: '12px',
//               maxHeight: 'calc(100vh - 320px)', overflowY: 'auto',
//               paddingRight: '4px',
//             }}>

//               {/* HF ML Classification Confidence Bars */}
//               {ecgAnalysis.hfClassification && (
//                 <div style={{
//                   backgroundColor: '#f8fafc', borderRadius: '10px',
//                   padding: '14px 16px', border: '1px solid #e2e8f0',
//                 }}>
//                   <div style={{
//                     display: 'flex', alignItems: 'center',
//                     justifyContent: 'space-between', marginBottom: '12px',
//                   }}>
//                     <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
//                       ML Classification
//                     </p>
//                     <span style={{
//                       fontSize: '10px', color: '#94a3b8',
//                       backgroundColor: '#e2e8f0', borderRadius: '999px',
//                       padding: '2px 8px',
//                     }}>
//                       {ecgAnalysis.usedModel?.split('/').pop() || 'HuggingFace'}
//                     </span>
//                   </div>

//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                     {ecgAnalysis.hfClassification.map((c, i) => (
//                       <div key={i}>
//                         <div style={{
//                           display: 'flex', justifyContent: 'space-between',
//                           marginBottom: '3px',
//                         }}>
//                           <span style={{
//                             fontSize: '12px',
//                             fontWeight: i === 0 ? 700 : 400,
//                             color: i === 0 ? '#0f172a' : '#64748b',
//                           }}>
//                             {c.label}
//                             {i === 0 && (
//                               <span style={{
//                                 marginLeft: '6px',
//                                 backgroundColor: severity?.bg || '#eff6ff',
//                                 color: severity?.color || '#0ea5e9',
//                                 borderRadius: '999px',
//                                 padding: '1px 8px',
//                                 fontSize: '10px', fontWeight: 700,
//                               }}>
//                                 Top
//                               </span>
//                             )}
//                           </span>
//                           <span style={{
//                             fontSize: '11px',
//                             fontWeight: i === 0 ? 700 : 400,
//                             color: i === 0 ? (severity?.color || '#0ea5e9') : '#94a3b8',
//                           }}>
//                             {(c.score * 100).toFixed(1)}%
//                           </span>
//                         </div>
//                         <div style={{
//                           height: '5px', backgroundColor: '#e2e8f0',
//                           borderRadius: '999px', overflow: 'hidden',
//                         }}>
//                           <div style={{
//                             width: `${c.score * 100}%`,
//                             height: '100%',
//                             backgroundColor: i === 0
//                               ? (severity?.color || '#0ea5e9')
//                               : '#cbd5e1',
//                             borderRadius: '999px',
//                             transition: 'width 0.6s ease',
//                           }} />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Fallback badge if HF failed */}
//               {!ecgAnalysis.hfClassification && (
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: '8px',
//                   backgroundColor: '#f0f9ff', border: '1px solid #bae6fd',
//                   borderRadius: '8px', padding: '8px 12px',
//                 }}>
//                   <Info size={13} color="#0ea5e9" />
//                   <p style={{ fontSize: '11px', color: '#0369a1' }}>
//                     ML model unavailable — analyzed using Groq Vision directly.
//                   </p>
//                 </div>
//               )}

              

//               {/* Rhythm */}
//               {ecgAnalysis.rhythm && (
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: '10px',
//                   backgroundColor: severity?.bg || '#f8fafc',
//                   border: `1px solid ${severity?.border || '#e2e8f0'}`,
//                   borderRadius: '10px', padding: '12px 16px',
//                 }}>
//                   <Activity size={16} color={severity?.color || '#64748b'} />
//                   <div>
//                     <p style={{
//                       fontSize: '10px', color: '#94a3b8', fontWeight: 600,
//                       textTransform: 'uppercase', letterSpacing: '0.06em',
//                       marginBottom: '2px',
//                     }}>
//                       Rhythm
//                     </p>
//                     <p style={{
//                       fontSize: '14px', fontWeight: 700,
//                       color: severity?.color || '#0f172a',
//                     }}>
//                       {ecgAnalysis.rhythm}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Findings */}
//               {ecgAnalysis.findings && (
//                 <ReportSection
//                   icon={<Waves size={14} color="#0ea5e9" />}
//                   title="Findings"
//                   text={ecgAnalysis.findings}
//                   bg="#f0f9ff"
//                   border="#bae6fd"
//                   titleColor="#0c4a6e"
//                   textColor="#0369a1"
//                 />
//               )}

//               {/* Interpretation */}
//               {ecgAnalysis.interpretation && (
//                 <ReportSection
//                   icon={<Stethoscope size={14} color="#8b5cf6" />}
//                   title="Interpretation"
//                   text={ecgAnalysis.interpretation}
//                   bg="#f5f3ff"
//                   border="#ddd6fe"
//                   titleColor="#3b0764"
//                   textColor="#6d28d9"
//                 />
//               )}

//               {/* Recommendation */}
//               {ecgAnalysis.recommendation && (
//                 <ReportSection
//                   icon={<Lightbulb size={14} color="#22c55e" />}
//                   title="Recommendation"
//                   text={ecgAnalysis.recommendation}
//                   bg="#f0fdf4"
//                   border="#bbf7d0"
//                   titleColor="#14532d"
//                   textColor="#15803d"
//                 />
//               )}

//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Flow Diagram ── */}
//       <div style={{
//         backgroundColor: '#ffffff', borderRadius: '16px',
//         padding: '20px 24px', border: '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//       }}>
//         <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' }}>
//           How ECG Analysis Flows into Reports
//         </p>
//         <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//           {[
//             { step: '1', label: 'Vitals Input',     desc: 'HR, SpO₂, Temp',          color: '#0ea5e9', bg: '#eff6ff' },
//             { step: '2', label: 'AI Prediction',    desc: 'Groq LLM analysis',        color: '#8b5cf6', bg: '#f5f3ff' },
//             { step: '3', label: 'ECG Analysis',     desc: 'ML + Groq Vision',         color: '#10b981', bg: '#f0fdf4' },
//             { step: '4', label: 'Medical Report',   desc: 'Uploaded PDF',             color: '#f59e0b', bg: '#fffbeb' },
//             { step: '5', label: 'Final Comparison', desc: 'All 3 vs uploaded report', color: '#ef4444', bg: '#fff1f2' },
//           ].map(({ step, label, desc, color, bg }, i, arr) => (
//             <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
//               <div style={{
//                 backgroundColor: bg,
//                 border: `1px solid ${color}33`,
//                 borderRadius: '12px', padding: '12px 16px',
//                 textAlign: 'center', minWidth: '120px',
//               }}>
//                 <div style={{
//                   width: '24px', height: '24px', borderRadius: '50%',
//                   backgroundColor: color, color: 'white',
//                   fontSize: '11px', fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   margin: '0 auto 6px',
//                 }}>
//                   {step}
//                 </div>
//                 <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{label}</p>
//                 <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{desc}</p>
//               </div>
//               {i < arr.length - 1 && (
//                 <div style={{
//                   width: '24px', height: '2px',
//                   backgroundColor: '#e2e8f0', flexShrink: 0,
//                 }} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// import { useRef, useState } from 'react'
// import { useECGStore } from '../../store/ecgStore'
// import { analyzeECGWithHF } from '../../services/groqService'
// import {
//   Upload, Waves, AlertTriangle, CheckCircle,
//   Clock, Info, X, Loader2, Brain,
//   Stethoscope, Lightbulb, FileText, Activity,
// } from 'lucide-react'

// const urgencyConfig = {
//   routine:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: 'Routine'   },
//   urgent:    { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a', label: 'Urgent'    },
//   emergency: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca', label: 'Emergency' },
// }

// const severityConfig = {
//   normal:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
//   warning:  { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a' },
//   critical: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca' },
// }

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader    = new FileReader()
//     reader.onload   = () => resolve(reader.result.split(',')[1])
//     reader.onerror  = reject
//     reader.readAsDataURL(file)
//   })
// }

// function ReportSection({ icon, title, text, bg, border, titleColor, textColor }) {
//   return (
//     <div style={{
//       backgroundColor: bg,
//       border: `1px solid ${border}`,
//       borderRadius: '10px',
//       padding: '14px 16px',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
//         {icon}
//         <p style={{
//           fontSize: '11px', fontWeight: 700, color: titleColor,
//           textTransform: 'uppercase', letterSpacing: '0.06em',
//         }}>
//           {title}
//         </p>
//       </div>
//       <p style={{ fontSize: '13px', color: textColor, lineHeight: 1.75 }}>{text}</p>
//     </div>
//   )
// }

// export default function ECGPage() {
//   const fileRef                     = useRef()
//   const [dragOver, setDragOver]     = useState(false)
//   const [rawFile,  setRawFile]      = useState(null)
//   const [error,    setError]        = useState(null)

//   const {
//     ecgImage, ecgFileName, ecgAnalysis,
//     isAnalyzing, setECGImage, setECGAnalysis,
//     setAnalyzing, clearECG,
//   } = useECGStore()

//   function handleFile(file) {
//     if (!file || !file.type.startsWith('image/')) return
//     setRawFile(file)
//     setError(null)
//     setECGImage(URL.createObjectURL(file), file.name)
//   }

//   function handleFileInput(e) { handleFile(e.target.files[0]) }

//   function handleDrop(e) {
//     e.preventDefault()
//     setDragOver(false)
//     handleFile(e.dataTransfer.files[0])
//   }

//   async function handleAnalyze() {
//     if (!rawFile) return
//     setAnalyzing(true)
//     setError(null)
//     try {
//       const base64 = await fileToBase64(rawFile)
//       const result = await analyzeECGWithHF(base64, rawFile.type)
//       setECGAnalysis(result)
//     } catch (err) {
//       setError(err.message || 'ECG analysis failed. Check your API keys.')
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const urgency  = ecgAnalysis?.urgency  ? (urgencyConfig[ecgAnalysis.urgency]   || urgencyConfig.routine)  : null
//   const severity = ecgAnalysis?.severity ? (severityConfig[ecgAnalysis.severity] || severityConfig.normal)  : null

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

//       {/* ── Header ── */}
//       <div>
//         <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
//           ECG Analysis
//         </h2>
//         <p style={{ fontSize: '13px', color: '#64748b' }}>
//           Upload an ECG waveform image — specialized ML classification + Groq clinical report
//         </p>
//       </div>

//       {/* ── Main Row ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>

//         {/* ── Left: Upload Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <Waves size={16} color="#0ea5e9" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Upload ECG Image</p>
//           </div>

//           {/* Drop zone */}
//           {!ecgImage ? (
//             <div
//               onClick={() => fileRef.current.click()}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true)  }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={handleDrop}
//               style={{
//                 border: `2px dashed ${dragOver ? '#0ea5e9' : '#bfdbfe'}`,
//                 borderRadius: '12px', padding: '40px 20px',
//                 backgroundColor: dragOver ? '#e0f2fe' : '#f0f9ff',
//                 cursor: 'pointer', display: 'flex',
//                 flexDirection: 'column', alignItems: 'center',
//                 gap: '12px', transition: 'all 0.15s',
//               }}
//             >
//               <div style={{
//                 width: '52px', height: '52px', backgroundColor: '#dbeafe',
//                 borderRadius: '14px', display: 'flex',
//                 alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Upload size={22} color="#0ea5e9" />
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Click or drag & drop
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>JPG, PNG, WEBP supported</p>
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//               {/* Image preview */}
//               <div style={{
//                 position: 'relative', borderRadius: '12px',
//                 overflow: 'hidden', border: '1px solid #e2e8f0',
//                 backgroundColor: '#000',
//               }}>
//                 <img
//                   src={ecgImage}
//                   alt="ECG waveform"
//                   style={{
//                     width: '100%', display: 'block',
//                     maxHeight: '200px', objectFit: 'contain',
//                   }}
//                 />
//                 <button
//                   onClick={() => { clearECG(); setRawFile(null); setError(null) }}
//                   style={{
//                     position: 'absolute', top: '8px', right: '8px',
//                     backgroundColor: 'rgba(0,0,0,0.6)', border: 'none',
//                     borderRadius: '6px', padding: '4px', cursor: 'pointer',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   }}
//                 >
//                   <X size={14} color="white" />
//                 </button>
//               </div>

//               {/* Filename */}
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: '8px',
//                 backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
//                 borderRadius: '8px', padding: '8px 12px',
//               }}>
//                 <CheckCircle size={13} color="#22c55e" />
//                 <p style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>
//                   {ecgFileName}
//                 </p>
//               </div>

//               {/* Analyze button */}
//               <button
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing}
//                 style={{
//                   width: '100%',
//                   background: isAnalyzing
//                     ? '#e2e8f0'
//                     : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//                   color: isAnalyzing ? '#94a3b8' : 'white',
//                   border: 'none', borderRadius: '10px',
//                   padding: '12px', fontSize: '13px', fontWeight: 600,
//                   cursor: isAnalyzing ? 'not-allowed' : 'pointer',
//                   display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', gap: '8px',
//                   transition: 'all 0.2s',
//                 }}
//               >
//                 {isAnalyzing
//                   ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing ECG...</>
//                   : <><Brain size={14} /> Analyze ECG</>
//                 }
//               </button>
//             </div>
//           )}

//           <input
//             ref={fileRef} type="file" accept="image/*"
//             style={{ display: 'none' }} onChange={handleFileInput}
//           />

//           {/* Info note */}
//           <div style={{
//             display: 'flex', alignItems: 'flex-start', gap: '8px',
//             backgroundColor: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
//           }}>
//             <Info size={13} color="#94a3b8" style={{ marginTop: '1px', flexShrink: 0 }} />
//             <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
//               Uses HuggingFace ECG-specialized ML model for classification,
//               then Groq LLM for clinical report generation.
//               Falls back to Groq Vision if ML model is unavailable.
//             </p>
//           </div>
//         </div>

//         {/* ── Right: Result Panel ── */}
//         <div style={{
//           backgroundColor: '#ffffff', borderRadius: '16px',
//           padding: '24px', border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//           display: 'flex', flexDirection: 'column', gap: '14px',
//         }}>

//           {/* Result header */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <FileText size={16} color="#8b5cf6" />
//             <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
//               Cardiologist Report
//             </p>
//             {urgency && (
//               <span style={{
//                 marginLeft: 'auto',
//                 backgroundColor: urgency.bg, color: urgency.color,
//                 border: `1px solid ${urgency.border}`,
//                 borderRadius: '999px', padding: '3px 12px',
//                 fontSize: '11px', fontWeight: 700,
//               }}>
//                 ● {urgency.label}
//               </span>
//             )}
//           </div>

//           {/* Empty state */}
//           {!ecgImage && !isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', textAlign: 'center', gap: '10px',
//             }}>
//               <Activity size={32} color="#e2e8f0" />
//               <p style={{ fontSize: '13px', color: '#94a3b8' }}>No ECG uploaded yet</p>
//               <p style={{ fontSize: '11px', color: '#cbd5e1' }}>
//                 Upload an image and click Analyze to get a full cardiologist report
//               </p>
//             </div>
//           )}

//           {/* Uploaded, not yet analyzed */}
//           {ecgImage && !ecgAnalysis && !isAnalyzing && !error && (
//             <div style={{
//               backgroundColor: '#fffbeb', border: '1px solid #fef08a',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'flex-start', gap: '10px',
//             }}>
//               <Clock size={15} color="#eab308" style={{ marginTop: '1px', flexShrink: 0 }} />
//               <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
//                 ECG image ready. Click <strong>Analyze ECG</strong> to run
//                 ML classification and generate a clinical report.
//               </p>
//             </div>
//           )}

//           {/* Analyzing loader */}
//           {isAnalyzing && (
//             <div style={{
//               flex: 1, display: 'flex', flexDirection: 'column',
//               alignItems: 'center', justifyContent: 'center',
//               backgroundColor: '#f8fafc', borderRadius: '12px',
//               padding: '48px', gap: '14px',
//             }}>
//               <Loader2
//                 size={28} color="#0ea5e9"
//                 style={{ animation: 'spin 1s linear infinite' }}
//               />
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//                   Analyzing ECG waveform...
//                 </p>
//                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>
//                   ML classification → Groq clinical report
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div style={{
//               backgroundColor: '#fff1f2', border: '1px solid #fecaca',
//               borderRadius: '10px', padding: '14px 16px',
//               display: 'flex', alignItems: 'center', gap: '10px',
//             }}>
//               <AlertTriangle size={15} color="#ef4444" />
//               <p style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</p>
//             </div>
//           )}

//           {/* ── Full Report ── */}
//           {ecgAnalysis && !error && (
//             <div style={{
//               display: 'flex', flexDirection: 'column', gap: '12px',
//               maxHeight: 'calc(100vh - 320px)', overflowY: 'auto',
//               paddingRight: '4px',
//             }}>

//               {/* HF ML Classification Confidence Bars */}
//               {ecgAnalysis.hfClassification && (
//                 <div style={{
//                   backgroundColor: '#f8fafc', borderRadius: '10px',
//                   padding: '14px 16px', border: '1px solid #e2e8f0',
//                 }}>
//                   <div style={{
//                     display: 'flex', alignItems: 'center',
//                     justifyContent: 'space-between', marginBottom: '12px',
//                   }}>
//                     <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
//                       ML Classification
//                     </p>
//                     <span style={{
//                       fontSize: '10px', color: '#94a3b8',
//                       backgroundColor: '#e2e8f0', borderRadius: '999px',
//                       padding: '2px 8px',
//                     }}>
//                       {ecgAnalysis.usedModel?.split('/').pop() || 'HuggingFace'}
//                     </span>
//                   </div>

//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                     {ecgAnalysis.hfClassification.map((c, i) => (
//                       <div key={i}>
//                         <div style={{
//                           display: 'flex', justifyContent: 'space-between',
//                           marginBottom: '3px',
//                         }}>
//                           <span style={{
//                             fontSize: '12px',
//                             fontWeight: i === 0 ? 700 : 400,
//                             color: i === 0 ? '#0f172a' : '#64748b',
//                           }}>
//                             {c.label}
//                             {i === 0 && (
//                               <span style={{
//                                 marginLeft: '6px',
//                                 backgroundColor: severity?.bg || '#eff6ff',
//                                 color: severity?.color || '#0ea5e9',
//                                 borderRadius: '999px',
//                                 padding: '1px 8px',
//                                 fontSize: '10px', fontWeight: 700,
//                               }}>
//                                 Top
//                               </span>
//                             )}
//                           </span>
//                           <span style={{
//                             fontSize: '11px',
//                             fontWeight: i === 0 ? 700 : 400,
//                             color: i === 0 ? (severity?.color || '#0ea5e9') : '#94a3b8',
//                           }}>
//                             {(c.score * 100).toFixed(1)}%
//                           </span>
//                         </div>
//                         <div style={{
//                           height: '5px', backgroundColor: '#e2e8f0',
//                           borderRadius: '999px', overflow: 'hidden',
//                         }}>
//                           <div style={{
//                             width: `${c.score * 100}%`,
//                             height: '100%',
//                             backgroundColor: i === 0
//                               ? (severity?.color || '#0ea5e9')
//                               : '#cbd5e1',
//                             borderRadius: '999px',
//                             transition: 'width 0.6s ease',
//                           }} />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Fallback badge if HF failed */}
//               {!ecgAnalysis.hfClassification && (
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: '8px',
//                   backgroundColor: '#f0f9ff', border: '1px solid #bae6fd',
//                   borderRadius: '8px', padding: '8px 12px',
//                 }}>
//                   <Info size={13} color="#0ea5e9" />
//                   <p style={{ fontSize: '11px', color: '#0369a1' }}>
//                     ML model unavailable — analyzed using Groq Vision directly.
//                   </p>
//                 </div>
//               )}

//               {/* Gemini Raw Observation — collapsible */}
//               {ecgAnalysis.geminiObservation && (
//                 <details style={{
//                   backgroundColor: '#fafafa',
//                   border: '1px solid #e2e8f0',
//                   borderRadius: '10px',
//                   padding: '12px 16px',
//                 }}>
//                   <summary style={{
//                     fontSize: '12px', fontWeight: 600,
//                     color: '#475569', cursor: 'pointer',
//                     listStyle: 'none', display: 'flex',
//                     alignItems: 'center', gap: '6px',
//                   }}>
//                     <span style={{
//                       width: '18px', height: '18px',
//                       backgroundColor: '#4285f4',
//                       borderRadius: '4px', display: 'inline-flex',
//                       alignItems: 'center', justifyContent: 'center',
//                       fontSize: '10px', color: 'white', fontWeight: 700,
//                       flexShrink: 0,
//                     }}>G</span>
//                     Gemini Vision Observations
//                     <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: '4px' }}>
//                       (click to expand)
//                     </span>
//                   </summary>
//                   <p style={{
//                     fontSize: '12px', color: '#64748b',
//                     lineHeight: 1.7, marginTop: '10px',
//                     whiteSpace: 'pre-wrap',
//                   }}>
//                     {ecgAnalysis.geminiObservation}
//                   </p>
//                 </details>
//               )}

//               {/* Rhythm */}
//               {ecgAnalysis.rhythm && (
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: '10px',
//                   backgroundColor: severity?.bg || '#f8fafc',
//                   border: `1px solid ${severity?.border || '#e2e8f0'}`,
//                   borderRadius: '10px', padding: '12px 16px',
//                 }}>
//                   <Activity size={16} color={severity?.color || '#64748b'} />
//                   <div>
//                     <p style={{
//                       fontSize: '10px', color: '#94a3b8', fontWeight: 600,
//                       textTransform: 'uppercase', letterSpacing: '0.06em',
//                       marginBottom: '2px',
//                     }}>
//                       Rhythm
//                     </p>
//                     <p style={{
//                       fontSize: '14px', fontWeight: 700,
//                       color: severity?.color || '#0f172a',
//                     }}>
//                       {ecgAnalysis.rhythm}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Findings */}
//               {ecgAnalysis.findings && (
//                 <ReportSection
//                   icon={<Waves size={14} color="#0ea5e9" />}
//                   title="Findings"
//                   text={ecgAnalysis.findings}
//                   bg="#f0f9ff"
//                   border="#bae6fd"
//                   titleColor="#0c4a6e"
//                   textColor="#0369a1"
//                 />
//               )}

//               {/* Interpretation */}
//               {ecgAnalysis.interpretation && (
//                 <ReportSection
//                   icon={<Stethoscope size={14} color="#8b5cf6" />}
//                   title="Interpretation"
//                   text={ecgAnalysis.interpretation}
//                   bg="#f5f3ff"
//                   border="#ddd6fe"
//                   titleColor="#3b0764"
//                   textColor="#6d28d9"
//                 />
//               )}

//               {/* Recommendation */}
//               {ecgAnalysis.recommendation && (
//                 <ReportSection
//                   icon={<Lightbulb size={14} color="#22c55e" />}
//                   title="Recommendation"
//                   text={ecgAnalysis.recommendation}
//                   bg="#f0fdf4"
//                   border="#bbf7d0"
//                   titleColor="#14532d"
//                   textColor="#15803d"
//                 />
//               )}

//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Flow Diagram ── */}
//       <div style={{
//         backgroundColor: '#ffffff', borderRadius: '16px',
//         padding: '20px 24px', border: '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//       }}>
//         <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' }}>
//           How ECG Analysis Flows into Reports
//         </p>
//         <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//           {[
//             { step: '1', label: 'Vitals Input',     desc: 'HR, SpO₂, Temp',          color: '#0ea5e9', bg: '#eff6ff' },
//             { step: '2', label: 'AI Prediction',    desc: 'Groq LLM analysis',        color: '#8b5cf6', bg: '#f5f3ff' },
//             { step: '3', label: 'ECG Analysis',     desc: 'ML + Groq Vision',         color: '#10b981', bg: '#f0fdf4' },
//             { step: '4', label: 'Medical Report',   desc: 'Uploaded PDF',             color: '#f59e0b', bg: '#fffbeb' },
//             { step: '5', label: 'Final Comparison', desc: 'All 3 vs uploaded report', color: '#ef4444', bg: '#fff1f2' },
//           ].map(({ step, label, desc, color, bg }, i, arr) => (
//             <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
//               <div style={{
//                 backgroundColor: bg,
//                 border: `1px solid ${color}33`,
//                 borderRadius: '12px', padding: '12px 16px',
//                 textAlign: 'center', minWidth: '120px',
//               }}>
//                 <div style={{
//                   width: '24px', height: '24px', borderRadius: '50%',
//                   backgroundColor: color, color: 'white',
//                   fontSize: '11px', fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   margin: '0 auto 6px',
//                 }}>
//                   {step}
//                 </div>
//                 <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{label}</p>
//                 <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{desc}</p>
//               </div>
//               {i < arr.length - 1 && (
//                 <div style={{
//                   width: '24px', height: '2px',
//                   backgroundColor: '#e2e8f0', flexShrink: 0,
//                 }} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

import { useRef, useState } from 'react'
import { useECGStore } from '../../store/ecgStore'
import { analyzeECGImage } from '../../services/groqService'
import {
  Upload, Waves, AlertTriangle, CheckCircle,
  Clock, Info, X, Loader2, Brain,
  Stethoscope, Lightbulb, FileText, Activity,
} from 'lucide-react'

const urgencyConfig = {
  routine:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: 'Routine'   },
  urgent:    { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a', label: 'Urgent'    },
  emergency: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca', label: 'Emergency' },
}

const severityConfig = {
  normal:   { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
  warning:  { color: '#f59e0b', bg: '#fffbeb', border: '#fef08a' },
  critical: { color: '#ef4444', bg: '#fff1f2', border: '#fecaca' },
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => {
      // result is "data:image/jpeg;base64,xxxx" — extract only base64 part
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ECGPage() {
  const fileRef             = useRef()
  const [dragOver, setDragOver] = useState(false)
  const [rawFile, setRawFile]   = useState(null)
  const [error, setError]       = useState(null)

  const {
    ecgImage, ecgFileName, ecgAnalysis,
    isAnalyzing, setECGImage, setECGAnalysis,
    setAnalyzing, clearECG,
  } = useECGStore()

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setRawFile(file)
    setError(null)
    setECGImage(URL.createObjectURL(file), file.name)
  }

  function handleFileInput(e) { handleFile(e.target.files[0]) }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  async function handleAnalyze() {
    if (!rawFile) return
    setAnalyzing(true)
    setError(null)
    try {
      const base64 = await fileToBase64(rawFile)
      const result = await analyzeECGImage(base64, rawFile.type)
      setECGAnalysis(result)
    } catch (err) {
      setError(err.message || 'ECG analysis failed. Check your Groq API key.')
    } finally {
      setAnalyzing(false)
    }
  }

  const urgency  = ecgAnalysis?.urgency  ? urgencyConfig[ecgAnalysis.urgency]   || urgencyConfig.routine   : null
  const severity = ecgAnalysis?.severity ? severityConfig[ecgAnalysis.severity] || severityConfig.normal   : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          ECG Analysis
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Upload an ECG waveform image for AI-powered cardiologist-level analysis
        </p>
      </div>

      {/* Upload + Result row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>

        {/* ── Upload Panel ── */}
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '16px',
          padding: '24px', border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Waves size={16} color="#0ea5e9" />
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Upload ECG Image</p>
          </div>

          {/* Drop zone */}
          {!ecgImage ? (
            <div
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true)  }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#0ea5e9' : '#bfdbfe'}`,
                borderRadius: '12px', padding: '40px 20px',
                backgroundColor: dragOver ? '#e0f2fe' : '#f0f9ff',
                cursor: 'pointer', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                gap: '12px', transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: '52px', height: '52px', backgroundColor: '#dbeafe',
                borderRadius: '14px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Upload size={22} color="#0ea5e9" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Click or drag & drop
                </p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>JPG, PNG, WEBP supported</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Image preview */}
              <div style={{
                position: 'relative', borderRadius: '12px',
                overflow: 'hidden', border: '1px solid #e2e8f0',
                backgroundColor: '#000',
              }}>
                <img
                  src={ecgImage}
                  alt="ECG waveform"
                  style={{ width: '100%', display: 'block', maxHeight: '200px', objectFit: 'contain' }}
                />
                <button
                  onClick={() => { clearECG(); setRawFile(null); setError(null) }}
                  style={{
                    position: 'absolute', top: '8px', right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.6)', border: 'none',
                    borderRadius: '6px', padding: '4px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={14} color="white" />
                </button>
              </div>

              {/* Filename */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: '8px', padding: '8px 12px',
              }}>
                <CheckCircle size={13} color="#22c55e" />
                <p style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>{ecgFileName}</p>
              </div>

              {/* Analyze button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                style={{
                  width: '100%',
                  background: isAnalyzing
                    ? '#e2e8f0'
                    : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: isAnalyzing ? '#94a3b8' : 'white',
                  border: 'none', borderRadius: '10px',
                  padding: '12px', fontSize: '13px', fontWeight: 600,
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                {isAnalyzing
                  ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing ECG...</>
                  : <><Brain size={14} /> Analyze ECG</>
                }
              </button>
            </div>
          )}

          <input
            ref={fileRef} type="file" accept="image/*"
            style={{ display: 'none' }} onChange={handleFileInput}
          />

          {/* Info */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            backgroundColor: '#f8fafc', borderRadius: '8px', padding: '10px 12px',
          }}>
            <Info size={13} color="#94a3b8" style={{ marginTop: '1px', flexShrink: 0 }} />
            <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
              Powered by Groq Vision (Llama 4 Scout). Upload any standard ECG strip
              image — 12-lead or single-lead. Analysis takes 2–4 seconds.
            </p>
          </div>
        </div>

        {/* ── Result Panel ── */}
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '16px',
          padding: '24px', border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>

          {/* Result header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="#8b5cf6" />
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
              Cardiologist Report
            </p>
            {urgency && (
              <span style={{
                marginLeft: 'auto',
                backgroundColor: urgency.bg, color: urgency.color,
                border: `1px solid ${urgency.border}`,
                borderRadius: '999px', padding: '3px 12px',
                fontSize: '11px', fontWeight: 700,
              }}>
                ● {urgency.label}
              </span>
            )}
          </div>

          {/* Empty state */}
          {!ecgImage && !isAnalyzing && (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#f8fafc', borderRadius: '12px',
              padding: '48px', textAlign: 'center', gap: '10px',
            }}>
              <Activity size={32} color="#e2e8f0" />
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>No ECG uploaded yet</p>
              <p style={{ fontSize: '11px', color: '#cbd5e1' }}>
                Upload an image and click Analyze to get a full cardiologist report
              </p>
            </div>
          )}

          {/* Uploaded, not analyzed */}
          {ecgImage && !ecgAnalysis && !isAnalyzing && !error && (
            <div style={{
              backgroundColor: '#fffbeb', border: '1px solid #fef08a',
              borderRadius: '10px', padding: '14px 16px',
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <Clock size={15} color="#eab308" style={{ marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
                ECG image ready. Click <strong>Analyze ECG</strong> to generate
                a full cardiologist-level report.
              </p>
            </div>
          )}

          {/* Analyzing loader */}
          {isAnalyzing && (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#f8fafc', borderRadius: '12px',
              padding: '48px', gap: '14px',
            }}>
              <Loader2 size={28} color="#0ea5e9" style={{ animation: 'spin 1s linear infinite' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Analyzing ECG waveform...
                </p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Groq Vision is reviewing the image
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: '#fff1f2', border: '1px solid #fecaca',
              borderRadius: '10px', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <AlertTriangle size={15} color="#ef4444" />
              <p style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</p>
            </div>
          )}

          {/* ── Report Sections ── */}
          {ecgAnalysis && !error && (

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>

              {/* Rhythm pill */}
              {ecgAnalysis.rhythm && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  backgroundColor: severity?.bg || '#f8fafc',
                  border: `1px solid ${severity?.border || '#e2e8f0'}`,
                  borderRadius: '10px', padding: '12px 16px',
                }}>
                  <Activity size={16} color={severity?.color || '#64748b'} />
                  <div>
                    <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                      Rhythm
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: severity?.color || '#0f172a' }}>
                      {ecgAnalysis.rhythm}
                    </p>
                  </div>
                </div>
              )}

              {/* Findings */}
              {ecgAnalysis.findings && (
                <ReportSection
                  icon={<Waves size={14} color="#0ea5e9" />}
                  title="Findings"
                  text={ecgAnalysis.findings}
                  bg="#f0f9ff"
                  border="#bae6fd"
                  titleColor="#0c4a6e"
                  textColor="#0369a1"
                />
              )}

              {/* Interpretation */}
              {ecgAnalysis.interpretation && (
                <ReportSection
                  icon={<Stethoscope size={14} color="#8b5cf6" />}
                  title="Interpretation"
                  text={ecgAnalysis.interpretation}
                  bg="#f5f3ff"
                  border="#ddd6fe"
                  titleColor="#3b0764"
                  textColor="#6d28d9"
                />
              )}

              {/* Recommendation */}
              {ecgAnalysis.recommendation && (
                <ReportSection
                  icon={<Lightbulb size={14} color="#22c55e" />}
                  title="Recommendation"
                  text={ecgAnalysis.recommendation}
                  bg="#f0fdf4"
                  border="#bbf7d0"
                  titleColor="#14532d"
                  textColor="#15803d"
                />
              )}

            </div>
          )}
        </div>
      </div>

      {/* Flow diagram */}
      <div style={{
        backgroundColor: '#ffffff', borderRadius: '16px',
        padding: '20px 24px', border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' }}>
          How ECG Analysis Flows into Reports
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' }}>
          {[
            { step: '1', label: 'Vitals Input',     desc: 'HR, SpO₂, Temp',           color: '#0ea5e9', bg: '#eff6ff' },
            { step: '2', label: 'AI Prediction',    desc: 'Groq LLM analysis',         color: '#8b5cf6', bg: '#f5f3ff' },
            { step: '3', label: 'ECG Analysis',     desc: 'Groq Vision report',        color: '#10b981', bg: '#f0fdf4' },
            { step: '4', label: 'Medical Report',   desc: 'Uploaded PDF',              color: '#f59e0b', bg: '#fffbeb' },
            { step: '5', label: 'Final Comparison', desc: 'All 3 vs uploaded report',  color: '#ef4444', bg: '#fff1f2' },
          ].map(({ step, label, desc, color, bg }, i, arr) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                backgroundColor: bg, border: `1px solid ${color}33`,
                borderRadius: '12px', padding: '12px 16px',
                textAlign: 'center', minWidth: '120px',
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: color, color: 'white',
                  fontSize: '11px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 6px',
                }}>
                  {step}
                </div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{label}</p>
                <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: '24px', height: '2px', backgroundColor: '#e2e8f0', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

// ── Reusable report section card ─────────────────────────
function ReportSection({ icon, title, text, bg, border, titleColor, textColor }) {
  return (
    <div style={{
      backgroundColor: bg, border: `1px solid ${border}`,
      borderRadius: '10px', padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        {icon}
        <p style={{
          fontSize: '11px', fontWeight: 700, color: titleColor,
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {title}
        </p>
      </div>
      <p style={{ fontSize: '13px', color: textColor, lineHeight: 1.75 }}>{text}</p>
    </div>
  )
}

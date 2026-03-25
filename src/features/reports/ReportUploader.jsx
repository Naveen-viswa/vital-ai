

// import { useRef, useState, useEffect, useCallback } from 'react'
// import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
// import { useReportStore } from '../../store/reportStore'
// import * as pdfjsLib from 'pdfjs-dist'

// export default function ReportUploader({ onUpload }) {
//   const [dragging, setDragging] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [extracting, setExtracting] = useState(false)
//   const fileRef = useRef()
//   const { setUploadedPDF, analyzeUploadedPDF } = useReportStore()

//   // Set pdfjs worker
//   useEffect(() => {
//     pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
//   }, [])

// //   const handleFile = useCallback(async (file) => {
// //     if (file.type !== 'application/pdf') {
// //       alert('Please select a PDF file')
// //       return
// //     }

// //     console.log('📁 Processing:', file.name)
// //     setUploading(true)
// //     setExtracting(true)
    
// //     try {
// //       const text = await extractPDFText(file)
// //       console.log('✅ Extracted:', text.substring(0, 100) + '...')
      
// //       setUploadedPDF({
// //         name: file.name,
// //         size: (file.size / 1024).toFixed(1) + ' KB',
// //         text: text,
// //         file: file
// //       })
      
// //       // Auto-analyze
// //       setTimeout(() => analyzeUploadedPDF(), 200)
// //       onUpload?.(text)
      
// //     } catch (error) {
// //       console.error('❌ Error:', error)
// //       alert('Failed to process PDF')
// //     } finally {
// //       setExtracting(false)
// //       setUploading(false)
// //     }
// //   }, [setUploadedPDF, analyzeUploadedPDF, onUpload])

// const handleFile = useCallback(async (file) => {
//     if (file.type !== 'application/pdf') {
//       alert('Please select a PDF file')
//       return
//     }
  
//     setUploading(true)
    
//     try {
//       // 🔥 Simple text extraction (works for most PDFs)
//       const text = await new Promise((resolve) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//           // Basic PDF text extraction (no pdfjs)
//           const content = reader.result
//           const textMatch = content.toString().match(/[^\\s]+/g) || []
//           resolve(textMatch.slice(0, 2000).join(' '))
//         }
//         reader.readAsText(file)
//       })
      
//       console.log('✅ Text ready:', text.substring(0, 100))
      
//       setUploadedPDF({
//         name: file.name,
//         size: (file.size / 1024).toFixed(1) + ' KB',
//         text: text,
//         file: file
//       })
      
//       // Trigger analysis
//       setTimeout(() => analyzeUploadedPDF(), 200)
      
//     } catch (error) {
//       console.error('❌ Error:', error)
//       alert('PDF processing failed')
//     } finally {
//       setUploading(false)
//     }
//   }, [])
  

//   async function extractPDFText(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onload = async (e) => {
//         try {
//           const typedArray = new Uint8Array(e.target.result)
          
//           // 🔥 Use CDN worker directly (no version issues)
//           const pdfjs = await import('https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.min.mjs')
//           pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs'
          
//           const pdf = await pdfjs.getDocument(typedArray).promise
//           let fullText = ''
          
//           for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//             const page = await pdf.getPage(pageNum)
//             const textContent = await page.getTextContent()
//             const pageText = textContent.items.map(item => (item.str || '')).join(' ')
//             fullText += pageText + '\n\n'
//           }
          
//           resolve(fullText.slice(0, 15000) || 'No text found')
//         } catch (error) {
//           console.error('PDF.js failed:', error)
//           reject(new Error('PDF text extraction failed'))
//         }
//       }
//       reader.onerror = () => reject(new Error('File read failed'))
//       reader.readAsArrayBuffer(file)
//     })
//   }
  

//   const handleDrop = (e) => {
//     e.preventDefault()
//     setDragging(false)
//     handleFile(e.dataTransfer.files[0])
//   }

//   const handleDragOver = (e) => {
//     e.preventDefault()
//     setDragging(true)
//   }

//   const handleDragLeave = (e) => {
//     e.preventDefault()
//     setDragging(false)
//   }

//   return (
//     <div
//       style={{
//         border: dragging ? '3px dashed #0ea5e9' : '2px dashed #cbd5e1',
//         background: dragging ? '#eff6ff' : '#f8fafc',
//         borderRadius: '16px',
//         padding: '48px 24px',
//         textAlign: 'center',
//         cursor: 'pointer',
//         transition: 'all 0.2s ease',
//         position: 'relative'
//       }}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//       onClick={() => fileRef.current?.click()}
//     >
//       {uploading ? (
//         <>
//           <Loader2 size={48} className="animate-spin mx-auto mb-4" color="#0ea5e9" />
//           <p style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//             {extracting ? '🔍 Extracting text...' : '💾 Saving...'}
//           </p>
//           <p style={{ fontSize: '13px', color: '#64748b' }}>AI analysis starting...</p>
//         </>
//       ) : (
//         <>
//           <div style={{
//             width: '72px', height: '72px', margin: '0 auto 20px',
//             background: '#dbeafe', borderRadius: '20px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center'
//           }}>
//             <Upload size={32} color="#0ea5e9" />
//           </div>
//           <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
//             Drop PDF here or click
//           </h3>
//           <p style={{ fontSize: '14px', color: '#64748b' }}>
//             Medical reports • Discharge summaries • Lab results
//           </p>
//           <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
//             Max 10MB • Auto AI analysis
//           </p>
//         </>
//       )}
      
//       <input
//         ref={fileRef}
//         type="file"
//         accept=".pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
//       />
//     </div>
//   )
// }



///


// import { useRef, useState, useCallback } from 'react'
// import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
// import { useReportStore } from '../../store/reportStore'

// export default function ReportUploader({ onUpload }) {
//   const [uploading, setUploading] = useState(false)
//   const [dragging, setDragging] = useState(false)
//   const fileRef = useRef()
//   const { setUploadedPDF } = useReportStore()

//   const handleFile = useCallback(async (file) => {
//     if (!file || file.type !== 'application/pdf') {
//       alert('Please upload a valid PDF file')
//       return
//     }

//     setUploading(true)

//     // Create a URL for the file so it can be shown
//     const objectUrl = URL.createObjectURL(file)

//     // For now: store minimal info + the file
//     const fileData = {
//       name: file.name,
//       size: (file.size / 1024).toFixed(1) + ' KB',
//       // save reference to the file/Blob URL to show in UI
//       blobUrl: objectUrl,
//       file: file,
//     }

//     setUploadedPDF(fileData)
//     onUpload?.(fileData)

//     setUploading(false)
//   }, [setUploadedPDF, onUpload])

//   // standard drag & drop handlers
//   const handleDrop = (e) => {
//     e.preventDefault()
//     setDragging(false)
//     const file = e.dataTransfer.files[0]
//     if (file) handleFile(file)
//   }

//   const handleDragOver = (e) => {
//     e.preventDefault()
//     setDragging(true)
//   }

//   const handleDragLeave = (e) => {
//     e.preventDefault()
//     setDragging(false)
//   }

//   return (
//     <>
//       {/* Upload box */}
//       <div
//         style={{
//           border: dragging ? '3px dashed #0ea5e9' : '2px dashed #cbd5e1',
//           background: dragging ? '#eff6ff' : '#f8fafc',
//           borderRadius: '16px',
//           padding: '48px 24px',
//           textAlign: 'center',
//           cursor: 'pointer',
//           transition: 'all 0.25s ease',
//         }}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={() => fileRef.current?.click()}
//       >
//         {uploading ? (
//           <>
//             <Loader2 size={48} className="animate-spin mx-auto mb-4" color="#0ea5e9" />
//             <p style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
//               Uploading PDF...
//             </p>
//           </>
//         ) : (
//           <>
//             <div
//               style={{
//                 width: '72px',
//                 height: '72px',
//                 margin: '0 auto 20px',
//                 background: '#dbeafe',
//                 borderRadius: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <Upload size={32} color="#0ea5e9" />
//             </div>
//             <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
//               Drop PDF here or click
//             </h3>
//             <p style={{ fontSize: '14px', color: '#64748b' }}>
//               Medical reports (.pdf) up to 10MB
//             </p>
//           </>
//         )}
//       </div>

//       <input
//         ref={fileRef}
//         type="file"
//         accept=".pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
//       />
//     </>
//   )
// }

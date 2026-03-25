// import { useState, useRef } from 'react'
// import { useVitalsStore } from '../../store/vitalsStore'
// import { parseVitalsFromCSV } from '../../services/vitalsService'
// import Card from '../../components/ui/Card'
// import { Upload } from 'lucide-react'

// const defaultForm = { heartRate: '', spo2: '', temperature: '', ecg: '' }

// export default function VitalsInputForm() {
//   const [form, setForm] = useState(defaultForm)
//   const { appendVital, setVitals } = useVitalsStore()
//   const fileRef = useRef()

//   function handleManualSubmit(e) {
//     e.preventDefault()
//     appendVital({
//       timestamp: new Date().toISOString(),
//       heartRate:   parseFloat(form.heartRate),
//       spo2:        parseFloat(form.spo2),
//       temperature: parseFloat(form.temperature),
//       ecg:         parseFloat(form.ecg),
//     })
//     setForm(defaultForm)
//   }

//   async function handleFileUpload(e) {
//     const file = e.target.files[0]
//     if (!file) return
//     const text = await file.text()
//     const parsed = parseVitalsFromCSV(text)
//     setVitals(parsed)
//   }

//   return (
//     <Card>
//       <p className="text-sm font-semibold text-gray-300 mb-4">Add Vitals</p>
//       <form onSubmit={handleManualSubmit} className="grid grid-cols-4 gap-3 mb-4">
//         {Object.keys(defaultForm).map((key) => (
//           <div key={key}>
//             <label className="text-xs text-gray-500 block mb-1 capitalize">{key}</label>
//             <input
//               type="number"
//               step="any"
//               value={form[key]}
//               onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//               className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500"
//               placeholder="—"
//             />
//           </div>
//         ))}
//         <div className="col-span-4">
//           <button
//             type="submit"
//             className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
//           >
//             Add Entry
//           </button>
//         </div>
//       </form>

//       <div className="border-t border-gray-800 pt-4">
//         <p className="text-xs text-gray-500 mb-2">Or upload a CSV file</p>
//         <button
//           onClick={() => fileRef.current.click()}
//           className="flex items-center gap-2 text-sm text-slate-300 border border-dashed border-slate-500 rounded-lg px-4 py-2 hover:border-rose-500 transition-colors"
//         >
//           <Upload size={14} /> Upload CSV
//         </button>
//         <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
//       </div>
//     </Card>
//   )
// }

import { useState, useRef } from 'react'
import { useVitalsStore } from '../../store/vitalsStore'
import { parseVitalsFromCSV } from '../../services/vitalsService'
import { Upload, PlusCircle } from 'lucide-react'

const defaultForm = { heartRate: '', spo2: '', temperature: '', ecg: '' }

const fields = [
  { key: 'heartRate',   label: 'Heart Rate',   unit: 'bpm', placeholder: '60–100' },
  { key: 'spo2',        label: 'SpO₂',         unit: '%',   placeholder: '95–100' },
  { key: 'temperature', label: 'Temperature',  unit: '°C',  placeholder: '36–37.5' },
  { key: 'ecg',         label: 'ECG',          unit: 'mV',  placeholder: '0.0' },
]

export default function VitalsInputForm() {
  const [form, setForm] = useState(defaultForm)
  const { appendVital, setVitals } = useVitalsStore()
  const fileRef = useRef()

  function handleManualSubmit(e) {
    e.preventDefault()
    appendVital({
      timestamp:   new Date().toISOString(),
      heartRate:   parseFloat(form.heartRate),
      spo2:        parseFloat(form.spo2),
      temperature: parseFloat(form.temperature),
      ecg:         parseFloat(form.ecg),
    })
    setForm(defaultForm)
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const text = await file.text()
    const parsed = parseVitalsFromCSV(text)
    setVitals(parsed)
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '20px' }}>
        Add Vitals Entry
      </p>

      <form onSubmit={handleManualSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {fields.map(({ key, label, unit, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#64748b', display: 'block', marginBottom: '6px' }}>
                {label} <span style={{ color: '#94a3b8' }}>({unit})</span>
              </label>
              <input
                type="number"
                step="any"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <PlusCircle size={14} /> Add Entry
          </button>

          <button
            type="button"
            onClick={() => fileRef.current.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#64748b',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '9px 16px',
              background: '#f8fafc',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <Upload size={14} /> Upload CSV
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
      </form>
    </div>
  )
}

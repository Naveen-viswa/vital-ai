// import { useVitalsStore } from '../../store/vitalsStore'
// import { getVitalStatus } from '../../utils/vitalRanges'
// import Badge from '../../components/ui/Badge'
// import Card from '../../components/ui/Card'

// export default function VitalsDataTable() {
//   const { vitals } = useVitalsStore()
//   if (!vitals.length) return null

//   return (
//     <Card>
//       <p className="text-sm font-semibold text-gray-300 mb-3">Raw Data</p>
//       <div className="overflow-x-auto">
//         <table className="w-full text-xs text-gray-400">
//           <thead>
//             <tr className="text-left border-b border-gray-800">
//               {['Timestamp','Heart Rate','SpO₂','Temp','ECG','Status'].map(h => (
//                 <th key={h} className="pb-2 pr-4 font-medium text-gray-500">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {vitals.map((v, i) => {
//               const status = getVitalStatus('heartRate', v.heartRate)
//               return (
//                 <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/40">
//                   <td className="py-2 pr-4">{new Date(v.timestamp).toLocaleString()}</td>
//                   <td className="pr-4">{v.heartRate} bpm</td>
//                   <td className="pr-4">{v.spo2}%</td>
//                   <td className="pr-4">{v.temperature}°C</td>
//                   <td className="pr-4">{v.ecg} mV</td>
//                   <td><Badge label={status} variant={status} /></td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   )
// }

import { useVitalsStore } from '../../store/vitalsStore'
import { getVitalStatus } from '../../utils/vitalRanges'
import { TableProperties } from 'lucide-react'

const statusStyle = {
  normal:   { bg: '#dcfce7', color: '#15803d' },
  warning:  { bg: '#fef9c3', color: '#a16207' },
  critical: { bg: '#fee2e2', color: '#b91c1c' },
}

export default function VitalsDataTable() {
  const { vitals } = useVitalsStore()
  if (!vitals.length) return null

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <TableProperties size={15} color="#0ea5e9" />
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Vitals Log</p>
        <span style={{
          marginLeft: 'auto',
          backgroundColor: '#eff6ff', color: '#0ea5e9',
          borderRadius: '999px', padding: '2px 10px',
          fontSize: '11px', fontWeight: 600,
        }}>
          {vitals.length} entries
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['#', 'Timestamp', 'Heart Rate', 'SpO₂', 'Temperature', 'ECG', 'Status'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', paddingBottom: '10px',
                  paddingRight: '16px', color: '#94a3b8',
                  fontWeight: 600, fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vitals.map((v, i) => {
              const status = getVitalStatus('heartRate', v.heartRate)
              const ss = statusStyle[status] || statusStyle.normal
              return (
                <tr key={i} style={{
                  borderBottom: '1px solid #f8fafc',
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '10px 16px 10px 0', color: '#cbd5e1', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ padding: '10px 16px 10px 0', color: '#64748b' }}>
                    {new Date(v.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '10px 16px 10px 0', color: '#0f172a', fontWeight: 500 }}>{v.heartRate} bpm</td>
                  <td style={{ padding: '10px 16px 10px 0', color: '#0f172a', fontWeight: 500 }}>{v.spo2}%</td>
                  <td style={{ padding: '10px 16px 10px 0', color: '#0f172a', fontWeight: 500 }}>{v.temperature}°C</td>
                  <td style={{ padding: '10px 16px 10px 0', color: '#0f172a', fontWeight: 500 }}>{v.ecg} mV</td>
                  <td style={{ padding: '10px 0' }}>
                    <span style={{
                      backgroundColor: ss.bg, color: ss.color,
                      borderRadius: '999px', padding: '3px 10px',
                      fontSize: '11px', fontWeight: 600, textTransform: 'capitalize',
                    }}>
                      {status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


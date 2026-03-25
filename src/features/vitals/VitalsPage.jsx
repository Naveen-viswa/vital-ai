// import VitalsInputForm from './VitalsInputForm'
// import VitalsDataTable from './VitalsDataTable'
// import VitalsCharts from './VitalsCharts'

// export default function VitalsPage() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-bold">Vitals Input & Monitoring</h2>
//       <VitalsInputForm />
//       <VitalsCharts />
//       <VitalsDataTable />
//     </div>
//   )
// }

import VitalsInputForm from './VitalsInputForm'
import VitalsDataTable from './VitalsDataTable'
import VitalsCharts from './VitalsCharts'

export default function VitalsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          Vitals Monitoring
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Enter vitals manually or upload a CSV — charts update automatically
        </p>
      </div>
      <VitalsInputForm />
      <VitalsCharts />
      <VitalsDataTable />
    </div>
  )
}

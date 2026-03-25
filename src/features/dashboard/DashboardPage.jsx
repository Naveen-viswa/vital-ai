// import { useVitalsStore } from '../../store/vitalsStore'
// import { getVitalStatus } from '../../utils/vitalRanges'
// import { VITALS_META } from '../../constants/vitals'
// import Card from '../../components/ui/Card'
// import Badge from '../../components/ui/Badge'
// import { Heart, Wind, Thermometer, Activity } from 'lucide-react'
// import VitalsCharts from '../vitals/VitalsCharts'
// import AlertsPanel from './AlertsPanel'

// const iconMap = { Heart, Wind, Thermometer, Activity }

// export default function DashboardPage() {
//   const { latestVitals, vitals } = useVitalsStore()

//   const statKeys = ['heartRate', 'spo2', 'temperature']

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-bold">Dashboard</h2>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-3 gap-4">
//         {statKeys.map((key) => {
//           const meta = VITALS_META[key]
//           const value = latestVitals?.[key]
//           const status = value != null ? getVitalStatus(key, value) : 'info'
//           const Icon = iconMap[meta.icon] ?? Activity
//           return (
//             <Card key={key} className="flex items-center gap-4">
//               <div className="p-3 rounded-lg bg-gray-800">
//                 <Icon size={20} style={{ color: meta.color }} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500">{meta.label}</p>
//                 <p className="text-2xl font-bold">
//                   {value != null ? `${value} ${meta.unit}` : '—'}
//                 </p>
//               </div>
//               <Badge label={status} variant={status} />
//             </Card>
//           )
//         })}
//       </div>

//       {/* Charts + Alerts */}
//       <div className="grid grid-cols-3 gap-4">
//         <div className="col-span-2">
//           <VitalsCharts />
//         </div>
//         <AlertsPanel />
//       </div>
//     </div>
//   )
// }

import { useVitalsStore } from '../../store/vitalsStore'
import { getVitalStatus } from '../../utils/vitalRanges'
import { VITALS_META } from '../../constants/vitals'
import { Heart, Wind, Thermometer, Activity } from 'lucide-react'
import VitalsCharts from '../vitals/VitalsCharts'
import AlertsPanel from './AlertsPanel'

const iconMap = { Heart, Wind, Thermometer, Activity }

const statConfig = [
  { key: 'heartRate',   gradient: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', iconBg: '#f43f5e', icon: 'Heart'       },
  { key: 'spo2',        gradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)', iconBg: '#3b82f6', icon: 'Wind'        },
  { key: 'temperature', gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)', iconBg: '#f59e0b', icon: 'Thermometer' },
]

export default function DashboardPage() {
  const { latestVitals, vitals } = useVitalsStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          Dashboard
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Real-time vitals overview and health alerts
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {statConfig.map(({ key, gradient, iconBg, icon }) => {
          const meta  = VITALS_META[key]
          const value = latestVitals?.[key]
          const status = value != null ? getVitalStatus(key, value) : null
          const Icon  = iconMap[icon]

          const statusColors = {
            normal:   { bg: '#dcfce7', color: '#15803d' },
            warning:  { bg: '#fef9c3', color: '#a16207' },
            critical: { bg: '#fee2e2', color: '#b91c1c' },
          }
          const sc = status ? statusColors[status] : null

          return (
            <div key={key} style={{
              background: gradient,
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{
                  width: '42px', height: '42px',
                  backgroundColor: iconBg,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${iconBg}55`,
                }}>
                  <Icon size={20} color="white" />
                </div>
                {sc && (
                  <span style={{
                    backgroundColor: sc.bg, color: sc.color,
                    borderRadius: '999px', padding: '3px 10px',
                    fontSize: '11px', fontWeight: 600, textTransform: 'capitalize',
                  }}>
                    {status}
                  </span>
                )}
              </div>
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
                  {value != null ? value : '—'}
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginLeft: '4px' }}>
                    {value != null ? meta.unit : ''}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts + Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        <VitalsCharts />
        <AlertsPanel />
      </div>

    </div>
  )
}

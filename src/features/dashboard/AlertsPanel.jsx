// import { useVitalsStore } from '../../store/vitalsStore'
// import { getVitalStatus } from '../../utils/vitalRanges'
// import Alert from '../../components/ui/Alert'
// import Card from '../../components/ui/Card'

// export default function AlertsPanel() {
//   const { latestVitals } = useVitalsStore()

//   if (!latestVitals) {
//     return (
//       <Card>
//         <p className="text-sm text-gray-500">No vitals data loaded yet.</p>
//       </Card>
//     )
//   }

//   const checks = ['heartRate', 'spo2', 'temperature']
//   const alerts = checks
//     .map((key) => ({ key, status: getVitalStatus(key, latestVitals[key]) }))
//     .filter(({ status }) => status !== 'normal')

//   return (
//     <Card className="space-y-3">
//       <p className="text-sm font-semibold text-gray-300">Active Alerts</p>
//       {alerts.length === 0 ? (
//         <Alert type="success" message="All vitals within normal range." />
//       ) : (
//         alerts.map(({ key, status }) => (
//           <Alert
//             key={key}
//             type={status}
//             title={`${key} is ${status}`}
//             message={`Value: ${latestVitals[key]}`}
//           />
//         ))
//       )}
//     </Card>
//   )
// }

import { useVitalsStore } from '../../store/vitalsStore'
import { getVitalStatus } from '../../utils/vitalRanges'
import { VITALS_META } from '../../constants/vitals'
import { CheckCircle, AlertTriangle, XCircle, Bell } from 'lucide-react'

const statusConfig = {
  normal:   { icon: CheckCircle,   bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', iconColor: '#22c55e' },
  warning:  { icon: AlertTriangle, bg: '#fefce8', border: '#fef08a', color: '#854d0e', iconColor: '#eab308' },
  critical: { icon: XCircle,       bg: '#fff1f2', border: '#fecaca', color: '#991b1b', iconColor: '#ef4444' },
}

export default function AlertsPanel() {
  const { latestVitals } = useVitalsStore()

  const checks = ['heartRate', 'spo2', 'temperature']

  const alerts = latestVitals
    ? checks.map((key) => ({
        key,
        label: VITALS_META[key].label,
        value: latestVitals[key],
        unit:  VITALS_META[key].unit,
        status: getVitalStatus(key, latestVitals[key]),
      }))
    : []

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <Bell size={15} color="#0ea5e9" />
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Active Alerts</p>
      </div>

      {alerts.length === 0 ? (
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>No vitals data loaded yet.</p>
          <p style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>Add entries from the Vitals page</p>
        </div>
      ) : (
        alerts.map(({ key, label, value, unit, status }) => {
          const cfg = statusConfig[status] || statusConfig.normal
          const Icon = cfg.icon
          return (
            <div key={key} style={{
              backgroundColor: cfg.bg,
              border: `1px solid ${cfg.border}`,
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <Icon size={16} color={cfg.iconColor} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: cfg.color }}>{label}</p>
                <p style={{ fontSize: '11px', color: cfg.color, opacity: 0.8 }}>
                  {value} {unit} · {status}
                </p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

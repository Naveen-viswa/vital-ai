// import { useVitalsStore } from '../../store/vitalsStore'
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
// import Card from '../../components/ui/Card'
// import { VITALS_META } from '../../constants/vitals'

// const chartKeys = [
//   { key: 'heartRate', ...VITALS_META.heartRate },
//   { key: 'spo2',      ...VITALS_META.spo2      },
//   { key: 'temperature', ...VITALS_META.temperature },
// ]

// export default function VitalsCharts() {
//   const { vitals } = useVitalsStore()

//   const data = vitals.map((v) => ({
//     ...v,
//     time: new Date(v.timestamp).toLocaleTimeString(),
//   }))

//   if (data.length === 0) {
//     return (
//       <Card>
//         <p className="text-sm text-gray-500">Add vitals entries to see charts.</p>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {chartKeys.map(({ key, label, color, unit }) => (
//         <Card key={key}>
//           <p className="text-xs font-semibold text-gray-400 mb-3">{label} ({unit})</p>
//           <ResponsiveContainer width="100%" height={160}>
//             <AreaChart data={data}>
//               <defs>
//                 <linearGradient id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
//                   <stop offset="95%" stopColor={color} stopOpacity={0}   />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
//               <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6b7280' }} />
//               <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
//               <Tooltip
//                 contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
//                 labelStyle={{ color: '#9ca3af' }}
//               />
//               <Area type="monotone" dataKey={key} stroke={color} fill={`url(#grad-${key})`} strokeWidth={2} dot={false} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </Card>
//       ))}
//     </div>
//   )
// }

import {
    AreaChart, Area, LineChart, Line, ScatterChart, Scatter,
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, ReferenceLine, Legend,
  } from 'recharts'
  import { useVitalsStore } from '../../store/vitalsStore'
  import { VITALS_META } from '../../constants/vitals'
  
  function computeRiskScore({ heartRate, spo2, temperature }) {
    let score = 0
    if (heartRate > 100) score += 20
    else if (heartRate < 60) score += 15
    if (spo2 < 90)  score += 40
    else if (spo2 < 95) score += 20
    if (temperature > 39)   score += 25
    else if (temperature > 38) score += 15
    return Math.min(score, 100)
  }
  
  function getRiskColor(score) {
    if (score >= 60) return '#ef4444'
    if (score >= 30) return '#f59e0b'
    return '#10b981'
  }
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '12px',
      }}>
        <p style={{ color: '#64748b', marginBottom: '6px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  
  export default function VitalsCharts() {
    const { vitals } = useVitalsStore()
  
    if (vitals.length === 0) {
      return (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Add vitals entries to see charts</p>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            Charts will show trends, risk scores and threshold analysis
          </p>
        </div>
      )
    }
  
    const data = vitals.map((v, i) => ({
      ...v,
      time: new Date(v.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      index: i + 1,
      riskScore: computeRiskScore(v),
    }))
  
    // Radar data — % deviation from ideal midpoint
    const latest = vitals.at(-1)
    const radarData = [
      { subject: 'Heart Rate',  value: Math.min(100, (latest.heartRate / 80) * 100),  fullMark: 100 },
      { subject: 'SpO₂',        value: Math.min(100, (latest.spo2 / 100) * 100),      fullMark: 100 },
      { subject: 'Temperature', value: Math.min(100, (latest.temperature / 37.5) * 100), fullMark: 100 },
    ]
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  
        {/* 1 — Heart Rate Trend with Thresholds */}
        <ChartCard title="Heart Rate Trend" subtitle="Normal: 60–100 bpm · Warning zones marked">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis domain={[40, 140]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'High', fontSize: 10, fill: '#f59e0b' }} />
              <ReferenceLine y={60}  stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Low',  fontSize: 10, fill: '#f59e0b' }} />
              <Area type="monotone" dataKey="heartRate" name="HR (bpm)" stroke="#f43f5e" fill="url(#hrGrad)" strokeWidth={2} dot={{ r: 3, fill: '#f43f5e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
  
        {/* 2 — SpO2 Trend with Critical Line */}
        <ChartCard title="SpO₂ Saturation Trend" subtitle="Critical below 90% · Warning below 95%">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="spo2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={95} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warning', fontSize: 10, fill: '#f59e0b' }} />
              <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Critical', fontSize: 10, fill: '#ef4444' }} />
              <Area type="monotone" dataKey="spo2" name="SpO₂ (%)" stroke="#3b82f6" fill="url(#spo2Grad)" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
  
        {/* 3 — Risk Score Timeline */}
        <ChartCard title="Computed Risk Score Timeline" subtitle="0 = Healthy · 100 = Critical — updates with each entry">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'High Risk', fontSize: 10, fill: '#ef4444' }} />
              <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Moderate',  fontSize: 10, fill: '#f59e0b' }} />
              <Line
                type="monotone"
                dataKey="riskScore"
                name="Risk Score"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, payload } = props
                  return (
                    <circle
                      key={cx}
                      cx={cx} cy={cy} r={4}
                      fill={getRiskColor(payload.riskScore)}
                      stroke="white"
                      strokeWidth={1.5}
                    />
                  )
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
  
        {/* 4 — SpO2 vs HR Scatter */}
        <ChartCard title="SpO₂ vs Heart Rate Correlation" subtitle="Each point = one entry · Color = risk level">
          <ResponsiveContainer width="100%" height={180}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="spo2"      name="SpO₂ (%)" type="number" domain={[75, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'SpO₂ (%)', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#94a3b8' }} />
              <YAxis dataKey="heartRate" name="HR (bpm)"  type="number" domain={[40, 140]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <ReferenceLine x={95} stroke="#f59e0b" strokeDasharray="4 4" />
              <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="4 4" />
              <Scatter
                data={data}
                shape={(props) => {
                  const { cx, cy, payload } = props
                  return (
                    <circle
                      key={`${cx}-${cy}`}
                      cx={cx} cy={cy} r={5}
                      fill={getRiskColor(computeRiskScore(payload))}
                      fillOpacity={0.8}
                      stroke="white"
                      strokeWidth={1}
                    />
                  )
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
  
        {/* 5 — Temperature Trend */}
        <ChartCard title="Temperature Trend" subtitle="Normal: 36.1–37.2°C · Fever threshold marked">
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis domain={[35, 41]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={37.2} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Fever', fontSize: 10, fill: '#f59e0b' }} />
              <ReferenceLine y={39}   stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'High Fever', fontSize: 10, fill: '#ef4444' }} />
              <Area type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#f59e0b" fill="url(#tempGrad)" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
  
      </div>
    )
  }
  
  function ChartCard({ title, subtitle, children }) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{title}</p>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>{subtitle}</p>
        {children}
      </div>
    )
  }
  
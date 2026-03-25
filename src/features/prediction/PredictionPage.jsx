
//

import { useVitalsStore } from '../../store/vitalsStore'
import { usePredictionStore } from '../../store/predictionStore'
import { analyzeVitals } from '../../services/groqService'
import {
  Brain, Loader2, AlertTriangle, CheckCircle, XCircle,
  Info, Stethoscope, ShieldAlert, Lightbulb, TrendingUp,
} from 'lucide-react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
  PieChart, Pie, Legend,
} from 'recharts'

// ── Helpers ──────────────────────────────────────────────────────────────────
const severityConfig = {
  normal:   { icon: CheckCircle,   bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', bar: '#22c55e', pie: '#22c55e' },
  warning:  { icon: AlertTriangle, bg: '#fefce8', border: '#fef08a', color: '#854d0e', bar: '#eab308', pie: '#eab308' },
  critical: { icon: XCircle,       bg: '#fff1f2', border: '#fecaca', color: '#991b1b', bar: '#ef4444', pie: '#ef4444' },
}

const riskConfig = {
  low:      { color: '#22c55e', bg: '#f0fdf4', label: 'Low Risk',      track: '#dcfce7' },
  moderate: { color: '#f59e0b', bg: '#fffbeb', label: 'Moderate Risk', track: '#fef9c3' },
  high:     { color: '#ef4444', bg: '#fff1f2', label: 'High Risk',     track: '#fee2e2' },
  critical: { color: '#991b1b', bg: '#fee2e2', label: 'Critical',      track: '#fecaca' },
}


function GaugeChart({ score, riskMeta }) {
    if (!riskMeta) return null
  
    const zones = [
      { label: 'Safe',     range: '0–30',   color: '#22c55e', from: 0,  to: 30  },
      { label: 'Moderate', range: '31–60',  color: '#f59e0b', from: 30, to: 60  },
      { label: 'High',     range: '61–80',  color: '#ef4444', from: 60, to: 80  },
      { label: 'Critical', range: '81–100', color: '#991b1b', from: 80, to: 100 },
    ]
  
    const activeZone = zones.find(z => score >= z.from && score <= z.to)
  
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
  
        {/* Score Display */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '64px', fontWeight: 800,
            color: riskMeta.color, lineHeight: 1,
            letterSpacing: '-2px',
          }}>
            {score}
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>out of 100</p>
        </div>
  
        {/* Scale Bar */}
        <div>
          <div style={{
            display: 'flex', height: '10px', borderRadius: '999px', overflow: 'hidden', gap: '2px',
          }}>
            {zones.map(z => (
              <div
                key={z.label}
                style={{
                  flex: z.to - z.from,
                  backgroundColor: z.color,
                  opacity: activeZone?.label === z.label ? 1 : 0.25,
                  borderRadius: '999px',
                  transition: 'opacity 0.3s',
                }}
              />
            ))}
          </div>
  
          {/* Needle marker */}
          <div style={{ position: 'relative', height: '14px', marginTop: '2px' }}>
            <div style={{
              position: 'absolute',
              left: `${score}%`,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0px',
            }}>
              <div style={{
                width: '2px', height: '10px',
                backgroundColor: riskMeta.color,
                borderRadius: '999px',
              }} />
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: riskMeta.color,
              }} />
            </div>
          </div>
        </div>
  
        {/* Zone Labels */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {zones.map(z => (
            <div
              key={z.label}
              style={{
                flex: 1, textAlign: 'center', padding: '6px 4px',
                borderRadius: '8px',
                backgroundColor: activeZone?.label === z.label ? z.color + '20' : '#f8fafc',
                border: `1px solid ${activeZone?.label === z.label ? z.color + '40' : '#e2e8f0'}`,
                transition: 'all 0.3s',
              }}
            >
              <p style={{
                fontSize: '11px', fontWeight: 700,
                color: activeZone?.label === z.label ? z.color : '#94a3b8',
              }}>
                {z.label}
              </p>
              <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '1px' }}>{z.range}</p>
            </div>
          ))}
        </div>
  
      </div>
    )
  }
  

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: '#fff', border: '1px solid #e2e8f0',
      borderRadius: '10px', padding: '10px 14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px',
    }}>
      <p style={{ color: '#64748b', marginBottom: '4px' }}>{payload[0]?.payload?.condition || payload[0]?.name}</p>
      <p style={{ color: '#0f172a', fontWeight: 600 }}>
        {typeof payload[0]?.value === 'number' && payload[0]?.value <= 1
          ? `Confidence: ${(payload[0].value * 100).toFixed(0)}%`
          : `Value: ${payload[0]?.value}`}
      </p>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PredictionPage() {
  const { latestVitals, vitals }   = useVitalsStore()
  const {
    predictions, summary, recommendation,
    overallRisk, riskScore, riskBreakdown,
    isLoading, error,
    setPredictionResult, setLoading, setError, clearPredictions,
  } = usePredictionStore()

  async function handleAnalyze() {
    if (!latestVitals) return
    setLoading(true)
    clearPredictions()
    try {
      const result = await analyzeVitals(latestVitals, vitals)
      setPredictionResult(result)
    } catch (err) {
      setError(err.message || 'AI analysis failed. Check your Groq API key.')
    } finally {
      setLoading(false)
    }
  }

  const riskMeta = overallRisk ? riskConfig[overallRisk] : null

  // Radar — deviation from normal
  const radarData = latestVitals ? [
    { subject: 'Heart Rate',  value: Math.min(100, Math.abs(latestVitals.heartRate - 80) * 2)         },
    { subject: 'SpO₂',        value: Math.min(100, Math.max(0, (100 - latestVitals.spo2) * 5))        },
    { subject: 'Temperature', value: Math.min(100, Math.max(0, (latestVitals.temperature - 36) * 25)) },
  ] : []

  // Severity distribution for pie
  const severityCounts = predictions.reduce((acc, p) => {
    acc[p.severity] = (acc[p.severity] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(severityCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: severityConfig[key]?.pie || '#94a3b8',
  }))

  // Risk contribution bar data
  const contributionData = riskBreakdown ? [
    { name: 'Heart Rate',   value: riskBreakdown.heart_rate_contribution,  fill: '#f43f5e' },
    { name: 'SpO₂',         value: riskBreakdown.spo2_contribution,        fill: '#3b82f6' },
    { name: 'Temperature',  value: riskBreakdown.temperature_contribution, fill: '#f59e0b' },
    { name: 'Trend Penalty',value: riskBreakdown.trend_penalty,            fill: '#8b5cf6' },
  ].filter(d => d.value > 0) : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          AI Health Prediction
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Groq LLM analyzes vitals across 20+ clinical conditions with trend analysis
        </p>
      </div>

      {/* No vitals */}
      {!latestVitals && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
          borderRadius: '12px', padding: '14px 18px',
        }}>
          <Info size={16} color="#3b82f6" />
          <p style={{ fontSize: '13px', color: '#1e40af' }}>
            No vitals loaded. Go to <strong>Vitals</strong> page and add entries first.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: '#fff1f2', border: '1px solid #fecaca',
          borderRadius: '12px', padding: '14px 18px',
        }}>
          <XCircle size={16} color="#ef4444" />
          <p style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</p>
        </div>
      )}

      {/* Snapshot + Risk Gauge */}
      {latestVitals && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* Snapshot + Button */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '16px',
            padding: '24px', border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '16px' }}>
              Vitals Snapshot
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { label: 'Heart Rate',   value: `${latestVitals.heartRate} bpm`, color: '#f43f5e' },
                { label: 'SpO₂',         value: `${latestVitals.spo2}%`,         color: '#3b82f6' },
                { label: 'Temperature',  value: `${latestVitals.temperature}°C`, color: '#f59e0b' },
                { label: 'Total Entries',value: `${vitals.length} readings`,     color: '#8b5cf6' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color }}>{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#e2e8f0' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: isLoading ? '#94a3b8' : 'white',
                border: 'none', borderRadius: '10px',
                padding: '12px', fontSize: '13px', fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {isLoading
                ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing with Groq...</>
                : <><Brain size={14} /> Run AI Analysis</>
              }
            </button>
          </div>

          {/* Gauge + Risk Label */}
          <div style={{
            backgroundColor: riskMeta ? riskMeta.bg : '#f8fafc',
            borderRadius: '16px', padding: '24px',
            border: `1px solid ${riskMeta ? riskMeta.color + '33' : '#e2e8f0'}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', alignSelf: 'flex-start' }}>
              <ShieldAlert size={15} color={riskMeta ? riskMeta.color : '#94a3b8'} />
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>AI Risk Score</p>
            </div>

            {riskMeta
              ? <GaugeChart score={riskScore} riskMeta={riskMeta} />
              : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldAlert size={32} color="#e2e8f0" />
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>Run analysis to see risk score</p>
                </div>
              )
            }

            {riskMeta && (
              <span style={{
                backgroundColor: riskMeta.color + '20', color: riskMeta.color,
                borderRadius: '999px', padding: '4px 20px',
                fontSize: '13px', fontWeight: 700, marginTop: '4px',
              }}>
                {riskMeta.label}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Risk Score Breakdown */}
      {riskBreakdown && (
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '16px',
          padding: '24px', border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <TrendingUp size={15} color="#8b5cf6" />
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Risk Score Breakdown</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Contribution bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Heart Rate',    value: riskBreakdown.heart_rate_contribution,  color: '#f43f5e' },
                { label: 'SpO₂',          value: riskBreakdown.spo2_contribution,        color: '#3b82f6' },
                { label: 'Temperature',   value: riskBreakdown.temperature_contribution, color: '#f59e0b' },
                { label: 'Trend Penalty', value: riskBreakdown.trend_penalty,            color: '#8b5cf6' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color }}>{value} pts</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min((value / riskScore) * 100, 100)}%`,
                      height: '100%', backgroundColor: color, borderRadius: '999px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* AI Explanation */}
            <div style={{
              backgroundColor: '#f8fafc', borderRadius: '12px',
              padding: '16px', border: '1px solid #e2e8f0',
            }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Why this score?
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.7 }}>
                {riskBreakdown.explanation}
              </p>
            </div>
          </div>

          {/* Contribution Bar Chart */}
          {contributionData.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={contributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 50]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {contributionData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Summary + Recommendation */}
      {(summary || recommendation) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{
            backgroundColor: '#f0f9ff', border: '1px solid #bae6fd',
            borderRadius: '16px', padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Stethoscope size={15} color="#0ea5e9" />
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0c4a6e' }}>Clinical Summary</p>
            </div>
            <p style={{ fontSize: '13px', color: '#0369a1', lineHeight: 1.75 }}>{summary}</p>
          </div>
          <div style={{
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '16px', padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Lightbulb size={15} color="#22c55e" />
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#14532d' }}>Recommendation</p>
            </div>
            <p style={{ fontSize: '13px', color: '#15803d', lineHeight: 1.75 }}>{recommendation}</p>
          </div>
        </div>
      )}

      {/* Conditions + Confidence Chart */}
      {predictions.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* Condition Cards */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '16px',
            padding: '20px', border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '16px' }}>
              Detected Conditions
              <span style={{
                marginLeft: '8px', backgroundColor: '#eff6ff', color: '#0ea5e9',
                borderRadius: '999px', padding: '2px 10px', fontSize: '11px',
              }}>
                {predictions.length} found
              </span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
              {predictions.map((p, i) => {
                const cfg  = severityConfig[p.severity] || severityConfig.normal
                const Icon = cfg.icon
                return (
                  <div key={i} style={{
                    backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
                    borderRadius: '10px', padding: '12px 14px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Icon size={14} color={cfg.color} />
                      <p style={{ fontSize: '13px', fontWeight: 600, color: cfg.color, flex: 1 }}>{p.condition}</p>
                      <span style={{ fontSize: '11px', color: cfg.color, fontWeight: 700 }}>
                        {(p.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div style={{ height: '3px', backgroundColor: cfg.border, borderRadius: '999px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ width: `${p.confidence * 100}%`, height: '100%', backgroundColor: cfg.color, borderRadius: '999px' }} />
                    </div>
                    {p.reason && (
                      <p style={{ fontSize: '11px', color: cfg.color, opacity: 0.85, lineHeight: 1.5 }}>{p.reason}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Charts column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Confidence Bar */}
            <div style={{
              backgroundColor: '#ffffff', borderRadius: '16px',
              padding: '20px', border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Confidence per Condition</p>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>AI model confidence score</p>
              <ResponsiveContainer width="100%" height={Math.max(180, predictions.length * 36)}>
                <BarChart data={predictions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" domain={[0, 1]} tickFormatter={v => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis type="category" dataKey="condition" tick={{ fontSize: 10, fill: '#64748b' }} width={130} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="confidence" radius={[0, 6, 6, 0]}>
                    {predictions.map((p, i) => <Cell key={i} fill={severityConfig[p.severity]?.bar || '#94a3b8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Severity Distribution Pie */}
            {pieData.length > 0 && (
              <div style={{
                backgroundColor: '#ffffff', borderRadius: '16px',
                padding: '20px', border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Severity Distribution</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>Conditions by severity level</p>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Radar */}
      {latestVitals && (
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '16px',
          padding: '20px', border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Vital Deviation Radar</p>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>Higher value = further from normal clinical range</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
              <Radar name="Deviation" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  )
}

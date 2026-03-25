// import { useNavigate } from 'react-router-dom'
// import { HeartPulse, Brain, Activity, FileText, MessageSquare, ArrowRight } from 'lucide-react'

// const features = [
//   { icon: Activity,      label: 'Vitals Monitoring',  desc: 'Track heart rate, SpO₂, ECG & temperature in real-time', to: '/vitals'     },
//   { icon: Brain,         label: 'AI Prediction',       desc: 'ML models predict potential health conditions',          to: '/prediction' },
//   { icon: FileText,      label: 'Report Analysis',     desc: 'Import medical PDFs and compare with predictions',       to: '/reports'    },
//   { icon: MessageSquare, label: 'AI Health Chatbot',   desc: 'Ask questions about your vitals and health data',        to: '/chatbot'    },
// ]

// export default function HomePage() {
//   const navigate = useNavigate()
//   return (
//     <div className="min-h-screen bg-slate-800 text-white flex flex-col">
//       {/* Hero */}
//       <section className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
//         <div className="flex items-center gap-3 mb-6">
//           <HeartPulse className="text-rose-500" size={40} />
//           <h1 className="text-4xl font-bold tracking-tight">VitalAI</h1>
//         </div>
//         <p className="text-xl text-gray-400 max-w-xl mb-2">
//           AI-Based Vital Analysis & Health Prediction System
//         </p>
//         <p className="text-sm text-gray-600 mb-10">
//           Exclusively built for Vitians · VIT Chennai Hackathon
//         </p>
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
//         >
//           Open Dashboard <ArrowRight size={16} />
//         </button>
//       </section>

//       {/* Features */}
//       <section className="px-8 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
//         {features.map(({ icon: Icon, label, desc, to }) => (
//           <button
//             key={to}
//             onClick={() => navigate(to)}
//             className="bg-slate-700 border border-slate-600 rounded-xl p-5 text-left hover:border-rose-500/40 transition-colors group"
//           >
//             <Icon className="text-rose-400 mb-3" size={20} />
//             <p className="font-semibold text-sm mb-1">{label}</p>
//             <p className="text-xs text-gray-500">{desc}</p>
//           </button>
//         ))}
//       </section>
//     </div>
//   )
// }

import { useNavigate } from 'react-router-dom'
import { HeartPulse, Activity, Brain, FileText, MessageSquare, ArrowRight, ShieldCheck, Zap, BarChart2, Waves } from 'lucide-react'

const features = [
  {
    icon: Activity,
    label: 'Vitals Monitoring',
    desc: 'Track heart rate, SpO₂, ECG & temperature with real-time trend charts',
    to: '/vitals',
    accent: '#0ea5e9',
    bg: '#eff6ff',
  },
  {
    icon: Brain,
    label: 'AI Prediction',
    desc: 'ML models analyze vitals and detect potential health conditions instantly',
    to: '/prediction',
    accent: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: FileText,
    label: 'Report Analysis',
    desc: 'Import medical PDFs and compare findings against AI predictions',
    to: '/reports',
    accent: '#10b981',
    bg: '#f0fdf4',
  },
  {
    icon: MessageSquare,
    label: 'AI Health Chatbot',
    desc: 'Ask questions about vitals and health data — context-aware AI assistant',
    to: '/chatbot',
    accent: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: Waves,
    label: 'ECG Analysis',
    desc: 'Upload ECG waveform images for AI-powered rhythm and anomaly detection',
    to: '/ecg',
    accent: '#10b981',
    bg: '#f0fdf4',
  },
]

const highlights = [
  { icon: ShieldCheck, text: 'Clinically validated thresholds' },
  { icon: Zap,         text: 'Groq-powered instant AI analysis' },
  { icon: BarChart2,   text: 'Real-time visual trend tracking' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 48px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            borderRadius: '10px', padding: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <HeartPulse size={18} color="white" />
          </div>
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>VitalAI</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '9px 20px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Open Dashboard <ArrowRight size={14} />
        </button>
      </header>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0ea5e9 100%)',
        padding: '80px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background blur circles */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          width: '300px', height: '300px',
          background: 'rgba(14,165,233,0.15)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-60px',
          width: '300px', height: '300px',
          background: 'rgba(16,185,129,0.12)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(14,165,233,0.15)',
            border: '1px solid rgba(14,165,233,0.3)',
            borderRadius: '999px', padding: '6px 16px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '12px', color: '#7dd3fc', fontWeight: 500 }}>
              Built for Vitians · VIT Chennai Hackathon
            </span>
          </div>

          <h1 style={{
            fontSize: '52px', fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            AI-Powered<br />
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Vital Analysis
            </span>
          </h1>

          <p style={{
            fontSize: '17px', color: '#94a3b8', maxWidth: '520px',
            margin: '0 auto 36px', lineHeight: 1.7,
          }}>
            Monitor patient vitals, detect health risks using ML, analyze medical
            reports, and get instant AI-driven clinical insights — all in one place.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: 'white', border: 'none', borderRadius: '12px',
              padding: '14px 32px', fontSize: '15px', fontWeight: 600,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 8px 24px rgba(14,165,233,0.4)',
            }}
          >
            Open Dashboard <ArrowRight size={16} />
          </button>

          {/* Highlights */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '48px',
            flexWrap: 'wrap',
          }}>
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={15} color="#38bdf8" />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
            Everything You Need
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            A complete toolkit for real-time patient vital monitoring and AI-assisted health prediction
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {features.map(({ icon: Icon, label, desc, to, accent, bg }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.1)`
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: '44px', height: '44px',
                backgroundColor: bg,
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Icon size={20} color={accent} />
              </div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                {label}
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                {desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid #e2e8f0',
        fontSize: '12px', color: '#94a3b8',
      }}>
        VitalAI · AI-Based Vital Analysis & Health Prediction System · VIT Chennai
      </footer>
    </div>
  )
}

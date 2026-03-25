// import { Bell, Settings } from 'lucide-react'

// export default function Navbar() {
//   return (
//     <header className="h-14 bg-slate-700 border-b border-slate-600 flex items-center justify-between px-6">
//       <div className="text-sm text-gray-400">
//         AI-Based Vital Analysis & Health Prediction
//       </div>
//       <div className="flex items-center gap-4">
//         <button className="relative text-gray-400 hover:text-white transition-colors">
//           <Bell size={18} />
//           <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
//         </button>
//         <button className="text-gray-400 hover:text-white transition-colors">
//           <Settings size={18} />
//         </button>
//       </div>
//     </header>
//   )
// }

import { Bell, Settings, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <header style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>

      {/* Left — Page title slot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Clock size={14} color="#94a3b8" />
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
          {time.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
          {' · '}
          {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>

      {/* Right — Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{
          position: 'relative',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
        }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '7px', height: '7px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '1.5px solid white',
          }} />
        </button>

        <button style={{
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
        }}>
          <Settings size={16} />
        </button>
      </div>
    </header>
  )
}

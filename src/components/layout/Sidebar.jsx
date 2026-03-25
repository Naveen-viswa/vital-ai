// import { NavLink } from 'react-router-dom'
// import {
//   LayoutDashboard, Activity, Brain,
//   FileText, MessageSquare, HeartPulse
// } from 'lucide-react'
// import clsx from 'clsx'

// const navItems = [
//   { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/vitals',    icon: Activity,        label: 'Vitals' },
//   { to: '/prediction',icon: Brain,           label: 'Prediction' },
//   { to: '/reports',   icon: FileText,        label: 'Reports' },
//   { to: '/chatbot',   icon: MessageSquare,   label: 'AI Chatbot' },
// ]

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-slate-700 border-r border-slate-600 flex flex-col">
//       <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-600">
//         <HeartPulse className="text-rose-500" size={22} />
//         <span className="text-lg font-bold tracking-tight">VitalAI</span>
//       </div>
//       <nav className="flex-1 px-3 py-4 space-y-1">
//         {navItems.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               clsx(
//                 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
//                 isActive
//                   ? 'bg-rose-500/10 text-rose-400'
//                   : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//               )
//             }
//           >
//             <Icon size={18} />
//             {label}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   )
// }

// below is seperate

// import { NavLink } from 'react-router-dom'
// import {
//   LayoutDashboard, Activity, Brain,
//   FileText, MessageSquare, HeartPulse
// } from 'lucide-react'

// const navItems = [
//   { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard'  },
//   { to: '/vitals',     icon: Activity,        label: 'Vitals'      },
//   { to: '/prediction', icon: Brain,           label: 'Prediction'  },
//   { to: '/reports',    icon: FileText,        label: 'Reports'     },
//   { to: '/chatbot',    icon: MessageSquare,   label: 'AI Chatbot'  },
// ]

// export default function Sidebar() {
//   return (
//     <aside style={{
//       width: '240px',
//       minHeight: '100vh',
//       backgroundColor: '#ffffff',
//       borderRight: '1px solid #e2e8f0',
//       display: 'flex',
//       flexDirection: 'column',
//       flexShrink: 0,
//       boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
//     }}>

//       {/* Logo */}
//       <div style={{
//         padding: '24px',
//         background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//       }}>
//         <div style={{
//           backgroundColor: 'rgba(255,255,255,0.2)',
//           borderRadius: '10px',
//           padding: '6px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <HeartPulse size={20} color="#ffffff" />
//         </div>
//         <div>
//           <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>VitalAI</p>
//           <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>Health Monitor</p>
//         </div>
//       </div>

//       {/* Nav Items */}
//       <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
//         <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', padding: '0 8px', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
//           Navigation
//         </p>
//         {navItems.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             style={({ isActive }) => ({
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               padding: '10px 12px',
//               borderRadius: '10px',
//               fontSize: '13px',
//               fontWeight: 500,
//               textDecoration: 'none',
//               transition: 'all 0.15s ease',
//               backgroundColor: isActive ? '#eff6ff' : 'transparent',
//               color: isActive ? '#0ea5e9' : '#64748b',
//               borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
//             })}
//           >
//             <Icon size={16} />
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div style={{
//         padding: '16px',
//         borderTop: '1px solid #e2e8f0',
//         fontSize: '11px',
//         color: '#94a3b8',
//         textAlign: 'center',
//       }}>
//         VitalAI · VIT Chennai
//       </div>
//     </aside>
//   )
// }

// above is seperate

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Activity, Brain,
  FileText, MessageSquare, HeartPulse, Waves
} from 'lucide-react'

const navItems = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/vitals',     icon: Activity,        label: 'Vitals'        },
  { to: '/prediction', icon: Brain,           label: 'Prediction'    },
  { to: '/ecg',        icon: Waves,           label: 'ECG Analysis'  },
  { to: '/reports',    icon: FileText,        label: 'Reports'       },
  { to: '/chatbot',    icon: MessageSquare,   label: 'AI Chatbot'    },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '10px', padding: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <HeartPulse size={20} color="#ffffff" />
        </div>
        <div>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>VitalAI</p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>Health Monitor</p>
        </div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{
          fontSize: '10px', fontWeight: 600, color: '#94a3b8',
          padding: '0 8px', marginBottom: '8px',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Navigation
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px',
              fontSize: '13px', fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.15s ease',
              backgroundColor: isActive ? '#eff6ff' : 'transparent',
              color: isActive ? '#0ea5e9' : '#64748b',
              borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{
        padding: '16px', borderTop: '1px solid #e2e8f0',
        fontSize: '11px', color: '#94a3b8', textAlign: 'center',
      }}>
        VitalAI · VIT Chennai
      </div>
    </aside>
  )
}

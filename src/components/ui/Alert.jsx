// import clsx from 'clsx'
// import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

// const config = {
//   info:     { icon: Info,          cls: 'bg-blue-500/10  border-blue-500/30  text-blue-300'  },
//   success:  { icon: CheckCircle,   cls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' },
//   warning:  { icon: AlertTriangle, cls: 'bg-amber-500/10  border-amber-500/30  text-amber-300' },
//   critical: { icon: XCircle,       cls: 'bg-rose-500/10   border-rose-500/30   text-rose-300'  },
// }

// export default function Alert({ type = 'info', title, message }) {
//   const { icon: Icon, cls } = config[type]
//   return (
//     <div className={clsx('flex gap-3 items-start border rounded-lg p-4', cls)}>
//       <Icon size={18} className="mt-0.5 shrink-0" />
//       <div>
//         {title && <p className="font-semibold text-sm">{title}</p>}
//         {message && <p className="text-sm opacity-80">{message}</p>}
//       </div>
//     </div>
//   )
// }

import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

const config = {
  info:     { icon: Info,          bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
  success:  { icon: CheckCircle,   bg: '#f0fdf4', border: '#bbf7d0', color: '#166534' },
  warning:  { icon: AlertTriangle, bg: '#fefce8', border: '#fef08a', color: '#854d0e' },
  critical: { icon: XCircle,       bg: '#fff1f2', border: '#fecaca', color: '#991b1b' },
}

export default function Alert({ type = 'info', title, message }) {
  const { icon: Icon, bg, border, color } = config[type] || config.info
  return (
    <div style={{
      display: 'flex', gap: '12px', alignItems: 'flex-start',
      backgroundColor: bg, border: `1px solid ${border}`,
      borderRadius: '10px', padding: '12px 16px',
    }}>
      <Icon size={16} style={{ color, marginTop: '2px', flexShrink: 0 }} />
      <div>
        {title   && <p style={{ fontWeight: 600, fontSize: '13px', color }}>{title}</p>}
        {message && <p style={{ fontSize: '13px', color, opacity: 0.85 }}>{message}</p>}
      </div>
    </div>
  )
}

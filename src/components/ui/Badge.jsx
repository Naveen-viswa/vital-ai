// import clsx from 'clsx'

// const variants = {
//   normal:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
//   warning:  'bg-amber-500/10  text-amber-400  border-amber-500/20',
//   critical: 'bg-rose-500/10   text-rose-400   border-rose-500/20',
//   info:     'bg-blue-500/10   text-blue-400   border-blue-500/20',
// }

// export default function Badge({ label, variant = 'info' }) {
//   return (
//     <span className={clsx(
//       'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
//       variants[variant]
//     )}>
//       {label}
//     </span>
//   )
// }

const variants = {
    normal:   { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' },
    warning:  { bg: '#fef9c3', color: '#a16207', border: '#fef08a' },
    critical: { bg: '#fee2e2', color: '#b91c1c', border: '#fecaca' },
    info:     { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  }
  
  export default function Badge({ label, variant = 'info' }) {
    const s = variants[variant] || variants.info
    return (
      <span style={{
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: '999px',
        padding: '2px 10px',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'capitalize',
        display: 'inline-flex',
        alignItems: 'center',
      }}>
        {label}
      </span>
    )
  }
  
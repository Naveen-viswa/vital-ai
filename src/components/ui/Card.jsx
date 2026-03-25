// import clsx from 'clsx'

// export default function Card({ children, className }) {
//   return (
//     <div className={clsx('bg-slate-700 border border-slate-600 rounded-xl p-5', className)}>
//       {children}
//     </div>
//   )
// }

import clsx from 'clsx'

export default function Card({ children, className = '' }) {
  return (
    <div
      className={clsx(className)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        border: '1px solid #e2e8f0',
      }}
    >
      {children}
    </div>
  )
}

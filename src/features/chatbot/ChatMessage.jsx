

// import { Bot, User } from 'lucide-react'

// export default function ChatMessage({ message }) {
//   const isUser = message.role === 'user'

//   return (
//     <div style={{
//       display: 'flex',
//       alignItems: 'flex-end',
//       gap: '8px',
//       flexDirection: isUser ? 'row-reverse' : 'row',
//     }}>

//       {/* Avatar */}
//       <div style={{
//         width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
//         background: isUser
//           ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
//           : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//       }}>
//         {isUser
//           ? <User size={14} color="white" />
//           : <Bot  size={14} color="white" />
//         }
//       </div>

//       {/* Bubble */}
//       <div style={{
//         maxWidth: '72%',
//         backgroundColor: isUser ? '#0ea5e9' : '#f8fafc',
//         color: isUser ? '#ffffff' : '#0f172a',
//         borderRadius: isUser
//           ? '16px 16px 2px 16px'
//           : '16px 16px 16px 2px',
//         padding: '10px 14px',
//         fontSize: '13px',
//         lineHeight: 1.65,
//         border: isUser ? 'none' : '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//         whiteSpace: 'pre-wrap',
//       }}>
//         {message.content}
//       </div>

//       {/* Timestamp */}
//       <span style={{
//         fontSize: '10px',
//         color: '#cbd5e1',
//         alignSelf: 'flex-end',
//         marginBottom: '2px',
//         flexShrink: 0,
//       }}>
//         {new Date(message.timestamp).toLocaleTimeString('en-IN', {
//           hour: '2-digit', minute: '2-digit',
//         })}
//       </span>
//     </div>
//   )
// }

import { Bot, User } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex', gap: '12px', marginBottom: '16px',
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {/* Avatar */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
        background: isUser ? '#8b5cf6' : '#0ea5e9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {isUser ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '80%',
        backgroundColor: isUser ? '#0ea5e9' : '#f8fafc',
        color: isUser ? 'white' : '#1e293b',
        padding: '12px 16px',
        borderRadius: isUser ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
        fontSize: '14px', lineHeight: '1.6',
        border: isUser ? 'none' : '1px solid #e2e8f0',
        whiteSpace: 'pre-wrap', position: 'relative'
      }}>
        {message.content}
        
        {/* Timestamp */}
        <div style={{
          fontSize: '9px', marginTop: '6px', textAlign: isUser ? 'right' : 'left',
          opacity: 0.7, color: isUser ? 'white' : '#94a3b8'
        }}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
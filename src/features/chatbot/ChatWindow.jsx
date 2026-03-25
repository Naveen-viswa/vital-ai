

// import { useEffect, useRef } from 'react'
// import { useChatStore } from '../../store/chatStore'
// import ChatMessage from './ChatMessage'
// import { Bot, Loader2, MessageSquare } from 'lucide-react'

// export default function ChatWindow() {
//   const { messages, isTyping } = useChatStore()
//   const bottomRef = useRef()

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, isTyping])

//   if (messages.length === 0) {
//     return (
//       <div style={{
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '16px',
//         padding: '40px',
//       }}>
//         <div style={{
//           width: '56px', height: '56px',
//           background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
//           borderRadius: '16px',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <MessageSquare size={24} color="#0ea5e9" />
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
//             Start a conversation
//           </p>
//           <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '300px' }}>
//             Ask about loaded vitals, what a prediction means, or general health questions
//           </p>
//         </div>

//         {/* Suggestion chips */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
//           {[
//             'What does my SpO₂ value mean?',
//             'Is my heart rate normal?',
//             'What is tachycardia?',
//             'Explain the risk score',
//           ].map((suggestion) => (
//             <span key={suggestion} style={{
//               backgroundColor: '#f0f9ff',
//               border: '1px solid #bae6fd',
//               borderRadius: '999px',
//               padding: '6px 14px',
//               fontSize: '12px',
//               color: '#0284c7',
//               cursor: 'default',
//             }}>
//               {suggestion}
//             </span>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//       {messages.map((msg, i) => (
//         <ChatMessage key={i} message={msg} />
//       ))}

//       {isTyping && (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <div style={{
//             width: '28px', height: '28px',
//             background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//             borderRadius: '8px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             flexShrink: 0,
//           }}>
//             <Bot size={14} color="white" />
//           </div>
//           <div style={{
//             backgroundColor: '#f1f5f9',
//             borderRadius: '12px 12px 12px 2px',
//             padding: '10px 14px',
//             display: 'flex', alignItems: 'center', gap: '6px',
//           }}>
//             <Loader2 size={12} color="#94a3b8" style={{ animation: 'spin 1s linear infinite' }} />
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Thinking...</span>
//           </div>
//         </div>
//       )}

//       <div ref={bottomRef} />
//     </div>
//   )
// }

import { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/chatStore'
import ChatMessage from './ChatMessage'
import { MessageSquare, HeartPulse } from 'lucide-react'

export default function ChatWindow() {
  const { messages, isTyping } = useChatStore()
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (messages.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '40px' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: '#f0f9ff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HeartPulse size={32} color="#0ea5e9" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>How can I help you, Naveen?</h3>
          <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '300px' }}>Ask me to explain your risk score, check your heart rate trends, or summarize your medical report.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {['Check HR Stability', 'Explain Risk Score', 'Analyze SpO2 Dip'].map(hint => (
            <div key={hint} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '12px', color: '#64748b', backgroundColor: '#fff' }}>
              {hint}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
      <div ref={scrollRef} />
    </div>
  )
}
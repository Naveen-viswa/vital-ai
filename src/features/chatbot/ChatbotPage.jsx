

// import ChatWindow from './ChatWindow'
// import ChatInput from './ChatInput'
// import { MessageSquare, Bot } from 'lucide-react'
// import { useChatStore } from '../../store/chatStore'

// export default function ChatbotPage() {
//   const { clearChat, messages } = useChatStore()

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0' }}>

//       {/* Header */}
//       <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div>
//           <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
//             AI Health Chatbot
//           </h2>
//           <p style={{ fontSize: '13px', color: '#64748b' }}>
//             Ask anything about the loaded vitals, predictions, or general health guidance
//           </p>
//         </div>
//         {messages.length > 0 && (
//           <button
//             onClick={clearChat}
//             style={{
//               backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
//               borderRadius: '10px', padding: '8px 16px',
//               fontSize: '12px', fontWeight: 600, color: '#64748b',
//               cursor: 'pointer',
//             }}
//           >
//             Clear Chat
//           </button>
//         )}
//       </div>

//       {/* Chat Container */}
//       <div style={{
//         backgroundColor: '#ffffff',
//         borderRadius: '16px',
//         border: '1px solid #e2e8f0',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//         display: 'flex',
//         flexDirection: 'column',
//         height: 'calc(100vh - 220px)',
//         overflow: 'hidden',
//       }}>

//         {/* Chat Header Bar */}
//         <div style={{
//           padding: '14px 20px',
//           borderBottom: '1px solid #f1f5f9',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '10px',
//           backgroundColor: '#f8fafc',
//           borderRadius: '16px 16px 0 0',
//         }}>
//           <div style={{
//             width: '32px', height: '32px',
//             background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
//             borderRadius: '10px',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <Bot size={16} color="white" />
//           </div>
//           <div>
//             <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>VitalAI Assistant</p>
//             <p style={{ fontSize: '11px', color: '#94a3b8' }}>Powered by Groq · Context-aware · Health-focused</p>
//           </div>
//           <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <span style={{
//               width: '7px', height: '7px',
//               backgroundColor: '#22c55e',
//               borderRadius: '50%',
//               display: 'inline-block',
//             }} />
//             <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 500 }}>Online</span>
//           </div>
//         </div>

//         {/* Messages */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
//           <ChatWindow />
//         </div>

//         {/* Input */}
//         <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9' }}>
//           <ChatInput />
//         </div>
//       </div>
//     </div>
//   )
// }

// import ChatWindow from './ChatWindow'
// import ChatInput from './ChatInput'
// import { Bot, RefreshCcw, ShieldCheck } from 'lucide-react'
// import { useChatStore } from '../../store/chatStore'

// export default function ChatbotPage() {
//   const { clearChat, messages } = useChatStore()

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>

//       {/* Header Section */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div>
//           <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
//             VitalAI Clinical Assistant
//           </h2>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <ShieldCheck size={14} color="#22c55e" />
//             <p style={{ fontSize: '12px', color: '#64748b' }}>
//               Secure Analysis • Context-Aware Health Guidance
//             </p>
//           </div>
//         </div>
        
//         {messages.length > 0 && (
//           <button
//             onClick={clearChat}
//             style={{
//               backgroundColor: '#fff', border: '1px solid #e2e8f0',
//               borderRadius: '8px', padding: '6px 12px', fontSize: '12px',
//               color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
//             }}
//           >
//             <RefreshCcw size={12} /> Clear History
//           </button>
//         )}
//       </div>

//       {/* Main Chat Container */}
//       <div style={{
//         backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0',
//         display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)',
//         overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
//       }}>

//         {/* Status Bar */}
//         <div style={{
//           padding: '12px 20px', borderBottom: '1px solid #f1f5f9',
//           display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc'
//         }}>
//           <div style={{
//             width: '32px', height: '32px', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
//             borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
//           }}>
//             <Bot size={18} color="white" />
//           </div>
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>AI Clinical Engine</p>
//             <p style={{ fontSize: '10px', color: '#22c55e', fontWeight: 600, textTransform: 'uppercase' }}>
//               ● Ready for analysis
//             </p>
//           </div>
//         </div>

//         {/* Messages Window */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#fff' }}>
//           <ChatWindow />
//         </div>

//         {/* Input Area */}
//         <div style={{ padding: '16px 20px', backgroundColor: '#fff', borderTop: '1px solid #f1f5f9' }}>
//           <ChatInput />
//           <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '10px' }}>
//             VitalAI provides informational guidance. In case of emergency, contact your local emergency services immediately.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'
import { Bot, RefreshCcw, ShieldCheck } from 'lucide-react'
import { useChatStore } from '../../store/chatStore'

export default function ChatbotPage() {
  const { clearChat, messages } = useChatStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>VitalAI Chatbot</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontSize: '12px' }}>
            <ShieldCheck size={14} /> Medical Analysis Engine Active
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} style={{ color: '#ef4444', fontSize: '12px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <RefreshCcw size={12} /> Reset
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={18} color="white" />
          </div>
          <p style={{ fontSize: '13px', fontWeight: 600 }}>Your health assistant</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}><ChatWindow /></div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9' }}><ChatInput /></div>
      </div>
    </div>
  )
}
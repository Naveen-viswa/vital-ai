

// import { useState } from 'react'
// import { useChatStore } from '../../store/chatStore'
// import { useVitalsStore } from '../../store/vitalsStore'
// import { usePredictionStore } from '../../store/predictionStore'
// import { sendChatMessage } from '../../services/groqService'
// import { SendHorizonal } from 'lucide-react'

// const SYSTEM_PROMPT = `You are VitalAI, an intelligent health assistant.
// You help analyze vital signs data including heart rate, SpO2, ECG, and temperature.
// You can explain health predictions, identify concerning patterns, and provide general health guidance.
// Always remind users to consult a doctor for medical decisions. Be concise and clear.`

// export default function ChatInput() {
//   const [input, setInput] = useState('')
//   const { messages, addMessage, setTyping } = useChatStore()
//   const { latestVitals } = useVitalsStore()
//   const { predictions } = usePredictionStore()

//   async function handleSend() {
//     const text = input.trim()
//     if (!text) return
//     setInput('')
//     addMessage({ role: 'user', content: text })
//     setTyping(true)

//     const contextMsg = latestVitals
//       ? `[Current vitals: HR=${latestVitals.heartRate}bpm, SpO2=${latestVitals.spo2}%, Temp=${latestVitals.temperature}°C. Predictions: ${predictions.map(p => p.condition).join(', ') || 'none'}]`
//       : ''

//     const groqMessages = [
//       ...(contextMsg ? [{ role: 'system', content: contextMsg }] : []),
//       ...messages.map(({ role, content }) => ({ role, content })),
//       { role: 'user', content: text },
//     ]

//     try {
//       const reply = await sendChatMessage(groqMessages, SYSTEM_PROMPT)
//       addMessage({ role: 'assistant', content: reply })
//     } catch {
//       addMessage({ role: 'assistant', content: 'Error reaching AI service. Please check your API key.' })
//     } finally {
//       setTyping(false)
//     }
//   }

//   function handleKeyDown(e) {
//     if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
//   }

//   return (
//     <div style={{
//       display: 'flex',
//       gap: '10px',
//       borderTop: '1px solid #e2e8f0',
//       paddingTop: '16px',
//     }}>
//       <textarea
//         rows={1}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Ask about vitals, predictions, or health conditions..."
//         style={{
//           flex: 1,
//           backgroundColor: '#f8fafc',
//           border: '1px solid #e2e8f0',
//           borderRadius: '12px',
//           padding: '11px 16px',
//           fontSize: '13px',
//           color: '#0f172a',
//           resize: 'none',
//           outline: 'none',
//           fontFamily: 'Inter, sans-serif',
//           lineHeight: 1.5,
//         }}
//         onFocus={e => e.target.style.borderColor = '#0ea5e9'}
//         onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
//       />
//       <button
//         onClick={handleSend}
//         disabled={!input.trim()}
//         style={{
//           background: input.trim()
//             ? 'linear-gradient(135deg, #0ea5e9, #0284c7)'
//             : '#e2e8f0',
//           border: 'none',
//           borderRadius: '12px',
//           padding: '11px 14px',
//           cursor: input.trim() ? 'pointer' : 'not-allowed',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: input.trim() ? 'white' : '#94a3b8',
//           transition: 'all 0.15s ease',
//         }}
//       >
//         <SendHorizonal size={16} />
//       </button>
//     </div>
//   )
// }

// import { useState } from 'react'
// import { useChatStore } from '../../store/chatStore'
// import { useVitalsStore } from '../../store/vitalsStore'
// import { usePredictionStore } from '../../store/predictionStore'
// import { sendGeminiChatMessage } from '../../services/groqService'
// import { SendHorizonal, AlertCircle } from 'lucide-react'

// export default function ChatInput() {
//   const [input, setInput] = useState('')
//   const { messages, addMessage, setTyping } = useChatStore()
//   const { latestVitals } = useVitalsStore()
//   const { predictions } = usePredictionStore()

//   async function handleSend() {
//     const text = input.trim()
//     if (!text) return

//     setInput('')
//     addMessage({ role: 'user', content: text, timestamp: new Date().toISOString() })
//     setTyping(true)

//     // Build rich context for Gemini
//     const healthContext = latestVitals 
//       ? `Patient Vitals: HR ${latestVitals.heartRate} bpm, SpO2 ${latestVitals.spo2}%, Temp ${latestVitals.temperature}°C. 
//          AI Predictions: ${predictions.map(p => p.condition).join(', ') || 'No acute conditions detected.'}`
//       : "No live vitals data available yet."

//     try {
//       const history = messages.map(m => ({ role: m.role, content: m.content }))
//       const reply = await sendGeminiChatMessage(history, text, healthContext)
      
//       addMessage({ role: 'assistant', content: reply, timestamp: new Date().toISOString() })
//     } catch (error) {
//       console.error("Chat Error:", error)
//       addMessage({ 
//         role: 'assistant', 
//         content: 'I encountered an error connecting to the clinical engine. Please check your API configuration.',
//         timestamp: new Date().toISOString() 
//       })
//     } finally {
//       setTyping(false)
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       handleSend()
//     }
//   }

//   return (
//     <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
//       <textarea
//         rows={1}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Ask about your vitals or medical reports..."
//         style={{
//           flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
//           borderRadius: '12px', padding: '12px 16px', fontSize: '13px',
//           color: '#0f172a', resize: 'none', outline: 'none',
//           fontFamily: 'inherit', lineHeight: 1.5,
//         }}
//       />
//       <button
//         onClick={handleSend}
//         disabled={!input.trim()}
//         style={{
//           background: input.trim() ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : '#f1f5f9',
//           border: 'none', borderRadius: '12px', width: '45px', cursor: input.trim() ? 'pointer' : 'default',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', color: input.trim() ? 'white' : '#cbd5e1',
//         }}
//       >
//         <SendHorizonal size={18} />
//       </button>
//     </div>
//   )
// }

// import { useState } from 'react'
// import { useChatStore } from '../../store/chatStore'
// import { useVitalsStore } from '../../store/vitalsStore'
// import { usePredictionStore } from '../../store/predictionStore'
// import { sendChatMessage2 } from '../../services/groqService2'
// import { SendHorizonal, Loader2 } from 'lucide-react'

// export default function ChatInput() {
//   const [input, setInput] = useState('')
//   const { messages, addMessage, isTyping, setTyping } = useChatStore()
//   const { latestVitals } = useVitalsStore()
//   const { predictions } = usePredictionStore()

//   async function handleSend() {
//     const text = input.trim()
//     if (!text || isTyping) return

//     setInput('')
//     addMessage({ role: 'user', content: text, timestamp: new Date().toISOString() })
//     setTyping(true)

//     const healthContext = latestVitals 
//       ? `HR: ${latestVitals.heartRate}, SpO2: ${latestVitals.spo2}%, Temp: ${latestVitals.temperature}°C. Predictions: ${predictions.map(p => p.condition).join(', ') || 'None'}`
//       : "No live data available."

//     try {
//       // Groq expects simple {role, content} objects
//       const history = messages.map(({ role, content }) => ({ role, content }))
//       const reply = await sendChatMessage([...history, { role: 'user', content: text }], healthContext)
      
//       addMessage({ role: 'assistant', content: reply, timestamp: new Date().toISOString() })
//     } catch (error) {
//       addMessage({ 
//         role: 'assistant', 
//         content: "Error: Could not connect to Groq. Please verify VITE_GROQ_API_KEY and restart server.",
//         timestamp: new Date().toISOString() 
//       })
//     } finally {
//       setTyping(false)
//     }
//   }

//   return (
//     <div style={{ display: 'flex', gap: '10px' }}>
//       <textarea
//         rows={1}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
//         placeholder="Type a message..."
//         style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', fontSize: '14px', outline: 'none', resize: 'none' }}
//       />
//       <button
//         onClick={handleSend}
//         disabled={!input.trim() || isTyping}
//         style={{ background: input.trim() ? '#0ea5e9' : '#f1f5f9', border: 'none', borderRadius: '12px', width: '48px', cursor: 'pointer', color: 'white' }}
//       >
//         {isTyping ? <Loader2 size={18} className="animate-spin" /> : <SendHorizonal size={18} />}
//       </button>
//     </div>
//   )
// }

import { useState } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useVitalsStore } from '../../store/vitalsStore'
import { usePredictionStore } from '../../store/predictionStore'
// ✅ Ensure this matches the exported function in your service file
import { sendChatMessage2 } from '../../services/groqService2' 
import { SendHorizonal, Loader2 } from 'lucide-react'

export default function ChatInput() {
  const [input, setInput] = useState('')
  const { messages, addMessage, isTyping, setTyping } = useChatStore()
  const { latestVitals } = useVitalsStore()
  const { predictions } = usePredictionStore()

  async function handleSend() {
    const text = input.trim()
    if (!text || isTyping) return

    setInput('')
    addMessage({ role: 'user', content: text, timestamp: new Date().toISOString() })
    setTyping(true)

    // Build medical context string
    const healthContext = latestVitals 
      ? `HR: ${latestVitals.heartRate} bpm, SpO2: ${latestVitals.spo2}%, Temp: ${latestVitals.temperature}°C. Predictions: ${predictions.map(p => p.condition).join(', ') || 'Stable'}`
      : "No live vitals data available."

    try {
      // Format history for Groq API
      const history = messages.map(({ role, content }) => ({ role, content }))
      
      // ✅ CHANGED: Called sendChatMessage2 to match your import/service
      const reply = await sendChatMessage2([...history, { role: 'user', content: text }], healthContext)
      
      addMessage({ role: 'assistant', content: reply, timestamp: new Date().toISOString() })
    } catch (error) {
      console.error("Chat Error:", error)
      addMessage({ 
        role: 'assistant', 
        content: "Error: Could not connect to the Clinical Engine. Please check your Groq API Key 2 configuration.",
        timestamp: new Date().toISOString() 
      })
    } finally {
      setTyping(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
        placeholder="Type a message..."
        style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', fontSize: '14px', outline: 'none', resize: 'none' }}
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isTyping}
        style={{ 
          background: input.trim() ? '#0ea5e9' : '#f1f5f9', 
          border: 'none', 
          borderRadius: '12px', 
          width: '48px', 
          cursor: input.trim() ? 'pointer' : 'default', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isTyping ? <Loader2 size={18} className="animate-spin" /> : <SendHorizonal size={18} />}
      </button>
    </div>
  )
}
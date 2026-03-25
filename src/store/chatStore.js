import { create } from 'zustand'

export const useChatStore = create((set) => ({
  messages: [],   // { role: 'user'|'assistant', content: string, timestamp }
  isTyping: false,
  addMessage: (msg) =>
    set((s) => ({ messages: [...s.messages, { ...msg, timestamp: Date.now() }] })),
  setTyping: (isTyping) => set({ isTyping }),
  clearChat: () => set({ messages: [] }),
}))

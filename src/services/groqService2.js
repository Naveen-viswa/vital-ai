import Groq from 'groq-sdk';

const groq2 = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY_2,
  dangerouslyAllowBrowser: true, // Required for client-side Vite apps
});

const SYSTEM_PROMPT = `
You are VitalAI, a professional Clinical Decision Support Assistant.
Your goal is to help users understand their health vitals (Heart Rate, SpO2, Temp) and medical reports.

RULES:
1. CLINICAL ACCURACY: Reference standard ranges (HR: 60-100 bpm, SpO2: 95-100%, Temp: 36.1-37.2°C).
2. TONE: Be professional, empathetic, and concise. 
3. SAFETY: If vitals are in 'Critical' ranges, urge the user to seek immediate medical attention.
4. DISCLAIMER: Always include a brief note that you are an AI and not a doctor.
`;

export async function sendChatMessage2(messages, healthContext) {
  const completion = await groq2.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: `CURRENT PATIENT CONTEXT: ${healthContext}` },
      ...messages,
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3, // Lower temperature for factual medical consistency
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content || "";
}
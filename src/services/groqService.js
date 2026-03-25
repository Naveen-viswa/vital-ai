import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

const groqPdf = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  })

export async function sendChatMessage(messages, systemPrompt) {
  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1024,
  })
  return completion.choices[0]?.message?.content ?? ''
}



// import Groq from 'groq-sdk'

// const groq = new Groq({
//   apiKey: import.meta.env.VITE_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// })

// ── Chatbot ──────────────────────────────────────────────
// export async function sendChatMessage(messages, systemPrompt) {
//   const completion = await groq.chat.completions.create({
//     model: 'llama3-8b-8192',
//     messages: [
//       { role: 'system', content: systemPrompt },
//       ...messages,
//     ],
//     temperature: 0.7,
//     max_tokens: 1024,
//   })
//   return completion.choices[0]?.message?.content ?? ''
// }

// ── Vitals Analysis ──────────────────────────────────────
export async function analyzeVitals(vitals, allVitals) {
  // Build trend context from all entries
  const entryCount = allVitals.length
  const hrTrend  = allVitals.length > 1
    ? allVitals.at(-1).heartRate   > allVitals[0].heartRate   ? 'increasing' : 'decreasing'
    : 'stable'
  const spo2Trend = allVitals.length > 1
    ? allVitals.at(-1).spo2        < allVitals[0].spo2        ? 'decreasing' : 'stable'
    : 'stable'
  const tempTrend = allVitals.length > 1
    ? allVitals.at(-1).temperature > allVitals[0].temperature ? 'increasing' : 'stable'
    : 'stable'

  const prompt = `You are a clinical decision support AI. Analyze the following patient vitals and return a JSON response only — no explanation, no markdown, just raw JSON.

Patient Vitals (latest reading):
- Heart Rate: ${vitals.heartRate} bpm
- SpO2 (Oxygen Saturation): ${vitals.spo2}%
- Temperature: ${vitals.temperature}°C
- Total readings recorded: ${entryCount}
- Heart Rate trend: ${hrTrend}
- SpO2 trend: ${spo2Trend}
- Temperature trend: ${tempTrend}

Normal ranges for reference:
- Heart Rate: 60–100 bpm
- SpO2: 95–100%
- Temperature: 36.1–37.2°C

Return ONLY this JSON structure, no other text:
{
  "conditions": [
    {
      "condition": "condition name",
      "confidence": 0.00,
      "severity": "normal|warning|critical",
      "reason": "brief clinical reason"
    }
  ],
  "overall_risk": "low|moderate|high|critical",
  "risk_score": 0,
  "summary": "2-3 sentence clinical summary of patient status",
  "recommendation": "concise actionable recommendation for the attendant"
}`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    max_tokens: 1024,
  })

  const raw = completion.choices[0]?.message?.content ?? ''

  // Parse JSON safely
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid response from AI model')
  return JSON.parse(jsonMatch[0])
}

//

// import Groq from 'groq-sdk'

// const groq = new Groq({
//   apiKey: import.meta.env.VITE_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// })

// // ── Chatbot ──────────────────────────────────────────────────────────────────
// export async function sendChatMessage(messages, systemPrompt) {
//   const completion = await groq.chat.completions.create({
//     model: 'llama3-8b-8192',
//     messages: [
//       { role: 'system', content: systemPrompt },
//       ...messages,
//     ],
//     temperature: 0.7,
//     max_tokens: 1024,
//   })
//   return completion.choices[0]?.message?.content ?? ''
// }

// // ── Vitals Analysis ──────────────────────────────────────────────────────────
// export async function analyzeVitals(vitals, allVitals) {
//   const entryCount = allVitals.length

//   const hrValues   = allVitals.map(v => v.heartRate)
//   const spo2Values = allVitals.map(v => v.spo2)
//   const tempValues = allVitals.map(v => v.temperature)

//   const hrMin   = Math.min(...hrValues),   hrMax   = Math.max(...hrValues)
//   const spo2Min = Math.min(...spo2Values), spo2Max = Math.max(...spo2Values)
//   const tempMin = Math.min(...tempValues), tempMax = Math.max(...tempValues)

//   const hrTrend   = entryCount > 1 ? (allVitals.at(-1).heartRate   > allVitals[0].heartRate   ? 'increasing' : allVitals.at(-1).heartRate   < allVitals[0].heartRate   ? 'decreasing' : 'stable') : 'stable'
//   const spo2Trend = entryCount > 1 ? (allVitals.at(-1).spo2        < allVitals[0].spo2        ? 'decreasing' : allVitals.at(-1).spo2        > allVitals[0].spo2        ? 'increasing' : 'stable') : 'stable'
//   const tempTrend = entryCount > 1 ? (allVitals.at(-1).temperature > allVitals[0].temperature ? 'increasing' : allVitals.at(-1).temperature < allVitals[0].temperature ? 'decreasing' : 'stable') : 'stable'

//   const prompt = `You are an experienced clinical decision support AI assistant. Analyze the following patient vitals comprehensively and return ONLY a raw JSON object — no markdown, no explanation outside the JSON.

// PATIENT VITALS:
// Latest Reading:
// - Heart Rate: ${vitals.heartRate} bpm
// - SpO2 (Oxygen Saturation): ${vitals.spo2}%
// - Temperature: ${vitals.temperature}°C
// - Total readings recorded: ${entryCount}

// Trend Analysis (across all ${entryCount} readings):
// - Heart Rate: ${hrTrend} (range: ${hrMin}–${hrMax} bpm)
// - SpO2: ${spo2Trend} (range: ${spo2Min}–${spo2Max}%)
// - Temperature: ${tempTrend} (range: ${tempMin}–${tempMax}°C)

// CLINICAL REFERENCE RANGES:
// - Heart Rate normal: 60–100 bpm | Warning: <50 or >110 | Critical: <40 or >130
// - SpO2 normal: 95–100% | Warning: 90–94% | Critical: <90%
// - Temperature normal: 36.1–37.2°C | Low-grade fever: 37.3–38°C | Fever: 38–39°C | High fever: >39°C | Hypothermia: <35°C

// INSTRUCTIONS:
// Evaluate the patient for ALL of the following conditions where applicable:
// Cardiac: Tachycardia, Bradycardia, Sinus Tachycardia, Supraventricular Tachycardia risk, Hypertensive crisis risk, Cardiogenic shock risk
// Respiratory: Hypoxemia, Mild Hypoxia, Severe Hypoxemia, Respiratory distress, Hypoxic respiratory failure, COPD exacerbation risk
// Fever/Infection: Low-grade fever, Fever, High fever, Hyperpyrexia, Hypothermia, Sepsis risk, Septic shock risk
// Combined: Systemic Inflammatory Response (SIRS), Anaphylaxis pattern, Heat stroke risk, Compensatory tachycardia due to hypoxia
// If all vitals are normal, return a single condition "All Vitals Within Normal Range" with severity "normal"

// For risk_score (0–100):
// - Compute based on deviation from normal ranges
// - Each vital contributes independently
// - Trend penalties: if worsening trend, add 5–15 points

// Return ONLY this exact JSON structure:
// {
//   "conditions": [
//     {
//       "condition": "condition name",
//       "confidence": 0.00,
//       "severity": "normal|warning|critical",
//       "reason": "specific clinical reasoning referencing the actual values"
//     }
//   ],
//   "overall_risk": "low|moderate|high|critical",
//   "risk_score": 0,
//   "risk_breakdown": {
//     "heart_rate_contribution": 0,
//     "spo2_contribution": 0,
//     "temperature_contribution": 0,
//     "trend_penalty": 0,
//     "explanation": "plain English explanation of why this score was assigned, referencing actual values and what each vital contributed"
//   },
//   "summary": "A warm, humanised 3–4 sentence clinical narrative describing the patient's current condition, what the vitals suggest, how serious it is, and what to watch for. Write as if explaining to a concerned family member who is monitoring the patient.",
//   "recommendation": "Specific, prioritised, actionable steps the patient attendant should take right now. Be direct and practical."
// }`

//   const completion = await groq.chat.completions.create({
//     model: 'llama-3.3-70b-versatile',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.2,
//     max_tokens: 2048,
//   })

//   const raw = completion.choices[0]?.message?.content ?? ''
//   const jsonMatch = raw.match(/\{[\s\S]*\}/)
//   if (!jsonMatch) throw new Error('AI returned an unexpected response format. Please try again.')
//   return JSON.parse(jsonMatch[0])
// }

// ── ECG Image Analysis ───────────────────────────────────
// export async function analyzeECGImage(base64Image, mimeType = 'image/jpeg') {
//     const completion = await groq.chat.completions.create({
//       model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//       messages: [
//         {
//           role: 'user',
//           content: [
//             {
//               type: 'image_url',
//               image_url: {
//                 url: `data:${mimeType};base64,${base64Image}`,
//               },
//             },
//             {
//               type: 'text',
//               text: `You are an experienced cardiologist reviewing an ECG strip image. 
//   Analyze this ECG image thoroughly and write a professional medical report exactly in the following format. 
//   Use natural clinical language as a real doctor would write. Be specific about what you observe in the waveform.
  
//   Write your report in EXACTLY this format with these exact section headers:
  
//   RHYTHM: [one line — state the rhythm and approximate rate]
  
//   FINDINGS: [2-3 sentences describing what you observe in the ECG — P waves, QRS complexes, ST segments, T waves, intervals, any notable features]
  
//   INTERPRETATION: [2-3 sentences of your clinical interpretation — what these findings suggest, how serious it is, what condition this may indicate]
  
//   RECOMMENDATION: [2-3 sentences of specific actionable advice for the person monitoring this patient right now]
  
//   URGENCY: [exactly one word — Routine or Urgent or Emergency]
  
//   SEVERITY: [exactly one word — normal or warning or critical]
  
//   Important: Write as a real cardiologist. Be specific to what you actually see in this ECG image. Do not be generic.`,
//             },
//           ],
//         },
//       ],
//       temperature: 0.3,
//       max_tokens:  1024,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
  
//     // Parse sections
//     function extractSection(text, section) {
//       const regex = new RegExp(`${section}:\\s*([\\s\\S]*?)(?=\\n[A-Z]+:|$)`, 'i')
//       const match = text.match(regex)
//       return match ? match[1].trim() : ''
//     }
  
//     return {
//       rhythm:         extractSection(raw, 'RHYTHM'),
//       findings:       extractSection(raw, 'FINDINGS'),
//       interpretation: extractSection(raw, 'INTERPRETATION'),
//       recommendation: extractSection(raw, 'RECOMMENDATION'),
//       urgency:        extractSection(raw, 'URGENCY').toLowerCase().trim(),
//       severity:       extractSection(raw, 'SEVERITY').toLowerCase().trim(),
//       raw,
//     }
//   }
  

//


// export async function analyzeECGImage(base64Image, mimeType = 'image/jpeg') {
//     const completion = await groq.chat.completions.create({
//       model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//       messages: [
//         {
//           role: 'user',
//           content: [
//             {
//               type: 'image_url',
//               image_url: {
//                 url: `data:${mimeType};base64,${base64Image}`,
//               },
//             },
//             {
//               type: 'text',
//               text: `You are a senior cardiologist writing a concise ECG report. Analyze this ECG image.
  
//   Respond in EXACTLY this format. Each section is ONE line only. No asterisks, no markdown, no bold text, no extra formatting.
  
//   RHYTHM: [rhythm name and rate only — max 10 words]
//   FINDINGS: [2 sentences max — only what you directly observe in this image]
//   INTERPRETATION: [2 sentences max — clinical meaning of findings]
//   RECOMMENDATION: [2 sentences max — specific next steps]
//   URGENCY: [one word only: Routine or Urgent or Emergency]
//   SEVERITY: [one word only: normal or warning or critical]
  
//   Rules:
//   - Do NOT repeat content from one section in another
//   - Do NOT use asterisks or markdown
//   - Do NOT write more than stated limits
//   - Be specific to what you see in THIS image`,
//             },
//           ],
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 600,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
  
//     // Clean and extract — stops at next section header
//     function extractSection(text, section) {
//       const lines = text.split('\n')
//       const idx   = lines.findIndex(l =>
//         l.trim().toUpperCase().startsWith(`${section}:`)
//       )
//       if (idx === -1) return ''
//       // Extract only the content after the colon on that line
//       const content = lines[idx].replace(new RegExp(`^${section}:\\s*`, 'i'), '').trim()
//       // Remove any trailing markdown artifacts like **
//       return content.replace(/\*\*/g, '').trim()
//     }
  
//     return {
//       rhythm:         extractSection(raw, 'RHYTHM'),
//       findings:       extractSection(raw, 'FINDINGS'),
//       interpretation: extractSection(raw, 'INTERPRETATION'),
//       recommendation: extractSection(raw, 'RECOMMENDATION'),
//       urgency:        extractSection(raw, 'URGENCY').toLowerCase().trim(),
//       severity:       extractSection(raw, 'SEVERITY').toLowerCase().trim(),
//       raw,
//     }
//   }
  
  // In groqService.js — add this
// export async function analyzeECGWithHF(base64Image) {
//     // Step 1 — HuggingFace classifies the ECG image
//     const blob = base64ToBlob(base64Image)
    
//     const hfResponse = await fetch(
//       'https://api-inference.huggingface.co/models/Devaansh/ECG-image-classification',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
//           'Content-Type': 'application/octet-stream',
//         },
//         body: blob,
//       }
//     )
//     const classifications = await hfResponse.json()
//     // Returns: [{ label: "Normal", score: 0.91 }, { label: "MI", score: 0.06 }, ...]
  
//     // Step 2 — Feed classification result into Groq for clinical explanation
//     const topResult   = classifications[0]
//     const allResults  = classifications.map(c => `${c.label}: ${(c.score * 100).toFixed(1)}%`).join(', ')
  
//     const completion = await groq.chat.completions.create({
//       model: 'llama-3.3-70b-versatile',
//       messages: [{
//         role: 'user',
//         content: `You are a senior cardiologist. An ECG image classification model produced these results:
//   Top prediction: ${topResult.label} (${(topResult.score * 100).toFixed(1)}% confidence)
//   All predictions: ${allResults}
  
//   Write a concise clinical report in EXACTLY this format. No asterisks, no markdown, one line per section:
  
//   RHYTHM: [rhythm based on classification — max 10 words]
//   FINDINGS: [2 sentences — clinical findings for ${topResult.label}]
//   INTERPRETATION: [2 sentences — what this means for the patient]
//   RECOMMENDATION: [2 sentences — specific next steps]
//   URGENCY: [one word: Routine or Urgent or Emergency]
//   SEVERITY: [one word: normal or warning or critical]`,
//       }],
//       temperature: 0.1,
//       max_tokens: 500,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
  
//     function extractSection(text, section) {
//       const lines = text.split('\n')
//       const idx   = lines.findIndex(l => l.trim().toUpperCase().startsWith(`${section}:`))
//       if (idx === -1) return ''
//       return lines[idx].replace(new RegExp(`^${section}:\\s*`, 'i'), '').replace(/\*\*/g, '').trim()
//     }
  
//     return {
//       hfClassification: classifications,   // raw ML output
//       rhythm:           extractSection(raw, 'RHYTHM'),
//       findings:         extractSection(raw, 'FINDINGS'),
//       interpretation:   extractSection(raw, 'INTERPRETATION'),
//       recommendation:   extractSection(raw, 'RECOMMENDATION'),
//       urgency:          extractSection(raw, 'URGENCY').toLowerCase(),
//       severity:         extractSection(raw, 'SEVERITY').toLowerCase(),
//       raw,
//     }
//   }
  
//   function base64ToBlob(base64) {
//     const bytes = atob(base64)
//     const arr   = new Uint8Array(bytes.length)
//     for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
//     return new Blob([arr], { type: 'image/jpeg' })
//   }
  
// ── ECG Analysis — HuggingFace + Groq ───────────────────
// function base64ToBlob(base64) {
//     const bytes = atob(base64)
//     const arr   = new Uint8Array(bytes.length)
//     for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
//     return new Blob([arr], { type: 'image/jpeg' })
//   }
  
  // Retry HF call up to 3 times (handles cold start)
//   async function callHFWithRetry(base64, retries = 3, delayMs = 5000) {
//     const HF_MODELS = [
//       'Devaansh/ECG-image-classification',
//       'nickmuchi/efficientnet-b0-finetuned-ecg',
//       'DunnBC22/vit-base-patch16-224-in21k_ECG_Pulse_Classification',
//     ]
  
//     for (const model of HF_MODELS) {
//       for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//           console.log(`Trying model: ${model}, attempt ${attempt}`)
//           const res = await fetch(
//             `https://api-inference.huggingface.co/models/${model}`,
//             {
//               method:  'POST',
//               headers: {
//                 Authorization:  `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
//                 'Content-Type': 'application/octet-stream',
//               },
//               body: base64ToBlob(base64),
//             }
//           )
  
//           if (!res.ok) {
//             const err = await res.json()
//             // Model loading — wait and retry
//             if (err?.error?.includes('loading')) {
//               console.log(`Model loading, waiting ${delayMs}ms...`)
//               await new Promise(r => setTimeout(r, delayMs))
//               continue
//             }
//             throw new Error(err?.error || `HTTP ${res.status}`)
//           }
  
//           const data = await res.json()
  
//           // HF returns array of {label, score} — validate
//           if (Array.isArray(data) && data.length > 0 && data[0].label) {
//             console.log(`✓ Got result from ${model}:`, data)
//             return { model, classifications: data }
//           }
  
//           throw new Error('Unexpected response format')
//         } catch (err) {
//           console.warn(`Attempt ${attempt} failed for ${model}:`, err.message)
//           if (attempt === retries) break  // try next model
//           await new Promise(r => setTimeout(r, 2000))
//         }
//       }
//     }
//     return null  // all models failed — fall back to Groq Vision
//   }
  

  //

//   export async function analyzeECGWithHF(base64Image, mimeType = 'image/jpeg') {
//     let hfResult  = null
//     let usedModel = 'groq-vision-fallback'
  
//     // ── Try HuggingFace specialized model first ──────────
//     const hfResponse = await callHFWithRetry(base64Image)
  
//     if (hfResponse) {
//       hfResult  = hfResponse.classifications
//       usedModel = hfResponse.model
//     }
  
//     // ── Build Groq prompt ─────────────────────────────────
//     let groqPrompt = ''
  
//     if (hfResult) {
//       const topResult  = hfResult[0]
//       const allResults = hfResult
//         .map(c => `${c.label}: ${(c.score * 100).toFixed(1)}%`)
//         .join(', ')
  
//       groqPrompt = `You are a senior cardiologist. An ECG image classification ML model (trained on real ECG datasets) produced these results:
  
//   Top prediction: ${topResult.label} (${(topResult.score * 100).toFixed(1)}% confidence)
//   All class probabilities: ${allResults}
  
//   Based on these ML classification results, write a concise clinical ECG report.`
//     } else {
//       // Fallback — send image directly to Groq Vision
//       console.log('HF failed — falling back to Groq Vision')
//       const visionCompletion = await groq.chat.completions.create({
//         model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//         messages: [{
//           role: 'user',
//           content: [
//             {
//               type: 'image_url',
//               image_url: { url: `data:${mimeType};base64,${base64Image}` },
//             },
//             {
//               type: 'text',
//               text: 'You are a senior cardiologist. Analyze this ECG image. Describe exactly what rhythm, rate, and abnormalities you observe. Be specific.',
//             },
//           ],
//         }],
//         temperature: 0.1,
//         max_tokens:  400,
//       })
//       groqPrompt = `You are a senior cardiologist. Based on this ECG observation:
//   "${visionCompletion.choices[0]?.message?.content}"
//   Write a clinical ECG report.`
//     }
  
//     // ── Groq clinical report ──────────────────────────────
//     groqPrompt += `
  
//   Write the report in EXACTLY this format. One line per section. No asterisks. No markdown. No repeating content across sections:
  
//   RHYTHM: [rhythm and rate — max 10 words]
//   FINDINGS: [2 sentences — specific observable findings]
//   INTERPRETATION: [2 sentences — clinical meaning]
//   RECOMMENDATION: [2 sentences — actionable next steps]
//   URGENCY: [one word: Routine or Urgent or Emergency]
//   SEVERITY: [one word: normal or warning or critical]`
  
//     const completion = await groq.chat.completions.create({
//       model:       'llama-3.3-70b-versatile',
//       messages:    [{ role: 'user', content: groqPrompt }],
//       temperature: 0.1,
//       max_tokens:  500,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
  
//     function extractSection(text, section) {
//       const lines = text.split('\n')
//       const idx   = lines.findIndex(l =>
//         l.trim().toUpperCase().startsWith(`${section}:`)
//       )
//       if (idx === -1) return ''
//       return lines[idx]
//         .replace(new RegExp(`^${section}:\\s*`, 'i'), '')
//         .replace(/\*\*/g, '')
//         .trim()
//     }
  
//     return {
//       hfClassification: hfResult,
//       usedModel,
//       rhythm:           extractSection(raw, 'RHYTHM'),
//       findings:         extractSection(raw, 'FINDINGS'),
//       interpretation:   extractSection(raw, 'INTERPRETATION'),
//       recommendation:   extractSection(raw, 'RECOMMENDATION'),
//       urgency:          extractSection(raw, 'URGENCY').toLowerCase(),
//       severity:         extractSection(raw, 'SEVERITY').toLowerCase(),
//       raw,
//     }
//   }
  

// export async function analyzeECGWithHF(base64Image, mimeType = 'image/jpeg') {

//     // ── Step 1: Gemini Vision analyzes ECG image ─────────
//     let geminiObservation = null
  
//     try {
//       const model  = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
//       const result = await model.generateContent([
//         {
//           inlineData: {
//             mimeType,
//             data: base64Image,
//           },
//         },
//         `You are a senior cardiologist with 20 years of experience reading ECGs.
//   Carefully examine this ECG image and describe ONLY what you directly observe.
  
//   Answer each point specifically based on what you see:
//   1. Is the rhythm regular or irregular?
//   2. What is the approximate heart rate (count R-R intervals if visible)?
//   3. Are P waves present and normal?
//   4. What is the PR interval (normal: 120–200ms)?
//   5. Are QRS complexes narrow (<120ms) or wide?
//   6. Is the ST segment elevated, depressed, or normal?
//   7. Are T waves upright, inverted, or flat?
//   8. Any other notable findings (Q waves, bundle branch block, axis deviation)?
  
//   Be specific and concise. Only describe what you can actually see.`,
//       ])
  
//       geminiObservation = result.response.text()
//       console.log('Gemini ECG observation:', geminiObservation)
//     } catch (err) {
//       console.error('Gemini Vision failed:', err.message)
//       throw new Error(`Gemini API error: ${err.message}. Check your VITE_GEMINI_API_KEY.`)
//     }
  
//     // ── Step 2: Groq converts observation into clinical report ──
//     const completion = await groq.chat.completions.create({
//       model: 'llama-3.3-70b-versatile',
//       messages: [{
//         role: 'user',
//         content: `You are a senior cardiologist writing a formal ECG report.
//   Based on the following ECG observations made by another cardiologist:
  
//   "${geminiObservation}"
  
//   Write a formal clinical ECG report in EXACTLY this format.
//   Each section on its own line. No asterisks. No markdown. No bullet points.
//   Do NOT repeat the same content across sections.
  
//   RHYTHM: [rhythm name and rate — one line, max 12 words]
//   FINDINGS: [2 sentences — key observable findings from the observations above]
//   INTERPRETATION: [2 sentences — clinical significance and possible diagnosis]
//   RECOMMENDATION: [2 sentences — specific actionable next steps for the attendant]
//   URGENCY: [one word only: Routine or Urgent or Emergency]
//   SEVERITY: [one word only: normal or warning or critical]`,
//       }],
//       temperature: 0.1,
//       max_tokens:  600,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
//     console.log('Groq clinical report:', raw)
  
//     function extractSection(text, section) {
//       const lines = text.split('\n')
//       const idx   = lines.findIndex(l =>
//         l.trim().toUpperCase().startsWith(`${section}:`)
//       )
//       if (idx === -1) return ''
//       return lines[idx]
//         .replace(new RegExp(`^${section}:\\s*`, 'i'), '')
//         .replace(/\*\*/g, '')
//         .trim()
//     }
  
//     return {
//       geminiObservation,              // raw Gemini output — useful for debugging
//       hfClassification: null,         // no HF model used
//       usedModel:        'gemini-2.0-flash + groq',
//       rhythm:           extractSection(raw, 'RHYTHM'),
//       findings:         extractSection(raw, 'FINDINGS'),
//       interpretation:   extractSection(raw, 'INTERPRETATION'),
//       recommendation:   extractSection(raw, 'RECOMMENDATION'),
//       urgency:          extractSection(raw, 'URGENCY').toLowerCase(),
//       severity:         extractSection(raw, 'SEVERITY').toLowerCase(),
//       raw,
//     }
//   }


export async function analyzeECGImage(base64Image, mimeType = 'image/jpeg') {
    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
            {
              type: 'text',
              text: `You are a senior cardiologist writing a concise ECG report. Analyze this ECG image.
  
  Respond in EXACTLY this format. Each section is ONE line only. No asterisks, no markdown, no bold text, no extra formatting.
  
  RHYTHM: [rhythm name and rate only — max 10 words]
  FINDINGS: [2 sentences max — only what you directly observe in this image]
  INTERPRETATION: [2 sentences max — clinical meaning of findings]
  RECOMMENDATION: [2 sentences max — specific next steps]
  URGENCY: [one word only: Routine or Urgent or Emergency]
  SEVERITY: [one word only: normal or warning or critical]
  
  Rules:
  - Do NOT repeat content from one section in another
  - Do NOT use asterisks or markdown
  - Do NOT write more than stated limits
  - Be specific to what you see in THIS image`,
            },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 600,
    })
  
    const raw = completion.choices[0]?.message?.content ?? ''
  
    // Clean and extract — stops at next section header
    function extractSection(text, section) {
      const lines = text.split('\n')
      const idx   = lines.findIndex(l =>
        l.trim().toUpperCase().startsWith(`${section}:`)
      )
      if (idx === -1) return ''
      // Extract only the content after the colon on that line
      const content = lines[idx].replace(new RegExp(`^${section}:\\s*`, 'i'), '').trim()
      // Remove any trailing markdown artifacts like **
      return content.replace(/\*\*/g, '').trim()
    }
  
    return {
      rhythm:         extractSection(raw, 'RHYTHM'),
      findings:       extractSection(raw, 'FINDINGS'),
      interpretation: extractSection(raw, 'INTERPRETATION'),
      recommendation: extractSection(raw, 'RECOMMENDATION'),
      urgency:        extractSection(raw, 'URGENCY').toLowerCase().trim(),
      severity:       extractSection(raw, 'SEVERITY').toLowerCase().trim(),
      raw,
    }
  }
  
 // Add to your existing groqService.js
// export async function analyzePDFReport(pdfText) {
//     const completion = await groq.chat.completions.create({
//       model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//       messages: [{
//         role: 'user',
//         content: `Extract all medical conditions, diagnoses, and findings from this medical report text. Return ONLY an array of short phrases (max 5 words each).
  
//   Medical report:
//   ${pdfText.substring(0, 12000)}
  
//   Example output:
//   ["Bradycardia", "Hypoxemia", "ST elevation", "Atrial fibrillation"]`
//       }]
//     })
    
//     // Simple parsing - assumes LLM follows instructions
//     const findings = completion.choices[0].message.content
//       .replace(/[\[\]"']/g, '')
//       .split(',')
//       .map(f => f.trim())
//       .filter(f => f.length > 2 && f.length < 50)
    
//     return findings.slice(0, 10)  // Top 10 findings
//   }
   

// export async function analyzePDFReport(pdfText) {
//     try {
//       const completion = await groq.chat.completions.create({
//         model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//         messages: [{
//           role: 'system',
//           content: 'You are a medical report analyzer. Extract ONLY medical conditions, diagnoses, symptoms, and findings as a clean JSON array. No explanations.'
//         }, {
//           role: 'user',
//           content: `Extract all medical conditions, diagnoses, findings from this report:
  
//   ${pdfText.substring(0, 12000)}
  
//   Respond ONLY with valid JSON array like:
//   ["Bradycardia", "Hypoxemia", "ST elevation", "Atrial fibrillation", "Chest pain"]`
//         }],
//         temperature: 0.1,
//         max_tokens: 500
//       })
      
//       const content = completion.choices[0].message.content.trim()
      
//       // Parse JSON array safely
//       let findings = []
//       try {
//         // Try direct JSON parse first
//         findings = JSON.parse(content)
//       } catch {
//         // Fallback: regex + cleanup
//         findings = content
//           .replace(/^\[|\]$/g, '')
//           .replace(/["'\[\]]/g, '')
//           .split(/[,;\n]/)
//           .map(f => f.trim())
//           .filter(f => f.length > 2 && f.length < 50)
//           .slice(0, 15)
//       }
      
//       return Array.isArray(findings) ? findings : []
      
//     } catch (error) {
//       console.error('Groq analysis failed:', error)
//       return []
//     }
//   }
  



// working // 

// src/services/groqService.js

// Demo PDF analyzer (no API call)
// src/services/groqService.js

// --- 1. ANALYZE PDF REPORT ---
//
// export async function analyzePDFReport(pdfText) {
//     // Just show what actually arrived
//     console.log('📄 PDF text (length):', pdfText.length)
//     console.log('📄 PDF snippet:', pdfText.substring(0, 200))
  
//     // If very short, don’t call LLM, show message
//     if (!pdfText || pdfText.length < 50) {
//       return {
//         clinicalContext:   'No valid report text received',
//         riskProfile:       'Skipped (empty or too short)',
//         medicalHistory:    'Skipped (empty or too short)',
//         vitalsAndLabs:     'Skipped (empty or too short)',
//         imagingAndTests:   'Skipped (empty or too short)',
//         keyDiagnoses:      'None clearly stated',
//         additionalFindings:'None clearly stated',
//         impression:        'Insufficient text to analyze',
//         recommendation:    'Provide a longer, valid medical report',
//         urgency:           'routine',
//         severity:          'normal',
//       }
//     }
  
//     const completion = await groq.chat.completions.create({
//       model: 'meta-llama/llama-4-scout-17b-16e-instruct',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a senior cardiologist/internist writing a concise clinical report from a medical PDF. ' +
//             'Use only ONE line per section and no extra headings/markdown. ' +
//             'If the text is too short or invalid, say so, but still return the same keys.',
//         },
//         {
//           role: 'user',
//           content: `Medical report (sometimes short or noisy):
  
//   ${pdfText.slice(0, 10000)}
  
//   Respond in EXACTLY this format (1 line each, no extra info):
  
//   CLINICAL CONTEXT: [presenting complaint / indication — 3–8 words]
//   RISK PROFILE: [age, sex, risk factors — 1 sentence]
//   MEDICAL HISTORY: [past conditions — 1 sentence]
//   VITALS & LABS: [HR, BP, SpO₂, temps, labs — 1–2 sentences]
//   IMAGING & TESTS: [ECG, echo, CT, etc. — 1–2 sentences]
//   KEY DIAGNOSES: [2–4 conditions — 1 sentence]
//   ADDITIONAL FINDINGS: [other notable findings — 1 sentence]
//   IMPRESSION: [2 sentences: overall status and risk]
//   RECOMMENDATION: [2 sentences: next steps, referrals, monitoring]
//   URGENCY: [one word only: Routine or Urgent or Emergency]
//   SEVERITY: [one word only: stable or unstable or critical]
  
//   Rules:
//   - Do NOT invent new conditions not supported by the text
//   - Do NOT add extra headers or explanations
//   - If text is empty or meaningless, say “No valid report text”`
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 800,
//     })
  
//     const raw = completion.choices[0]?.message?.content ?? ''
  
//     function extractSection(text, section) {
//       const lines = text.split('\n')
//       const idx = lines.findIndex(l => l.trim().toUpperCase().startsWith(`${section}:`))
//       if (idx === -1) return section === 'URGENCY' || section === 'SEVERITY'
//         ? 'routine'
//         : `No valid ${section.toLowerCase().replace(' & ', '_').replace(' ', '_')}.`
//       const content = lines[idx].replace(new RegExp(`^${section}:\\s*`, 'i'), '').trim()
//       return content.replace(/\*\*/g, '').trim() || 'Information not specified'
//     }
  
//     return {
//       clinicalContext:   extractSection(raw, 'CLINICAL CONTEXT'),
//       riskProfile:       extractSection(raw, 'RISK PROFILE'),
//       medicalHistory:    extractSection(raw, 'MEDICAL HISTORY'),
//       vitalsAndLabs:     extractSection(raw, 'VITALS & LABS'),
//       imagingAndTests:   extractSection(raw, 'IMAGING & TESTS'),
//       keyDiagnoses:      extractSection(raw, 'KEY DIAGNOSES'),
//       additionalFindings:extractSection(raw, 'ADDITIONAL FINDINGS'),
//       impression:        extractSection(raw, 'IMPRESSION'),
//       recommendation:    extractSection(raw, 'RECOMMENDATION'),
//       urgency:           extractSection(raw, 'URGENCY').toLowerCase().trim(),
//       severity:          extractSection(raw, 'SEVERITY').toLowerCase().trim(),
//       raw,
//     }
//   }
  

  // above working //

  export async function analyzePDFReport(pdfText) {
    console.log('📄 PDF TEXT length (analyzePDFReport):', pdfText.length)
    console.log('📄 PDF TEXT (analyzePDFReport):', pdfText.substring(0, 100))
  
    // If you still want a client‑side fallback when text is empty
    if (!pdfText || pdfText.length < 50) {
      console.log('⚠️ Text too short → fallback')
      return {
        clinicalContext: 'Unable to read report text; use a text‑based PDF.',
        riskProfile: 'No risk profile available.',
        medicalHistory: 'No medical history mentioned.',
        vitalsAndLabs: 'No vitals or labs mentioned.',
        imagingAndTests: 'No imaging or tests mentioned.',
        keyDiagnoses: 'No clear diagnosis.',
        additionalFindings: 'No additional findings.',
        impression: 'Insufficient information to form an impression.',
        recommendation: 'Provide a longer, text‑based medical report.',
        urgency: 'routine',
        severity: 'normal',
      }
    }
  
    let completion
    try {
      completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `You are a senior cardiologist and internist writing a clinical report from this medical PDF text:
  
  ${pdfText.slice(0, 10000)}
  
  Respond in EXACTLY this format. Each section is ONE line only. No asterisks, markdown, bold, etc.
  
  CLINICAL CONTEXT: [presenting complaint / indication — 3–7 words]
  RISK PROFILE: [age, sex, risk factors — 1 sentence]
  MEDICAL HISTORY: [past conditions — 1 sentence]
  VITALS & LABS: [HR, BP, SpO₂, labs — 1–2 sentences]
  IMAGING & TESTS: [ECG, echo, CT, etc. — 1–2 sentences]
  KEY DIAGNOSES: [2–4 main conditions — 1 sentence]
  ADDITIONAL FINDINGS: [other findings — 1 sentence]
  IMPRESSION: [2 sentences: overall status and risk]
  RECOMMENDATION: [2 sentences: next steps]
  URGENCY: [one word only: Routine or Urgent or Emergency]
  SEVERITY: [one word only: stable or unstable or critical]
  
  Rules:
  - Do NOT repeat content between sections
  - Do NOT use markdown, bold, or lists
  - Do NOT add extra headings or explanations`
          },
        ],
        temperature: 0.1,
        max_tokens: 800,
      })
    } catch (e) {
      console.error('❌ Groq call failed:', e)
      return {
        clinicalContext: 'Grok API call failed; check network or API key.',
        riskProfile: 'Unavailable.',
        medicalHistory: 'Unavailable.',
        vitalsAndLabs: 'Unavailable.',
        imagingAndTests: 'Unavailable.',
        keyDiagnoses: 'Unavailable.',
        additionalFindings: 'Unavailable.',
        impression: 'Summary not generated due to connection error.',
        recommendation: 'Try again later or check your API key and network.',
        urgency: 'routine',
        severity: 'unknown',
      }
    }
  
    // ✅ SAFER raw extraction
    const choice = completion?.choices?.[0]
    if (!choice) {
      console.warn('⚠️ No choices in Groq response')
      return {
        clinicalContext: 'No response from Groq; check API or model.',
        riskProfile: 'Unavailable.',
        medicalHistory: 'Unavailable.',
        vitalsAndLabs: 'Unavailable.',
        imagingAndTests: 'Unavailable.',
        keyDiagnoses: 'Unavailable.',
        additionalFindings: 'Unavailable.',
        impression: 'Response malformed or empty.',
        recommendation: 'Check API key and model availability.',
        urgency: 'routine',
        severity: 'unknown',
      }
    }
  
    const raw = choice.message?.content ?? ''
    console.log('🔍 RAW Groq response:', raw.slice(0, 300))
  
    // If raw is empty or garbage, fallback
    if (!raw || raw.trim().length < 10) {
      console.warn('⚠️ Groq returned empty/short raw text')
      return {
        clinicalContext: 'Grok returned no usable text.',
        riskProfile: 'No risk profile available.',
        medicalHistory: 'No medical history available.',
        vitalsAndLabs: 'No vitals or labs available.',
        imagingAndTests: 'No imaging or tests available.',
        keyDiagnoses: 'No diagnosis available.',
        additionalFindings: 'No additional findings.',
        impression: 'Unable to interpret report due to Grok‑side issue.',
        recommendation: 'Verify Grok API key, model, and prompt structure.',
        urgency: 'routine',
        severity: 'unknown',
      }
    }
  
    // ✅ Your existing extractSection (no breaking change)
    function extractSection(text, section) {
      const lines = text.split('\n')
      const idx = lines.findIndex((l) => l.trim().toUpperCase().startsWith(`${section}:`))
      if (idx === -1) return section.includes('URGENCY') || section.includes('SEVERITY')
        ? 'routine' : 'Information not available'
  
      const content = lines[idx].replace(new RegExp(`^${section}:\\s*`, 'i'), '').trim()
      return content.replace(/\*\*/g, '').trim() || 'No valid report text'
    }
  
    const urgencyRaw = extractSection(raw, 'URGENCY').toLowerCase().trim()
    const severityRaw = extractSection(raw, 'SEVERITY').toLowerCase().trim()
  
    return {
      clinicalContext:   extractSection(raw, 'CLINICAL CONTEXT'),
      riskProfile:       extractSection(raw, 'RISK PROFILE'),
      medicalHistory:    extractSection(raw, 'MEDICAL HISTORY'),
      vitalsAndLabs:     extractSection(raw, 'VITALS & LABS'),
      imagingAndTests:   extractSection(raw, 'IMAGING & TESTS'),
      keyDiagnoses:      extractSection(raw, 'KEY DIAGNOSES'),
      additionalFindings:extractSection(raw, 'ADDITIONAL FINDINGS'),
      impression:        extractSection(raw, 'IMPRESSION'),
      recommendation:    extractSection(raw, 'RECOMMENDATION'),
      urgency: urgencyRaw === '' ? 'routine' : urgencyRaw,
      severity: severityRaw === '' ? 'normal' : severityRaw,
      raw,
    }
  }
  
  
// Add this to your groqService.js

export async function compareReportWithVitals(pdfSummary, liveVitals, aiPredictions) {
    const predictionsText = aiPredictions.map(p => `${p.condition} (${(p.confidence * 100).toFixed(0)}% confidence)`).join(', ');
    
    const prompt = `
      You are a senior medical consultant. Compare a patient's historical medical report against their current live vitals and AI risk predictions.
      
      HISTORICAL REPORT SUMMARY:
      ${pdfSummary}
  
      LIVE VITALS:
      - HR: ${liveVitals.heartRate} bpm, SpO2: ${liveVitals.spo2}%, Temp: ${liveVitals.temperature}°C
  
      AI PREDICTIONS FROM LIVE VITALS:
      ${predictionsText}
  
      Analyze if the live data supports the clinical report or if there is a new acute deviation.
      Respond in EXACTLY this format (JSON):
      {
        "vitalsSummary": "Briefly describe current vitals state",
        "predictionsSummary": "Summary of AI detected conditions",
        "interpretation": "1-2 sentences on how the report and vitals correlate or conflict",
        "severity": "Stable | Guarded | Unstable | Critical",
        "urgency": "Routine | Urgent | Emergency",
        "concordanceScore": 0.0 to 1.0 (how well they match)
      }
    `;
  
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });
  
    return JSON.parse(completion.choices[0].message.content);
  }  


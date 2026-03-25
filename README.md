# Vital-AI — AI-Based Vital Analysis & Health Prediction System

A full-stack AI health monitoring web application that analyzes human vital
parameters using machine learning and large language models to predict health
conditions, analyze ECG images, and compare results against uploaded medical reports.

---

## Overview

Vital-AI collects and analyzes heart rate, SpO2, temperature, and ECG waveform
data to generate real-time health risk assessments. It integrates vision-capable
LLMs for ECG image interpretation and PDF parsing for comparison against
ground-truth medical reports — all from the browser, with no backend dependency.

---

## Features

- **Vitals Dashboard** — Input and visualize heart rate, SpO2, and temperature with live trend charts and alert detection
- **AI Health Prediction** — ML-based risk scoring with confidence levels and severity classification (normal / warning / critical)
- **ECG Image Analysis** — Upload ECG waveform images for AI-generated rhythm classification and doctor-style clinical reports
- **Medical Report Comparison** — Upload real medical PDF reports, extract conditions using NLP, and match against AI predictions
- **Session Export** — Export full vitals + prediction summary as a downloadable PDF
- **AI Health Chatbot** — Conversational assistant for health queries and ECG explanation

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | TailwindCSS |
| State Management | Zustand |
| LLM | Groq API (Llama-4 Scout Vision) |
| ECG Classification | HuggingFace Inference API |
| PDF Extraction | pdfjs-dist |
| Icons | Lucide React |
| Routing | React Router DOM |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Groq API Key — [console.groq.com](https://console.groq.com)
- HuggingFace API Token — [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- Gemini API Key (optional) — [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/vital-ai.git
cd vital-ai
npm install
cp .env.example .env

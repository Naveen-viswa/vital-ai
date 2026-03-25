import { Routes, Route } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import HomePage from '../features/home/HomePage'
import DashboardPage from '../features/dashboard/DashboardPage'
import VitalsPage from '../features/vitals/VitalsPage'
import PredictionPage from '../features/prediction/PredictionPage'
import ECGPage from '../features/ecg/ECGPage'
import ReportsPage from '../features/reports/ReportsPage'
import ChatbotPage from '../features/chatbot/ChatbotPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<PageWrapper />}>
        <Route path="/dashboard"  element={<DashboardPage />}  />
        <Route path="/vitals"     element={<VitalsPage />}     />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/ecg"        element={<ECGPage />}        />
        <Route path="/reports"    element={<ReportsPage />}    />
        <Route path="/chatbot"    element={<ChatbotPage />}    />
      </Route>
    </Routes>
  )
}


import { parseCSV } from '../utils/csvParser'

export function parseVitalsFromCSV(fileText) {
  return parseCSV(fileText).map((row) => ({
    timestamp: row.timestamp || new Date().toISOString(),
    heartRate: parseFloat(row.heartRate || row.heart_rate),
    spo2:      parseFloat(row.spo2 || row.SpO2),
    temperature: parseFloat(row.temperature || row.temp),
    ecg:       parseFloat(row.ecg || row.ECG || 0),
  }))
}

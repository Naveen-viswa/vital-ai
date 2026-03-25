export const VITALS_META = {
    heartRate: {
      label: 'Heart Rate',
      unit: 'bpm',
      icon: 'Heart',
      ranges: { normal: [60, 100], warning: [50, 110], critical: [0, 40] },
      color: '#f43f5e',
    },
    spo2: {
      label: 'SpO₂',
      unit: '%',
      icon: 'Wind',
      ranges: { normal: [95, 100], warning: [90, 94], critical: [0, 89] },
      color: '#3b82f6',
    },
    temperature: {
      label: 'Temperature',
      unit: '°C',
      icon: 'Thermometer',
      ranges: { normal: [36.1, 37.2], warning: [37.3, 38.4], critical: [39, 999] },
      color: '#f59e0b',
    },
    ecg: {
      label: 'ECG',
      unit: 'mV',
      icon: 'Activity',
      color: '#10b981',
    },
  }
  
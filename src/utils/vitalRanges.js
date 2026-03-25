import { VITALS_META } from '../constants/vitals'

export function getVitalStatus(key, value) {
  const meta = VITALS_META[key]
  if (!meta?.ranges) return 'info'
  const { normal, warning } = meta.ranges
  if (value >= normal[0] && value <= normal[1]) return 'normal'
  if (value >= warning[0] && value <= warning[1]) return 'warning'
  return 'critical'
}

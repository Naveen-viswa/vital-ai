export function parseCSV(text) {
    const [headerLine, ...rows] = text.trim().split('\n')
    const headers = headerLine.split(',').map(h => h.trim())
    return rows.map(row => {
      const values = row.split(',').map(v => v.trim())
      return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
    })
  }
  
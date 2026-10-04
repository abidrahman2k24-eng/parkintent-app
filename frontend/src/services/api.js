const API_BASE = '/api'

export async function saveTrip(tripPayload) {
  const response = await fetch(`${API_BASE}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripPayload),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Save failed')
  }

  return data
}

export async function getRecentTrips() {
  try {
    const response = await fetch(`${API_BASE}/trips`)
    if (!response.ok) return []
    const data = await response.json()
    return data.trips || []
  } catch {
    return []
  }
}
// ============================================================
// PROTOTYPE / MOCK DATA
// These are placeholder values for a university assignment.
// They are NOT real parking predictions.
// They do NOT represent actual Chadstone Shopping Centre data.
// ============================================================

export const DESTINATION_OPTIONS = [
  { value: 'Chadstone Shopping Centre', label: 'Chadstone Shopping Centre' }
]

export const PARKING_AREA_OPTIONS = [
  { value: '', label: 'No preference' },
  { value: 'A', label: 'Parking Area A' },
  { value: 'B', label: 'Parking Area B' },
  { value: 'C', label: 'Parking Area C' }
]

export const FLEXIBILITY_OPTIONS = [
  { value: 'exact', label: 'Exact time' },
  { value: '1hr', label: '±1 hour' },
  { value: '2hr', label: '±2 hours' }
]

export const DURATION_OPTIONS = [
  { value: 'under5', label: 'Under 5 min' },
  { value: '5to10', label: '5–10 min' },
  { value: '10to20', label: '10–20 min' },
  { value: '20plus', label: '20+ min' }
]

export const OUTCOME_OPTIONS = [
  { value: 'asPlanned', label: 'Parked as planned' },
  { value: 'somewhereElse', label: 'Parked somewhere else' },
  { value: 'changedTime', label: 'Changed arrival time' },
  { value: 'changedDestination', label: 'Changed destination' },
  { value: 'gaveUp', label: 'Gave up' }
]

/**
 * MOCK parking confidence logic.
 * Returns a prototype result based on time-of-day patterns.
 * This is NOT real data — it is a demonstration for a university assignment.
 */
export function getParkingResult(arrivalTime, flexibility) {
  const hour = parseInt(arrivalTime.split(':')[0], 10)
  const areas = ['Parking Area A', 'Parking Area B', 'Parking Area C']

  let pressure, explanation, recommendedArea

  if (hour < 10) {
    pressure = 'low'
    explanation = 'Early morning — most parking areas typically available'
    recommendedArea = areas[0]
  } else if (hour < 12) {
    pressure = 'moderate'
    explanation = 'Late morning — parking filling up, some areas still open'
    recommendedArea = areas[1]
  } else if (hour < 14) {
    pressure = 'high'
    explanation = 'Peak hours — high demand expected across all areas'
    recommendedArea = areas[2]
  } else if (hour < 16) {
    pressure = 'moderate'
    explanation = 'Early afternoon — demand easing, more spaces likely'
    recommendedArea = areas[0]
  } else {
    pressure = 'low'
    explanation = 'Late afternoon/evening — lower demand expected'
    recommendedArea = areas[1]
  }

  const alternatives = []

  if (flexibility === '1hr' || flexibility === '2hr') {
    const altHour1 = (hour + 1) % 24
    const alt1 = getPressureForHour(altHour1)
    alternatives.push({ time: formatTime(altHour1), ...alt1 })
  }

  if (flexibility === '2hr') {
    const altHour2 = (hour + 2) % 24
    const alt2 = getPressureForHour(altHour2)
    alternatives.push({ time: formatTime(altHour2), ...alt2 })
  }

  return {
    originalTime: arrivalTime,
    pressure,
    explanation,
    recommendedArea,
    alternatives
  }
}

function getPressureForHour(hour) {
  const areas = ['Parking Area A', 'Parking Area B', 'Parking Area C']

  if (hour < 10) return { pressure: 'low', explanation: 'Early morning — most parking areas typically available', recommendedArea: areas[0] }
  if (hour < 12) return { pressure: 'moderate', explanation: 'Late morning — parking filling up, some areas still open', recommendedArea: areas[1] }
  if (hour < 14) return { pressure: 'high', explanation: 'Peak hours — high demand expected across all areas', recommendedArea: areas[2] }
  if (hour < 16) return { pressure: 'moderate', explanation: 'Early afternoon — demand easing, more spaces likely', recommendedArea: areas[0] }
  return { pressure: 'low', explanation: 'Late afternoon/evening — lower demand expected', recommendedArea: areas[1] }
}

function formatTime(hour) {
  const h = hour % 12 || 12
  const ampm = hour < 12 ? 'AM' : 'PM'
  return `${h}:00 ${ampm}`
}
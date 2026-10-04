import { useState, useEffect } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import SectionCard from '../components/SectionCard'
import { getRecentTrips } from '../services/api'
import './SuccessScreen.css'

function SuccessScreen({ tripData, outcome, parkingResult, onReset }) {
  const formatDisplayTime = (time) => {
    if (!time) return ''
    if (time.includes('AM') || time.includes('PM')) return time
    const [h, m] = time.split(':').map(Number)
    const hour12 = h % 12 || 12
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`
  }

  const getDurationLabel = (value) => {
    const map = {
      under5: 'Under 5 min',
      '5to10': '5–10 min',
      '10to20': '10–20 min',
      '20plus': '20+ min'
    }
    return map[value] || value
  }

  const getOutcomeLabel = (value) => {
    const map = {
      asPlanned: 'Parked as planned',
      somewhereElse: 'Parked somewhere else',
      changedTime: 'Changed arrival time',
      changedDestination: 'Changed destination',
      gaveUp: 'Gave up'
    }
    return map[value] || value
  }

  const getPressureLabel = (pressure) => {
    if (pressure === 'low') return 'Low Pressure'
    if (pressure === 'moderate') return 'Moderate Pressure'
    return 'High Pressure'
  }

  const [savedTrips, setSavedTrips] = useState([])

  useEffect(() => {
    getRecentTrips().then(setSavedTrips)
  }, [])

  return (
    <div className="success-screen">
      <div className="success-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#22C55E" />
          <path
            d="M20 32L28 40L44 24"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="success-title">Thank you!</h1>
      <p className="success-message">
        Your parking report has been submitted for this prototype session. It demonstrates how user outcomes could help improve future parking confidence estimates.
      </p>

      <SectionCard title="Trip Summary">
        <div className="summary-row">
          <span className="summary-label">Destination</span>
          <span className="summary-value">{tripData.destination}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Date</span>
          <span className="summary-value">{tripData.date}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Arrival Time</span>
          <span className="summary-value">{formatDisplayTime(tripData.arrivalTime)}</span>
        </div>
        {parkingResult && (
          <div className="summary-row">
            <span className="summary-label">Pressure Level</span>
            <span className="summary-value">{getPressureLabel(parkingResult.pressure)}</span>
          </div>
        )}
        <div className="summary-row">
          <span className="summary-label">Parking Duration</span>
          <span className="summary-value">{getDurationLabel(outcome.parkingDuration)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Outcome</span>
          <span className="summary-value">{getOutcomeLabel(outcome.whatHappened)}</span>
        </div>
      </SectionCard>

      <p className="success-note">
        Your trip report has been saved to the database.
      </p>

      {savedTrips.length > 0 && (
        <SectionCard title="Previously Saved Trips">
          {savedTrips.map((trip) => (
            <div key={trip.id} className="saved-trip-row">
              <span className="saved-trip-destination">{trip.destination}</span>
              <span className="saved-trip-detail">
                {trip.trip_date} · {formatDisplayTime(trip.arrival_time)}
              </span>
            </div>
          ))}
        </SectionCard>
      )}

      <PrimaryButton
        label="Plan Another Trip"
        onClick={onReset}
        variant="primary"
        fullWidth
      />
    </div>
  )
}

export default SuccessScreen
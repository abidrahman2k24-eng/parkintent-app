import PrimaryButton from '../components/PrimaryButton'
import SectionCard from '../components/SectionCard'
import { Badge } from '../components/ui/Badge'
import './ConfidenceScreen.css'

function ConfidenceScreen({
  parkingResult,
  tripData,
  onNavigate,
  onTripDataChange,
  onSetParkingResult
}) {
  if (!parkingResult) {
    return <p>No parking result available. Please go back and check parking.</p>
  }

  const getVariant = (pressure) => {
    if (pressure === 'low') return 'success'
    if (pressure === 'moderate') return 'warning'
    return 'danger'
  }

  const getBadgeColor = (pressure) => {
    if (pressure === 'low') return 'green'
    if (pressure === 'moderate') return 'amber'
    return 'red'
  }

  const getPressureLabel = (pressure) => {
    if (pressure === 'low') return 'Low Pressure'
    if (pressure === 'moderate') return 'Moderate Pressure'
    return 'High Pressure'
  }

  const formatDisplayTime = (time) => {
    if (!time) return ''
    if (time.includes('AM') || time.includes('PM')) return time
    const [h, m] = time.split(':').map(Number)
    const hour12 = h % 12 || 12
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`
  }

  const parseTimeToStorage = (displayTime) => {
    const match = displayTime.match(/(\d+):00\s*(AM|PM)/i)
    if (!match) return displayTime
    let [, h, ampm] = match
    h = parseInt(h, 10)
    if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12
    if (ampm.toUpperCase() === 'AM' && h === 12) h = 0
    return `${h.toString().padStart(2, '0')}:00`
  }

  const handleAcceptAlternative = (alt) => {
    const storageTime = parseTimeToStorage(alt.time)
    onTripDataChange({ ...tripData, arrivalTime: storageTime })
    onSetParkingResult({
      ...parkingResult,
      originalTime: storageTime,
      pressure: alt.pressure,
      explanation: alt.explanation,
      recommendedArea: alt.recommendedArea
    })
    onNavigate('outcome')
  }

  return (
    <div className="confidence-screen">
      <div className="trip-summary">
        <p className="trip-summary-label">Your trip</p>
        <p className="trip-summary-detail">
          {tripData.destination} · {tripData.date} · {formatDisplayTime(tripData.arrivalTime)}
        </p>
      </div>

      <h3 className="confidence-heading">Parking Confidence Estimate</h3>

      <SectionCard
        title={formatDisplayTime(parkingResult.originalTime)}
        variant={getVariant(parkingResult.pressure)}
      >
        <Badge variant="dot" color={getBadgeColor(parkingResult.pressure)} size="lg">
          {getPressureLabel(parkingResult.pressure)}
        </Badge>
        <p className="confidence-explanation">{parkingResult.explanation}</p>
        <p className="confidence-area">
          <strong>Recommended area:</strong> {parkingResult.recommendedArea}
        </p>
        {parkingResult.preferredArea && (
          <p className="confidence-area">
            <strong>Your preference:</strong> {parkingResult.preferredArea}
          </p>
        )}
      </SectionCard>

      {parkingResult.alternatives.length > 0 && (
        <>
          <h3 className="confidence-heading">Alternative Times</h3>
          {parkingResult.alternatives.map((alt, index) => (
            <SectionCard
              key={index}
              title={alt.time}
              variant={getVariant(alt.pressure)}
            >
              <Badge variant="dot" color={getBadgeColor(alt.pressure)} size="lg">
                {getPressureLabel(alt.pressure)}
              </Badge>
              <p className="confidence-explanation">{alt.explanation}</p>
              <p className="confidence-area">
                <strong>Recommended area:</strong> {alt.recommendedArea}
              </p>
              <PrimaryButton
                label={`Accept ${alt.time}`}
                onClick={() => handleAcceptAlternative(alt)}
                variant="secondary"
                fullWidth
              />
            </SectionCard>
          ))}
        </>
      )}

      <p className="confidence-disclaimer">
        These are prototype estimates based on typical patterns, not live data. Actual availability may vary.
      </p>

      <div className="confidence-actions">
        <PrimaryButton
          label="Keep My Original Time"
          onClick={() => onNavigate('outcome')}
          variant="primary"
          fullWidth
        />
      </div>

      <button
        className="back-button"
        onClick={() => onNavigate('flexibility')}
        type="button"
      >
        ← Back to flexibility
      </button>
    </div>
  )
}

export default ConfidenceScreen
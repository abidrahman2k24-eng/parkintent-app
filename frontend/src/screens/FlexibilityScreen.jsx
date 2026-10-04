import PrimaryButton from '../components/PrimaryButton'
import FormField from '../components/FormField'
import SectionCard from '../components/SectionCard'
import { PARKING_AREA_OPTIONS, FLEXIBILITY_OPTIONS, getParkingResult } from '../data/mockData'
import './FlexibilityScreen.css'

function FlexibilityScreen({
  flexibility,
  onFlexibilityChange,
  preferredArea,
  onPreferredAreaChange,
  onNavigate,
  onSetParkingResult,
  arrivalTime
}) {
  const handleCheckParking = () => {
    const result = getParkingResult(arrivalTime, flexibility)
    if (preferredArea) {
      const areaLabel = PARKING_AREA_OPTIONS.find(a => a.value === preferredArea)?.label || ''
      result.preferredArea = areaLabel
    }
    onSetParkingResult(result)
    onNavigate('confidence')
  }

  return (
    <div className="flexibility-screen">
      <SectionCard title="How flexible is your arrival?">
        <p className="flexibility-hint">
          Select how much your arrival time can vary. More flexibility may reveal better parking options.
        </p>
        <div className="flexibility-options">
          {FLEXIBILITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`flexibility-option${flexibility === option.value ? ' flexibility-option-selected' : ''}`}
              onClick={() => onFlexibilityChange(option.value)}
              type="button"
            >
              <span className="flexibility-option-label">{option.label}</span>
            </button>
          ))}
        </div>
        <FormField
          label="Preferred Parking Area"
          type="select"
          value={preferredArea}
          onChange={onPreferredAreaChange}
          options={PARKING_AREA_OPTIONS}
        />
        <PrimaryButton
          label="Check Parking"
          onClick={handleCheckParking}
          variant="primary"
          fullWidth
          disabled={!flexibility}
        />
      </SectionCard>

      <button
        className="back-button"
        onClick={() => onNavigate('planTrip')}
        type="button"
      >
        ← Back to trip details
      </button>
    </div>
  )
}

export default FlexibilityScreen
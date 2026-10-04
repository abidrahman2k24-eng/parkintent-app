import { useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import FormField from '../components/FormField'
import SectionCard from '../components/SectionCard'
import { DESTINATION_OPTIONS } from '../data/mockData'
import './PlanTripScreen.css'

function PlanTripScreen({ tripData, onTripDataChange, onNavigate }) {
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    onTripDataChange({ ...tripData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!tripData.destination) newErrors.destination = 'Please select a destination'
    if (!tripData.date) newErrors.date = 'Please select a date'
    if (!tripData.arrivalTime) newErrors.arrivalTime = 'Please select an arrival time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      onNavigate('flexibility')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="plan-trip-screen">
      <SectionCard title="Plan Your Trip">
        <FormField
          label="Destination"
          type="select"
          value={tripData.destination}
          onChange={(val) => handleChange('destination', val)}
          options={DESTINATION_OPTIONS}
          error={errors.destination}
          required
        />
        <FormField
          label="Date"
          type="date"
          value={tripData.date}
          onChange={(val) => handleChange('date', val)}
          error={errors.date}
          required
          min={today}
        />
        <FormField
          label="Intended Arrival Time"
          type="time"
          value={tripData.arrivalTime}
          onChange={(val) => handleChange('arrivalTime', val)}
          error={errors.arrivalTime}
          required
        />
        <PrimaryButton
          label="Continue"
          onClick={handleContinue}
          variant="primary"
          fullWidth
        />
      </SectionCard>

      <button
        className="back-button"
        onClick={() => onNavigate('login')}
        type="button"
      >
        ← Back to login
      </button>
    </div>
  )
}

export default PlanTripScreen
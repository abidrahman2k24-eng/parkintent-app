import { useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import SectionCard from '../components/SectionCard'
import { DURATION_OPTIONS, OUTCOME_OPTIONS } from '../data/mockData'
import './OutcomeScreen.css'

function OutcomeScreen({ outcome, onOutcomeChange, onNavigate, onSubmit }) {
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleDurationSelect = (value) => {
    onOutcomeChange({ ...outcome, parkingDuration: value })
    if (errors.parkingDuration) {
      setErrors({ ...errors, parkingDuration: '' })
    }
  }

  const handleOutcomeSelect = (value) => {
    onOutcomeChange({ ...outcome, whatHappened: value })
    if (errors.whatHappened) {
      setErrors({ ...errors, whatHappened: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!outcome.parkingDuration) newErrors.parkingDuration = 'Please select how long parking took'
    if (!outcome.whatHappened) newErrors.whatHappened = 'Please select what happened'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSaving(true)
    setSaveError('')
    try {
      await onSubmit(outcome)
    } catch {
      setSaveError('Could not save your report. Please check your connection and try again.')
      setSaving(false)
    }
  }

  return (
    <div className="outcome-screen">
      <SectionCard title="How did parking go?">
        <div className="outcome-question">
          <p className="outcome-question-label">How long did parking take?</p>
          <div className="outcome-options">
            {DURATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`outcome-option${outcome.parkingDuration === option.value ? ' outcome-option-selected' : ''}`}
                onClick={() => handleDurationSelect(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.parkingDuration && <p className="outcome-error">{errors.parkingDuration}</p>}
        </div>

        <div className="outcome-question">
          <p className="outcome-question-label">What happened?</p>
          <div className="outcome-options">
            {OUTCOME_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`outcome-option${outcome.whatHappened === option.value ? ' outcome-option-selected' : ''}`}
                onClick={() => handleOutcomeSelect(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.whatHappened && <p className="outcome-error">{errors.whatHappened}</p>}
        </div>

        {saveError && <p className="outcome-save-error">{saveError}</p>}
        <PrimaryButton
          label={saving ? 'Saving...' : 'Submit Report'}
          onClick={handleSubmit}
          variant="primary"
          fullWidth
          disabled={saving || !outcome.parkingDuration || !outcome.whatHappened}
        />
      </SectionCard>

      <SectionCard variant="default">
        <p className="transparency-note">
          Your report helps improve parking confidence estimates for other ParkIntent users. Only your parking experience is recorded — no personal details are stored.
        </p>
      </SectionCard>

      <button
        className="back-button"
        onClick={() => onNavigate('confidence')}
        type="button"
      >
        ← Back to parking confidence
      </button>
    </div>
  )
}

export default OutcomeScreen
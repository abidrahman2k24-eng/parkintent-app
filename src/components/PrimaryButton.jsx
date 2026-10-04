import './PrimaryButton.css'

function PrimaryButton({ label, onClick, variant = 'primary', disabled = false, fullWidth = false }) {
  const className = [
    'btn',
    `btn-${variant}`,
    fullWidth ? 'btn-full' : '',
    disabled ? 'btn-disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  )
}

export default PrimaryButton
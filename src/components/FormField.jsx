import './FormField.css'

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  options = [],
  error = '',
  required = false,
  min = ''
}) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="form-required"> *</span>}
      </label>
      {type === 'select' ? (
        <select
          className={`form-input form-select${error ? ' form-error-input' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={`form-input${error ? ' form-error-input' : ''}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min || undefined}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default FormField
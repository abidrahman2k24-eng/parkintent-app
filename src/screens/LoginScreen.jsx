import { useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import FormField from '../components/FormField'
import SectionCard from '../components/SectionCard'
import './LoginScreen.css'

function LoginScreen({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = () => {
    if (validate()) {
      onLogin()
      onNavigate('planTrip')
    }
  }

  return (
    <div className="login-screen">
      <div className="login-branding">
        <div className="login-logo">
          <span className="login-logo-icon">P</span>
        </div>
        <h1 className="login-title">ParkIntent</h1>
        <p className="login-tagline">Plan your parking with confidence</p>
      </div>

      <SectionCard title="Log In">
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          error={errors.password}
          required
        />
        <PrimaryButton
          label="Log In"
          onClick={handleLogin}
          variant="primary"
          fullWidth
        />
      </SectionCard>

      <p className="login-disclaimer">
        This is a university prototype. Trip and parking outcome data is saved to a database for demonstration purposes. No login credentials are stored.
      </p>
    </div>
  )
}

export default LoginScreen
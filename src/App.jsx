import { useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import PlanTripScreen from './screens/PlanTripScreen'
import FlexibilityScreen from './screens/FlexibilityScreen'
import ConfidenceScreen from './screens/ConfidenceScreen'
import OutcomeScreen from './screens/OutcomeScreen'
import SuccessScreen from './screens/SuccessScreen'
import { saveTrip } from './services/api'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [tripData, setTripData] = useState({
    destination: 'Chadstone Shopping Centre',
    date: '',
    arrivalTime: ''
  })

  const [flexibility, setFlexibility] = useState('')
  const [preferredArea, setPreferredArea] = useState('')
  const [parkingResult, setParkingResult] = useState(null)

  const [outcome, setOutcome] = useState({
    parkingDuration: '',
    whatHappened: ''
  })

  const handleReset = () => {
    setTripData({ destination: 'Chadstone Shopping Centre', date: '', arrivalTime: '' })
    setFlexibility('')
    setPreferredArea('')
    setParkingResult(null)
    setOutcome({ parkingDuration: '', whatHappened: '' })
    setCurrentScreen('planTrip')
  }

  const handleSubmit = async (outcomeData) => {
    const payload = {
      destination: tripData.destination,
      trip_date: tripData.date,
      arrival_time: tripData.arrivalTime,
      flexibility: flexibility,
      preferred_area: preferredArea || null,
      pressure: parkingResult.pressure,
      recommended_area: parkingResult.recommendedArea,
      parking_duration: outcomeData.parkingDuration,
      what_happened: outcomeData.whatHappened,
    }
    await saveTrip(payload)
    setCurrentScreen('success')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={() => setIsLoggedIn(true)}
            onNavigate={setCurrentScreen}
          />
        )
      case 'planTrip':
        return (
          <PlanTripScreen
            tripData={tripData}
            onTripDataChange={setTripData}
            onNavigate={setCurrentScreen}
          />
        )
      case 'flexibility':
        return (
          <FlexibilityScreen
            flexibility={flexibility}
            onFlexibilityChange={setFlexibility}
            preferredArea={preferredArea}
            onPreferredAreaChange={setPreferredArea}
            onNavigate={setCurrentScreen}
            onSetParkingResult={setParkingResult}
            arrivalTime={tripData.arrivalTime}
          />
        )
      case 'confidence':
        return (
          <ConfidenceScreen
            parkingResult={parkingResult}
            tripData={tripData}
            flexibility={flexibility}
            onNavigate={setCurrentScreen}
            onTripDataChange={setTripData}
            onSetParkingResult={setParkingResult}
          />
        )
      case 'outcome':
        return (
          <OutcomeScreen
            outcome={outcome}
            onOutcomeChange={setOutcome}
            onNavigate={setCurrentScreen}
            onSubmit={handleSubmit}
          />
        )
      case 'success':
        return (
          <SuccessScreen
            tripData={tripData}
            outcome={outcome}
            parkingResult={parkingResult}
            onNavigate={setCurrentScreen}
            onReset={handleReset}
          />
        )
      default:
        return (
          <LoginScreen
            onLogin={() => setIsLoggedIn(true)}
            onNavigate={setCurrentScreen}
          />
        )
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">P</span>
          <span className="logo-text">ParkIntent</span>
        </div>
      </header>
      <main className="app-main">
        {renderScreen()}
      </main>
    </div>
  )
}

export default App

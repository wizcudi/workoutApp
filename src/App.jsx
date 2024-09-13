import './App.css'
import { NavBarProvider } from './context/NavContext.jsx'
import { AuthProvider } from './context/AuthStateManager.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthStateManager.jsx'

import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import ViewWorkout from './components/ViewWorkouts.jsx'
import DayRegimen from './components/DayRegimen.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBarProvider>
          <div className='main'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/view-workout" 
                element={
                  <ProtectedRoute>
                    <ViewWorkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-workout" 
                element={
                  <ProtectedRoute>
                    <DayRegimen />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
          </div>
        </NavBarProvider>
      </AuthProvider>
    </Router>
  )
}

export default App




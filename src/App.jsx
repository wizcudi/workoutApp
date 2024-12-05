import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WorkoutProvider } from './components/WorkoutContext';

import Navbar from './components/Navbar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/useraccount/Dashboard'
import CreateRegimen from './components/useraccount/create/CreateRegimen';
import WorkoutPrograms from './components/useraccount/view/WorkoutPrograms'
import MealHistory from './components/useraccount/history/MealHistory'
import CalorieTracker from './components/useraccount/tracker/CalorieTracker'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
    <WorkoutProvider>
      <div className="
        min-h-screen flex flex-col bg-color-60
      ">
    
        <Navbar />

        {/* Main content area */}
        <div className="
          flex-1 flex justify-center px-8
          
        ">

          <Routes>

            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/create_regimen" 
              element={
                <ProtectedRoute>
                  <CreateRegimen />
                </ProtectedRoute>
              } 
            />
            <Route path="/workout_programs" 
              element={
                <ProtectedRoute>
                  <WorkoutPrograms />
                </ProtectedRoute>
              } 
            />
            <Route path="/meal_history" 
              element={
                <ProtectedRoute>
                  <MealHistory />
                </ProtectedRoute>
              } 
            />
            <Route path="/calorie_tracker" 
              element={
                <ProtectedRoute>
                  <CalorieTracker />
                </ProtectedRoute>
              } 
            />
            
          </Routes>

        </div>
            
      </div>
      </WorkoutProvider>
    </BrowserRouter>
  )
}

export default App




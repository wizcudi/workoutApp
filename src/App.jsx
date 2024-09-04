// import { useState } from 'react'
import './App.css'
import { NavBarProvider } from './context/NavContext.jsx'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <NavBarProvider >
      <div className='main'>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </NavBarProvider>
  )
}

export default App

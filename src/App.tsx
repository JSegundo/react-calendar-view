// import { useState } from 'react'

import "./App.css"
import Calendar from "./components/Calendar"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="w-100 h-full">
      <Navbar />
      <Calendar />
    </div>
  )
}

export default App

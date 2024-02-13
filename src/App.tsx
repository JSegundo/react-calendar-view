import "./App.css"
import Navbar from "./components/Navbar"
import Weekview from "./components/calendar/Weekview"

function App() {
  return (
    <div className="w-100 h-full">
      <Navbar />
      <Weekview />
    </div>
  )
}

export default App

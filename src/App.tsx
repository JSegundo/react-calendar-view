import { useEffect } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Weekview from "./components/calendar/Weekview"
import { useAppDispatch } from "./store"
import { selectStation } from "./store/stationSlice"
import { fetchStation } from "./utils/actions"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const station = await fetchStation("1")
        dispatch(selectStation(station))
      } catch (error) {
        console.error("Error fetching station data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="w-100 h-full">
      <Navbar />
      <Weekview />
    </div>
  )
}

export default App

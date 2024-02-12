import dayjs from "dayjs"
import { useEffect, useState } from "react"
import DayTile from "./DayTile"
import { useAppSelector } from "../../store"
import { FaArrowCircleLeft } from "react-icons/fa"
import { FaArrowCircleRight } from "react-icons/fa"

const Weekview = () => {
  const station = useAppSelector((state) => state.stations.selectedStation)

  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"))

  useEffect(() => {
    if (station?.bookings && station.bookings.length > 0) {
      setCurrentWeek(dayjs(station.bookings[0].startDate).startOf("week"))
    }
  }, [station])

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"))
  }
  const goToNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"))
  }

  const startDate = currentWeek.startOf("week")

  const daysOfWeek = [...Array(7)].map((_, index) => {
    return startDate.add(index, "day")
  })

  return (
    <div className="pt-16 max-w-full lg:max-w-[80%] mx-auto h-full border-2 border-gray-200">
      <h1 className="font-semibold p-1">
        {station?.name || "Select a station"}
      </h1>
      <div className="flex justify-between mb-4 w-fit gap-2 mx-auto">
        <button onClick={goToPreviousWeek}>
          <FaArrowCircleLeft />
        </button>
        <div>
          <span>{currentWeek.format("MMMM YYYY")}</span>{" "}
        </div>
        <button onClick={goToNextWeek}>
          <FaArrowCircleRight />
        </button>
      </div>

      <div className="grid grid-cols-7">
        {!station
          ? daysOfWeek.map((day, i) => (
              <div
                key={i}
                className="text-center text-sm md:text-lg font-semibold  p-0 sm:p-2 "
              >
                {day.format("ddd")}
              </div>
            ))
          : station?.bookings &&
            daysOfWeek.map((day, i) => (
              <DayTile key={i} day={day} bookings={station.bookings} />
            ))}
      </div>
    </div>
  )
}

export default Weekview

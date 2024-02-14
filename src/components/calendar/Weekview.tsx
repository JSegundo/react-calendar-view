import dayjs from "dayjs"
import { useEffect, useState } from "react"
import DayTile from "./DayTile"
import { useAppDispatch, useAppSelector } from "../../store"
import { FaArrowCircleLeft } from "react-icons/fa"
import { FaArrowCircleRight } from "react-icons/fa"
import { rescheduleBooking } from "../../store/stationSlice"
import ModalConfirmReschedule from "./ModalConfirmReschedule"
import useDragAndDrop from "../../utils/actions/hooks/useDragAndDrop"

const Weekview = () => {
  const dispatch = useAppDispatch()
  const station = useAppSelector((state) => state.selectedStation)

  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"))
  const [showModalReschedule, setshowModalReschedule] = useState(false)
  const [bookingRescheduleInfo, setBookingInfo] = useState({
    bookingId: "",
    newDate: "",
    isStartDate: "",
  })

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

  // Drag and drop functionality - booking reschedule
  const { handleDragStart, handleDropBooking } = useDragAndDrop({
    setBookingInfo,
    setshowModalReschedule,
  })

  const handleConfirmReschedule = () => {
    setshowModalReschedule(false)
    dispatch(rescheduleBooking(bookingRescheduleInfo))
  }

  return (
    <>
      <div className="pt-16 max-w-full lg:max-w-[80%] mx-auto h-full border-2 border-gray-200">
        <h1
          className="font-semibold p-2"
          style={{ backgroundColor: "#f9b104", color: "white" }}
        >
          {station?.name || "Search a station to display bookings"}
        </h1>
        <div className="flex justify-between mb-4 mt-2 w-fit gap-2 mx-auto">
          <button data-testid="prev-week-btn" onClick={goToPreviousWeek}>
            <FaArrowCircleLeft />
          </button>
          <div>
            <span>{currentWeek.format("MMMM YYYY")}</span>{" "}
          </div>
          <button data-testid="next-week-btn" onClick={goToNextWeek}>
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
                <DayTile
                  key={i}
                  day={day}
                  bookings={station.bookings}
                  onDragStart={handleDragStart}
                  handleDropBooking={handleDropBooking}
                />
              ))}
        </div>
      </div>
      <ModalConfirmReschedule
        onConfirm={handleConfirmReschedule}
        isOpen={showModalReschedule}
        onClose={() => setshowModalReschedule(false)}
        bookingRescheduleInfo={bookingRescheduleInfo}
      />
    </>
  )
}

export default Weekview

import React from "react"
import { IDayTileProps } from "../../../interfaces"
import Booking from "./Booking"
import dayjs from "dayjs"

const DayTile: React.FC<IDayTileProps> = ({ day, bookings }) => {
  const bookingsForDay = bookings.filter((booking) => {
    const startDate = dayjs(booking.startDate).startOf("day")
    const endDate = dayjs(booking.endDate).startOf("day")
    return dayjs(day).isSame(startDate) || dayjs(day).isSame(endDate) // Check if the current day is the start or end date of the booking
  })

  return (
    <div className="border p-0 sm:p-2 text-center min-h-80">
      <div className="text-sm md:text-lg font-semibold">
        {day.format("ddd")}
      </div>
      <div className="text-xs md:text-sm">{day.format("D")}</div>
      {bookingsForDay.map((booking) => (
        <Booking
          key={booking.id}
          booking={booking}
          isPickup={dayjs(booking.startDate).isSame(day, "day")}
          isReturn={dayjs(booking.endDate).isSame(day, "day")}
        />
      ))}
    </div>
  )
}

export default DayTile

import dayjs from "dayjs"
import DayTile from "../components/calendar/DayTile"
import { renderRdx } from "./Weekview.spec"
import { test, describe, expect } from "vitest"

describe("DayTile component", () => {
  test("displays bookings for the given day", () => {
    // Mock data
    const day = dayjs("2024-02-09") // Replace with the desired day
    const bookings = [
      {
        id: "1",
        startDate: "2024-02-09T08:00:00",
        endDate: "2024-02-09T10:00:00",
        customerName: "customer 1",
        pickupReturnStationId: "1",
      }, // Booking for the same day
      {
        id: "2",
        startDate: "2024-02-08T14:00:00",
        endDate: "2024-02-10T12:00:00",
        customerName: "customer 2",
        pickupReturnStationId: "1",
      }, // Booking spanning multiple days
      {
        id: "3",
        startDate: "2024-02-10T12:00:00",
        endDate: "2024-02-10T15:00:00",
        customerName: "customer 1",
        pickupReturnStationId: "2",
      }, // Booking for a different day
    ]

    // Render the DayTile component with the mock data
    const { getByText } = renderRdx(
      <DayTile
        day={day}
        bookings={bookings}
        onDragStart={() => {}}
        handleDropBooking={() => {}}
      />
    )

    // Assert that the bookings for the given day are displayed
    expect(getByText("Wed")).toBeDefined() // Verify day abbreviation
    expect(getByText("9")).toBeDefined() // Verify day number
  })
})

import dayjs from "dayjs"
import DayTile from "../components/calendar/DayTile"
import { renderRdx } from "./Weekview.spec"
import { test, describe, expect } from "vitest"
import { screen } from "@testing-library/react"

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
        customerName: "customer 3",
        pickupReturnStationId: "2",
      }, // Booking for a different day
    ]

    const { getByText } = renderRdx(
      <DayTile
        day={day}
        bookings={bookings}
        onDragStart={() => {}}
        handleDropBooking={() => {}}
      />
    )

    const customerName = screen.queryByText("customer 1")
    expect(customerName).toBeInTheDocument()

    const customerName3 = screen.queryByText("customer 3")
    expect(customerName3).not.toBeInTheDocument()

    const wrongCustomerName = screen.queryByText("customer 2")
    expect(wrongCustomerName).not.toBeInTheDocument()

    expect(getByText("Wed")).toBeDefined()
    expect(getByText("9")).toBeDefined()
  })
})

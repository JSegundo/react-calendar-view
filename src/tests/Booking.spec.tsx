import { renderRdx } from "./Weekview.spec"
import { test, describe, expect } from "vitest"
import Booking from "../components/calendar/Booking"
import { screen } from "@testing-library/react"

describe("it renders booking with customer data", () => {
  const booking = {
    id: "2",
    startDate: "2024-02-08T14:00:00",
    endDate: "2024-02-10T12:00:00",
    customerName: "customer 2",
    pickupReturnStationId: "1",
  }
  test("it renders booking and displays proper info", () => {
    renderRdx(
      <Booking
        booking={booking}
        isPickup={true}
        isReturn={false}
        onDragStart={() => {}}
      />
    )

    const containerInfo = screen.getByTestId("display-booking")
    // const customerName = screen.queryByText(booking.customerName)
    expect(containerInfo).not.to.be.null
    // expect(containerInfo).toBeInTheDocument()
    // expect(customerName).not.to.be.null
    // expect(screen.getByText(booking.customerName)).toBeInTheDocument() // expect(screen.queryByText("pick up")).toBeInTheDocument()
  })
})

import { renderRdx } from "./Weekview.spec"
import { test, describe, expect } from "vitest"
import Booking from "../components/calendar/Booking"
import { fireEvent, queryByText, screen, within } from "@testing-library/react"

describe("it renders booking with customer data", () => {
  const booking = {
    id: "2",
    startDate: "2024-02-08T14:00:00",
    endDate: "2024-02-10T12:00:00",
    customerName: "customer 20",
    pickupReturnStationId: "1",
  }

  test("it renders correctly", async () => {
    renderRdx(
      <Booking
        booking={booking}
        isPickup={true}
        isReturn={false}
        onDragStart={() => {}}
      />
    )
  })

  test("displays proper info", async () => {
    const containerInfo = screen.getByTestId("display-booking")
    expect(containerInfo).toBeInTheDocument()
    const { getByText } = within(containerInfo)
    expect(getByText(booking.customerName)).toBeInTheDocument()
    expect(getByText("Pickup")).toBeInTheDocument()
    expect(queryByText(containerInfo, "Return")).not.toBeInTheDocument()
  })

  test("it opens modal on click", () => {
    const containerInfo = screen.getByTestId("display-booking")
    fireEvent.click(containerInfo)
    const durationModalTitle = screen.getByText("Duration")
    expect(durationModalTitle).toBeInTheDocument()
  })
})

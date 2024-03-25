import dayjs from "dayjs"

export interface IBooking {
  id: string
  pickupReturnStationId: string
  customerName: string
  startDate: string
  endDate: string
  fileUrl?: string
}

export interface BookingWithStationName extends IBooking {
  stationName: string
}

export type OnDragStartHandler = (
  e: React.DragEvent<HTMLDivElement>,
  bookingId: string,
  isStartDate: boolean
) => void
export type handleDropBooking = (
  e: React.DragEvent<HTMLDivElement>,
  day: string
) => void

export interface IDayTileProps {
  day: dayjs.Dayjs
  bookings: IBooking[]
  onDragStart: OnDragStartHandler
  handleDropBooking: handleDropBooking
}
export interface IStation {
  id: string
  name: string
  bookings: IBooking[]
}

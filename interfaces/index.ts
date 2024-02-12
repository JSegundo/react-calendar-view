import dayjs from "dayjs"

export interface IBooking {
  id: string
  pickupReturnStationId: string
  customerName: string
  startDate: string
  endDate: string
}

export interface IDayTileProps {
  day: dayjs.Dayjs
  bookings: IBooking[]
}
export interface IStation {
  id: string
  name: string
  bookings: IBooking[]
}

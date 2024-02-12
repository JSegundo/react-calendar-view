import axios from "axios"

interface FetchBookingProps {
  stationId: string
  bookingId: string
}

export const fetchBooking = async ({
  stationId,
  bookingId,
}: FetchBookingProps) => {
  try {
    const res = await axios.get(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const getStationName = () => {}

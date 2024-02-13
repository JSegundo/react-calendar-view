import axios from "axios"
import { BookingWithStationName, IBooking, IStation } from "../../../interfaces"

interface FetchBookingProps {
  stationId: string
  bookingId: string
}

export const fetchBookingWithStationName = async ({
  stationId,
  bookingId,
}: FetchBookingProps): Promise<BookingWithStationName> => {
  try {
    const [booking, station] = await Promise.all([
      fetchBookingData(stationId, bookingId),
      fetchStation(stationId),
    ])

    const stationName = station.name

    return { ...booking, stationName }
  } catch (error) {
    console.error("Error fetching booking:", error)
    throw new Error(`Failed to fetch, ${error}`)
  }
}

const fetchBookingData = async (
  stationId: string,
  bookingId: string
): Promise<IBooking> => {
  try {
    const response = await axios.get<IBooking>(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching booking data:", error)
    throw new Error("Failed to fetch booking data") // Throw a custom error message
  }
}

export const fetchStation = async (stationId: string): Promise<IStation> => {
  try {
    const response = await axios.get<IStation>(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching station name:", error)
    throw new Error("Failed to fetch station name") // Throw a custom error message
  }
}

export const fetchDataQuery = async <T>(
  apiUrl: string,
  searchTerm: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResults: React.Dispatch<React.SetStateAction<T[]>>
): Promise<void> => {
  setLoading(true)
  try {
    const response = await axios.get<T[]>(`${apiUrl}${searchTerm}`)
    setSearchResults(response.data)
  } catch (error) {
    console.error("Error fetching data:", error)
    setSearchResults([])
    throw new Error("Failed to fetch data")
  } finally {
    setLoading(false)
  }
}

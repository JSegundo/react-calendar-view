import axios from "axios"
import { BookingWithStationName, IBooking, IStation } from "../../../interfaces"
const apiUrl = import.meta.env.VITE_API_URL
const mockApiUrl = import.meta.env.VITE_MOCK_API_URL
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
      fetchBookingData(bookingId),
      fetchStation(stationId),
    ])

    const stationName = station.name

    return { ...booking, stationName }
  } catch (error) {
    console.error("Error fetching booking:", error)
    throw new Error(`Failed to fetch, ${error}`)
  }
}

const fetchBookingData = async (bookingId: string): Promise<IBooking> => {
  try {
    console.log(`${apiUrl}/bookings/${bookingId}`)
    const response = await axios.get<IBooking>(
      `${apiUrl}/bookings/${bookingId}`
      // `${apiUrl}/stations/${stationId}/bookings/${bookingId}`
    )
    console.log(response)
    return response.data
  } catch (error) {
    console.error("Error fetching booking data:", error)
    throw new Error("Failed to fetch booking data")
  }
}

export const fetchStation = async (stationId: string): Promise<IStation> => {
  try {
    const response = await axios.get<IStation>(
      `${apiUrl}/stations/${stationId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching station name:", error)
    throw new Error("Failed to fetch station name")
  }
}

export const fetchDataQuery = async <T>(
  searchTerm: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResults: React.Dispatch<React.SetStateAction<T[]>>
): Promise<T[]> => {
  setLoading(true)
  try {
    const response = await axios.get<T[]>(`${mockApiUrl}?name=${searchTerm}`)
    setSearchResults(response?.data)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    setSearchResults([])
    throw new Error("Failed to fetch data")
  } finally {
    setLoading(false)
  }
}

export const uploadFile = async (bookingId: string, file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const res = await axios.post(
      `${apiUrl}/uploadfile/${bookingId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )

    return res.data.fileUrl
  } catch (err) {
    console.error("Error uploading file:", err)
    throw new Error("Error uploading file. Please try again.")
  }
}

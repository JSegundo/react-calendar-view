import { createSlice } from "@reduxjs/toolkit"
import { IStation } from "../../interfaces"

interface StationsState {
  selectedStation: IStation | null
}

const initialState: StationsState = {
  selectedStation: null,
}

const stationsSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    selectStation(state, action) {
      state.selectedStation = action.payload
    },
    rescheduleBooking(state, action) {
      const { bookingId, newDate, isStartDate } = action.payload
      if (state.selectedStation) {
        const selectedBooking = state.selectedStation.bookings.find(
          (booking) => booking.id === bookingId
        )

        if (selectedBooking) {
          if (isStartDate) {
            selectedBooking.startDate = newDate
          } else {
            selectedBooking.endDate = newDate
          }
        }
        console.log({
          status: 201,
          selectedBooking: JSON.parse(JSON.stringify(selectedBooking)),
        })
      }
    },
  },
})

export const { selectStation, rescheduleBooking } = stationsSlice.actions

export default stationsSlice.reducer

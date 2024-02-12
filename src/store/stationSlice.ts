// stationsSlice.ts
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
  },
})

export const { selectStation } = stationsSlice.actions

export default stationsSlice.reducer

import Autocomplete from "./autocomplete"
import { IStation } from "../../interfaces"
import { useAppDispatch } from "../store"
import { selectStation } from "../store/stationSlice"
// const apiUrl = import.meta.env.VITE_API_URL
const mockApiUrl = import.meta.env.VITE_MOCK_API_URL

const Navbar = () => {
  const dispatch = useAppDispatch()

  const onSelect = (station: IStation) => {
    dispatch(selectStation(station))
  }

  return (
    <nav className="h-16 px-8 sm:px-16 navbar bg-white border-b-2 border-gray-200 flex flex-row gap-2 sm:gap-6 justify-center items-center">
      <Autocomplete
        apiUrl={`${mockApiUrl}/stations?name=`}
        placeholder={"Start searching stations.."}
        onSelect={onSelect}
      />
    </nav>
  )
}

export default Navbar

import Autocomplete from "./autocomplete"
import { IStation } from "../../interfaces"
import { useAppDispatch } from "../store"
import { selectStation } from "../store/stationSlice"
// const apiUrl = process.env.REACT_APP_API_URL

const Navbar = () => {
  const dispatch = useAppDispatch()

  const onSelect = (station: IStation) => {
    dispatch(selectStation(station))
  }

  return (
    <nav className="h-16 px-8 sm:px-16 navbar bg-white border-b-2 border-gray-200 flex flex-row gap-2 sm:gap-6 items-center">
      <img
        className="w-24 sm:w-32 py-4 px-1 sm-px-4 radius-lg"
        style={{
          backgroundColor: "#6bbbae",
          borderRadius: "16px",
        }}
        src="https://roadsurfer.com/wp-content/themes/roadsurfer/_/img/logo/logo.svg"
      />
      <Autocomplete
        // apiUrl={`${apiUrl}/stations?name=`}
        apiUrl={`https://605c94c36d85de00170da8b4.mockapi.io//stations?name=`}
        placeholder={"Start searching stations.."}
        onSelect={onSelect}
      />
    </nav>
  )
}

export default Navbar

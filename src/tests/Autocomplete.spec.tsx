import { renderRdx } from "./Weekview.spec"
import Autocomplete from "../components/autocomplete"
import { screen, fireEvent, waitFor, cleanup } from "@testing-library/react"
import { test, describe, expect, vi, MockedFunction } from "vitest"
import axios, { AxiosResponse } from "axios"
import { afterEach } from "node:test"

vi.mock("axios")
const stations = [
  {
    id: "1",
    name: "Berlin",
    bookings: [
      {
        id: "1",
        pickupReturnStationId: "1",
        customerName: "Keara Adams",
        startDate: "2021-03-13T22:04:19.032Z",
        endDate: "2021-07-17T08:51:27.402Z",
      },
      {
        id: "7",
        pickupReturnStationId: "1",
        customerName: "Elmira Larkin Sr.",
        startDate: "2021-02-19T17:22:15.117Z",
        endDate: "2021-08-10T10:35:41.773Z",
      },
    ],
  },
  {
    id: "4",
    name: "Lisbon",
    bookings: [
      {
        id: "4",
        pickupReturnStationId: "4",
        customerName: "Giovani Abbott",
        startDate: "2021-03-13T05:14:07.225Z",
        endDate: "2021-08-29T23:11:51.494Z",
      },
      {
        id: "10",
        pickupReturnStationId: "4",
        customerName: "Sonia Kuhic",
        startDate: "2020-08-08T22:13:05.684Z",
        endDate: "2022-03-29T08:02:18.721Z",
      },
    ],
  },
]
afterEach(cleanup)
describe("autocomplete component", async () => {
  const placeholder = "Search..."
  const onSelect = vi.fn()

  renderRdx(
    <Autocomplete
      apiUrl={"https://605c94c36d85de00170da8b4.mockapi.io/stations?=name="}
      placeholder={placeholder}
      onSelect={onSelect}
    />
  )

  test("Data is fetched and displayed when user types", async () => {
    const inputElement = screen.getByPlaceholderText(placeholder)

    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: stations,
    } as AxiosResponse)

    fireEvent.change(inputElement, { target: { value: "B" } })
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument()
    })

    // Waiting for search results to appear
    await waitFor(() => {
      const searchResults = screen.getAllByTestId("search-result")
      expect(searchResults.length).toBeGreaterThan(1)

      // Simulating click on each search result
      searchResults.forEach((result) => {
        fireEvent.click(result)
        expect(onSelect).toHaveBeenCalledTimes(1)
      })
    })
  })
})

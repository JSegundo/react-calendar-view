import { renderRdx } from "./Weekview.spec"
import Autocomplete from "../components/autocomplete"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { test, describe, expect, vi } from "vitest"
// import { fetchDataQuery } from "../utils/actions"

describe("autocomplete component", () => {
  const placeholder = "Search..."
  const onSelect = vi.fn()

  test("selects an item when clicked", async () => {
    renderRdx(
      <Autocomplete
        apiUrl={"apiexample"}
        placeholder={placeholder}
        onSelect={onSelect}
      />
    )

    const inputElement = screen.getByPlaceholderText(placeholder)
    fireEvent.change(inputElement, { target: { value: "Test" } })
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeDefined()
    })
  })
})

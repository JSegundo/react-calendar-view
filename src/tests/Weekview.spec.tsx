import { test, describe, expect } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../store"
import Weekview from "../components/calendar/Weekview"
import dayjs from "dayjs"
import { ReactElement } from "react"

export const renderRdx = (component: ReactElement) =>
  render(<Provider store={store}>{component}</Provider>)

describe("Weekview component renders without crashing", () => {
  test("renders without crashing", () => {
    renderRdx(<Weekview />)
  })
  const initialWeekStart = dayjs().startOf("week")
  test("initializes the current week correctly", () => {
    const initialWeekStartWithFormat = initialWeekStart.format("MMMM YYYY")
    const currentWeekElement = screen.getByText(initialWeekStartWithFormat)
    expect(currentWeekElement).toBeDefined()
  })

  test("switches to the previous week when previous button is clicked", () => {
    const prevButton = screen.getByTestId("prev-week-btn")
    fireEvent.click(prevButton)

    const previousWeek = initialWeekStart
      .subtract(1, "week")
      .format("MMMM YYYY")

    const prevWeekElement = screen.getByText(previousWeek)
    expect(prevWeekElement).toBeDefined()
  })

  test("switches to the next week when next button is clicked", () => {
    const nextButton = screen.getByTestId("next-week-btn")
    fireEvent.click(nextButton)

    const nextWeek = initialWeekStart.add(1, "week").format("MMMM YYYY")
    const nextWeekElement = screen.getByText(nextWeek)
    expect(nextWeekElement).toBeDefined()

    const next4Weeks = initialWeekStart.add(4, "week").format("MMMM YYYY")
    expect(screen.queryByText(next4Weeks)).toBeNull()
  })

  test("displays current week days on the screen", () => {
    const expectedDays = [...Array(7)].map((_, index) => {
      return initialWeekStart.add(index, "day")
    })

    expectedDays.forEach((day) => {
      const dayElement = screen.getByText(day.format("ddd"))
      expect(dayElement).toBeDefined()
    })
  })
})

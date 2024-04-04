import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setdebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}

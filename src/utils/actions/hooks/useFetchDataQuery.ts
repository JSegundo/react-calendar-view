import { Dispatch, SetStateAction, useEffect } from "react"
import { fetchDataQuery } from ".."
import { useDebounce } from "./useDebounce"

interface useFetchDataQueryProps<T> {
  setLoading: Dispatch<SetStateAction<boolean>>
  searchTerm: string
  setSearchResults: Dispatch<SetStateAction<T[]>>
}

export const useFetchDataQuery = <T>({
  setLoading,
  searchTerm,
  setSearchResults,
}: useFetchDataQueryProps<T>) => {
  const debouncedSearch = useDebounce(searchTerm)

  useEffect(() => {
    const fetchDataWrapper = async () => {
      setLoading(true)
      try {
        await fetchDataQuery<T>(debouncedSearch, setLoading, setSearchResults)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (debouncedSearch.trim() !== "") {
      fetchDataWrapper()
    } else {
      setSearchResults([])
    }
  }, [debouncedSearch])
}

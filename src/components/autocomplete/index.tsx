import React, { useState } from "react"
import TextField from "./TextField"
import { useFetchDataQuery } from "../../utils/actions/hooks/useFetchDataQuery"

interface AutocompleteProps<T> {
  placeholder: string
  onSelect: (item: T) => void
}

const Autocomplete = <T extends { id: string; name: string }>({
  placeholder,
  onSelect,
}: AutocompleteProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  useFetchDataQuery({ setLoading, searchTerm, setSearchResults })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelect = (item: T) => {
    setSearchTerm("")
    onSelect(item)
  }

  return (
    <div className="relative w-full sm:w-60">
      <TextField
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      {loading && <Loading />}

      {searchTerm ? (
        <AutocompleteList
          searchResults={searchResults}
          onSelect={handleSelect}
        />
      ) : null}
    </div>
  )
}

interface AutocompleteListProps<T> {
  searchResults: T[]
  onSelect: (item: T) => void
}

const AutocompleteList = <T extends { id: string; name: string }>({
  searchResults,
  onSelect,
}: AutocompleteListProps<T>) => {
  if (!searchResults) {
    return null
  }
  console.log(searchResults)
  return (
    <ul className="absolute left-0 z-10 mt-0 sm:mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
      {searchResults?.map((item) => (
        <li
          data-testid="search-result"
          key={item.id}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

const Loading = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
      Loading...
    </div>
  )
}

export default Autocomplete

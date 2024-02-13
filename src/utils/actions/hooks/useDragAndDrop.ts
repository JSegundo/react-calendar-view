interface DragAndDropProps {
  setBookingInfo: React.Dispatch<
    React.SetStateAction<{
      bookingId: string
      newDate: string
      isStartDate: string
    }>
  >
  setshowModalReschedule: React.Dispatch<React.SetStateAction<boolean>>
}

const useDragAndDrop = ({
  setBookingInfo,
  setshowModalReschedule,
}: DragAndDropProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    bookingId: string,
    isStartDate: boolean
  ) => {
    e.dataTransfer.setData("bookingId", bookingId)
    e.dataTransfer.setData("isStartDate", String(isStartDate))
  }

  const handleDropBooking = (
    e: React.DragEvent<HTMLDivElement>,
    day: string
  ) => {
    e.preventDefault()
    const bookingId = e.dataTransfer.getData("bookingId")
    const isStartDate = e.dataTransfer.getData("isStartDate")

    setBookingInfo({
      bookingId,
      newDate: day,
      isStartDate,
    })
    setshowModalReschedule(true)
  }

  return { handleDragStart, handleDropBooking }
}

export default useDragAndDrop

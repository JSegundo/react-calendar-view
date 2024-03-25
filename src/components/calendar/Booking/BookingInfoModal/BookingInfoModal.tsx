import dayjs from "dayjs"
import { ImLocation } from "react-icons/im"
import { RiTimerLine } from "react-icons/ri"
import { BookingWithStationName, IBooking } from "../../../../../interfaces"
import { fetchBookingWithStationName } from "../../../../utils/actions"
import { useEffect, useState } from "react"
import Modal from "../../../modal"
import FileSection from "../FileSection"
import LoadingSkeleton from "./LoadingSkeleton"
import { FaRegFileLines } from "react-icons/fa6"
import { MdFileDownload } from "react-icons/md"
import { getFileName } from "../../../../utils/actions/hooks/getFileName"

const initialData = {
  id: "",
  pickupReturnStationId: "",
  customerName: "",
  startDate: "",
  endDate: "",
  stationName: "",
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string
  stationId: string
}
const BookingInfoModal = ({
  isOpen,
  onClose,
  stationId,
  bookingId,
}: ModalProps) => {
  const [booking, setbooking] = useState<BookingWithStationName>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function getBookingData() {
      const booking = await fetchBookingWithStationName({
        stationId,
        bookingId,
      })
      setbooking(booking)
      setLoading(false)
    }
    getBookingData()
  }, [bookingId, stationId])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">{booking.customerName}</h2>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ModalItem
            icon={pickUpBall}
            title={"Pick up"}
            content={dayjs(booking.startDate).format(
              "dddd, MMMM D, YYYY h:mm A"
            )}
          />
          <ModalItem
            icon={returnBall}
            title={"Return"}
            content={dayjs(booking.endDate).format("dddd, MMMM D, YYYY h:mm A")}
          />
          <ModalItem
            icon={<RiTimerLine />}
            title={"Duration"}
            content={calculateDuration(booking)}
          />
          <ModalItem
            icon={<ImLocation />}
            title={"Station"}
            content={booking.stationName}
          />
        </>
      )}

      {booking.fileUrl && (
        <>
          <hr className="my-2" />

          <div className="flex border-2 border-gray-200 rounded p-2 justify-between items-center">
            <FaRegFileLines />
            <button className="flex items-center gap-2">
              <a href={booking.fileUrl}>{getFileName(booking.fileUrl)}</a>
              <MdFileDownload />
            </button>
          </div>
        </>
      )}

      <hr className="my-2" />
      <FileSection bookingId={booking.id} />
    </Modal>
  )
}

interface ModalItemProps {
  icon: React.ReactNode
  title: string
  content: string
}
const ModalItem = ({ icon, title, content }: ModalItemProps) => {
  return (
    <div className="flex space-x-2 items-center mb-2">
      {icon}
      <div>
        <p className="text-sm font-medium text-left">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-left">
          {content}
        </p>
      </div>
    </div>
  )
}

export default BookingInfoModal

const pickUpBall = (
  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
)
const returnBall = (
  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
)

function calculateDuration(booking: IBooking) {
  const startDate = new Date(booking?.startDate)
  const endDate = new Date(booking.endDate)
  const durationMs = endDate.getTime() - startDate.getTime()

  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24))
  return `${durationDays} days`
}

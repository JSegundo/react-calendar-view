import dayjs from "dayjs"
import { IoMdClose } from "react-icons/io"
import { ImLocation } from "react-icons/im"
import { RiTimerLine } from "react-icons/ri"
import { IBooking } from "../../../interfaces"
import { fetchBooking } from "../../utils/actions"
import { useEffect, useState } from "react"

const initialData = {
  id: "2",
  pickupReturnStationId: "2",
  customerName: "Carroll Doyle",
  startDate: "2020-06-16T23:11:29.630Z",
  endDate: "2021-07-10T20:30:58.997Z",
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string
  stationId: string
}
const Modal = ({ isOpen, onClose, stationId, bookingId }: ModalProps) => {
  const [booking, setbooking] = useState<IBooking>(initialData)

  useEffect(() => {
    async function getBookingData() {
      const booking = await fetchBooking({ stationId, bookingId })
      setbooking(booking)
    }
    getBookingData()
  }, [stationId, bookingId])

  const calculateDuration = () => {
    const startDate = new Date(booking?.startDate)
    const endDate = new Date(booking.endDate)
    const durationMs = endDate.getTime() - startDate.getTime()

    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24))
    return `${durationDays} days`
  }

  const pickUpBall = (
    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
  )
  const returnBall = (
    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
  )

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-10 bg-white rounded-lg shadow-lg p-2 sm:p-6 max-w-xs relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h2 className="text-lg font-bold mb-4">{booking.customerName}</h2>
        <ModalItem
          icon={pickUpBall}
          title={"Pick up"}
          content={dayjs(booking.startDate).format("dddd, MMMM D, YYYY h:mm A")}
        />
        <ModalItem
          icon={returnBall}
          title={"Return"}
          content={dayjs(booking.endDate).format("dddd, MMMM D, YYYY h:mm A")}
        />
        <ModalItem
          icon={<RiTimerLine />}
          title={"Duration"}
          content={calculateDuration()}
        />
        <ModalItem
          icon={<ImLocation />}
          title={"Station"}
          content={"aver como le hago"}
        />
      </div>
    </div>
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

export default Modal

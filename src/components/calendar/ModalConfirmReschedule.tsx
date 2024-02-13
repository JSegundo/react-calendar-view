import { ReactNode } from "react"
import Modal from "../modal"
import dayjs from "dayjs"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  children?: ReactNode
  bookingRescheduleInfo: {
    bookingId: string
    newDate: string
    isStartDate: string
  }
}
const ModalConfirmReschedule = ({
  bookingRescheduleInfo,
  isOpen,
  onConfirm,
  onClose,
}: ModalProps) => {
  const { newDate, isStartDate } = bookingRescheduleInfo
  const message = `Are you sure you want to reschedule this reservation's ${
    isStartDate ? "pick-up date" : "return date"
  } to ${dayjs(newDate).format("YYYY-MM-DD ")}?`

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>{message}</div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default ModalConfirmReschedule

import React, { useState } from "react"
import { IBooking } from "../../../interfaces"
import Modal from "../modal"

export interface IBookingProps {
  booking: IBooking
  isPickup: boolean
  isReturn: boolean
}

const Booking: React.FC<IBookingProps> = ({ booking, isPickup, isReturn }) => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const handleClose = () => {
    setisOpen(false)
  }
  const showModal = () => {
    setisOpen(true)
  }
  return (
    <>
      <div
        onClick={showModal}
        className="cursor-pointer bg-white sm:rounded-lg shadow-lg relative mb-4 py-2"
      >
        <div
          className={`absolute left-0 top-0 h-full ${
            isPickup ? "bg-green-500" : isReturn ? "bg-blue-500" : "bg-gray-500"
          }`}
          style={{ width: "6px" }}
        ></div>
        <div className="pl-0 text-xs truncate">
          {booking.customerName} - {isPickup && "Pickup "}
          {isReturn && "Return "}
          {!isPickup && !isReturn && "Unknown "}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        bookingId={booking.id}
        stationId={booking.pickupReturnStationId}
      />
    </>
  )
}

export default Booking

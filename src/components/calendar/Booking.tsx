import React, { useState } from "react"
import { IBooking, OnDragStartHandler } from "../../../interfaces"
import Modal from "../modal/bookingModal"

export interface IBookingProps {
  booking: IBooking
  isPickup: boolean
  isReturn: boolean
  onDragStart: OnDragStartHandler
}

const Booking: React.FC<IBookingProps> = ({
  booking,
  onDragStart,
  isPickup,
  isReturn,
}) => {
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
        draggable
        onDragStart={(e) => onDragStart(e, booking.id, isPickup)}
        onClick={showModal}
        className={`cursor-pointer bg-white sm:rounded-lg shadow-lg  mb-4 py-2 border-l-8 ${
          isPickup
            ? "border-green-500"
            : isReturn
            ? "border-blue-500"
            : "border-gray-500"
        }`}
      >
        <div className="pl-1 text-xs truncate">
          {booking.customerName} - {isPickup && "Pickup "}
          {isReturn && "Return "}
          {!isPickup && !isReturn && "Unknown "}
        </div>
      </div>
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          bookingId={booking.id}
          stationId={booking.pickupReturnStationId}
        />
      ) : null}
    </>
  )
}

export default Booking

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
        className="cursor-pointer bg-white sm:rounded-lg shadow-lg relative mb-4 py-2"
      >
        <div
          className={`absolute left-0 top-0 h-full ${
            isPickup ? "bg-green-500" : isReturn ? "bg-blue-500" : "bg-gray-500"
          }`}
          style={{ width: "6px" }}
        ></div>
        <div className="pl-1 text-xs truncate" data-testid="display-booking">
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

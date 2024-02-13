import React, { ReactNode } from "react"
import { IoMdClose } from "react-icons/io"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
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
        {children}
      </div>
    </div>
  )
}

export default Modal

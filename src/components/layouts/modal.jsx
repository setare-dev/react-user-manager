import React from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddUserModal } from '../../store/slices/userSlice'

function Modal({ children }) {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.users.showModal)
  if (!open) return null

  return (
    <div className=" bg-zinc-400/75 z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full">
      <div className="fixed flex w-6/12 h-screen  justify-center items-center inset-x-2/4 inset-y-3/5 bg-white z-50 transform translate-x-1/2 rounded-xl ">
        <button
          type="button"
          onClick={() => {
            dispatch(toggleAddUserModal())
          }}
          className="fixed top-4 left-4"
        >
          <FiX size="1.5rem" />
        </button>

        <div className="w-4/5 h-auto">{children}</div>
      </div>
    </div>
  )
}

export default Modal

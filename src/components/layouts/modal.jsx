// import React from 'react'
// import { FiX } from 'react-icons/fi'
// import { useSelector, useDispatch } from 'react-redux'
// import { toggleAddUserModal } from '../../store/slices/userSlice'

// function Modal({ children }) {
//   const dispatch = useDispatch()
//   const open = useSelector((state) => state.users.showModal)
//   if (!open) return null

//   return (
//     <div className=" bg-zinc-400/75 z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full">
//       <div className="fixed flex w-6/12 h-screen  justify-center items-center inset-x-2/4 inset-y-3/5 bg-white z-50 transform translate-x-1/2 rounded-xl ">
//         <button
//           type="button"
//           onClick={() => {
//             dispatch(toggleAddUserModal())
//           }}
//           className="fixed top-4 left-4"
//         >
//           <FiX size="1.5rem" />
//         </button>

//         <div className="w-4/5 h-auto">{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Modal

import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddUserModal } from '../../store/slices/userSlice'

export default function MyModal({ children }) {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.users.showModal)
  if (!isOpen) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(toggleAddUserModal(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  افزودن کاربر
                </Dialog.Title> */}

                <div className="mt-2">{children}</div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => dispatch(toggleAddUserModal(false))}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { toggleAddUserModal } from '../../store/slices/userSlice'

function TitleSection() {
  const dispatch = useDispatch()
  return (
    <div className="px-14 my-20">
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="text-3xl font-bold ">کاربران</h3>
          <div className=" mt-10">
            لیست اطلاعات کاربران در این بخش قابل مشاهده می باشد
          </div>
        </div>
        <button
          type="button"
          onClick={() => dispatch(toggleAddUserModal(true))}
          className="bg-cyan-500 px-4 text-gray-50 rounded my-6 shadow-md"
        >
          <div className="flex flex-row item-center justify-center font-bold">
            <FiPlus className="self-center ml-2" /> افزودن کاربر
          </div>
        </button>
      </div>
    </div>
  )
}

export default TitleSection

import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { deleteUserFromServer } from '../../api/userApi'
import { ToastAlert, QuestionAlert } from '../customAlert'
import {
  deleteUser,
  setUserEditingData,
  toggleAddUserModal,
} from '../../store/slices/userSlice'

function User({ data, userIndex }) {
  const dispatch = useDispatch()

  const handleOpenEdit = () => {
    dispatch(toggleAddUserModal(true))
    dispatch(setUserEditingData(data))
  }

  const handleDelete = async () => {
    const result = await QuestionAlert()
    if (result) {
      try {
        const deleteResult = await deleteUserFromServer(data.id)
        if (deleteResult.status === 200) {
          ToastAlert('کاربر با موفقیت حذف شد')
          dispatch(deleteUser(data.id))
        }
      } catch (error) {
        ToastAlert('عملیات انجام نشد لطفا مجددا تلاش کنید', 'Error')
      }
    }
  }

  return (
    <tr>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {userIndex + 1}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {data.fullName}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center  ">
        {data.role === 'admin' ? 'ادمین' : 'کاربر'}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {data.email}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {data.userName}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {data.dateCreatedAt}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        <div className="flex flex-row justify-center">
          <div onClick={handleOpenEdit} className="m-2" aria-hidden="true">
            <FiEdit color="#04b6d3" size="1.2rem" />
          </div>
          <div onClick={handleDelete} className="m-2" aria-hidden="true">
            <FiTrash2 color="red" size="1.2rem" />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default User

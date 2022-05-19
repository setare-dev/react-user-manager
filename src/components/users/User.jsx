import React from 'react'
import axios from 'axios'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

function User({
  data,
  toggleModal,
  userKey,
  users,
  setUserEditingData,
  fetchData,
}) {
  const handleOpenEdit = (key) => {
    toggleModal()
    const userEditingData = users.filter((user) => user.id === key)
    setUserEditingData(userEditingData[0])
  }

  const handleDelete = async (key) => {
    // eslint-disable-next-line no-alert
    const result = window.confirm('آیا مطمئن هستید؟')
    if (result) {
      // const newList = users.filter((user) => user.id !== key)
      // localStorage.setItem('USERS_LIST', JSON.stringify(newList))
      try {
        const deleteResult = await axios.delete(
          `https://6283e7d36b6c317d5ba758ce.endapi.io/users/${key}`
        )
        if (deleteResult.status === 200) {
          // show deleteResult sucessfully message to user
        }
      } catch (error) {
        // show deleteResult error message to user
      }
    }
    fetchData()
  }

  return (
    <tr>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center">
        {userKey + 1}
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
          <div
            onClick={() => handleOpenEdit(data.id)}
            className="m-2"
            aria-hidden="true"
          >
            <FiEdit color="#04b6d3" size="1.2rem" />
          </div>
          <div
            onClick={() => handleDelete(data.id)}
            className="m-2"
            aria-hidden="true"
          >
            <FiTrash2 color="red" size="1.2rem" />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default User

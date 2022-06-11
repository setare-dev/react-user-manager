import React from 'react'
import { useSelector } from 'react-redux'
import TableHead from './tableHead'

import User from './user'

function UserTable() {
  const userList = useSelector((state) => state.users.list)

  return (
    <div className="m-14">
      {userList.length > 0 ? (
        <table className="border-collapse table-auto text-sm w-full shadow-md bg-slate-100">
          <TableHead />
          <tbody className="bg-white dark:bg-slate-800">
            {userList.map((userData, index) => {
              return (
                <User userIndex={index} key={userData.id} data={userData} />
              )
            })}
          </tbody>
        </table>
      ) : (
        <h2 className="text-3xl font-bold text-center">
          در حال حاضر کاربری وجود ندارد
        </h2>
      )}
    </div>
  )
}

export default UserTable

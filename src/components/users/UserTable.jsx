import React from 'react'
import { useSelector } from 'react-redux'

import User from './User'

function UserTable({ toggleModal, setUserEditingData }) {
  const userList = useSelector((state) => state.users.list)

  return (
    <div className="m-14">
      {userList.length > 0 ? (
        <table className="border-collapse table-auto text-sm w-full shadow-md bg-slate-100">
          <thead>
            <tr>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                ردیف
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                نام و نام خانوادگی
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                نقش
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                ایمیل
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                نام کاربری
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                تاریخ عضویت
              </th>
              <th className="border-b font-medium p-4 pl-8 text-slate-400 text-center">
                تنظیمات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {userList.map((userData, index) => {
              return (
                <User
                  userIndex={index}
                  key={userData.id}
                  data={userData}
                  toggleModal={toggleModal}
                  setUserEditingData={setUserEditingData}
                />
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

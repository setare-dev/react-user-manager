import React from 'react'

function TableHead() {
  return (
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
  )
}

export default TableHead

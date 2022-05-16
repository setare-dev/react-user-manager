import React from 'react'

function Role({ register, userEditingData }) {
  return (
    <>
      <label htmlFor="role">
        نقش
        <br />
        <select
          id="role"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('role')}
          className="w-full  p-2 border rounded-sm"
          defaultValue={userEditingData?.role || ''}
        >
          <option value="user">کاربر</option>
          <option value="admin">ادمین</option>
        </select>
      </label>
      <br />
    </>
  )
}

export default Role

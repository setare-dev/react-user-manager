import React from 'react'

function Username({ register, userEditingData, errors }) {
  return (
    <>
      <label htmlFor="userName">
        نام کاربری
        <br />
        <input
          id="userName"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('userName')}
          className="w-full border   p-2 rounded-sm "
          defaultValue={userEditingData?.userName || ''}
        />
      </label>
      <p className="mb-4 text-red-500">{errors.userName?.message}</p>
    </>
  )
}

export default Username

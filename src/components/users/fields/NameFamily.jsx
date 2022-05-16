import React from 'react'

function NameFamily({ register, userEditingData, errors }) {
  return (
    <>
      <label htmlFor="fullName">
        نام و نام خانوادگی
        <br />
        <input
          id="fullName"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('fullName')}
          className="w-full border p-2 rounded-sm "
          defaultValue={userEditingData?.fullName || ''}
        />
      </label>
      <p className="mb-4 text-red-500">{errors.fullName?.message}</p>
    </>
  )
}

export default NameFamily

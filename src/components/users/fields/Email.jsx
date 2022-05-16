import React from 'react'

function Email({ register, userEditingData, errors }) {
  return (
    <>
      <label htmlFor="email">
        ایمیل
        <br />
        <input
          id="email"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email')}
          className="w-full border  p-2 rounded-sm "
          defaultValue={userEditingData?.email || ''}
        />
      </label>
      <p className="mb-4 text-red-500">{errors.email?.message}</p>
    </>
  )
}

export default Email

import React from 'react'

function InputField({ register, userEditingData, errors, label, name }) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <br />
        <input
          id={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name)}
          className="w-full border  p-2 rounded-sm "
          defaultValue={userEditingData?.[name] || ''}
        />
      </label>
      <p className="mb-4 text-red-500">{errors[name]?.message}</p>
    </>
  )
}

export default InputField

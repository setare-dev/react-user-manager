import React from 'react'

function RadioInputField({ register, userEditingData, label, name, data }) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <br />
        <select
          id={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name)}
          className="w-full  p-2 border rounded-sm"
          defaultValue={userEditingData?.[name] || ''}
        >
          {data.length > 0 &&
            data.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
        </select>
      </label>
      <br />
    </>
  )
}

export default RadioInputField

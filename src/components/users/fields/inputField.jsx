import React from 'react'
import { Field } from 'formik'

function InputField({ touched, errors, label, name }) {
  return (
    <div className="mt-2">
      <label htmlFor={name}>
        {label}
        <br />

        <Field
          name={name}
          className={`w-full border  p-2 rounded-sm ${
            errors[name] && touched[name] && `border-red-500`
          }`}
        />
      </label>
      {errors[name] && touched[name] && (
        <p className="mb-4 text-red-500">{errors[name]}</p>
      )}
    </div>
  )
}

export default InputField

// import React from 'react'

// function RadioInputField({ register, userEditingData, label, name, data }) {
//   return (
//     <>
//       <label htmlFor={name}>
//         {label}
//         <br />
//         <select
//           id={name}
//           // eslint-disable-next-line react/jsx-props-no-spreading
//           {...register(name)}
//           className="w-full  p-2 border rounded-sm"
//           defaultValue={userEditingData?.[name] || ''}
//         >
//           {data.length > 0 &&
//             data.map((item, index) => (
//               // eslint-disable-next-line react/no-array-index-key
//               <option key={index} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//         </select>
//       </label>
//       <br />
//     </>
//   )
// }

// export default RadioInputField

import React from 'react'
import { Field } from 'formik'

function RadioInputField({ label, name, optionsArray }) {
  return (
    <div className="mt-2">
      <label htmlFor={name}>
        {label}
        <br />
        <Field
          as="select"
          name={name}
          className="w-full border  p-2 rounded-sm "
        >
          {optionsArray.length &&
            optionsArray.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </Field>
      </label>
    </div>
  )
}

export default RadioInputField

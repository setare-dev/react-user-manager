import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import InputField from './fields/InputField'
import RadioInputField from './fields/RadioInputField'

const schema = yup
  .object({
    fullName: yup.string().required('وارد کردن نام اجباری می باشد'),
    userName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        'لطفا از کاراکتر های انگلیسی استفاده نمایید'
      )
      .required('وارد کردن نام کاربری اجباری می باشد'),
    email: yup
      .string()
      .email('ایمیل وارد شده صحیح نمی باشد')
      .required('وارد کردن ایمیل اجباری می باشد'),
  })
  .required()

function AddUserFrom({ toggleModal, fetchData, userEditingData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getCurrentDate = () => {
    const today = new Date()
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    }
    const now = today.toLocaleString('fa-IR', options)
    return now
  }

  const handleAddUser = async (data) => {
    console.log('data=>', data)
    if (userEditingData?.id !== undefined) {
      // Edit
      try {
        const updateResult = await axios.put(
          `https://6283e7d36b6c317d5ba758ce.endapi.io/users/${userEditingData.id}`,
          {
            ...data,
          }
        )
        if (updateResult.status === 200) {
          // show updated sucessfully message to user
        }
      } catch (error) {
        // show updated error message to user
      }
    } else {
      // Add
      try {
        const addResult = await axios.post(
          'https://6283e7d36b6c317d5ba758ce.endapi.io/users/',
          {
            ...data,
            dateCreatedAt: getCurrentDate(),
          }
        )
        if (addResult.status === 200) {
          // show added sucessfully message to user
        }
      } catch (error) {
        // show added sucessfully message to user
      }
    }
    fetchData()
    toggleModal()
  }

  return (
    <form>
      <InputField
        register={register}
        userEditingData={userEditingData}
        errors={errors}
        name="fullName"
        label="نام و نام خانوادگی"
      />
      <InputField
        register={register}
        userEditingData={userEditingData}
        errors={errors}
        name="userName"
        label="نام کاربری"
      />
      <InputField
        register={register}
        userEditingData={userEditingData}
        errors={errors}
        name="email"
        label="ایمیل"
      />
      {!userEditingData?.id && (
        <InputField
          register={register}
          userEditingData={userEditingData}
          errors={errors}
          name="password"
          label="رمز عبور"
        />
      )}
      <RadioInputField
        register={register}
        userEditingData={userEditingData}
        errors={errors}
        name="role"
        label="نقش"
        data={[
          { value: 'admin', label: 'ادمین' },
          { value: 'user', label: 'کاربر' },
        ]}
      />

      <button
        type="button"
        className="bg-cyan-500 p-3 text-gray-50 rounded my-6 w-full font-bold"
        onClick={handleSubmit(handleAddUser)}
      >
        افزودن
      </button>
    </form>
  )
}

export default AddUserFrom

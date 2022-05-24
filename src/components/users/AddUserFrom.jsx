import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import axiosRequest from '../../api/axiosRequest'
import InputField from './fields/InputField'
import RadioInputField from './fields/RadioInputField'
import { ToastAlert } from '../toastAlert'

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
  const [addError, setAddError] = useState()
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
    if (userEditingData?.id !== undefined) {
      // Edit
      try {
        const updateResult = await axiosRequest.put(
          `/users/${userEditingData.id}`,
          {
            ...data,
          }
        )
        if (updateResult.status === 200) {
          ToastAlert('اطلاعات کاربر با موفقیت آپدیت شد')
          fetchData()
          toggleModal()
        }
      } catch (error) {
        // show updated error message to user
      }
    } else {
      // Add
      try {
        const addResult = await axiosRequest.post('/users/', {
          ...data,
          dateCreatedAt: getCurrentDate(),
        })
        if (addResult.status === 200) {
          ToastAlert('کاربر با موفقیت اضافه شد')
          fetchData()
          toggleModal()
        }
      } catch (error) {
        if (error.response.data.message.includes('email')) {
          setAddError('این آدرس ایمیل قبلا ثبت شده است.')
        }
      }
    }
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
      {addError && <p className="my-4 text-red-500">{addError}</p>}
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

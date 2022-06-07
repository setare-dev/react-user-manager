import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { addUserToServer, editUserInServer } from '../../api/userApi'
import InputField from './fields/inputField'
import RadioInputField from './fields/radioInputField'
import { ToastAlert } from '../customAlert'
import {
  addUser,
  editUser,
  toggleAddUserModal,
} from '../../store/slices/userSlice'

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

function AddUserFrom() {
  const dispatch = useDispatch()
  const userEditingData = useSelector((state) => state.users.userEditingData)
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
      // Edit Mode
      try {
        const updateResult = await editUserInServer(userEditingData.id, {
          ...data,
        })
        if (updateResult.status === 200) {
          ToastAlert('اطلاعات کاربر با موفقیت بروزرسانی شد')

          dispatch(editUser(updateResult.data.data))
          dispatch(toggleAddUserModal())
        }
      } catch (error) {
        ToastAlert('خطایی رخ داده است')
      }
    } else {
      // Add Mode
      try {
        const addResult = await addUserToServer({
          ...data,
          dateCreatedAt: getCurrentDate(),
        })
        if (addResult.status === 200) {
          dispatch(addUser(addResult.data.data))
          ToastAlert('کاربر با موفقیت اضافه شد')
          dispatch(toggleAddUserModal())
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

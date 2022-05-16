import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import NameFamily from './fields/NameFamily'
import Username from './fields/Username'
import Email from './fields/Email'
import Role from './fields/Role'

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

function AddUserFrom({ toggleModal, fetchData, userEditingData, users }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleAddUser = (data) => {
    let updatedUsers = []
    if (data.id === userEditingData?.id) {
      updatedUsers = users.filter((user) => user.id !== userEditingData?.id)
      updatedUsers = [data, ...updatedUsers]
    } else {
      updatedUsers = [data, ...users]
    }
    localStorage.setItem('USERS_LIST', JSON.stringify(updatedUsers))
    fetchData()
    toggleModal()
  }

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

  const onSubmit = (data) => {
    const newData = {
      ...data,
      dateCreatedAt: getCurrentDate(),
      id: userEditingData?.id || uuidv4(),
    }
    handleAddUser(newData)
  }

  return (
    <form>
      <NameFamily
        register={register}
        userEditingData={userEditingData}
        errors={errors}
      />

      <Username
        register={register}
        userEditingData={userEditingData}
        errors={errors}
      />

      <Email
        register={register}
        userEditingData={userEditingData}
        errors={errors}
      />

      <Role
        register={register}
        userEditingData={userEditingData}
        errors={errors}
      />

      <button
        type="button"
        className="bg-cyan-500 p-3 text-gray-50 rounded my-6 w-full font-bold"
        onClick={handleSubmit(onSubmit)}
      >
        افزودن
      </button>
    </form>
  )
}

export default AddUserFrom

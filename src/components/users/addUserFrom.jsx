import React, { useState } from 'react'
import { Formik, Form } from 'formik'
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
    fullName: yup.string().required('وارد کردن نام الزامی می باشد'),
    userName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        'لطفا از کاراکتر های انگلیسی استفاده نمایید'
      )
      .required('وارد کردن نام کاربری الزامی می باشد'),
    email: yup
      .string()
      .email('ایمیل وارد شده صحیح نمی باشد')
      .required('وارد کردن ایمیل الزامی می باشد'),
    password: yup.string().required('وارد کردن رمز عبور الزامی می باشد'),
  })
  .required()

function AddUserFrom() {
  const dispatch = useDispatch()
  const userEditingData = useSelector((state) => state.users.userEditingData)
  const [addError, setAddError] = useState()
  const [loading, setLoading] = useState()

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
          dispatch(toggleAddUserModal(false))
        }
      } catch (error) {
        ToastAlert('خطایی رخ داده است')
      }
    } else {
      // Add Mode
      try {
        setLoading(true)
        const addResult = await addUserToServer({
          ...data,
          dateCreatedAt: getCurrentDate(),
        })
        if (addResult.status === 200) {
          dispatch(addUser(addResult.data.data))
          ToastAlert('کاربر با موفقیت اضافه شد')
          dispatch(toggleAddUserModal(false))
        }
      } catch (error) {
        if (error.response.data.message.includes('email')) {
          setAddError('این آدرس ایمیل قبلا ثبت شده است.')
        }
      }
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{
        fullName: userEditingData.fullName || '',
        userName: userEditingData.userName || '',
        email: userEditingData.email || '',
        password: '',
        role: userEditingData.role || 'admin',
      }}
      validationSchema={schema}
      onSubmit={handleAddUser}
    >
      {({ errors, touched }) => (
        <Form>
          <InputField
            touched={touched}
            errors={errors}
            name="fullName"
            label="نام و نام خانوادگی"
          />
          <InputField
            touched={touched}
            errors={errors}
            name="userName"
            label="نام کاربری"
          />
          <InputField
            touched={touched}
            errors={errors}
            name="email"
            label="ایمیل"
          />
          {!userEditingData.id && (
            <InputField
              touched={touched}
              errors={errors}
              name="password"
              label="رمز عبور"
            />
          )}
          <RadioInputField
            name="role"
            label="نقش"
            optionsArray={[
              { value: 'admin', label: 'ادمین' },
              { value: 'user', label: 'کاربر' },
            ]}
          />
          {addError && <p className="my-4 text-red-500">{addError}</p>}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-cyan-500 p-3 text-gray-50 rounded my-6 w-full font-bold ml-3 flex justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin   h-5 w-5 text-white ml-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : null}
              {userEditingData.id ? 'ویرایش' : 'افزودن'}
            </button>
            <button
              type="button"
              onClick={() => dispatch(toggleAddUserModal(false))}
              className="bg-gray-400 p-3 text-gray-50 rounded my-6 w-full font-bold"
            >
              انصراف
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddUserFrom

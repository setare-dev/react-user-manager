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
import ProcessButton from './fields/processButton'

function AddUserFrom() {
  const dispatch = useDispatch()
  const userEditingData = useSelector((state) => state.users.userEditingData)
  const [addError, setAddError] = useState()
  const [loading, setLoading] = useState()

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

      ...(userEditingData.id === undefined && {
        password: yup.string().required('وارد کردن رمز عبور الزامی می باشد'),
      }),
    })
    .required()

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
        setLoading(true)
        const updateResult = await editUserInServer(userEditingData.id, {
          ...data,
        })
        if (updateResult.status === 200) {
          ToastAlert('اطلاعات کاربر با موفقیت بروزرسانی شد')

          dispatch(editUser(updateResult.data.data))
          dispatch(toggleAddUserModal(false))
        }
      } catch (error) {
        ToastAlert('خطایی رخ داده است', 'error')
      }
      setLoading(false)
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
        ...(userEditingData.id === undefined && { password: '' }),
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
            <ProcessButton
              type="submit"
              loading={loading}
              title={userEditingData.id ? 'ویرایش' : 'افزودن'}
            />
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

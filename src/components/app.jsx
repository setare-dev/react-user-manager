import React, { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'

import { getUsers } from '../api/userApi'
import Header from './layouts/header'
import UserTable from './users/userTable'
import Loading from './loading'
import { ToastAlert } from './customAlert'
import { setUsers } from '../store/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await getUsers()
      if (result.data.data.length >= 0)
        dispatch(setUsers(result.data.data.reverse()))
    } catch (error) {
      ToastAlert('خطایی رخ داده است')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="font-IRANSans">
      <Header />
      {isLoading ? <Loading /> : <UserTable />}

      {/* Container for show taost message */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App

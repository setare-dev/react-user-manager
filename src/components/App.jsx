import React, { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'

import axiosRequest from '../api/axiosRequest'
import Header from './layouts/Header'
import UserTable from './users/UserTable'
import Loading from './Loading'
import { ToastAlert } from './customAlert'
import { setUsers } from '../store/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await axiosRequest.get('/users/')
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

      {/* for show taost message */}
      <ToastContainer />
    </div>
  )
}

export default App

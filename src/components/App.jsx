import React, { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'

import axiosRequest from '../api/axiosRequest'
import Header from './layouts/Header'
import UserTable from './users/UserTable'
import Loading from './Loading'

import { setUsers } from '../store/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  // const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState()
  const [isOpenModal, setIsOpenModal] = useState()
  const [userEditingData, setUserEditingData] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await axiosRequest.get('/users/')
      if (result.data.data.length >= 0)
        dispatch(setUsers(result.data.data.reverse()))
    } catch (error) {
      // Show error message for reload again
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleModal = () => {
    if (isOpenModal) setUserEditingData(null)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <div className="font-IRANSans">
      <Header
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        userEditingData={userEditingData}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <UserTable
          fetchData={fetchData}
          toggleModal={toggleModal}
          setUserEditingData={setUserEditingData}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default App

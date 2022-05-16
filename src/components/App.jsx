import React, { useEffect, useState } from 'react'
import Header from './layouts/Header'
import UserTable from './users/UserTable'
import Loading from './Loading'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState()
  const [isOpenModal, setIsOpenModal] = useState()
  const [userEditingData, setUserEditingData] = useState(null)

  const fetchData = () => {
    setIsLoading(true)
    const usersList = localStorage.USERS_LIST
      ? JSON.parse(localStorage.getItem('USERS_LIST'))
      : []
    if (usersList) setUsers(usersList)
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
    <>
      <Header
        fetchData={fetchData}
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        userEditingData={userEditingData}
        users={users}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <UserTable
          users={users}
          fetchData={fetchData}
          toggleModal={toggleModal}
          setUserEditingData={setUserEditingData}
        />
      )}
    </>
  )
}

export default App

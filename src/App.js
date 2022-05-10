import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import UserTable from './components/UserTable'

const App = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [isOpenModal, setIsOpenModal] = useState();
    const [userEditingData, setUserEditingData] = useState(null);

    const fetchData = () => {
        setIsLoading(true);
        const usersList = JSON.parse(localStorage.getItem('USERS_LIST'));
        if (usersList) {
            setUsers(usersList.reverse());
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleModal = () => {
        if (isOpenModal) setUserEditingData(null)
        setIsOpenModal(!isOpenModal)
    }

    const handleDelete = (key) => {
        const list = users.filter(user => {
            return user.id !== key
        })
        localStorage.setItem('USERS_LIST', JSON.stringify(list));
        fetchData()
    }

    const handleOpenEdit = (key) => {
        toggleModal()
        const userEditingData = users.filter(user => user.id === key)
        setUserEditingData(userEditingData[0])
    }

    const handleAddUser = (data) => {
        let updatedUsers = [];
        if (data.id === userEditingData?.id) {
            updatedUsers = users.filter(user => user.id !== userEditingData?.id)
            updatedUsers = [...updatedUsers, data]
        } else {
            updatedUsers = [...users, data]
        }
        localStorage.setItem('USERS_LIST', JSON.stringify(updatedUsers));
        fetchData()
        toggleModal()
    }

    return (
        <>
            <Header addUser={handleAddUser} toggleModal={toggleModal} isOpenModal={isOpenModal} userEditingData={userEditingData} />
            {isLoading ? "Is Loading ..." : <UserTable users={users} onDelete={handleDelete} onEdit={handleOpenEdit} />}

        </>

    )
}

export default App
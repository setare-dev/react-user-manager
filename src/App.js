import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import UserTable from './components/UserTable'
import Loading from './components/Loading'

const App = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState();
    const [userEditingData, setUserEditingData] = useState(null);

    const fetchData = () => {
        setIsLoading(true);
        setTimeout(() => {
            const usersList = JSON.parse(localStorage.getItem('USERS_LIST'));
            setIsLoading(false)
        }, 2000)
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
            updatedUsers = [data, ...updatedUsers]
        } else {
            updatedUsers = [data, ...users]
        }
        localStorage.setItem('USERS_LIST', JSON.stringify(updatedUsers));
        setUsers(updatedUsers)
        toggleModal()
    }

    return (
        <>
            <Header addUser={handleAddUser} toggleModal={toggleModal} isOpenModal={isOpenModal} userEditingData={userEditingData} />
            {isLoading ? <Loading /> : <UserTable users={users} onDelete={handleDelete} onEdit={handleOpenEdit} />}

        </>

    )
}

export default App
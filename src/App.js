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
            setUsers(localStorage.USERS_LIST ? JSON.parse(localStorage.getItem('USERS_LIST')) : []);
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
        const result = window.confirm('آیا مطمئن هستید؟')
        if (result) {
            let newList = users.filter(user => user.id !== key)
            setUsers(newList);
            localStorage.setItem('USERS_LIST', JSON.stringify(newList));
        }
    }

    const handleOpenEdit = (key) => {
        toggleModal()
        const userEditingData = users.find(user => user.id === key)
        setUserEditingData(userEditingData)
    }

    const handleAddUser = (data) => {
        let updatedUsers = [];
        if (data.id === userEditingData?.id) {
            updatedUsers = users.map(user => user.id !== userEditingData?.id ? user : data)
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
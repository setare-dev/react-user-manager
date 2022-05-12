import React, {useEffect, useState} from 'react'
import Header from './layouts/Header'
import UserTable from './users/UserTable'

const App = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false)
    }, [])

    const toggleModal = () => {
        if (isOpenModal) setUserEditingData(null)
        setIsOpenModal(!isOpenModal)
    }

    return (
        <>
            <Header fetchData={fetchData} isOpenModal={isOpenModal} toggleModal={toggleModal} userEditingData={userEditingData} users={users}/>
            {
                isLoading
                    ? "Is Loading ..."
                    : <UserTable users={users} fetchData={fetchData} toggleModal={toggleModal} setUserEditingData={setUserEditingData}/>
            }
        </>
    )
}

export default App
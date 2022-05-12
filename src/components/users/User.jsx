import React from 'react'
import {FiEdit, FiTrash2} from "react-icons/fi";

const User = ({data, toggleModal, userKey, users, setUserEditingData, fetchData}) => {
    const handleOpenEdit = (key) => {
        toggleModal()
        const userEditingData = users.filter(user => user.id === key)
        setUserEditingData(userEditingData[0])
    }

    const handleDelete = (key) => {
        const list = users.filter(user => {
            return user.id !== key
        })
        localStorage.setItem('USERS_LIST', JSON.stringify(list));
        fetchData()
    }

    return (
        <tr>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{userKey + 1}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.fullName}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.role === "admin" ? "ادمین" : "کاربر"}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.email}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.userName}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.dateCreatedAt}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500'>
                <div className='flex flex-row justify-center'>
                    <div onClick={() => handleOpenEdit(data.id)} className='m-2'>
                        <FiEdit color='#04b6d3' size="1.2rem"/>
                    </div>
                    <div onClick={() => handleDelete(data.id)} className='m-2'>
                        <FiTrash2 color='red' size="1.2rem"/>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default User;
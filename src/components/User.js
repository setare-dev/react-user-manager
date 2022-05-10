import React from 'react'
import { FiTrash2, FiEdit } from "react-icons/fi";

const User = ({ data, onEdit, onDelete }) => {
    return (
        <tr>

            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.fullName}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.role === "admin" ? "ادمین" : "کاربر"}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.email}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.userName}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-center'>{data.dateCreatedAt}</td>
            <td className='border-b border-slate-100 p-4 pl-8 text-slate-500'>
                <div className='flex flex-row'>
                    <div onClick={() => onEdit(data.id)} className='m-2'>
                        <FiEdit color='#04b6d3' size="1.2rem" />
                    </div>
                    <div onClick={() => onDelete(data.id)} className='m-2'>
                        <FiTrash2 color='red' size="1.2rem" />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default User;
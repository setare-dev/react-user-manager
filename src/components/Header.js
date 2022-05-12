import React from 'react';
import {FiPlus} from "react-icons/fi";

import AddUserFrom from './AddUserFrom';
import Modal from './Modal';


const Header = ({addUser, userEditingData, toggleModal, isOpenModal}) => {

    return (
        <>
            <div className='px-14 my-20'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h3 className="text-3xl font-bold ">
                            کاربران
                        </h3>
                        <div className=' mt-10'>
                            لیست اطلاعات کاربران در این بخش قابل مشاهده می باشد
                        </div>
                    </div>
                    <button
                        onClick={toggleModal}
                        className="bg-cyan-500 px-4 text-gray-50 rounded my-6 shadow-md">
                        <div className='flex flex-row item-center justify-center font-bold'>
                            <FiPlus className="self-center ml-2"/> افزودن کاربر
                        </div>
                    </button>

                </div>

            </div>
            <Modal open={isOpenModal} onClose={toggleModal}>
                <AddUserFrom addUser={addUser} userEditingData={userEditingData}/>
            </Modal>
        </>

    )
}

export default Header;
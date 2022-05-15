import React from 'react';

import AddUserFrom from '../users/AddUserFrom';
import Modal from './Modal';
import TitleSection from "./TitleSection";


const Header = ({fetchData, users, userEditingData, toggleModal, isOpenModal}) => {

    return (
        <>
            <TitleSection toggleModal={toggleModal}/>

            <Modal open={isOpenModal} toggleModal={toggleModal}>
                <AddUserFrom fetchData={fetchData} toggleModal={toggleModal} userEditingData={userEditingData} users={users}/>
            </Modal>
        </>
    )
}

export default Header;
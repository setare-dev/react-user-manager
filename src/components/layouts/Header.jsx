import React from 'react'

import AddUserFrom from '../users/AddUserFrom'
import Modal from './Modal'
import TitleSection from './TitleSection'

function Header({ userEditingData }) {
  return (
    <>
      <TitleSection />
      <Modal>
        <AddUserFrom userEditingData={userEditingData} />
      </Modal>
    </>
  )
}

export default Header

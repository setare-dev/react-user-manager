import React from 'react'

import AddUserFrom from '../users/addUserFrom'
import Modal from './modal'
import TitleSection from './titleSection'

function Header() {
  return (
    <>
      <TitleSection />
      <Modal>
        <AddUserFrom />
      </Modal>
    </>
  )
}

export default Header

import React from 'react'

import AddUserFrom from '../users/AddUserFrom'
import Modal from './Modal'
import TitleSection from './TitleSection'

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

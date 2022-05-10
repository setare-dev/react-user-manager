import React from 'react'
import ReactDOM from 'react-dom';
import { FiX } from "react-icons/fi";

const Modal = ({ open, children, onClose }) => {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div className='fixed inset-0 justify-center items-center flex flex-col overflow-hidden bg-zinc-400/75 z-50' >
            <div className='fixed flex w-6/12 h-4/5 justify-center items-center inset-x-2/4 inset-y-3/5 bg-white z-50 transform translate-x-1/2 translate-x-1/2 rounded-xl '>
                <button onClick={onClose} className="fixed top-4 left-4">
                    <FiX size="1.5rem" />
                </button>
                <div className='w-4/5 h-4/5'>{children}</div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}


export default Modal;
import { toast } from 'react-toastify'

// eslint-disable-next-line import/prefer-default-export
export const ToastAlert = (message, TYPE = 'success') => {
  return toast(message, {
    position: 'bottom-left',
    type: TYPE,
    autoClose: 3000,
    rtl: true,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

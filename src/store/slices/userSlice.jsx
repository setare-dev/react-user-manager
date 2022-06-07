import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    showModal: false,
    userEditingData: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload)
    },
    setUsers: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.list = payload
    },
    deleteUser: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.list = state.list.filter((user) => user.id !== payload)
    },
    editUser: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.list = state.list.map((userdata) =>
        userdata.id === payload.id ? payload : { ...userdata }
      )
    },
    toggleAddUserModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showModal = !state.showModal
    },
    setUserEditingData: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.userEditingData = payload
    },
  },
})

export const {
  addUser,
  setUsers,
  deleteUser,
  editUser,
  toggleAddUserModal,
  setUserEditingData,
} = usersSlice.actions
export default usersSlice.reducer

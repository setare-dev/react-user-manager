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
      state.list.unshift(action.payload)
    },
    setUsers: (state, { payload }) => {
      state.list = payload
    },
    deleteUser: (state, { payload }) => {
      state.list = state.list.filter((user) => user.id !== payload)
    },
    editUser: (state, { payload }) => {
      state.list = state.list.map((userdata) =>
        userdata.id === payload.id ? payload : { ...userdata }
      )
    },
    toggleAddUserModal: (state) => {
      if (state.showModal) state.userEditingData = {}
      state.showModal = !state.showModal
    },
    setUserEditingData: (state, { payload }) => {
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

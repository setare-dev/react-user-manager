import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
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
  },
})

export const { addUser, setUsers, deleteUser, editUser } = usersSlice.actions
export default usersSlice.reducer

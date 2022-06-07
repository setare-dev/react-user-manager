import axiosRequest from './axiosRequest'

export const getUsers = async () => await axiosRequest.get('/users/')

export const addUserToServer = async (data) =>
  await axiosRequest.post('/users/', data)

export const editUserInServer = async (id, data) =>
  await axiosRequest.put(`/users/${id}`, data)

export const deleteUserFromServer = async (id) =>
  await axiosRequest.delete(`/users/${id}`)

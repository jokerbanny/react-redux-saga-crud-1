import axios from 'axios'

export const loadUsersApi = async () => {
  return await axios.get('http://localhost:5000/users')
}
export const createUserApi = async (user) => {
  return await axios.post('http://localhost:5000/users', user)
}

export const deleteUserApi = async (userId) => {
  return await axios.delete(`http://localhost:5000/users/${userId}`)
}

export const updateUserApi = async (userId, userInfo) => {
  return await axios.put(`http://localhost:5000/users/${userId}`, userInfo)
}

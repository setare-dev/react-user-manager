import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: 'https://6283e7d36b6c317d5ba758ce.endapi.io/',
  timeout: 3000,
})

axiosRequest.interceptors.request.use(
  (request) => {
    return request
  },
  null,
  { synchronous: true }
)

axiosRequest.interceptors.response.use(
  (response) => {
    // Dispatch any action on success
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // Add Logic to
      // 1. Redirect to login page or
      // 2. Request refresh token
    }
    return Promise.reject(error)
  }
)

export default axiosRequest

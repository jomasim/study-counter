import axios from 'axios'

const server = token =>
  axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: { Authorization: `Bearer ${token}` }
  })

export default server

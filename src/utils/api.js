import axios from 'axios'

const server = token =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  })

export default server

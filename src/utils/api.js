import axios from 'axios'

const server = token =>
  axios.create({
    baseURL: 'https://studycounter.uc.r.appspot.com/api/v1',
    headers: { Authorization: `Bearer ${token}` }
  })

export default server

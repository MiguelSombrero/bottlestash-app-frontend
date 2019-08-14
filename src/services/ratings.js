import axios from 'axios'
const baseUrl = '/api/ratings'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newRating => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newRating, config)
  return res.data
}

export default { getAll, create, setToken }
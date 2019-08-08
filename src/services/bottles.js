import axios from 'axios'
const baseUrl = '/api/bottles'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newBottle => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBottle, config)
  return res.data
}

export default { getAll, create, setToken }
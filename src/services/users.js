import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async username => {
  const res = await axios.get(`${baseUrl}/${username}`)
  return res.data
}

const create = async user => {
  const res = await axios.post(baseUrl, user)
  return res.data
}

const update = async user => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.put(baseUrl, user, config)
  return res.data
}

export default { getAll, create, update, setToken, getOne }
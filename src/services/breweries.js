import axios from 'axios'
const baseUrl = '/api/breweries'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async name => {
  const res = await axios.get(`${baseUrl}/${name}`)
  return res.data
}

const create = async brewery => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, brewery, config)
  return res.data
}

export default { getAll, create, setToken, getOne }
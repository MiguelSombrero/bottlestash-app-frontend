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

const update = async (id, bottle) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.put(`${baseUrl}/${id}`, bottle, config)
  return res.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, create, setToken, update, remove }
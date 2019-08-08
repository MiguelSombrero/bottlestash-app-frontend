import axios from 'axios'
const baseUrl = '/api/beers'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async beer => {
  const res = await axios.get(`${baseUrl}/${beer.breweryId}/${beer.name}/${beer.abv}`)
  return res.data
}

const create = async newBeer => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBeer, config)
  return res.data
}

export default { getAll, create, setToken, getOne }
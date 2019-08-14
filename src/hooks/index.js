import { useState } from 'react'
import axios from 'axios'

// tätä ei käytetä vielä missään
export const useResource = (baseUrl) => {
  const [ token, setToken ] = useState(null)

  const setTokenToState = newToken => {
    setToken(`bearer ${newToken}`)
  }

  const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
  }

  const getOne = async identifier => {
    const res = await axios.get(`${baseUrl}/${identifier}`)
    return res.data
  }

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, resource, config)
    return res.data
  }

  const update = async resource => {
    const config = {
      headers: { Authorization: token }
    }
    const res = await axios.put(baseUrl, resource, config)
    return res.data
  }

  return  {
    setTokenToState, create, getAll, getOne, update
  }
}

export const useNumberField = (type, min, max, step, required = false) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    min,
    max,
    step,
    required,
    value,
    onChange
  }
}

export const useTextField = (type, minLength, maxLength, required = false) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    minLength,
    maxLength,
    required,
    value,
    onChange
  }
}
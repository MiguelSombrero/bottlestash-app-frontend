import { useState } from 'react'
import axios from 'axios'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

// tätä ei käytetä vielä missään
export const useResource = (baseUrl) => {

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
    create, getAll, getOne, update
  }
}

export const useField = (type, min, max, step = 1, required = false) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const setDefaultValue = (value) => {
    setValue(value)
  }

  if (type === 'number' || type === 'date' || type === 'range') {
    return [{
      type,
      min,
      max,
      step,
      required,
      value,
      onChange
      },
      setDefaultValue
    ]
  }

  return [{
    type,
    minLength: min,
    maxLength: max,
    required,
    value,
    onChange
    },
    setDefaultValue
  ]
}
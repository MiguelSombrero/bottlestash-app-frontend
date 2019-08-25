import { useState } from 'react'
import axios from 'axios'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

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
      headers: {
        Authorization: token
      }
    }
    const res = await axios.post(baseUrl, resource, config)
    return res.data
  }

  const createImage = async (resource) => {
    const config = {
      headers: {
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    }
    const res = await axios.post(baseUrl, resource, config)
    return res.data
  }

  const update = async (id, resource) => {
    const config = {
      headers: { Authorization: token }
    }
    const res = await axios.put(`${baseUrl}/${id}`, resource, config)
    return res.data
  }

  const remove = async id => {
    const config = {
      headers: { Authorization: token }
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    return res.data
  }

  return  {
    create, createImage, getAll, getOne, update, remove
  }
}

export const useTextField = (type, minLength, maxLength, required = false) => {
  const [value, setValue] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onInvalid = (event) => {
    setValidationMessage(event.target.validationMessage)
  }

  const setDefaultValue = (value) => {
    setValue(value)
  }

  return [
    {
      type, minLength, maxLength, required, value, onChange, onInvalid
    },
    validationMessage,
    setDefaultValue
  ]
}

export const useNumberField = (type, min, max, step = 1, required = false) => {
  const [value, setValue] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onInvalid = (event) => {
    setValidationMessage(event.target.validationMessage)
  }

  const setDefaultValue = (value) => {
    setValue(value)
  }

  return [
    {
      type, min, max, step, required, value, onChange, onInvalid
    },
    validationMessage,
    setDefaultValue
  ]
}
import loginService from '../services/login'
import { setToken } from '../hooks/'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem('loggedBottlestashUser', JSON.stringify(user))
    setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBottlestashUser')
    setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUserToState = user => {
  return async dispatch => {
    setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export default loginReducer
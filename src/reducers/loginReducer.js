import loginService from '../services/login'
import usersService from '../services/users'
import beersService from '../services/beers'
import bottlesService from '../services/bottles'
import breweriesService from '../services/breweries'
import ratingsService from '../services/ratings'

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

    usersService.setToken(user.token)
    beersService.setToken(user.token)
    bottlesService.setToken(user.token)
    breweriesService.setToken(user.token)
    ratingsService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBottlestashUser')
    
    usersService.setToken(null)
    beersService.setToken(null)
    bottlesService.setToken(null)
    breweriesService.setToken(null)
    ratingsService.setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUserToState = user => {
  return async dispatch => {
    usersService.setToken(user.token)
    beersService.setToken(user.token)
    bottlesService.setToken(user.token)
    breweriesService.setToken(user.token)
    ratingsService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export default loginReducer
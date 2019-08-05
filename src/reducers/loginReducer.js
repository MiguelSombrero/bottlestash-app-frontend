import loginService from '../services/login'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
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
      
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const setUserToState = user => {
  return {
    type: 'LOGIN',
    user
  }
}

export default loginReducer
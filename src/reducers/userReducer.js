import loginService from '../services/login'

const initialState = {
  user: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export const login = (event) => {
  return async dispatch => {
    event.preventDefault()
    
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username, password
      })

      dispatch({
        type: 'SET_USER',
        user
      })

      console.log(user)
      
    } catch (exception) {
      console.log('error message on Login dispatcher')
    }
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    user
  }
}

export default userReducer
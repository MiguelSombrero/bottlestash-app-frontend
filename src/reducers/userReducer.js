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

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBottlestashUser', JSON.stringify(user)
      )
  
      // aseta tässä käyttäjän token sitä tarvitseviin
      // serviceihin

      dispatch({
        type: 'SET_USER',
        user
      })

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
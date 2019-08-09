import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.users
    case 'UPDATE_USERS':
      return state.map(u => u.id !== action.user.id ? u : action.user)
    case 'REGISTER_USER':
      return [...state, action.newUser ]
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()

    dispatch({
      type: 'GET_USERS',
      users
    })
  }
}

export const updateUserToState = username => {
  return async dispatch => {
    const user = await usersService.getOne(username)

    dispatch({
      type: 'UPDATE_USERS',
      user
    })

    return user
  }
}

export const registerUser = user => {
  return async dispatch => {
    const newUser = await usersService.create(user)

    dispatch({
      type: 'REGISTER_USER',
      newUser
    })
  }
}

export default usersReducer
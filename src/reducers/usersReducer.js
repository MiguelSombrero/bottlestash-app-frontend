import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.users
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
import { useResource } from '../hooks'

const usersService = useResource('http://localhost:3001/api/users')

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.users
    case 'UPDATE_USER_TO_STATE':
      return state.map(u => u.id !== action.user.id ? u : action.user)
    case 'REMOVE_USER':
      return state.filter(u => u.id !== action.id)
    case 'UPDATE_USER':
      return state.map(u => u.id === action.updatedUser.id ? action.updatedUser : u)
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

// poista tämä kun AddBottle ja BottleDetails viewissä ei ole enää riippuvuuutta
export const updateUserToState = username => {
  return async dispatch => {
    const user = await usersService.getOne(username)

    dispatch({
      type: 'UPDATE_USER_TO_STATE',
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

export const removeUser = id => {
  return async dispatch => {
    await usersService.remove(id)

    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }
}

export const updateUser = (id, user) => {
  return async dispatch => {
    const updatedUser = await usersService.update(id, user)

    dispatch({
      type: 'UPDATE_USER',
      updatedUser
    })
  }
}

export default usersReducer
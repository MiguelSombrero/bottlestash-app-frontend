import { useResource } from '../hooks'

const bottlesService = useResource('http://localhost:3001/api/bottles')

const bottlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BOTTLES':
      return action.bottles
    case 'ADD_BOTTLE':
      return [...state, action.newBottle ]
    case 'REMOVE_BOTTLE':
      return state.filter(b => b.id !== action.id)
    case 'UPDATE_BOTTLE':
      return state.map(b => b.id === action.updatedBottle.id ? action.updatedBottle : b)
    default:
      return state
  }
}

export const getAllBottles = () => {
  return async dispatch => {
    const bottles = await bottlesService.getAll()

    dispatch({
      type: 'GET_BOTTLES',
      bottles
    })
  }
}

export const addBottle = bottle => {
  return async dispatch => {
    const newBottle = await bottlesService.create(bottle)

    dispatch({
      type: 'ADD_BOTTLE',
      newBottle
    })
  }
}

export const removeBottle = id => {
  return async dispatch => {
    await bottlesService.remove(id)

    dispatch({
      type: 'REMOVE_BOTTLE',
      id
    })
  }
}

export const updateBottle = (id, bottle) => {
  return async dispatch => {
    const updatedBottle = await bottlesService.update(id, bottle)

    dispatch({
      type: 'UPDATE_BOTTLE',
      updatedBottle
    })
  }
}

export default bottlesReducer
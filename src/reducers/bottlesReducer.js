import { useResource } from '../hooks'

const bottlesService = useResource('http://localhost:3001/api/bottles')

const bottlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BOTTLES':
      return action.bottles
    default:
      return state
  }
}

export const addBottle = newBottle => {
  return async dispatch => {
    await bottlesService.create(newBottle)
  }
}

export const removeBottle = id => {
  return async dispatch => {
    await bottlesService.remove(id)
  }
}

export const updateBottle = (id, bottle) => {
    return async dispatch => {
      await bottlesService.update(id, bottle)
    }
  }

export default bottlesReducer
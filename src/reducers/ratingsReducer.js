import { useResource } from '../hooks'

const ratingsService = useResource('http://localhost:3001/api/ratings')

const ratingsReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_RATINGS':
        return action.ratings
      case 'ADD_RATING':
        return [...state, action.rating ]
      default:
        return state
    }
  }
  
  export const getAllRatings = () => {
    return async dispatch => {
      const ratings = await ratingsService.getAll()

      dispatch({
        type: 'GET_RATINGS',
        ratings
      })
    }
  }
  
  export const addRating = ratings => {
    return async dispatch => {
      const rating = await ratingsService.create(ratings)
  
      dispatch({
        type: 'ADD_RATING',
        rating
      })
    }
  }

  export default ratingsReducer
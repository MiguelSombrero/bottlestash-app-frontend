import breweriesService from '../services/breweries'
import { useResource } from '../hooks/'

const service = useResource('/api/breweries')

const breweriesReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_BREWERIES':
        return action.breweries
      case 'ADD_BREWERY':
        return [...state, state.brewery ]
      default:
        return state
    }
  }
  
  export const getAllBreweries = () => {
    return async dispatch => {
      const breweries = await service.getAll()
      //const breweries = await breweriesService.getAll()
  
      dispatch({
        type: 'GET_BREWERIES',
        breweries
      })
    }
  }
  
  export const addBrewery = name => {
    return async dispatch => {
      const brewery = await service.create({ name })
      //const brewery = await breweriesService.create({ name })
  
      dispatch({
        type: 'ADD_BREWERY',
        brewery
      })

      return brewery
    }
  }

  export default breweriesReducer
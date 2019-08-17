//import breweriesService from '../services/breweries'
import { useResource } from '../hooks'

const breweriesService = useResource('http://localhost:3001/api/breweries')

const breweriesReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_BREWERIES':
        return action.breweries
      case 'ADD_BREWERY':
        return [...state, action.brewery ]
      default:
        return state
    }
  }
  
  export const getAllBreweries = () => {
    return async dispatch => {
      const breweries = await breweriesService.getAll()
  
      dispatch({
        type: 'GET_BREWERIES',
        breweries
      })
    }
  }

  export const getOneBrewery = breweryName => {
    return async dispatch => {
      const brewery = await breweriesService.getOne(breweryName)
      return brewery
    }
  }
  
  export const addBrewery = newBrewery => {
    return async dispatch => {
      const brewery = await breweriesService.create(newBrewery)
  
      dispatch({
        type: 'ADD_BREWERY',
        brewery
      })

      return brewery
    }
  }

  export default breweriesReducer
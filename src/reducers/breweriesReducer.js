import breweriesService from '../services/breweries'

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
      const breweries = await breweriesService.getAll()
  
      dispatch({
        type: 'GET_BREWERIES',
        breweries
      })
    }
  }
  
  export const addBrewery = brewery => {
    return {
      type: 'ADD_BREWERY',
      brewery
    }
  }
  
  export default breweriesReducer
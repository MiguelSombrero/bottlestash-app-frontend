import beersService from '../services/beers'

const beersReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_BEERS':
        return action.beers
      case 'ADD_BEER':
        return [...state, state.beer ]
      default:
        return state
    }
  }
  
  export const getAllBeers = () => {
    return async dispatch => {
      const beers = await beersService.getAll()
  
      dispatch({
        type: 'GET_BEERS',
        beers
      })
    }
  }
  
  export const addBeer = ({ breweryId, name, abv }) => {
    return async dispatch => {
      const beer = await beersService.create({ breweryId, name, abv })
  
      dispatch({
        type: 'ADD_BEER',
        beer
      })

      return beer
    }
  }

  export default beersReducer
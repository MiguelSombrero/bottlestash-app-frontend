import { useResource } from '../hooks'

const beersService = useResource('/api/beers')

const beersReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_BEERS':
        return action.beers
      case 'ADD_BEER':
        return [...state, action.beer ]
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

  export const getOneBeer = (brewery, name, abv) => {
    return async dispatch => {
      const beer = await beersService.getOne(`${brewery}/${name}/${abv}`)
      return beer
    }
  }
  
  export const addBeer = newBeer => {
    return async dispatch => {
      const beer = await beersService.create(newBeer)
  
      dispatch({
        type: 'ADD_BEER',
        beer
      })

      return beer
    }
  }

  export default beersReducer

const initialState = {
  breweries: [],
  beers: [],
  bottles: []
}

const bottlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BREWERY':
      return state
    case 'ADD_BEER':
      return state
    case 'ADD_BOTTLE':
      return state
    default:
      return state
  }
}

export default bottlesReducer
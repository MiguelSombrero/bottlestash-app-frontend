import beersReducer from './beersReducer'
import deepFreeze from 'deep-freeze'

describe('beersReducer', () => {
  test('returns beers with GET_BEERS action', () => {
    const state = []
    const beers = [
      {
        brewery: 'ojfasdfjaoijsdjIJFDPodjf',
        abv: 5.6,
        name: 'Sonnisaari IPA',
        ratings: []
      },
      {
        brewery: 'ojfasdasfasfasDPodjf',
        abv: 7.8,
        name: 'Speedway Stout',
        ratings: []
      },
      {
        brewery: 'ojfasdfadasdfafdIJFDPodjf',
        abv: 11.2,
        name: 'Katariina Stout',
        ratings: []
      },
    ]

    const action = {
      type: 'GET_BEERS',
      beers
    }

    deepFreeze(state)
    const newState = beersReducer(state, action)

    expect(newState.length).toBe(3)
    expect(newState).toEqual(action.beers)
  })

  test('returns old state plus new beer with ADD_BEER action', () => {
    const state = [
      {
        brewery: 'ojfasdfjaoijsdjIJFDPodjf',
        abv: 5.6,
        name: 'Sonnisaari IPA',
        ratings: []
      },
      {
        brewery: 'ojfasdasfasfasDPodjf',
        abv: 7.8,
        name: 'Speedway Stout',
        ratings: []
      }
    ]

    const beer = {
      brewery: 'ojfsdasdasdasfasfasDPodjf',
      abv: 10.8,
      name: 'Old Foghorn',
      ratings: []
    }
    
    const action = {
      type: 'ADD_BEER',
      beer
    }

    deepFreeze(state)
    const newState = beersReducer(state, action)

    expect(newState.length).toBe(3)
    expect(newState).toEqual([...state, beer ])
  })

  test('returns initial state when called undefined', () => {
    const newState = beersReducer(undefined, { type: 'NOTHING'})
    expect(newState).toStrictEqual([])
  })

  test('returns passed state in default action', () => {
    const newState = beersReducer([
      {
        brewery: 'ojfsdasdasdasfasfasDPodjf',
        abv: 10.8,
        name: 'Old Foghorn',
        ratings: []
      }
    ], { type: 'NOTHING'})

    expect(newState).toStrictEqual([
      {
        brewery: 'ojfsdasdasdasfasfasDPodjf',
        abv: 10.8,
        name: 'Old Foghorn',
        ratings: []
      }
    ])
  })
})
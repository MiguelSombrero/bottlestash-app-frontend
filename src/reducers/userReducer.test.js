import userReducer from './userReducer'
import deepFreeze from 'deep-freeze'

describe('userReducer', () => {
  test('returns a user with action SET_USER', () => {
    const state = { user: null }
    const action = {
      type: 'SET_USER',
      user: {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      }
    }

    deepFreeze(state)
    const newState = userReducer(state, action)

    expect(newState.user).not.toBe(null)
    expect(newState).toEqual(action.user)
  })

  test('returns initial state when called undefined', () => {
    const newState = userReducer(undefined, { type: 'NOTHING'})
    expect(newState.user).toBe(null)
  })
})
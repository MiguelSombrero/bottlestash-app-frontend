import loginReducer from './loginReducer'
import deepFreeze from 'deep-freeze'

describe('loginReducer', () => {
  test('returns a user with action LOGIN', () => {
    const state = {}
    const action = {
      type: 'LOGIN',
      user: {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      }
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)

    expect(newState).not.toBe(null)
    expect(newState).toEqual(action.user)
  })

  test('returns initial state when called undefined', () => {
    const newState = loginReducer(undefined, { type: 'NOTHING'})
    expect(newState).toBe(null)
  })
})
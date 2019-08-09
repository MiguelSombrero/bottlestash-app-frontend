import loginReducer from './loginReducer'
import deepFreeze from 'deep-freeze'

describe('loginReducer', () => {
  test('returns a user with LOGIN action', () => {
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

  test('returns null with LOGOUT action', () => {
    const state = {
      username: 'Somero',
      token: 'asdhuDHVsdhvsDHVOshvou',
      name: 'Miika'
    }

    const action = {
      type: 'LOGOUT'
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)

    expect(newState).toBe(null)
  })

  test('returns initial state when called undefined', () => {
    const newState = loginReducer(undefined, { type: 'NOTHING'})
    expect(newState).toBe(null)
  })

  test('returns passed state in default action', () => {
    const newState = loginReducer({ name: 'Miika' }, { type: 'NOTHING'})
    expect(newState).toStrictEqual({ name: 'Miika' })
  })
})
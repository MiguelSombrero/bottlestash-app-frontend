import usersReducer from './usersReducer'
import deepFreeze from 'deep-freeze'

describe('usersReducer', () => {
  test('returns users with GET_USERS action', () => {
    const state = []
    const users = [
      {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      },
      {
        username: 'Luukkainen',
        token: 'asdhuDHVasfasdfDHVOshvou',
        name: 'Matti'
      },
      {
        username: 'Lahtinen',
        token: 'asdhuDHVasdfasdfvsDHVOshvou',
        name: 'Jorma'
      }
    ]

    const action = {
      type: 'GET_USERS',
      users
    }

    deepFreeze(state)
    const newState = usersReducer(state, action)

    expect(newState.length).toBe(3)
    expect(newState).toEqual(action.users)
  })

  test('returns old state plus new users with REGISTER_USER action', () => {
    const state = [
      {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      },
      {
        username: 'Luukkainen',
        token: 'asdhuDHVasfasdfDHVOshvou',
        name: 'Matti'
      }
    ]

    const newUser = {
      username: 'Lahtinen',
      token: 'asdhuDHVasdfasdfvsDHVOshvou',
      name: 'Jorma'
    }
    
    const action = {
      type: 'REGISTER_USER',
      newUser
    }

    deepFreeze(state)
    const newState = usersReducer(state, action)

    expect(newState.length).toBe(3)
    expect(newState).toEqual([ ...state, newUser ])
  })

  test('returns initial state when called undefined', () => {
    const newState = usersReducer(undefined, { type: 'NOTHING'})
    expect(newState).toStrictEqual([])
  })

  test('returns passed state in default action', () => {
    const newState = usersReducer([
      {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      }
    ], { type: 'NOTHING'})

    expect(newState).toStrictEqual([
      {
        username: 'Somero',
        token: 'asdhuDHVsdhvsDHVOshvou',
        name: 'Miika'
      }
    ])
  })
})
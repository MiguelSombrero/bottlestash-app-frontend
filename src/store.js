import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  user: loginReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
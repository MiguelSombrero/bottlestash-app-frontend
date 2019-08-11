import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import beersReducer from './reducers/beersReducer'
import breweriesReducer from './reducers/breweriesReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: loginReducer,
  users: usersReducer,
  beers: beersReducer,
  breweries: breweriesReducer,
  notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
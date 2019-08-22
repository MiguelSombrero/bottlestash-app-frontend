import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import beersReducer from './reducers/beersReducer'
import breweriesReducer from './reducers/breweriesReducer'
import notificationReducer from './reducers/notificationReducer'
import ratingsReducer from './reducers/ratingsReducer'
import bottlesReducer from './reducers/bottlesReducer'

// toistaiseksi emme käytä beers mihinkään tilassa

const reducer = combineReducers({
  user: loginReducer,
  users: usersReducer,
  beers: beersReducer,
  breweries: breweriesReducer,
  notification: notificationReducer,
  ratings: ratingsReducer,
  bottles: bottlesReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
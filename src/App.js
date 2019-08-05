import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAll } from './reducers/usersReducer'
import { BrowserRouter , Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Register from './components/Register'
import Stash from './components/Stash'

const App = (props) => {
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBottlestashUser')
    if (loggedUser) {
      props.setUserToState(JSON.parse(loggedUser))
    }
  }, [])

  useEffect(() => {
    props.getAll()
  }, [])

  return (
    <>
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
          <Route exact path='/stash' render={() => <Stash />} />
        </div>
      </BrowserRouter>
    </>
  )
}

const mapDispatchToProps = { setUserToState, getAll }

export default connect(null, mapDispatchToProps)(App)

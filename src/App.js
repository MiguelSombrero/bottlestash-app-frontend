import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { BrowserRouter , Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Register from './components/Register'

const App = (props) => {
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBottlestashUser')
    props.setUser(JSON.parse(loggedUser))
  }, [props])

  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
        </div>
      </BrowserRouter>
    </div>
  )
}

const mapDispatchToProps = { setUser }

export default connect(null, mapDispatchToProps)(App)

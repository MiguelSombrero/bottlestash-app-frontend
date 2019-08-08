import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Register from './components/Register'
import Stash from './components/Stash'
import Footer from './components/Footer'
import AddBottle from './components/AddBottle'

const App = (props) => {
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBottlestashUser')
    if (loggedUser) {
      props.setUserToState(JSON.parse(loggedUser))
    }
  }, [])

  useEffect(() => {
    props.getAllUsers()
  }, [])

  const userById = (id) => 
    props.users.find(user => user.id === id)

  return (
    <Container fluid>
      <BrowserRouter as={Row} >
        <Navigation />
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />

        <Route exact path='/bottles' render={() => 
          props.user ? <AddBottle /> : <Redirect to='/login' /> } />

        <Route exact path='/users/:id/stash' render={({ match }) =>
          props.user ? <Stash userToView={userById(match.params.id)} /> : <Redirect to='/login' /> } />

        <Footer />
      </BrowserRouter>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = { setUserToState, getAllUsers }

export default connect(mapStateToProps, mapDispatchToProps)(App)

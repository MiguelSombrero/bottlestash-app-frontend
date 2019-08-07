import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAll } from './reducers/usersReducer'
import { BrowserRouter , Route } from 'react-router-dom'
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
  }, [props])

  useEffect(() => {
    props.getAll()
  }, [props])

  const userById = (id) => 
    props.users.find(user => user.id === id)

  return (
    <Container fluid>
      <BrowserRouter as={Row} >
        <Navigation />
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/users/:id/stash' render={({ match }) =>
          <Stash userToView={userById(match.params.id)} />
        } />
        <Route exact path='/users/:id/bottles' render={({ match }) =>
          <AddBottle userToView={userById(match.params.id)} />
        } />
        <Footer />
      </BrowserRouter>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = { setUserToState, getAll }

export default connect(mapStateToProps, mapDispatchToProps)(App)

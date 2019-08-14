import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { getAllBreweries } from './reducers/breweriesReducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Register from './components/Register'
import Stash from './components/Stash'
import Footer from './components/Footer'
import AddBottle from './components/AddBottle'
import Bottle from './components/Bottle'
import Notification from './components/Notification'
import Rate from './components/Rate'
import Profile from './components/Profile'

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

  useEffect(() => {
    props.getAllBreweries()
  }, [])

  const userById = (id) => 
    props.users.find(user => user.id === id)

  const loggedUser = (username) =>
    props.users.find(user => user.username === username)

  return (
    <Container fluid>
      <BrowserRouter as={Row} >
        <Navigation user={!props.user ? null : loggedUser(props.user.username)} />
        <Notification />
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />

        {props.user &&
        <>  
          <Route
            exact path='/bottles'
            render={() =>
              <AddBottle
                breweries={!props.breweries ? null : props.breweries.map(brewery => brewery.name)}
                user={!props.user ? null : loggedUser(props.user.username)}
              />
            }
          />
          <Route
            exact path='/bottles/:id/'
            render={() => <Bottle /> }
          />
          <Route
            exact path='/rate'
            render={() => <Rate /> }
          />
          <Route
            exact path='/profile'
            render={(props) =>  <Profile {...props} /> }
          />
          <Route
            exact path='/users/:id/stash'
            render={({ match }) => 
              <Stash userToView={userById(match.params.id)} />
            }
          />
        </>
        }
        
        <Footer />
      </BrowserRouter>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    breweries: state.breweries
  }
}

const mapDispatchToProps = {
  setUserToState,
  getAllUsers,
  getAllBreweries
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { getAllBreweries } from './reducers/breweriesReducer'
import { setNotification } from './reducers/notificationReducer'
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

  const loggedUser = () =>
    !props.user ? null : props.users.find(user => user.username === props.user.username)

  const breweriesAsList = () => 
    !props.breweries ? null : props.breweries.map(brewery => brewery.name)

  return (
    <Container fluid>
      <BrowserRouter as={Row} >
        <Navigation
          user={loggedUser()}
          setNotification={props.setNotification}
        />
        <Notification />

        <Route
          exact path='/'
          render={() => <Home /> }
        />
        <Route
          exact path='/login'
          render={() => <Login setNotification={props.setNotification} />}
        />
        <Route
          exact path='/register'
          render={() => <Register setNotification={props.setNotification} />}
        />

        {props.user &&
        <>  
          <Route
            exact path='/bottles'
            render={() =>
              <AddBottle
                breweries={breweriesAsList()}
                user={loggedUser()}
                setNotification={props.setNotification}
              />
            }
          />
          <Route
            exact path='/bottles/:id/'
            render={() => <Bottle setNotification={props.setNotification} /> }
          />
          <Route
            exact path='/rate'
            render={() => <Rate setNotification={props.setNotification} /> }
          />
          {loggedUser() &&
          <Route
            exact path='/profile'
            render={() =>
              <Profile
                setNotification={props.setNotification}
                user={loggedUser()}
              />
            }
          />
          }
          <Route
            exact path='/users/:id/stash'
            render={({ match }) => 
              <Stash
                userToView={userById(match.params.id)}
                user={loggedUser()}
              />
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
  getAllBreweries,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { getAllBreweries } from './reducers/breweriesReducer'
import { getAllRatings } from './reducers/ratingsReducer'
import { getAllBottles } from './reducers/bottlesReducer'
import { setNotification } from './reducers/notificationReducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Register from './components/Register'
import Stash from './components/Stash'
import Footer from './components/Footer'
import AddBottle from './components/AddBottle'
import Notification from './components/Notification'
import Rate from './components/Rate'
import Profile from './components/Profile'
import SearchResults from './components/SearchResults'

import './App.css'

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

  useEffect(() => {
    props.getAllRatings()
  }, [])

  useEffect(() => {
    props.getAllBottles()
  }, [])

  const userById = (id) => 
    props.users.find(user => user.id === id)

  const loggedUser = () =>
    !props.user ? null : props.users.find(user => user.username === props.user.username)

  const breweriesAsList = () => 
    !props.breweries ? null : props.breweries.map(brewery => brewery.name)

  return (
    <Container fluid>
      <BrowserRouter >

        <Navigation
          user={loggedUser()}
          setNotification={props.setNotification}
          suggestions={props.bottles.map(b => b.beer.name)}
        />
        <Notification />

        <Route
          exact path='/'
          render={() => 
            <Home
              user={props.user}
              bottles={props.bottles}
              ratings={props.ratings}
            />
          }
        />
        <Route
          exact path='/login'
          render={() => <Login setNotification={props.setNotification} />}
        />
        <Route
          exact path='/register'
          render={() => <Register setNotification={props.setNotification} />}
        />
        <Route
          exact path='/search'
          render={() =>
            <SearchResults
              user={props.user}
              bottles={props.bottles}
              suggestions={props.bottles.map(b => b.beer.name)}
            />
          }
        />

        {props.user &&
        <>  
          <Route
            exact path='/bottles'
            render={() =>
              <AddBottle
                breweries={breweriesAsList()}
                user={props.user}
                setNotification={props.setNotification}
              />
            }
          />
          <Route
            exact path='/rate'
            render={(props) => <Rate {...props} /> }
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
                user={props.user}
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
    breweries: state.breweries,
    bottles: state.bottles,
    ratings: state.ratings
  }
}

const mapDispatchToProps = {
  setUserToState,
  getAllUsers,
  getAllBreweries,
  getAllRatings,
  getAllBottles,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

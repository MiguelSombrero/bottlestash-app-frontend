import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserToState } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { getAllBreweries } from './reducers/breweriesReducer'
import { getAllBeers } from './reducers/beersReducer'
import { getAllRatings } from './reducers/ratingsReducer'
import { getAllBottles } from './reducers/bottlesReducer'
import { BrowserRouter, Route } from 'react-router-dom'
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
import Brewery from './components/Brewery'
import Beer from './components/Beer'
import About from './components/About'
import ScrollToTop from './components/ScrollToTop'
import ResourceFeed from './components/ResourceFeed'

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
    props.getAllBeers()
  }, [])

  useEffect(() => {
    props.getAllRatings()
  }, [])

  useEffect(() => {
    props.getAllBottles()
  }, [])

  const userById = (id) => 
    props.users.find(u => u.id === id)

  const breweryById = (id) =>
    props.breweries.find(b => b.id === id)

  const beerById = (id) =>
    props.beers.find(b => b.id === id)

  const ratingsByUserId = (id) =>
    props.ratings.filter(r => r.user.id === id)

  const ratingsByBeerId = (id) =>
    props.ratings.filter(r => r.beer.id === id)

  const loggedUser = () =>
    !props.user ? null : props.users.find(user => user.username === props.user.username)

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navigation user={loggedUser()} />
        <Notification />

        <Route
          exact path='/'
          render={() => 
            <Home
              user={props.user}
              users={props.users}
              bottles={props.bottles}
              ratings={props.ratings}
            />
          }
        />
        <Route
          exact path='/login'
          render={() => <Login />}
        />
        <Route
          exact path='/register'
          render={() => <Register />}
        />
        <Route
          exact path='/about'
          render={() => <About />}
        />
        <Route
          exact path='/search'
          render={() => <SearchResults /> }
        />
        <Route
            exact path='/breweries/:id/'
            render={({ match }) => 
              <Brewery
                brewery={breweryById(match.params.id)}
              />
            }
          />
        <Route
          exact path='/beers/:id/'
          render={({ match }) => 
            <Beer
              beer={beerById(match.params.id)}
              ratings={ratingsByBeerId(match.params.id)}
            />
          }
        />

        {props.user &&
        <>  
          <Route
            exact path='/bottles'
            render={() =>
              <AddBottle
                breweries={props.breweries}
                beers={props.beers}
                user={props.user}
              />
            }
          />
          <Route
            exact path='/users/:id/ratings'
            render={({ match }) =>
              <ResourceFeed
                resources={ratingsByUserId(match.params.id)}
                resource='rating'
              />
            }
          />
          <Route
            exact path='/rate'
            render={(props) => <Rate {...props} /> }
          />
          <Route
            exact path='/profile'
            render={() => <Profile user={loggedUser()} /> }
          />
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
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    breweries: state.breweries,
    beers: state.beers,
    bottles: state.bottles,
    ratings: state.ratings
  }
}

const mapDispatchToProps = {
  setUserToState,
  getAllUsers,
  getAllBreweries,
  getAllBeers,
  getAllRatings,
  getAllBottles
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

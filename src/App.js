import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <div>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/login' render={() => <Login />} />
        </div>
      </Router>
    </div>
  )
}

export default App;

import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'

const Home = (props) => {
  return (
    <div>
      Tämä on etusivu

      {!props.user &&
        <Login />
      }

      {props.user &&
        <p>olet kirjautunut sisään {props.user.name}</p>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
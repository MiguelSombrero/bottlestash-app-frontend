import React from 'react'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Bottlestash</h1>
        <p>
          Bottlestash in an app that let's you manage you beercellar.
          Keep track of what you have in your cellar and ...
        </p>
        <h3>With Bottlestash you can:</h3>
        <ul>
          <li>Save bottles to your stash</li>
          <li>Review beers you have tasted</li>
        </ul>
      </Jumbotron>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
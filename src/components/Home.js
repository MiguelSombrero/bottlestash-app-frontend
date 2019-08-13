import React from 'react'
import { Jumbotron, Row, Col } from 'react-bootstrap'

const Home = (props) => {
  return (
    <>
      <Row>
        <Jumbotron as={Col}>
          <h1>Welcome to Bottlestash</h1>
        
          Bottlestash in an app that let's you manage you beercellar.
          Keep track of what you have in your cellar and ...
        
        </Jumbotron>
      </Row>
      <Row>
        <Col>
          <h3>With Bottlestash you can:</h3>
          <ul>
            <li>Save bottles to your stash</li>
            <li>Review beers you have tasted</li>
          </ul>
        </Col>
      </Row>
    </>
    
  )
}

export default Home
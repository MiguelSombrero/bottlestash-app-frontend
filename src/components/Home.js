import React, { useState } from 'react'
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import Rating from './Rating'
import Bottle from './Bottle'

const Home = (props) => {
  const [visibleRatings, setVisibleRatings] = useState(6)
  const [visibleBottles, setVisibleBottles] = useState(6)

  const handleSetVisibleRatings = () => {
    setVisibleRatings(visibleRatings + 6)
  }

  const handleSetVisibleBottles = () => {
    setVisibleBottles(visibleBottles + 6)
  }

  const byAdded = (a, b) => b.added > a.added ? 1 : -1

  const bottlesToShow = props.bottles
    .filter(b => !b.user.hidden)
    .sort(byAdded)
    .slice(0, visibleBottles)
    
    
  const ratingsToShow = props.ratings
    .sort(byAdded)
    .slice(0, visibleRatings)
    
  return (
    <>
      <Row>
        <Col>
        <Jumbotron className='text-center'>
          <h1>Bottlestash</h1>
          <h5>Cooler than wine cellar - wetter than Finnish summer</h5>
        </Jumbotron>
        </Col>
        
      </Row>

      {!props.user &&
      <>
      <Row>
        <Col className='d-flex justify-content-center mb-2' >
          <h2>Bottlestash, eh?</h2>
          <p>
            That's right! Bottlestash let's you keep track of your
            beer cellar; what you have, how many bottles and when to drink them!
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2' >
          <h3>Main features:</h3>
          <ul>
            <li>Save bottles to your stash</li>
            <li>Keep track of your beers expiration</li>
            <li>Rate beers you drink</li>
            <li>Peek other user's cellars</li>
          </ul>
        </Col>
      </Row>
      </>
      }

      {props.user &&
      <>
      <Row>
        <Col className='text-center' >
          <h5>Recently added bottles:</h5>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35rem', margin: 'auto' }} >
          {bottlesToShow.map(b =>
            <Bottle key={b.id} bottle={b} ></Bottle>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-5'>
          {props.bottles.length > visibleBottles &&
            <Button onClick={handleSetVisibleBottles}>Load more ...</Button>
          }
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <h4>Recently added ratings:</h4>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35rem', margin: 'auto' }}>
          {ratingsToShow.map(rating =>
            <Rating key={rating.id} rating={rating} ></Rating>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-5'>
          {props.ratings.length > visibleRatings &&
            <Button onClick={handleSetVisibleRatings}>Load more ...</Button>
          }
        </Col>
      </Row>
      </>
      }
    </>
    
  )
}

export default Home